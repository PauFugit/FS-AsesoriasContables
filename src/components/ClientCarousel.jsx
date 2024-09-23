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
    const [visibleClients, setVisibleClients] = useState(5)

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + clients.length) % clients.length)
    }

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide()
        }, 5000) // changes every 5 seconds

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setVisibleClients(1)
            } else if (window.innerWidth < 768) {
                setVisibleClients(2)
            } else if (window.innerWidth < 1024) {
                setVisibleClients(3)
            } else {
                setVisibleClients(5)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="w-full mx-auto px-4 py-8 md:py-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-custom-blue py-4 md:py-8 mb-4 md:mb-8 text-left" style={{ letterSpacing: "0.1rem" }}>
                NUESTROS CLIENTES
            </h2>
            <div className="relative my-4 md:my-8 py-5 md:py-10">
                <div className="flex justify-center items-center space-x-4 md:space-x-8 lg:space-x-12 mt-4">
                    {[...Array(visibleClients)].map((_, index) => {
                        const clientIndex = (currentIndex + index) % clients.length
                        return (
                            <div key={index} className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 relative">
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
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full p-2"
                    aria-label="Previous slide"
                >
                    <Image
                        src="/flechaazulizquierda.png" 
                        width={40} 
                        height={40}
                        className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                        alt="Previous"
                    />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full p-2"
                    aria-label="Next slide"
                >
                    <Image
                        src="/flechaazulderecha.png" 
                        width={40} 
                        height={40}
                        className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                        alt="Next"
                    />
                </button>
            </div>
        </div>
    )
}