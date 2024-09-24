import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Log the API key (first few characters) for debugging
      console.log('API Key starts with:', process.env.SENDGRID_API_KEY.substring(0, 5));
      
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: 'your-email@example.com', // Replace with your email
        from: 'contacto@asesoriasvaldivia.cl', // Replace with your verified sender
        subject: 'SendGrid Test from Vercel',
        text: 'If you receive this, SendGrid is working correctly!',
      };

      await sgMail.send(msg);
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