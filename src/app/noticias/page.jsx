import React from 'react'
import NoticesSection from '@/components/NoticesSections'
import BannerNoticias from '@/components/BannerNoticias'

function Noticias() {
  return (
    <div style={{paddingTop:"7rem", backgroundImage: "url('/fondodegradado.png')", backgroundSize: "cover" }}>
      <BannerNoticias/>
      <NoticesSection/>
    </div>
  )
}

export default Noticias