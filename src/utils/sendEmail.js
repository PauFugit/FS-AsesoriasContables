import { Resend } from 'resend';

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY no está configurada');
  return new Resend(apiKey);
}

export async function sendEmail(to, from, subject, text, html) {
  const resend = getResend();

  await resend.emails.send({
    from,
    to,
    subject,
    text,
    html,
  });

  return true;
}

export async function sendPasswordResetEmail(to, resetUrl) {
  const from = process.env.EMAIL_FROM;
  if (!from) throw new Error('EMAIL_FROM no está configurada');

  const subject = 'Solicitud de restablecimiento de contraseña';
  const text = `Solicitaste el restablecimiento de tu contraseña. Haz click en el siguiente enlace: ${resetUrl}`;
  const html = `
    <p>Solicitaste el restablecimiento de tu contraseña.</p>
    <p><a href="${resetUrl}">Restablecer contraseña</a></p>
    <p>Si no solicitaste esto, ignora este correo. El enlace expira en 1 hora.</p>
  `;

  return sendEmail(to, from, subject, text, html);
}
