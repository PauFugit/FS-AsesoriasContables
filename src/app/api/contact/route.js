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
    try {
        const data = await request.json()

        const contactForm = await prisma.contactForm.create({
            data: data
        })

        const msg = {
            to: 'contacto@asesoriasvaldivia.cl',
            from: 'contacto@asesoriasvaldivia.cl', // Make sure this is verified in SendGrid
            subject: "Nuevo mensaje de contacto",
            text: `
        Nombre: ${data.nombre} ${data.apellido}
        Correo: ${data.correo}
        Teléfono: ${data.telefono}
        Mensaje: ${data.mensaje}
      `,
        }
        
        console.log('Attempting to send email...');
        const result = await sgMail.send(msg);
        console.log('SendGrid response:', result);

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
        if (error.response) {
            console.error(error.response.body)
        }
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders
            }
        })
    }
}