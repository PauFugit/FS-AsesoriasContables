import Image from "next/image"
import Link from "next/link"

export default function BannerClientes() {
  return (
    <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      <Image
        src="/bannerclientescontacto.jpg"
        alt="Background image of hands typing on a laptop"
        layout="fill"
        objectFit="cover"
        className=""
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-sm p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            ¿YA ERES CLIENTE?
          </h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Link href="/solicitude">
              <button className="px-4 py-2 bg-custom-green text-custom-blue rounded-full text-sm sm:text-base hover:bg-custom-blue hover:text-custom-white transition-colors">
                Solicita tu usuario
              </button>
            </Link>
            <Link href="/auth/login">
              <button className="px-4 py-2 bg-custom-white text-custom-blue rounded-full text-sm sm:text-base hover:bg-custom-blue hover:text-custom-green transition-colors">
                Accede al panel de usuario
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}