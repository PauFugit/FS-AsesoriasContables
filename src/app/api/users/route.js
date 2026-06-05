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

        const requiredFields = ['email', 'username', 'password', 'name', 'lastname']
        for (const field of requiredFields) {
            if (!data[field] || String(data[field]).trim() === '') {
                return NextResponse.json({ error: `El campo ${field} es requerido` }, { status: 400 })
            }
        }

        if (String(data.password).length < 8) {
            return NextResponse.json({ error: 'La contraseña debe tener al menos 8 caracteres' }, { status: 400 })
        }

        const existingEmail = await prisma.users.findUnique({ where: { email: data.email } })
        if (existingEmail) {
            return NextResponse.json({ error: 'El correo ya está registrado' }, { status: 400 })
        }

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

        // Solo campos conocidos para evitar inyección de campos arbitrarios
        const ALLOWED_ROLES = ['TEAM', 'CLIENT']
        const role = ALLOWED_ROLES.includes(data.role) ? data.role : 'TEAM'

        const user = await prisma.users.create({
            data: {
                email: data.email,
                username: data.username,
                name: data.name,
                lastname: data.lastname,
                password: hashedPassword,
                phone: data.phone || null,
                role,
            }
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
        const numericId = parseInt(id)

        // Solo ADMIN puede actualizar a otros usuarios
        if (session.user.role !== 'ADMIN' && parseInt(session.user.id) !== numericId) {
            return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
        }

        // Solo campos editables por perfil para evitar escalada de privilegios
        const allowedFields = ['username', 'name', 'lastname', 'phone', 'email', 'active']
        const safeUpdate = {}
        for (const field of allowedFields) {
            if (updateData[field] !== undefined) safeUpdate[field] = updateData[field]
        }

        if (updateData.password) {
            safeUpdate.password = await bcrypt.hash(updateData.password, 10)
        }

        const updatedUser = await prisma.users.update({
            where: { id: numericId },
            data: safeUpdate
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
