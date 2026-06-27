import React from 'react'
import NoticesSection from '@/components/NoticesSections'
import BannerNoticias from '@/components/BannerNoticias'
import RRSSNewsSection from '@/components/RRSSNewsSection'

export const metadata = {
  title: 'Noticias',
  description: 'Mantente informado con las últimas noticias contables, tributarias y laborales de Asesorías Valdivia.',
  alternates: { canonical: '/noticias' },
  openGraph: {
    title: 'Noticias | Asesorías Valdivia',
    description: 'Últimas noticias contables, tributarias y laborales.',
    url: '/noticias',
  },
};

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