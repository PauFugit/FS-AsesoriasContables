import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

const allowedOrigin = process.env.NEXT_PUBLIC_APP_URL || 'https://newasesoriasvaldivia.vercel.app'

const corsHeaders = {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function POST(request) {
    try {
        const data = await request.json()

        const { nombre, apellido, correo, mensaje } = data
        if (!nombre || !apellido || !correo || !mensaje) {
            return new NextResponse(JSON.stringify({ error: 'Faltan campos requeridos: nombre, apellido, correo y mensaje son obligatorios.' }), {
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

        const contactForm = await prisma.contactForm.create({
            data: {
                nombre: String(nombre).trim(),
                apellido: String(apellido).trim(),
                correo: String(correo).trim().toLowerCase(),
                telefono: data.telefono ? String(data.telefono).trim() : null,
                mensaje: String(mensaje).trim(),
            }
        })

        const apiKey = process.env.SENDGRID_API_KEY
        if (!apiKey) throw new Error('SENDGRID_API_KEY no está configurada')

        const from = process.env.EMAIL_FROM
        const sgResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                personalizations: [{ to: [{ email: from }] }],
                from: { email: from },
                subject: 'Nuevo mensaje de contacto',
                content: [{
                    type: 'text/plain',
                    value: `Nombre: ${nombre} ${apellido}\nCorreo: ${correo}\nTeléfono: ${data.telefono || 'No indicado'}\nMensaje: ${mensaje}`,
                }],
            }),
        })

        if (!sgResponse.ok && sgResponse.status !== 202) {
            const sgError = await sgResponse.text()
            throw new Error(`Error SendGrid: ${sgError}`)
        }

        return new NextResponse(JSON.stringify(contactForm), {
            status: 201,
            headers: { "Content-Type": "application/json", ...corsHeaders }
        })
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: 'Ha ocurrido un error al procesar el formulario.' }), {
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
