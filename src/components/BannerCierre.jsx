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
    <div className="h-64 md:h-80 lg:h-96 flex flex-col justify-center items-center" style={{ backgroundImage: "url('/bannerextrados.jpg')", backgroundSize: "cover" }}
>
      <h1 className="text-2xl md:text-5xl lg:text-8xl uppercase border-2 md:border-4 border-custom-green rounded-full px-8 md:px-12 lg:px-20 text-custom-white" style={{ letterSpacing: "0.2rem" }}>
        ASESORÍAS VALDIVIA
      </h1>
      <p className="text-sm md:text-2xl lg:text-3xl font-semibold mt-2 text-custom-white shadow-custom-green">
        {text} <Cursor cursorBlinking cursorStyle="|" cursorColor="#ffaa17" />
      </p>
    </div>
  );
};

export default BannerCierre;