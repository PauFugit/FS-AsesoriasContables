import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { sendEmail } from '@/utils/sendEmail'

const allowedOrigin = process.env.NEXT_PUBLIC_APP_URL || 'https://newasesoriasvaldivia.vercel.app'

const corsHeaders = {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function POST(request) {
    try {
        const data = await request.json()

        // Validación de campos requeridos
        const { nombre, apellido, correo, servicio, mensaje } = data
        if (!nombre || !apellido || !correo || !servicio || !mensaje) {
            return new NextResponse(JSON.stringify({ error: 'Faltan campos requeridos: nombre, apellido, correo, servicio y mensaje son obligatorios.' }), {
                status: 400,
                headers: { "Content-Type": "application/json", ...corsHeaders }
            })
        }

        if (String(nombre).trim().length > 100 || String(apellido).trim().length > 100) {
            return new NextResponse(JSON.stringify({ error: 'El nombre y apellido no pueden superar los 100 caracteres.' }), {
                status: 400,
                headers: { "Content-Type": "application/json", ...corsHeaders }
            })
        }

        if (String(mensaje).trim().length > 2000) {
            return new NextResponse(JSON.stringify({ error: 'El mensaje no puede superar los 2000 caracteres.' }), {
                status: 400,
                headers: { "Content-Type": "application/json", ...corsHeaders }
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(correo)) {
            return new NextResponse(JSON.stringify({ error: 'El correo electrónico no es válido.' }), {
                status: 400,
                headers: { "Content-Type": "application/json", ...corsHeaders }
            })
        }

        const cotizationForm = await prisma.cotizationForm.create({
            data: {
                nombre: String(nombre).trim(),
                apellido: String(apellido).trim(),
                correo: String(correo).trim().toLowerCase(),
                telefono: data.telefono ? String(data.telefono).trim() : null,
                servicio: String(servicio).trim(),
                mensaje: String(mensaje).trim(),
            }
        })

        const emailText = `Nombre: ${nombre} ${apellido}\nCorreo: ${correo}\nTeléfono: ${data.telefono || 'No indicado'}\nServicio a cotizar: ${servicio}\nMensaje: ${mensaje}`;

        const emailSent = await sendEmail(
            'contacto@asesoriasvaldivia.cl',
            'contacto@asesoriasvaldivia.cl',
            "Nueva solicitud de cotización",
            emailText
        );

        if (!emailSent) {
            throw new Error('Error al enviar el correo');
        }

        return new NextResponse(JSON.stringify(cotizationForm), {
            status: 201,
            headers: { "Content-Type": "application/json", ...corsHeaders }
        })
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: 'Ha ocurrido un error al procesar la cotización.' }), {
            status: 500,
            headers: { "Content-Type": "application/json", ...corsHeaders }
        })
    }
}

export async function GET() {
    return new NextResponse(JSON.stringify({ message: "Este endpoint solo acepta POST" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders }
    })
}

export async function OPTIONS() {
    return new NextResponse(null, { status: 200, headers: corsHeaders })
}
