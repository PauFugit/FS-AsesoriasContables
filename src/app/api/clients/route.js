import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const clients = await prisma.users.findMany({
            where: {
                role: 'CLIENT'
            },
            select: {
                id: true,
                name: true,
                lastname: true,
                email: true,
                company: true,
                active: true
            }
        });
        return NextResponse.json({ data: clients }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 })
    }
}

export async function PUT(request) {
    try {
        const { id, active } = await request.json()
        const updatedClient = await prisma.users.update({
            where: { id: parseInt(id) },
            data: { active },
            select: {
                id: true,
                name: true,
                lastname: true,
                email: true,
                company: true,
                active: true
            }
        })
        return NextResponse.json({ data: updatedClient }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const data = await request.json()
        // Ensure the role is set to CLIENT
        data.role = 'CLIENT'

        const client = await prisma.users.create({
            data: data
        })
        console.log("Client created successfully.")
        return new NextResponse(JSON.stringify(client), {
            headers: { "Content-Type": "application/json" },
            status: 201
        })
    } catch (error) {
        return new NextResponse(error.message, { status: 500 })
    }
}