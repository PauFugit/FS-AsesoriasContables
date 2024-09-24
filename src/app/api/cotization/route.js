import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { sendEmail } from '@/utils/sendEmail'

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function POST(request) {
    console.log('API Route: POST /api/cotization started');
    try {
        const data = await request.json()
        console.log('Received data:', data);

        console.log('Creating cotization form entry in database...');
        const cotizationForm = await prisma.cotizationForm.create({
            data: data
        })
        console.log('Cotization form entry created:', cotizationForm);

        const emailText = `
        Nombre: ${data.nombre} ${data.apellido}
        Correo: ${data.correo}
        Teléfono: ${data.telefono}
        Servicio a cotizar: ${data.servicio}
        Mensaje: ${data.mensaje}
        `;

        console.log('Attempting to send email...');
        const emailSent = await sendEmail(
            'contacto@asesoriasvaldivia.cl',
            'contacto@asesoriasvaldivia.cl',
            "Nueva solicitud de cotización",
            emailText
        );

        if (!emailSent) {
            throw new Error('Failed to send email');
        }

        console.log("Formulario de cotización enviado y correo enviado exitosamente.")
        return new NextResponse(JSON.stringify(cotizationForm), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders
            }
        })
    } catch (error) {
        console.error("Error en la API de cotización:", error)
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