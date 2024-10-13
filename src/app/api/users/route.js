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

export async function PUT(request) {
    try {
        const data = await request.json()
        const { id, ...updateData } = data

        // If a new password is provided, hash it
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10)
        } else {
            // If no new password is provided, remove the password field
            delete updateData.password
        }

        const updatedUser = await prisma.users.update({
            where: { id: parseInt(id) },
            data: updateData
        })

        // Remove password from the response
        const { password, ...userWithoutPassword } = updatedUser

        return NextResponse.json({
            message: "User updated successfully",
            data: userWithoutPassword
        }, { status: 200 })
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json(
            { error: error.message || "An error occurred while updating the user" },
            { status: 500 }
        )
    }
}