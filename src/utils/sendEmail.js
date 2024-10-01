import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail(to, from, subject, text, html) {
  const msg = {
    to,
    from,
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error(error.response.body);
    }
    return false;
  }
}

export async function sendPasswordResetEmail(to, resetUrl) {
  const from = process.env.EMAIL_FROM;
  const subject = 'Password Reset Request';
  const text = `Solicitaste el reestablecimiento de tu contraseña. Haz click en el siguiente enlace para reestablecer tu contraseña: ${resetUrl}`;
  const html = `
    <p>Solicitaste el reestablecimiento de tu contraseña. Haz click en el siguiente enlace para reestablecer tu contraseña:</p>
    <a href="${resetUrl}">Reestablecer contraseña</a>
    <p>Si tu no solicitaste esto, por favor ignora este correo.</p>
  `;

  return sendEmail(to, from, subject, text, html);
}