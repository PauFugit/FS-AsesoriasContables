import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
  console.log('Test SendGrid API Route started');
  if (req.method === 'GET') {
    try {
      console.log('Setting up SendGrid...');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      console.log('API Key set. Key starts with:', process.env.SENDGRID_API_KEY.substring(0, 5));

      const msg = {
        to: 'contacto@asesoriasvaldivia.cl', // Replace with your email
        from: 'contacto@asesoriasvaldivia.cl', // Replace with your verified sender
        subject: 'SendGrid Test from Vercel',
        text: 'If you receive this, SendGrid is working correctly!',
      };

      console.log('Attempting to send test email...');
      const result = await sgMail.send(msg);
      console.log('SendGrid test email sent successfully:', result);
      res.status(200).json({ success: true, message: 'Test email sent successfully' });
    } catch (error) {
      console.error('SendGrid Error:', error);
      if (error.response) {
        console.error(error.response.body);
      }
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}