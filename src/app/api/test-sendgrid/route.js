import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'RESEND_API_KEY no está configurada' }, { status: 500 })
  }

  try {
    const resend = new Resend(apiKey)
    const from = process.env.EMAIL_FROM

    await resend.emails.send({
      from,
      to: from,
      subject: 'Test de email — Resend',
      text: 'Si recibes esto, Resend está funcionando correctamente.',
    })

    return NextResponse.json({ success: true, message: 'Email de prueba enviado correctamente' })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al enviar email de prueba' }, { status: 500 })
  }
}
