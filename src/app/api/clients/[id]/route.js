import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(request, { params }) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    if (session.user.role !== 'ADMIN' && session.user.role !== 'TEAM') {
        return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }
    const id = parseInt(params.id);

    try {
        const client = await prisma.users.findUnique({
            where: { id: id },
            select: {
                id: true,
                name: true,
                lastname: true,
                email: true,
                role: true,
                company: true,
                companyEmail: true,
                companyPhone: true,
                companyRUT: true,
                driveURL: true
            }
        });

        if (!client || client.role !== 'CLIENT') {
            return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 });
        }

        return NextResponse.json(client);
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener cliente' }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    if (session.user.role !== 'ADMIN' && session.user.role !== 'TEAM') {
        return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }
    const id = parseInt(params.id);

    try {
        const { driveURL } = await request.json();

        const updatedClient = await prisma.users.update({
            where: { id: id },
            data: { driveURL },
            select: {
                id: true,
                name: true,
                lastname: true,
                email: true,
                company: true,
                companyEmail: true,
                companyPhone: true,
                companyRUT: true,
                driveURL: true
            }
        });

        return NextResponse.json(updatedClient);
    } catch (error) {
        return NextResponse.json({ error: 'Error al actualizar cliente' }, { status: 500 });
    }
}
