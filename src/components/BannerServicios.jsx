import Image from 'next/image';

const BannerServicios = () => {
  return (
    <div className="relative text-white">
      <Image
        src="/BannerServiciosPage.jpg"
        alt="Banner Background"
        fill
        sizes="100vw"
        className="object-cover"
      ></Image>
      <div className="relative z-10 p-6 md:p-16 bg-opacity-50">
        <h1 className="text-5xl md:text-7xl lg:text-8xl mt-20 font-semibold text-custom-green py-10 md:py-20" style={{ letterSpacing: "0.5rem" }}>
          NUESTROS SERVICIOS
        </h1>
        <p className="text-3xl md:text-4xl lg:text-5xl mt-1 py-1">
          ¿Buscas empezar tu emprendimiento?
        </p>
        <p className="text-2xl md:text-3xl lg:text-5xl font-bold mt-1 bg-transparent inline-block px-2 md:px-4 py-2 rounded-lg border-2 md:border-4 border-custom-green">
          estás en el lugar indicado
        </p>
        <p className="pr-20 mt-10 md:mt-20 text-sm md:text-xl lg:text-2xl leading-relaxed">
          En <b>Asesorías Valdivia</b> ofrecemos servicios integrales de asesoría contable, laboral, tributaria y auditoría, 
          diseñados para optimizar la gestión y el cumplimiento normativo de tu negocio. 
          Nuestra experiencia garantiza soluciones personalizadas que mejoran la eficiencia, previenen problemas 
          y proporcionan información clave para la toma de decisiones estratégicas, asegurando así el crecimiento sostenible y la credibilidad de tu empresa.
        </p>
        <div className="mt-6 md:mt-10 text-right font-grotesk">
          <p className="text-lg md:text-2xl font-bold text-custom-green">
            Contáctanos a:
          </p>
          <p className="text-lg md:text-2xl font-bold">
            contacto@asesoriasvaldivia.cl
          </p>
          <p className="text-lg md:text-2xl font-bold">
            o escríbenos al +56978505042
          </p>
        </div>
      </div>
    </div>
  );
}

export default BannerServicios;