import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

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
        const user = await prisma.users.create({
            data: data
        })
        return new NextResponse(JSON.stringify(user), {
            headers: { "Content-Type": "application/json" },
            status: 201
        })
    } catch (error) {
        return new NextResponse(error.message, { status: 500 })
    }
}