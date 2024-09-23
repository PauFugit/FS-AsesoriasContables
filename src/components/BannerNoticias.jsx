import Image from "next/image"
import Link from "next/link"

export default function BannerClientes() {
  return (
    <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      <Image
        src="/bannernoticias.jpg"
        alt="Background image of hands typing on a laptop"
        layout="fill"
        objectFit="cover"
        className=""
      />
      <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex flex-col  items-left justify-between space-y-4 sm:space-y-0">
          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-custom-green py-4">
            NOTICIAS
          </h2>
          <p className="text-custom-white text-sm sm:text-md md:text-lg lg:text-xl pb-6">Aquí podrás encontrar novedades para ti y tu empresa o emprendimiento.</p>

          
        </div>
      </div>
    </div>
  )
}