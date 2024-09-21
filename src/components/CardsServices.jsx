'use client'
import Card from '@/components/CardServiceHome';
import Link from 'next/link';
import Image from 'next/image';

export default function CardsServices() {
  const services = [
    {
      imageSrc: '/cardasesoriascontables.png',
      title: 'Asesorías Contables',
    },
    {
      imageSrc: '/cardasesorialaboral.png',
      title: 'Asesorías Laborales',
    },
    {
      imageSrc: '/cardasesoriatributaria.png',
      title: 'Asesorías Tributarias',
    },
    {
      imageSrc: '/cardauditoria.png',
      title: 'Auditorías',
    },
  ];

  return (
    <div className="p-4 text-custom-blue">
      <div className="flex flex-col md:flex-row items-center justify-between mt-10 p-4">
        <div className="flex-shrink-0 mb-4 md:mb-0">
          <Image
            src="/icononuestrosservicios.png"
            alt="Icono de servicios"
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col text-center md:text-right md:ml-4">
          <h2 className="text-6xl md:text-8xl font-alternative" style={{ letterSpacing: "0.1rem" }}>
            NUESTROS SERVICIOS
          </h2>
          <p className="mt-4 text-xl sm:text-2xl text-right">
            Estos son todos los servicios que tenemos disponibles para ti
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
        {services.map((service, index) => (
          <Card
            key={index}
            imageSrc={service.imageSrc}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex items-center space-x-5 space-y-10">
          <Link href="/cotiza">
            <p
              className="inline-block mt-10 ml-8 text-xl sm:text-3xl bg-custom-green py-2 px-3 rounded-full shadow-lg hover:bg-custom-blue hover:text-custom-white transition duration-300 cursor-pointer"
              style={{ letterSpacing: "0.1rem" }}
            >
              Cotiza aquí
            </p>
          </Link>
          <div className="flex items-center space-x-4">
            <Image
              src="/flechaazulizquierda.png"
              alt="Flecha azul izquierda"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}