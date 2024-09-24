import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import sgMail from '@sendgrid/mail'

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Helper function to handle CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function POST(request) {
    // Handle CORS preflight request
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, { status: 200, headers: corsHeaders })
    }

    try {
        const data = await request.json()

        // Guardar en la base de datos
        const contactForm = await prisma.contactForm.create({
            data: data
        })

        // Preparar el mensaje de correo
        const msg = {
            to: process.env.EMAIL_USER,
            from: 'no-reply@asesoriasvaldivia.cl', // Este debe ser un remitente verificado en SendGrid
            subject: 'Nuevo mensaje de contacto',
            text: `
                Nombre: ${data.nombre} ${data.apellido}
                Correo: ${data.correo}
                Teléfono: ${data.telefono}
                Mensaje: ${data.mensaje}
            `,
            html: `
                <strong>Nombre:</strong> ${data.nombre} ${data.apellido}<br>
                <strong>Correo:</strong> ${data.correo}<br>
                <strong>Teléfono:</strong> ${data.telefono}<br>
                <strong>Mensaje:</strong> ${data.mensaje}
            `,
        }

        // Enviar correo usando SendGrid
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