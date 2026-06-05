import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(request, { params }) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    const id = parseInt(params.id)

    // Solo el propio usuario o un ADMIN pueden ver los datos
    if (session.user.role !== 'ADMIN' && parseInt(session.user.id) !== id) {
        return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }

    try {
        const user = await prisma.users.findUnique({
            where: { id: id },
            select: {
                id: true,
                email: true,
                username: true,
                name: true,
                lastname: true,
                phone: true,
                image: true,
                role: true,
                active: true,
                company: true,
                companyEmail: true,
                companyPhone: true,
                companyRUT: true,
                driveURL: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        if (!user) {
            return NextResponse.json({ error: `Usuario con la ID ${id} no ha sido encontrado` }, { status: 404 })
        }
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener usuario' }, { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }
    const id = parseInt(params.id)
    try {
        const result = await prisma.users.delete({ where: { id: id } })
        return NextResponse.json({ message: 'Usuario eliminado con éxito', result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error al eliminar usuario' }, { status: 500 })
    }
}

export async function PUT(request, { params }) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    const id = parseInt(params.id)

    // Solo el propio usuario o un ADMIN pueden actualizar
    if (session.user.role !== 'ADMIN' && parseInt(session.user.id) !== id) {
        return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }

    const data = await request.json()
    try {
        // Solo campos editables para evitar escalada de privilegios
        const allowedFields = ['username', 'name', 'lastname', 'phone', 'email', 'active']
        const safeUpdate = {}
        for (const field of allowedFields) {
            if (data[field] !== undefined) safeUpdate[field] = data[field]
        }

        if (data.password) {
            safeUpdate.password = await bcrypt.hash(data.password, 10)
        }

        const result = await prisma.users.update({
            where: { id: id },
            data: safeUpdate
        });

        const { password, ...userWithoutPassword } = result;
        return NextResponse.json(userWithoutPassword);
    } catch (error) {
        return NextResponse.json({ error: 'Error al actualizar usuario' }, { status: 500 })
    }
}
