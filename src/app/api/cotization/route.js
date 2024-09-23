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

        // Configurar el transporte de correo
        let transporter = nodemailer.createTransport({
            host: "c1961437.ferozo.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            },
            connectionTimeout: 10000, // 10 seconds
            greetingTimeout: 5000, // 5 seconds
        })

        // Verificar la conexión
        await new Promise((resolve, reject) => {
            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log("Server is ready to take our messages");
                    resolve(success);
                }
            });
        });

        // Enviar correo
        await new Promise((resolve, reject) => {
            transporter.sendMail({
                from: '"Asesorías Valdivia" <' + process.env.EMAIL_USER + '>',
                to: process.env.EMAIL_USER, // tu dirección de correo
                subject: "Nuevo mensaje para cotizar un servicio",
                text: `
                    Nombre: ${data.nombre} ${data.apellido}
                    Correo: ${data.correo}
                    Teléfono: ${data.telefono}
                    Servicio: ${data.servicio}
                    Mensaje: ${data.mensaje}
                `,
            }, (err, info) => {
                if (err) {
                    console.error("Error sending email:", err);
                    reject(err);
                } else {
                    console.log("Email sent successfully:", info);
                    resolve(info);
                }
            });
        });

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