import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import sgMail from '@sendgrid/mail'

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function POST(request) {
    console.log('API Route: POST /api/contact started');
    try {
        const data = await request.json()
        console.log('Received data:', data);

        console.log('Creating contact form entry in database...');
        const contactForm = await prisma.contactForm.create({
            data: data
        })
        console.log('Contact form entry created:', contactForm);

        console.log('Setting up SendGrid...');
        const apiKey = process.env.SENDGRID_API_KEY;
        console.log('API Key length:', apiKey ? apiKey.length : 'undefined');
        sgMail.setApiKey(apiKey);

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
            console.error('SendGrid Error Response:', error.response.body)
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

export async function GET() {
    return new NextResponse(JSON.stringify({ message: "This endpoint only accepts POST requests" }), {
        status: 405,
        headers: {
            "Content-Type": "application/json",
            ...corsHeaders
        }
    })
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: corsHeaders
    })
}