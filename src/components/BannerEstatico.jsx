import Image from 'next/image'
import Link from 'next/link';



const BannerEstatico = () => {
    return (
        <div className="bg-center" style={{ backgroundImage: "url('/bannercierredos.jpg')", backgroundSize: "cover" }} >
        <div className="h-64 md:h-80 lg:h-96 flex flex-col justify-center items-center">
            <h1 className="text-3xl md:text-5xl lg:text-8xl font-bold uppercase text-custom-white border-2 md:border-4 border-custom-green rounded-full px-4 md:px-8 lg:px-12 py-2 md:py-4 lg:py-8" style={{ letterSpacing: "0.3rem" }}>
                ASESORÍAS VALDIVIA
            </h1>
        </div>
        </div>
    )
}

export default BannerEstatico;