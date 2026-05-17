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
        const resource = await prisma.resource.findUnique({
            where: { id: id },
            include: { files: true },
        });
        if (!resource) {
            return NextResponse.json({ error: `Recurso con la ID ${id} no ha sido encontrado` }, { status: 404 })
        }
        return NextResponse.json(resource)
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener recurso' }, { status: 500 })
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
        const result = await prisma.resource.delete({ where: { id: id } })
        return NextResponse.json({ message: 'Recurso eliminado con éxito', result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error al eliminar recurso' }, { status: 500 })
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
        const result = await prisma.resource.update({ where: { id: id }, data: data });
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error al actualizar recurso' }, { status: 500 })
    }
}
