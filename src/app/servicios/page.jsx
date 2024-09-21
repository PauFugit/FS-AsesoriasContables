import BannerEstatico from '@/components/BannerEstatico';
import BannerServicios from '@/components/BannerServicios';
import ServicesSection from '@/components/ServicesSection';
import React from 'react'

function Services() {
  return (
    <div>
      <BannerServicios/>
      <ServicesSection/>
      <BannerEstatico/>
    </div>
  )
}

export default Services;