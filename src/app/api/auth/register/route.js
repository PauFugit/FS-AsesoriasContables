import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import prisma from "@/lib/prisma"
import { put } from "@vercel/blob"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const ALLOWED_ROLES = ['TEAM', 'CLIENT']

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Acceso denegado' }, { status: 403 })
  }

  try {
    const formData = await request.formData()

    const requiredFields = ["email", "username", "password", "name", "lastname", "phone"]
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        return NextResponse.json({ message: `${field} es requerido` }, { status: 400 })
      }
    }

    // Validar que el rol sea permitido y nunca ADMIN desde este endpoint
    const role = formData.get("role")
    if (!role || !ALLOWED_ROLES.includes(role)) {
      return NextResponse.json(
        { message: `Rol inválido. Los valores permitidos son: ${ALLOWED_ROLES.join(', ')}` },
        { status: 400 }
      )
    }

    const userFound = await prisma.users.findUnique({ where: { email: formData.get("email") } })
    if (userFound) {
      return NextResponse.json({ message: "El correo ya existe" }, { status: 400 })
    }

    const usernameFound = await prisma.users.findUnique({ where: { username: formData.get("username") } })
    if (usernameFound) {
      return NextResponse.json({ message: "El nombre de usuario ya está registrado" }, { status: 400 })
    }

    const rawPassword = formData.get("password")
    if (rawPassword.length < 8) {
      return NextResponse.json({ message: 'La contraseña debe tener al menos 8 caracteres' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(rawPassword, 10)

    let imageUrl = null
    const image = formData.get("image")
    if (image && image.size > 0) {
      const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
      if (!ALLOWED_TYPES.includes(image.type)) {
        return NextResponse.json({ message: 'Tipo de imagen no permitido. Use JPG, PNG, WEBP o GIF.' }, { status: 400 })
      }
      if (image.size > MAX_SIZE) {
        return NextResponse.json({ message: 'La imagen no puede superar los 5 MB.' }, { status: 400 })
      }
      const filename = `${Date.now()}-${image.name.replace(/\s/g, "_")}`
      const { url } = await put(filename, image, { access: "public" })
      imageUrl = url
    }

    const newUser = await prisma.users.create({
      data: {
        username: formData.get("username"),
        email: formData.get("email"),
        name: formData.get("name"),
        lastname: formData.get("lastname"),
        password: hashedPassword,
        phone: formData.get("phone"),
        role: role,
        image: imageUrl,
        company: formData.get("company") || null,
        driveURL: formData.get("driveURL") || null,
      }
    })

    const { password: _, ...user } = newUser
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { message: "Ha ocurrido un error en el registro. Por favor inténtalo nuevamente." },
      { status: 500 }
    )
  }
}
