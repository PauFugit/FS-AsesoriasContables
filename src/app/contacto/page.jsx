
import React from 'react'
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import BannerClientes from '@/components/BannerClientes';
import BannerCierre from '@/components/BannerCierre';
import BannerEstatico from '@/components/BannerEstatico';

export const metadata = {
  title: 'Contacto | Asesorías Valdivia',
  description: 'Contáctanos para resolver tus dudas sobre nuestros servicios de asesoría contable y tributaria.',
};

function Contacto() {
  return (
    <div style={{backgroundImage: "url('/fondodegradado.png')", backgroundSize: "cover" }}>
    <section>

      <div className="relative text-white">
        <Image
          src="/bannerescribennos.png"
          alt="Banner Background"
          fill
          sizes="100vw"
          className="object-cover"
        ></Image>
        <div className="relative z-10 pt-20 sm:pt-32 md:pt-56 lg:pt-80">
          <div className='px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 bg-custom-blue bg-opacity-50'>
            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-7xl text-custom-white" style={{ letterSpacing: "0.3rem" }}>¿TIENES DUDAS?</h1>
            <div className='flex items-center space-x-3 sm:space-x-4'>
              <h2 className="text-base sm:text-xl md:text-4xl lg:text-6xl py-3 sm:py-4 text-custom-white" style={{ letterSpacing: "0.3rem" }}><i>ESCRÍBENOS</i></h2>
              <Image
                src="/iconoescribenos.png"
                alt="Icono escríbennos"
                width={50}
                height={50}
                className="w-8 h-8 sm:w-12 sm:h-12 md:w-20 md:h-20 lg:w-24 lg:h-24"
              ></Image>
            </div>
          </div>
        </div>
      </div>

    </section>
    <div className="mt-4">
    <h2 className="text-lg md:text-2xl font-bold mb-6 mt-6 text-left p-4 text-custom-blue">
        Para continuar complete el siguiente formulario:
      </h2>
    <ContactForm/>
    </div>
    <BannerClientes/>
    </div>

  )
}

export default Contacto;