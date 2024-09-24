import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import sgMail from '@sendgrid/mail'

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function POST(request) {
    try {
        const data = await request.json()

        // Guardar en la base de datos
        const contactForm = await prisma.contactForm.create({
            data: data
        })

        // Preparar el mensaje de correo
        const msg = {
            to: process.env.EMAIL_USER,
            from: 'contacto@asesoriasvaldivia.cl', // remitente verificado en SendGrid
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
        return NextResponse.json(contactForm, { status: 201 })
    } catch (error) {
        console.error("Error en la API de contacto:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function OPTIONS(request) {
    return NextResponse.json({}, { status: 200 })
}