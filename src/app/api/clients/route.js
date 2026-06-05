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

        // Validar campos requeridos
        const requiredFields = ['email', 'username', 'password', 'name', 'lastname']
        for (const field of requiredFields) {
            if (!data[field] || String(data[field]).trim() === '') {
                return NextResponse.json({ error: `El campo ${field} es requerido` }, { status: 400 })
            }
        }

        if (String(data.password).length < 8) {
            return NextResponse.json({ error: 'La contraseña debe tener al menos 8 caracteres' }, { status: 400 })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(data.email)) {
            return NextResponse.json({ error: 'El correo electrónico no es válido' }, { status: 400 })
        }

        const existingEmail = await prisma.users.findUnique({ where: { email: String(data.email).trim().toLowerCase() } })
        if (existingEmail) {
            return NextResponse.json({ error: 'El correo ya está registrado' }, { status: 400 })
        }

        const existingUsername = await prisma.users.findUnique({ where: { username: String(data.username).trim() } })
        if (existingUsername) {
            return NextResponse.json({ error: 'El nombre de usuario ya está registrado' }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(String(data.password), 10)

        // Solo se permiten campos conocidos para evitar inyección de campos arbitrarios
        const { password, ...clientWithoutPassword } = await prisma.users.create({
            data: {
                email: String(data.email).trim().toLowerCase(),
                username: String(data.username).trim(),
                name: String(data.name).trim(),
                lastname: String(data.lastname).trim(),
                password: hashedPassword,
                phone: data.phone ? String(data.phone).trim() : null,
                company: data.company ? String(data.company).trim() : null,
                companyEmail: data.companyEmail ? String(data.companyEmail).trim() : null,
                companyPhone: data.companyPhone ? String(data.companyPhone).trim() : null,
                companyRUT: data.companyRUT ? String(data.companyRUT).trim() : null,
                driveURL: data.driveURL ? String(data.driveURL).trim() : null,
                role: 'CLIENT',
            }
        })

        return NextResponse.json(clientWithoutPassword, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Error al crear cliente' }, { status: 500 })
    }
}
