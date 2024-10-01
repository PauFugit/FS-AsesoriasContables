import BannerEstatico from '@/components/BannerEstatico';
import BannerServicios from '@/components/BannerServicios';
import ServicesCards from '@/components/ServicesCards';
import React from 'react'

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