import Image from 'next/image'
import Link from 'next/link';



const BannerEstatico = () => {
    return (
        <div className="bg-center" style={{ backgroundImage: "url('/bannercierredos.jpg')", backgroundSize: "cover" }} >
        <div className="h-40 sm:h-56 md:h-80 lg:h-96 flex flex-col justify-center items-center px-4">
            <h1 className="text-lg sm:text-3xl md:text-5xl lg:text-8xl font-bold uppercase text-custom-white border-2 rounded-full px-3 sm:px-6 md:px-10 lg:px-14 py-2 md:py-4 lg:py-8 text-center" style={{ letterSpacing: "0.2rem" }}>
                ASESORÍAS VALDIVIA
            </h1>
        </div>
        </div>
    )
}

export default BannerEstatico;