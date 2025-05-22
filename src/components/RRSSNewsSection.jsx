'use client'

import React from 'react'
import { useState } from "react"
import Image from "next/image"


const newNews = [
    {
        id: 1,
        title: "NO TE OLVIDES, HOY VENCE EL IMPUESTO MENSUAL F29",
        subtitle: "No pagues multas, no regales tu dinero",
        image: "/CardNoticiasUno.jpg",
        content: "Hoy 29 de Enero vence el impuesto no se sé que chucha, hazlo. Mantente al día, síguennos en nuestras redes sociales",
        href: "www.instagram.com/asesoriasvaldivia",
    },
    {
        id: 2,
        title: "",
        subtitle: "",
        image: "",
        content: "",
        href: "",
    },
    {
        id: 3,
        title: "",
        subtitle: "",
        image: "",
        content: "",
        href: "",
    },
]

export default function RRSSNewsSection() {
    const [selectedNews, setSelectedNews] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = news => {
        setSelectedNews(news)
        setIsModalOpen(true)
    }
    const closeModal=()=>{
        setSelectedNews(null)
        setIsModalOpen(false)
    }

    return (
        <div className='container mx-auto px-4 py-8'>
            <h1>MANTENTE INFORMADO</h1>
            <div className=''>
                {newNews.map(news => (
                    <div
                        key={news.id}
                        className='bg-custom-green rounded-2xl overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105'
                        onClick={() => openModal(news)}
                    >
                        <div className='relative h-24'>
                            <Image
                                src={news.image}
                                alt={news.title}
                                width={100}
                                height={100}
                                className="filter brightness-75"
                            />
                        </div>
                        <div className="p-4">
                            <h4 className="text-lg font-semibold text-custom-blue mb-2">
                                {news.title}
                            </h4>
                            <p className="text-sm text-custom-blue ">{news.subtitle}</p>
                        </div>
                    </div>
                ))}

            </div>

            {isModalOpen && (
                <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 lg:p-16 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl sm:text-2xl font-bold text-custom-blue mb-2 sm:mb-4">{selectedNews.title}</h2>
                        <p className="text-sm sm:text-base text-custom-blue mb-2 sm:mb-4">{selectedNews.subtitle}</p>
                        <div className="mb-2 sm:mb-4">
                            <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
                                <Image
                                    src={selectedNews.image}
                                    alt={selectedNews.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                        <p className="text-sm sm:text-base text-gray-800 mb-2 sm:mb-4">{selectedNews.content}</p>
                        
                        <button
                            onClick={closeModal}
                            className="mt-4 sm:mt-6 bg-custom-blue text-custom-white px-3 py-1 sm:px-4 sm:py-2 rounded text-sm sm:text-base hover:bg-custom-green hover:text-custom-blue transition duration-300"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}