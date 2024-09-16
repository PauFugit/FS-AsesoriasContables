import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request, { params }) {
    const id = parseInt(params.id)
    try {
        const resource = await prisma.resource.findUnique({
            where: { id: id },
            include: { files: true },
        });
        if (!resource) {
            return new NextResponse(`Recurso con la ID ${id} no ha sido encontrado`, { status: 404 })
        }
        return NextResponse.json(resource)
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const id = parseInt(params.id)
    try {
        const result = await prisma.resource.delete({
            where: { id: id },
        })
        return NextResponse.json({ message: 'Recurso eliminado con éxito', result }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const id = parseInt(params.id)
    const data = await request.json()
    try {
        const result = await prisma.resource.update({
            where: { id: id },
            data: data
        });
        if (!result) {
            return new NextResponse(`Recurso con la ID ${id} no ha sido encontrado`, { status: 404 });
        }
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 })
    }
}