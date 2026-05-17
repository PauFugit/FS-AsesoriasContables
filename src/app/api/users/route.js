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
        const users = await prisma.users.findMany({
            select: {
                id: true,
                email: true,
                username: true,
                name: true,
                lastname: true,
                phone: true,
                role: true,
                active: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        return NextResponse.json({ data: users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener usuarios' }, { status: 500 })
    }
}

export async function POST(request) {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }
    try {
        const data = await request.json()

        const existingUser = await prisma.users.findUnique({
            where: { username: data.username }
        })

        if (existingUser) {
            return NextResponse.json(
                { error: "El usuario ya existe" },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        const user = await prisma.users.create({
            data: { ...data, password: hashedPassword }
        })

        const { password, ...userWithoutPassword } = user

        return NextResponse.json(userWithoutPassword, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: "Un error ocurrió al crear el usuario. Por favor, inténtalo nuevamente." },
            { status: 500 }
        )
    }
}

export async function PUT(request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    try {
        const data = await request.json()
        const { id, ...updateData } = data

        // Solo ADMIN puede actualizar a otros usuarios
        if (session.user.role !== 'ADMIN' && session.user.id !== id) {
            return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
        }

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10)
        } else {
            delete updateData.password
        }

        const updatedUser = await prisma.users.update({
            where: { id: parseInt(id) },
            data: updateData
        })

        const { password, ...userWithoutPassword } = updatedUser

        return NextResponse.json({
            message: "Usuario actualizado correctamente.",
            data: userWithoutPassword
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { error: "Ha ocurrido un error al actualizar al usuario." },
            { status: 500 }
        )
    }
}
