import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const whatsappNumber = '56978505042'; 
  const message = 'Hola Asesorías Valdivia, me gustaría realizar la siguiente consulta...'; // Mensaje predeterminado
  
  return (
    <Link href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`} passHref>
      <p 
        className="fixed bottom-4 right-4 bg-custom-blue text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 flex items-center space-x-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp className='text-2xl'/>
        <span className='hidden xl:block'>Contáctanos vía WhatsApp</span>
      </p>
    </Link>
  );
};

export default WhatsAppButton;