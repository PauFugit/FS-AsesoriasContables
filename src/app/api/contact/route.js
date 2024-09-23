import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import nodemailer from 'nodemailer'

// Importar cors
import Cors from 'cors'

// Inicializar el middleware de CORS
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
  origin: '*',  // Puedes restringir a un dominio específico en lugar de usar '*'
})

// Función para ejecutar el middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export async function POST(request) {
    try {
        // Ejecutar el middleware de CORS antes de proceder
        await runMiddleware(request, new NextResponse(), cors)

        const data = await request.json()

        // Guardar en la base de datos
        const contactForm = await prisma.contactForm.create({
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
                Mensaje: ${data.mensaje}
            `,
        })

        console.log("Formulario de contacto enviado y correo enviado exitosamente.")
        return new NextResponse(JSON.stringify(contactForm), {
            headers: { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"  // Asegurar que se permiten las solicitudes CORS
            },
            status: 201
        })
    } catch (error) {
        console.error("Error en la API de contacto:", error)
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"  // Asegurar que se permiten las solicitudes CORS
            }
        })
    }
}
