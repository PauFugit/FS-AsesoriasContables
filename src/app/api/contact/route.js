import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function POST(request) {
  // Handle preflight request
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: corsHeaders })
  }

  try {
    const data = await request.json()

    const contactForm = await prisma.contactForm.create({
      data: data
    })

    const msg = {
      to: process.env.EMAIL_USER,
      from: 'contacto@asesoriasvaldivia.cl',
      subject: "Nuevo mensaje de contacto",
      text: `
        Nombre: ${data.nombre} ${data.apellido}
        Correo: ${data.correo}
        Teléfono: ${data.telefono}
        Mensaje: ${data.mensaje}
      `,
    }

    await sgMail.send(msg)

    console.log("Formulario de contacto enviado y correo enviado exitosamente.")
    return new NextResponse(JSON.stringify(contactForm), { 
      status: 201, 
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    })
  } catch (error) {
    console.error("Error en la API de contacto:", error)
    return new NextResponse(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    })
  }
}

export async function OPTIONS(request) {
  return new NextResponse(null, { status: 200, headers: corsHeaders })
}