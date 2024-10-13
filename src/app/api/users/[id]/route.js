import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function GET(request, { params }) {
    const id = parseInt(params.id)
    try {
        const user = await prisma.users.findUnique({
            where: { id: id },
        });
        if (!user) {
            return new NextResponse(`Usuario con la ID ${id} no ha sido encontrado`, { status: 404 })
        }
        return NextResponse.json(user)
    } catch (error) {
        console.error('Error fetching user:', error)
        return NextResponse.json({ error: 'Error fetching user' }, { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    const id = parseInt(params.id)
    try {
        const result = await prisma.users.delete({
            where: { id: id },
        })
        return NextResponse.json({ message: 'Usuario eliminado con éxito', result }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const id = parseInt(params.id)
    const data = await request.json()
    try {
        let updateData = {...data };
        // hashed new password
        if(data.password){
            const hashedPassword = await bcrypt.hash(data.password, 10);
            updateData.password = hashedPassword;
        } else {
            // remove password if no new is provided
            delete updateData.password;
        }
        const result = await prisma.users.update({
            where: { id: id },
            data: updateData
        });
        if (!result) {
            return new NextResponse(`Usuario con la ID ${id} no ha sido encontrado`, { status: 404 });
        }

        // remove password from response
        const {password, ...userWithoutPassword} = result;
        return NextResponse.json(userWithoutPassword);
    }catch(error){
        console.log('Error actualizando usuario:', error);
        return new NextResponse(error.message, {status:500})
    }
}