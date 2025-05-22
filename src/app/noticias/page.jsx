import React from 'react'
import NoticesSection from '@/components/NoticesSections'
import BannerNoticias from '@/components/BannerNoticias'
import RRSSNewsSection from '@/components/RRSSNewsSection'

function Noticias() {
  return (
    <div style={{backgroundImage: "url('/fondodegradado.png')", backgroundSize: "cover" }}>
      <BannerNoticias/>
     {/* <RRSSNewsSection/>*/}
      <NoticesSection/>
    </div>
  )
}

export default Noticias