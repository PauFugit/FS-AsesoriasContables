import React from "react";
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
