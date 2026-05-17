import BannerEstatico from '@/components/BannerEstatico';
import BannerServicios from '@/components/BannerServicios';
import ServicesCards from '@/components/ServicesCards';
import React from 'react'

export const metadata = {
  title: 'Servicios | Asesorías Valdivia',
  description: 'Conoce todos nuestros servicios de asesoría contable, tributaria, laboral y más.',
};

function Services() {
  return (
    <div style={{ backgroundImage: "url('/fondodegradado.png')", backgroundSize: "cover" }}>
      <BannerServicios/>
      <ServicesCards/>
      <BannerEstatico/>
    </div>
  )
}

export default Services;