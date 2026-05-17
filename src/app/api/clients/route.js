import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    if (session.user.role !== 'ADMIN' && session.user.role !== 'TEAM') {
        return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }
    try {
        const clients = await prisma.users.findMany({
            where: { role: 'CLIENT' },
            select: {
                id: true,
                username: true,
                name: true,
                lastname: true,
                phone: true,
                email: true,
                company: true,
                companyEmail: true,
                companyPhone: true,
                companyRUT: true,
                driveURL: true,
                active: true
            }
        });
        return NextResponse.json({ data: clients }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener clientes' }, { status: 500 })
    }
}

export async function PUT(request) {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }
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
                driveURL: true,
                active: true
            }
        })
        return NextResponse.json({ data: updatedClient }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error al actualizar cliente' }, { status: 500 })
    }
}

export async function POST(request) {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }
    try {
        const data = await request.json()
        data.role = 'CLIENT'

        // Hashear la contraseña antes de guardar
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10)
        }

        const { password, ...clientWithoutPassword } = await prisma.users.create({ data: data })

        return NextResponse.json(clientWithoutPassword, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Error al crear cliente' }, { status: 500 })
    }
}
