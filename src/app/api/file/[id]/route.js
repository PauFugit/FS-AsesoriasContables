import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(request, { params }) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    const id = parseInt(params.id)
    try {
        const file = await prisma.file.findFirst({ where: { id: id } });
        if (!file) {
            return NextResponse.json({ error: `Archivo con la ID ${id} no ha sido encontrado` }, { status: 404 })
        }
        return NextResponse.json(file)
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener archivo' }, { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    if (session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }
    const id = parseInt(params.id)
    try {
        const result = await prisma.file.delete({ where: { id: id } })
        return NextResponse.json({ message: 'Archivo eliminado con éxito', result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error al eliminar archivo' }, { status: 500 })
    }
}

export async function PUT(request, { params }) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    if (session.user.role !== 'ADMIN' && session.user.role !== 'TEAM') {
        return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }
    const id = parseInt(params.id)
    const data = await request.json()
    try {
        const result = await prisma.file.update({ where: { id: id }, data: data });
        return NextResponse.json({ message: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error al actualizar archivo' }, { status: 500 })
    }
}
