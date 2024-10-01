import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    // Hash the token from the URL
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with the hashed token and check if the token is still valid
    const user = await prisma.users.findFirst({
      where: {
        resetToken: hashedToken,
        resetTokenExpires: { gt: new Date() },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password and clear reset token fields
    await prisma.users.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    return NextResponse.json({ message: 'Tu contraseña ha sido reseteada correctamente.' });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json({ error: 'Ha ocurrido un error al resetear tu contraseña' }, { status: 500 });
  }
}