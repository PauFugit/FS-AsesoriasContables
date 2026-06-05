'use client'
import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const BannerCierre = () => {
  const [text] = useTypewriter({
    words: [
      "ASESÓRATE",
      "FÓRMATE",
      "CRECE",
    ],
    loop: true,
    typeSpeed: 30,
    deleteSpeed: 10,
    delaySpeed: 2000,
  });

  return (
    <div className="h-40 sm:h-56 md:h-80 lg:h-96 flex flex-col justify-center items-center px-4" style={{ backgroundImage: "url('/bannerextrados.jpg')", backgroundSize: "cover" }}>
      <h1 className="text-lg sm:text-2xl md:text-5xl lg:text-7xl uppercase border-2 md:border-4 border-custom-white rounded-full px-4 sm:px-8 md:px-14 lg:px-20 py-1 sm:py-2 text-custom-white text-center" style={{ letterSpacing: "0.2rem" }}>
        ASESORÍAS VALDIVIA
      </h1>
      <p className="text-xs sm:text-sm md:text-2xl lg:text-3xl font-semibold mt-2 text-custom-white">
        {text} <Cursor cursorBlinking cursorStyle="|" cursorColor="#ffaa17" />
      </p>
    </div>
  );
};

export default BannerCierre;