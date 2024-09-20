import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'


export async function POST(request) {
    try {
        console.log("Received registration request");
        const data = await request.json()
        console.log("Parsed request data:", data);

        // input validacion
        if (!data.email || !data.username || !data.password || !data.name || !data.lastname || !data.phone) {
            return NextResponse.json({ message: "Todos los campos son requeridos" }, { status: 400 })
        }
    // verificar si existe el correo
        const userFound = await prisma.users.findUnique({
            where: {
                email: data.email
            }
        })
        if (userFound) {
            return NextResponse.json({
                message: "El correo ya existe",
            }, {
                status: 400
            })
        }
        // verificar si usuario existe
        const usernameFound = await prisma.users.findUnique({
            where: {
                username: data.username
            }
        })
        if (usernameFound) {
            return NextResponse.json({
                message: "El nombre de usuario ya está registrado",
            }, {
                status: 400,
            })
        }


        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        console.log("Creating new user");
        const newUser = await prisma.users.create({
            data: {
                username: data.username,
                email: data.email,
                name: data.name,
                lastname: data.lastname,
                password: hashedPassword,
                phone: data.phone,
                role: data.role,
            }
        })
        console.log("User created successfully");

        const { password: _, ...user } = newUser

        return NextResponse.json(user);

    } catch (error) {
        return NextResponse.json({
            message: error.message || "An unexpected error occurred",
        }, {
            status: 500,
        });

    }
}