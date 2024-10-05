import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request) {
    try {
        console.log("Received registration request");
        const formData = await request.formData()
        console.log("Parsed request data:", formData);

        // Input validation
        const requiredFields = ['email', 'username', 'password', 'name', 'lastname', 'phone'];
        for (const field of requiredFields) {
            if (!formData.get(field)) {
                return NextResponse.json({ message: `${field} es requerido` }, { status: 400 })
            }
        }

        // Check if email exists
        const userFound = await prisma.users.findUnique({
            where: { email: formData.get('email') }
        })
        if (userFound) {
            return NextResponse.json({ message: "El correo ya existe" }, { status: 400 })
        }

        // Check if username exists
        const usernameFound = await prisma.users.findUnique({
            where: { username: formData.get('username') }
        })
        if (usernameFound) {
            return NextResponse.json({ message: "El nombre de usuario ya está registrado" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(formData.get('password'), 10);

        let imagePath = null;
        const image = formData.get('image');
        if (image) {
            const buffer = Buffer.from(await image.arrayBuffer());
            const filename = Date.now() + '-' + image.name.replace(/\s/g, '_');
            const publicPath = path.join(process.cwd(), 'public', 'uploads');
            await writeFile(path.join(publicPath, filename), buffer);
            imagePath = `/uploads/${filename}`;
        }

        console.log("Creating new user");
        const newUser = await prisma.users.create({
            data: {
                username: formData.get('username'),
                email: formData.get('email'),
                name: formData.get('name'),
                lastname: formData.get('lastname'),
                password: hashedPassword,
                phone: formData.get('phone'),
                role: formData.get('role'),
                image: imagePath,
            }
        })
        console.log("User created successfully");

        const { password: _, ...user } = newUser

        return NextResponse.json(user);

    } catch (error) {
        console.error("Error in registration:", error);
        return NextResponse.json({
            message: error.message || "An unexpected error occurred",
        }, {
            status: 500,
        });
    }
}