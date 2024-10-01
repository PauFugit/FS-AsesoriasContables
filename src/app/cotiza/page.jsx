import React from 'react'
import Image from 'next/image'
import CotizaForm from '@/components/CotizaForm'
import BannerCierre from '@/components/BannerCierre'

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
        <div className="relative z-10 pt-40 md:pt-80 lg:pt-96">
          <div className='px-6 md:px-10 py-10 bg-custom-blue bg-opacity-50'>
            <h1 className="text-3xl md:text-5xl lg:text-7xl text-custom-green" style={{ letterSpacing: "0.5rem" }}>¿INTERESADO EN NUESTROS SERVICIOS?</h1>
            <div className='flex items-center space-x-4'>
              <h2 className="text-xl md:text-4xl lg:text-6xl py-4 px-2 md:px-4 text-custom-white" style={{ letterSpacing: "0.5rem" }}><i>ESCRÍBENOS</i></h2>
              
            </div>
          </div>
        </div>
      </div>

    </section>
    <div classNamee="mt-4" >
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