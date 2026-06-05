import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

const DAEMON_URL    = process.env.DAEMON_URL
const DAEMON_SECRET = process.env.DAEMON_SECRET

function daemonHeaders() {
  return { 'x-daemon-secret': DAEMON_SECRET, 'Content-Type': 'application/json' }
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

// ── GET /api/automation?action=status&job_id=xxx ───────────────────────
// ── GET /api/automation?action=jobs ────────────────────────────────────
export async function GET(req) {
  const deny = await requireAdmin()
  if (deny) return deny
  if (!DAEMON_URL) return noDaemon()

  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action')
  const jobId  = searchParams.get('job_id')

  let daemonPath = '/health'
  if (action === 'status' && jobId) daemonPath = `/status/${jobId}`
  else if (action === 'jobs')      daemonPath = '/jobs'

  try {
    const res = await fetch(`${DAEMON_URL}${daemonPath}`, {
      headers: { 'x-daemon-secret': DAEMON_SECRET },
      signal: AbortSignal.timeout(10000),
    })
    const data = await res.json()
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
  if (!DAEMON_URL) return noDaemon()

  const contentType = req.headers.get('content-type') || ''

  // ── Multipart (subida de Excel) ─────────────────────────────────────
  if (contentType.includes('multipart/form-data')) {
    const form = await req.formData()
    const type = form.get('type')  // 'boletas' | 'facturas'

    const endpoint = type === 'boletas'
      ? '/run/boletas/masivo'
      : '/run/facturas/masivo'

    // Reenviar el FormData al daemon
    const daemonForm = new FormData()
    const archivo = form.get('archivo')
    if (!archivo) {
      return NextResponse.json({ error: 'Falta archivo Excel' }, { status: 400 })
    }
    daemonForm.append('archivo', archivo)

    try {
      const res = await fetch(`${DAEMON_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'x-daemon-secret': DAEMON_SECRET },
        body: daemonForm,
        signal: AbortSignal.timeout(30000),
      })
      const data = await res.json()
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
      return NextResponse.json(await res.json(), { status: res.status })
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
      headers: daemonHeaders(),
      body: JSON.stringify(params),
      signal: AbortSignal.timeout(15000),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (e) {
    return NextResponse.json({ error: `Error contactando daemon: ${e.message}` }, { status: 502 })
  }
}
