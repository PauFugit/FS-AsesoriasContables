import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

// Subir el Excel y reenviarlo al daemon (vía túnel) puede tardar más que el
// límite por defecto de las funciones de Vercel (10s en Hobby), cortando la
// conexión a medio camino y devolviendo HTML en vez de JSON al frontend.
export const maxDuration = 60

function getDaemonConfig() {
  return {
    url:    process.env.DAEMON_URL,
    secret: process.env.DAEMON_SECRET,
  }
}

function daemonHeaders(secret) {
  return { 'x-daemon-secret': secret, 'Content-Type': 'application/json' }
}

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }
  return null
}

function noDaemon() {
  return NextResponse.json({ error: 'Daemon no configurado (DAEMON_URL)' }, { status: 503 })
}

// El daemon a veces responde con texto no-JSON (errores de túnel, HTML, logs
// mezclados en stdout). Si falla el parseo, devolvemos el fragmento crudo
// para poder diagnosticar en vez de un error genérico de JSON.parse.
async function safeJson(res) {
  const text = await res.text()
  try {
    return { data: JSON.parse(text), raw: null }
  } catch {
    return { data: null, raw: text }
  }
}

// ── GET /api/automation?action=status&job_id=xxx ───────────────────────
// ── GET /api/automation?action=jobs ────────────────────────────────────
export async function GET(req) {
  const deny = await requireAdmin()
  if (deny) return deny

  const { url: DAEMON_URL, secret: DAEMON_SECRET } = getDaemonConfig()

  // Debug endpoint: ?action=debug
  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action')
  if (action === 'debug') {
    return NextResponse.json({
      DAEMON_URL: DAEMON_URL || '(no definida)',
      DAEMON_SECRET: DAEMON_SECRET ? '(definida)' : '(no definida)',
    })
  }

  if (!DAEMON_URL) return noDaemon()

  const jobId  = searchParams.get('job_id')

  let daemonPath = '/health'
  if (action === 'status' && jobId) daemonPath = `/status/${jobId}`
  else if (action === 'jobs')      daemonPath = '/jobs'

  try {
    const res = await fetch(`${DAEMON_URL}${daemonPath}`, {
      headers: { 'x-daemon-secret': DAEMON_SECRET },
      signal: AbortSignal.timeout(10000),
    })
    const { data, raw } = await safeJson(res)
    if (raw !== null) {
      return NextResponse.json({ error: 'Respuesta no-JSON del daemon', raw: raw.slice(0, 500) }, { status: 502 })
    }
    return NextResponse.json(data, { status: res.status })
  } catch (e) {
    return NextResponse.json({ error: `Error contactando daemon: ${e.message}` }, { status: 502 })
  }
}

// ── POST /api/automation ───────────────────────────────────────────────
// body JSON: { action, ...params }
// actions:
//   run_boletas_individual  → lanza boleta individual
//   run_boletas_masivo      → (usa FormData, ver abajo)
//   run_facturas_individual → lanza facturas individual
//   run_facturas_masivo     → (usa FormData)
//   stop                    → { job_id }
export async function POST(req) {
  const deny = await requireAdmin()
  if (deny) return deny

  const { url: DAEMON_URL, secret: DAEMON_SECRET } = getDaemonConfig()
  if (!DAEMON_URL) return noDaemon()

  const contentType = req.headers.get('content-type') || ''

  // ── Multipart (subida de Excel) ─────────────────────────────────────
  if (contentType.includes('multipart/form-data')) {
    const form = await req.formData()
    const type = form.get('type')  // 'boletas' | 'facturas'

    const endpoint = type === 'boletas'
      ? '/run/boletas/masivo'
      : '/run/facturas/masivo'

    const daemonForm = new FormData()
    const archivo = form.get('archivo')
    if (!archivo) {
      return NextResponse.json({ error: 'Falta archivo Excel' }, { status: 400 })
    }
    daemonForm.append('archivo', archivo)
    const headless = form.get('headless')
    if (headless !== null) daemonForm.append('headless', headless)

    try {
      const res = await fetch(`${DAEMON_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'x-daemon-secret': DAEMON_SECRET },
        body: daemonForm,
        signal: AbortSignal.timeout(30000),
      })
      const { data, raw } = await safeJson(res)
      if (raw !== null) {
        return NextResponse.json({ error: 'Respuesta no-JSON del daemon', raw: raw.slice(0, 500) }, { status: 502 })
      }
      return NextResponse.json(data, { status: res.status })
    } catch (e) {
      return NextResponse.json({ error: `Error contactando daemon: ${e.message}` }, { status: 502 })
    }
  }

  // ── JSON ────────────────────────────────────────────────────────────
  const body = await req.json()
  const { action, ...params } = body

  if (action === 'stop') {
    try {
      const res = await fetch(`${DAEMON_URL}/stop/${params.job_id}`, {
        method: 'POST',
        headers: { 'x-daemon-secret': DAEMON_SECRET },
        signal: AbortSignal.timeout(10000),
      })
      const { data, raw } = await safeJson(res)
      if (raw !== null) {
        return NextResponse.json({ error: 'Respuesta no-JSON del daemon', raw: raw.slice(0, 500) }, { status: 502 })
      }
      return NextResponse.json(data, { status: res.status })
    } catch (e) {
      return NextResponse.json({ error: e.message }, { status: 502 })
    }
  }

  const ENDPOINTS = {
    run_boletas_individual:  '/run/boletas/individual',
    run_facturas_individual: '/run/facturas/individual',
  }

  const endpoint = ENDPOINTS[action]
  if (!endpoint) {
    return NextResponse.json({ error: `Acción desconocida: ${action}` }, { status: 400 })
  }

  try {
    const res = await fetch(`${DAEMON_URL}${endpoint}`, {
      method: 'POST',
      headers: daemonHeaders(DAEMON_SECRET),
      body: JSON.stringify(params),
      signal: AbortSignal.timeout(15000),
    })
    const { data, raw } = await safeJson(res)
    if (raw !== null) {
      return NextResponse.json({ error: 'Respuesta no-JSON del daemon', raw: raw.slice(0, 500) }, { status: 502 })
    }
    return NextResponse.json(data, { status: res.status })
  } catch (e) {
    return NextResponse.json({ error: `Error contactando daemon: ${e.message}` }, { status: 502 })
  }
}
