import AboutUs from '@/components/AboutUs';
import BannerCierre from '@/components/BannerCierre';
import ClientCarousel from '@/components/ClientCarousel';
import Valores from '@/components/Valores';
import React from 'react'

function Nosotros() {
  return (
    <div style={{backgroundImage: "url('/fondodegradado.png')", backgroundSize: "cover" }}>
      <AboutUs/>
      <Valores/>
      <ClientCarousel/>
      <BannerCierre/>
    </div>
  )
}

export default Nosotros;