import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/utils/sendEmail';

export async function POST(req) {
  try {
    const { email } = await req.json();

    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      // Don't reveal that the user doesn't exist
      return NextResponse.json({ message: 'Si la cuenta con el correo existe, se enviará el enlace para resetear la contraseña.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const tokenExpiration = new Date(Date.now() + 3600000); // 1 hour from now

    await prisma.users.update({
      where: { id: user.id },
      data: {
        resetToken: hashedToken,
        resetTokenExpires: tokenExpiration,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;
    
    try {
      await sendPasswordResetEmail(user.email, resetUrl);
      return NextResponse.json({ message: 'Si la cuenta con el correo existe, se enviará el enlace para resetear la contraseña.' });
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
      // Revert the token update in the database
      await prisma.users.update({
        where: { id: user.id },
        data: {
          resetToken: null,
          resetTokenExpires: null,
        },
      });
      return NextResponse.json({ error: 'Ha ocurrido un error al enviar el email de recuperación. Por favor, inténtalo de nuevo más tarde.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Password reset request error:', error);
    return NextResponse.json({ error: 'Ha ocurrido un error procesando tu solicitud.' }, { status: 500 });
  }
}