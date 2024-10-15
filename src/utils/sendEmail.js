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
    const [response] = await sgMail.send(msg);
    console.log('Email sent successfully', {
      statusCode: response.statusCode,
      headers: response.headers,
      to: to,
      subject: subject
    });
    return true;
  } catch (error) {
    console.error('Error sending email:', error.message);
    if (error.response) {
      console.error('SendGrid API response error:', {
        body: error.response.body,
        statusCode: error.response.statusCode,
        headers: error.response.headers,
      });
    }
    throw error; // Re-throw the error so it can be handled by the caller
  }
}

export async function sendPasswordResetEmail(to, resetUrl) {
  const from = process.env.EMAIL_FROM;
  if (!from) {
    throw new Error('EMAIL_FROM environment variable is not set');
  }

  const subject = 'Password Reset Request';
  const text = `Solicitaste el reestablecimiento de tu contraseña. Haz click en el siguiente enlace para reestablecer tu contraseña: ${resetUrl}`;
  const html = `
    <p>Solicitaste el reestablecimiento de tu contraseña. Haz click en el siguiente enlace para reestablecer tu contraseña:</p>
    <a href="${resetUrl}">Reestablecer contraseña</a>
    <p>Si tu no solicitaste esto, por favor ignora este correo.</p>
  `;

  try {
    const result = await sendEmail(to, from, subject, text, html);
    console.log('Password reset email sent successfully', { to: to });
    return result;
  } catch (error) {
    console.error('Failed to send password reset email', { to: to, error: error.message });
    throw error; // Re-throw the error so it can be handled by the caller
  }
}