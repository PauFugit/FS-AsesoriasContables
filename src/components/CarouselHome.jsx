'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const slides = [
    {
        title: 'ASESÓRATE,',
        subtitle: 'FÓRMATE',
        action: 'CRECE.',
        description: 'Maximiza tu eficiencia y rentabilidad con nuestra asesoría contable y tributaria potenciada por estrategias digitales.',
        buttonText: 'Contáctanos',
        image: '/Carouselimageone.jpg',
        href: '/contacto',
    },
    {
        title: 'INNOVA,',
        subtitle: 'APRENDE,',
        action: 'TRIUNFA.',
        description: 'Transformamos tus datos en decisiones rentables con nuestra expertise en marketing digital y asesoría contable.',
        buttonText: 'Saber más',
        image: '/Carouselimagetwo.jpg',
        href: '/contacto',
    },
    {
        title: 'DESCUBRE,',
        subtitle: 'ANALIZA',
        action: 'CRECE.',
        description: 'Desata el potencial de tu negocio con nuestro enfoque digital en asesoría contable y tributaria.',
        buttonText: 'Cotiza Ahora',
        image: '/Carouselimagethree.jpg',
        href: '/contacto',
    },
]

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <Image
                        src={slide.image}
                        alt={`Slide ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className=""
                    />
                    <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24">
                        <h2 className="text-5xl sm:text-5xl md:text-7xl font-bold text-white mb-2">
                            {slide.title}
                        </h2>
                        <h3 className="text-5xl sm:text-5xl md:text-7xl font-bold text-custom-green mb-2">
                            {slide.subtitle}
                        </h3>
                        <h2 className="text-5xl sm:text-5xl md:text-7xl font-bold text-white mb-4">
                            {slide.action}
                        </h2>
                        <p className="text-white text-md sm:text-lg md:text-2xl mb-6 max-w-2xl">
                            {slide.description}
                        </p>

                        <div className="flex items-center">
                            <Image
                                src="/flechaverdederecha.png"
                                width={100}
                                height={100}
                                alt="Arrow"
                                className="mr-2"
                            />
                            <Link href={slide.href}>
                                <button className="bg-custom-green text-white px-4 py-2 rounded-full text-lg sm:text-2xl font-semibold inline-flex items-center transition-all duration-300 ease-in-out hover:bg-white hover:text-custom-green">
                                    {slide.buttonText}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
            <button
                onClick={prevSlide}
                className="hidden absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none hover:bg-opacity-75 transition-all duration-300"
            >
                <svg
                    className="w-6 h-6 text-custom-blue "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 rounded-full p-2 focus:outline-none transition-all duration-300"
            >
                <Image
                    src="/flechaverdederecha.png"
                    width={200}
                    height={200}
                    alt="Next slide"
                />
            </button>
        </div>
    )
}