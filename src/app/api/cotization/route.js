import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import nodemailer from 'nodemailer'

export async function POST(request) {
    try {
        const data = await request.json()

        // Guardar en la base de datos
        const cotizationForm = await prisma.cotizationForm.create({
            data: data
        })

        // Configurar el transporte de correo usando Sendmail
        let transporter = nodemailer.createTransport({
            sendmail: true,
            path: '/usr/sbin/sendmail.sendmail',  // La ruta proporcionada por Ferozo
        })

        // Enviar correo
        await transporter.sendMail({
            from: '"Asesorías Valdivia" <no-reply@asesoriasvaldivia.cl>',
            to: process.env.EMAIL_USER, // Tu dirección de correo o la de destino
            subject: "Nuevo mensaje de contacto",
            text: `
                Nombre: ${data.nombre} ${data.apellido}
                Correo: ${data.correo}
                Teléfono: ${data.telefono}
                Servicio: ${data.servicio}
                Mensaje: ${data.mensaje}
            `,
        })

        

        console.log("Formulario de contacto enviado y correo enviado exitosamente.")
        return new NextResponse(JSON.stringify(cotizationForm), {
            headers: { "Content-Type": "application/json" },
            status: 201
        })
    } catch (error) {
        console.error("Error en la API de contacto:", error)
        return new NextResponse(JSON.stringify({ error: error.message }), { 
            status: 500,
            headers: { "Content-Type": "application/json" }
        })
    }
}