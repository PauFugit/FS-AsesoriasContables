import Image from 'next/image'
import Link from 'next/link'
import { Mail, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-transparent text-custom-blue py-8" style={{ backgroundImage: "url('/fondodegradado.png')", backgroundSize: "cover" }}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">

                    {/* Logo dispositivos pequeños */}
                    <div className="md:hidden w-full flex justify-center bottom-0 mb-4">
                        <Image
                            src="/isotipouno.png"
                            alt="Asesorías Valdivia Logo"
                            width={100}
                            height={50}
                            className="object-contain"
                        />
                    </div>

                    {/* CONTACTO */}
                    <div>
                        <h3 className="text-3xl font-semibold mb-4">CONTACTO</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="mailto:contacto@asesoriasvaldivia.cl" className="hover:text-custom-green text-lg">
                                    contacto@asesoriasvaldivia.cl
                                </Link>
                            </li>
                            <li>
                                <Link href="/cotiza" className="hover:text-custom-green text-lg">
                                    Cotiza con nosotros
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacto" className="hover:text-custom-green text-lg">
                                    Consultas generales
                                </Link>
                            </li>
                        </ul>
                        <div className="my-8">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.8864269776224!2d-70.39742648255615!3d-23.54400329999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96afd5d738c6d8e7%3A0x7e3b1ff1a2d6b5b0!2sArturo%20Prat%20482%2C%20Antofagasta%2C%20Chile!5e0!3m2!1sen!2sus!4v1632501144712!5m2!1sen!2sus"
                                width="80%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                            ></iframe>
                        </div>
                        <div className="mt-8 text-left text-m">
                            <p>Arturo Prat #482, <br></br>Oficina 305.<br></br> Antofagasta, Chile.</p>
                        </div>
                    </div>

                    {/* Information Section */}
                    <div>
                        <h3 className="text-3xl font-semibold mb-4">INFORMACIÓN</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/nosotros" className="hover:text-custom-green text-lg">
                                    Quiénes somos
                                </Link>
                            </li>
                            <li>
                                <Link href="/misionvision" className="hover:text-custom-green text-lg">
                                    Misión y Visión
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* POLÍTICAS */}
                    <div>
                        <h3 className="text-3xl font-semibold mb-4">POLÍTICAS</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/privacidad" className="hover:text-custom-green text-lg">
                                    Privacidad
                                </Link>
                            </li>
                            <li>
                                <Link href="/terminosdeuso" className="hover:text-custom-green text-lg">
                                    Aviso legal y Términos de Uso
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* RRSS */}
                    <div>
                        <h3 className="text-3xl font-semibold mb-4">RRSS</h3>
                        <div className="flex space-x-4 text-xl">
                            <Link href="mailto:contacto@asesoriasvaldivia.cl" className="hover:text-red-600">
                                <Mail size={24} />
                            </Link>
                            <Link href="https://www.facebook.com/AsesoriasValdiviaSpA" className="hover:text-blue-700">
                                <Facebook size={24} />
                            </Link>
                            <Link href="https://www.instagram.com/asesoriasvaldivia/" className="hover:text-pink-400">
                                <Instagram size={24} />
                            </Link>
                        </div>
                    </div>

                    {/* Logo dispositivos grandes */}
                    <div className="hidden lg:block absolute bottom-0 right-0">
                        <Image
                            src="/isotipodos.png"
                            alt="Asesorías Valdivia Logo"
                            width={200}
                            height={100}
                            className="object-contain"
                        />
                    </div>
                    <div className="md:hidden w-full flex justify-center bottom-0 mb-4">
                        <Image
                            src="/isotipodos.png"
                            alt="Asesorías Valdivia Logo"
                            width={100}
                            height={50}
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </footer>
    )
}