import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'


export async function GET() {
    try {
        const user = await prisma.users.findMany();
        return NextResponse.json({ data: user }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const data = await request.json()

        // Check if username already exists
        const existingUser = await prisma.users.findUnique({
            where: { username: data.username }
        })

        if (existingUser) {
            return NextResponse.json(
                { error: "Username already exists" },
                { status: 400 }
            )
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(data.password, 10)

        const user = await prisma.users.create({
            data: {
                ...data,
                password: hashedPassword
            }
        })

        console.log("User created successfully.")
        
        // Remove password from the response
        const { password, ...userWithoutPassword } = user

        return NextResponse.json(userWithoutPassword, {
            status: 201
        })
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: error.message || "An error occurred while creating the user" },
            { status: 500 }
        )
    }
}