import React from "react";

export const metadata = {
  title: "Asesorías Valdivia — Contabilidad, Tributaria y Laboral en Antofagasta",
  description: "Expertos en asesoría contable, tributaria, laboral y auditorías en Antofagasta, Chile. Confíe su empresa a profesionales con experiencia.",
  alternates: { canonical: '/' },
  openGraph: {
    title: "Asesorías Valdivia — Contabilidad, Tributaria y Laboral en Antofagasta",
    description: "Expertos en asesoría contable, tributaria, laboral y auditorías en Antofagasta, Chile.",
    url: '/',
  },
};

import CarouselHome from "@/components/CarouselHome";
import BlogSection from "@/components/BlogSection";
import CardsServices from "@/components/CardsServices";
import BannerEstatico from "@/components/BannerEstatico";
import WhatsAppButton from "@/components/WhatsAppButton";
import ClientCarousel from "@/components/ClientCarousel";

function HomePage() {
  return (
    
    <div style={{backgroundImage: "url('/fondodegradado.png')", backgroundSize: "cover" }}>
      
    <CarouselHome/>
    <CardsServices/>
    <BlogSection/>
    <ClientCarousel/>
    <BannerEstatico/>
    <WhatsAppButton/>
  </div>  
  
  );
}

export default HomePage;
