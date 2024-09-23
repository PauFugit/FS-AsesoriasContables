import Link from 'next/link';
import Image from 'next/image';

export default function BlogSection() {
  return (
    <div className="p-10 xl:p-20">
  <div className="flex flex-col md:flex-row items-center justify-between font-grotesk text-custom-blue">
    <div className="flex flex-col md:space-y-12">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-12">
        <Link href="/noticias" className="hover:bg-custom-green hover:text-custom-blue rounded-full">
          <span className="flex items-center px-8 py-2 bg-transparent rounded-full shadow-lg hover:shadow-xl">
            <Image src="/iconoblog.png" width={150} height={150} alt="Blog" ></Image>
            <div className="ml-4 mini:hidden xs:block">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold sm:font-normal">BLOG</h2>
              <p className="text-xs md:text-base">Datos y noticias para impulsar tu <br /> negocio y marca personal</p>
            </div>
          </span>
        </Link>
        <Link href="/servicios" className="hover:bg-custom-green hover:text-custom-blue rounded-full">
          <span className="flex items-center px-8 py-2 bg-transparent rounded-full shadow-lg hover:shadow-xl">
            <Image src="/iconoasesorias.png" width={150} height={150} alt="Asesorías" ></Image>
            <div className="ml-4 mini:hidden xs:block">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold sm:font-normal">ASESORÍAS</h2>
              <p className=" text-xs md:text-base">personalizadas y confidenciales</p>
            </div>
          </span>
        </Link>
      </div>
      <Link href="/cotiza" className="hover:bg-custom-green hover:text-custom-blue rounded-full">
        <span className="flex items-center px-8 py-4 bg-transparent rounded-full shadow-lg hover:shadow-xl">
          <Image src="/iconoescribenos.png" width={150} height={150} alt="Servicios" ></Image>
          <div className="ml-4 mini:hidden xs:block">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold sm:font-normal">COTIZA NUESTROS <br /> SERVICIOS</h2>
            <p className="text-xs md:text-base">Asesorías Valdivia cuenta con una serie de servicios que pueden ayudarte a llevar tu negocio al éxito</p>
          </div>
        </span>
      </Link>
      <div className="block xl:hidden mt-4">
        <Image src="/flechagranderesponsiva.png" width={300} height={300} alt="Imagen" ></Image>
      </div>
    </div>
    <div className="hidden xl:block flex-shrink-0">
      <Image src="/iconoflechagrande.png" width={400} height={400} alt="Imagen" ></Image>
    </div>
  </div>
</div>

  );
};