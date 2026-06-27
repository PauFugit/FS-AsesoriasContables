import AboutUs from '@/components/AboutUs';
import BannerCierre from '@/components/BannerCierre';
import ClientCarousel from '@/components/ClientCarousel';
import Valores from '@/components/Valores';
import React from 'react'

export const metadata = {
  title: 'Quiénes Somos',
  description: 'Conoce al equipo de Asesorías Valdivia: profesionales comprometidos con la excelencia en asesoría contable, tributaria y laboral en Antofagasta, Chile.',
  alternates: { canonical: '/nosotros' },
  openGraph: {
    title: 'Quiénes Somos | Asesorías Valdivia',
    description: 'Profesionales comprometidos con la excelencia en asesoría contable, tributaria y laboral en Antofagasta, Chile.',
    url: '/nosotros',
  },
};

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