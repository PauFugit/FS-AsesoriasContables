import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function PUT(request, { params }) {
  const id = parseInt(params.id)
  const data = await request.json()
  try {
    let updateData = { ...data };

    // If a new password is provided, hash it
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      updateData.password = hashedPassword;
    } else {
      // If no new password is provided, remove the password field
      delete updateData.password;
    }

    const result = await prisma.users.update({
      where: { id: id },
      data: updateData
    });

    if (!result) {
      return NextResponse.json({ success: false, message: `User with ID ${id} not found` }, { status: 404 });
    }

    // Remove the password from the response
    const { password, ...userWithoutPassword } = result;
    return NextResponse.json({ success: true, data: userWithoutPassword });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}