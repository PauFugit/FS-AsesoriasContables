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
        const file = await prisma.file.findMany();
        return NextResponse.json({ data: file }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener archivos' }, { status: 500 })
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
        const { name, url, type, resourceId } = await request.json()
        if (!name || !url || !resourceId) {
            return NextResponse.json({ error: 'name, url y resourceId son requeridos' }, { status: 400 })
        }
        const file = await prisma.file.create({
            data: { name, url, type: type || 'link', resourceId },
        })
        return NextResponse.json(file, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Error al crear archivo' }, { status: 500 })
    }
}
