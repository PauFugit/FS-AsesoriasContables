'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// client logos 
const clients = [
    { src: '/client1.png', alt: 'Client 1' },
    { src: '/client2.png', alt: 'Client 2' },
    { src: '/client3.png', alt: 'Client 3' },
    { src: '/client4.png', alt: 'Client 4' },
    { src: '/client5.png', alt: 'Client 5' },
    { src: '/client6.png', alt: 'Client 6' },
    { src: '/client7.png', alt: 'Client 7' },
    { src: '/client8.png', alt: 'Client 8' },
    { src: '/client9.png', alt: 'Client 9' },
    { src: '/client10.png', alt: 'Client 10' },
    { src: '/client11.png', alt: 'Client 11' },
    { src: '/client12.png', alt: 'Client 12' },
    { src: '/client13.png', alt: 'Client 13' },
    { src: '/client14.png', alt: 'Client 14' },
    { src: '/client15.png', alt: 'Client 15' },
    { src: '/client16.png', alt: 'Client 16' },
    { src: '/client17.png', alt: 'Client 17' },
    { src: '/client18.png', alt: 'Client 18' },
    { src: '/client19.png', alt: 'Client 19' },
    { src: '/client20.png', alt: 'Client 20' },
    { src: '/client21.png', alt: 'Client 21' },
    { src: '/client22.png', alt: 'Client 22' },
    { src: '/client23.png', alt: 'Client 23' },
    { src: '/client24.png', alt: 'Client 24' },
    { src: '/client25.png', alt: 'Client 25' },
    { src: '/client26.png', alt: 'Client 26' },
    { src: '/client27.png', alt: 'Client 27' },
    { src: '/client28.png', alt: 'Client 28' },
    { src: '/client29.png', alt: 'Client 29' },
    { src: '/client30.png', alt: 'Client 30' },
    { src: '/client31.png', alt: 'Client 31' },
];


export default function ClientCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + clients.length) % clients.length)
    }

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide()
        }, 5000) // cambia cada 5 seg

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="w-full mx-auto px-4 py-16">
            <h2 className="text-6xl md:text-8xl text-custom-blue py-8 mb-8" style={{ letterSpacing: "0.1rem" }}>
                NUESTROS CLIENTES </h2>
            <div className="relative my-8 py-10">
                <div className="flex justify-center items-center space-x-12 mt-4">
                    {[...Array(5)].map((_, index) => {
                        const clientIndex = (currentIndex + index) % clients.length
                        return (
                            <div key={index} className="w-48 h-48 relative">
                                <Image
                                    src={clients[clientIndex].src}
                                    alt={clients[clientIndex].alt}
                                    layout="fill"
                                    objectFit="contain"
                                    className="rounded-full"
                                />
                            </div>
                        )
                    })}
                </div>
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2  rounded-full p-2 "
                    aria-label="Previous slide"
                >
                    <Image
                        src="/flechaazulizquierda.png" width={100} height={100}
                    />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2  rounded-full p-2 "
                    aria-label="Next slide"
                >
                    <Image
                        src="/flechaazulderecha.png" width={100} height={100}
                    />
                </button>
            </div>
        </div>
    )
}