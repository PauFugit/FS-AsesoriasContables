import React from 'react'
import Image from 'next/image'
import CotizaForm from '@/components/CotizaForm'
import BannerCierre from '@/components/BannerCierre'

export const metadata = {
  title: 'Cotiza | Asesorías Valdivia',
  description: 'Solicita una cotización para nuestros servicios de asesoría contable, tributaria y laboral.',
};

function Cotiza() {
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
            <h1 className="text-base sm:text-2xl md:text-4xl lg:text-6xl text-custom-green" style={{ letterSpacing: "0.2rem" }}>¿INTERESADO EN NUESTROS SERVICIOS?</h1>
            <div className='flex items-center space-x-3 sm:space-x-4'>
              <h2 className="text-base sm:text-xl md:text-4xl lg:text-6xl py-3 sm:py-4 text-custom-white" style={{ letterSpacing: "0.3rem" }}><i>ESCRÍBENOS</i></h2>
            </div>
          </div>
        </div>
      </div>

    </section>
    <div className="mt-4">
    <h2 className="text-lg md:text-2xl font-bold mb-6 mt-6 text-left p-4 text-custom-blue">
        Para continuar complete el siguiente formulario:
      </h2>
    <CotizaForm/>
    </div>
    <BannerCierre/>
    </div>
  )
}

export default Cotiza