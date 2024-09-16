import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const resources = await prisma.resource.findMany();
        return NextResponse.json({ data: resources }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const data = await request.json()
        const resource = await prisma.resource.create({
            data: data
        })
        return new NextResponse(JSON.stringify(resource), {
            headers: { "Content-Type": "application/json" },
            status: 201
        })
    } catch (error) {
        return new NextResponse(error.message, { status: 500 })
    }
}