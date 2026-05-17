import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    try {
        const resources = await prisma.resource.findMany({
            include: { files: true },
            orderBy: { createdAt: 'asc' },
        });
        return NextResponse.json({ data: resources }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener recursos' }, { status: 500 })
    }
}

export async function POST(request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    if (session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }
    try {
        const { name, description } = await request.json()
        if (!name) return NextResponse.json({ error: 'El nombre es requerido' }, { status: 400 })
        const resource = await prisma.resource.create({
            data: { name, description },
            include: { files: true },
        })
        return NextResponse.json(resource, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Error al crear recurso' }, { status: 500 })
    }
}
