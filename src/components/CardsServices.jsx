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
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-alternative" style={{ letterSpacing: "0.1rem" }}>
            NUESTROS SERVICIOS
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-xl lg:text-2xl text-center md:text-right">
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
        <div className="flex items-center space-x-3 sm:space-x-5">
          <Link href="/cotiza">
            <p
              className="inline-block mt-6 ml-4 sm:mt-10 sm:ml-8 text-sm sm:text-base md:text-xl text-white bg-custom-blue py-2 px-3 rounded-full shadow-lg hover:bg-custom-white hover:text-custom-blue transition duration-300 cursor-pointer"
              style={{ letterSpacing: "0.1rem" }}
            >
              Cotiza aquí
            </p>
          </Link>
          <div className="flex items-center mt-6 sm:mt-10">
            <Image
              src="/flechaazulizquierda.png"
              alt="Flecha azul izquierda"
              width={100}
              height={100}
              className="w-12 sm:w-16 md:w-24 lg:w-28 h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}