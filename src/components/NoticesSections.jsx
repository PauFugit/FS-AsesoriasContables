'use client'

import { useState } from "react"
import Image from "next/image"
import { Link } from "lucide-react"

// Mock data for news items
const newsItems = [
    {
        id: 1,
        title: "El Consejo de Finanzas Más Valioso: Gastar Menos de lo que Ganas y Ahorrar el 20% de tus Ingresos   ",
        subtitle: "20 de Septiembre del 2024",
        image: "/CardNoticiasUno.jpg",
        content: "En el mundo de las finanzas personales, uno de los consejos más repetidos por expertos es simple pero poderoso: 'Gasta menos de lo que ganas y ahorra al menos el 20% de tus ingresos'. Este principio, según economistas y asesores financieros, es la clave para alcanzar la estabilidad económica a largo plazo y construir un patrimonio sólido. Al vivir por debajo de tus posibilidades y mantener un enfoque constante en el ahorro, las personas pueden prepararse para emergencias financieras, generar inversiones a futuro y evitar endeudamientos innecesarios <br> El hábito de ahorrar de manera constante se ha destacado como uno de los pilares esenciales para la independencia financiera, especialmente en tiempos de incertidumbre económica. Los expertos señalan que, además del ahorro, es crucial que este porcentaje se invierta inteligentemente, ya sea en fondos de inversión, bienes raíces u otros activos que generen rendimientos. La disciplina financiera, acompañada de una estrategia de inversión adecuada, permite que cualquier persona, independientemente de su nivel de ingresos, construya riqueza con el tiempo.",
        href: "",
    },
    {
        id: 2,
        title: "¿Los negocios pueden arruinar las amistades? Un dilema clave en el ámbito empresarial.",
        subtitle: "5 de Septiembre del 2024",
        image: "/CardNoticiasDos.jpg",
        content: "El viejo debate sobre si los negocios pueden arruinar la amistad sigue vigente. Numerosos estudios advierten sobre los riesgos que conlleva iniciar un negocio con amigos, resaltando que, aunque la confianza y la buena relación inicial puedan parecer una ventaja, los desafíos que emergen pueden ser devastadores para la relación. Según el profesor Noam Wasserman de Harvard, equipos fundados por amigos tienen un 28.6% más de probabilidades de experimentar conflictos o rupturas, lo que a menudo resulta en la salida de uno de los socios, afectando tanto la amistad como la empresa. El problema radica en la falta de claridad en los roles y la dificultad para manejar conflictos emocionales, algo que es menos común cuando los fundadores han sido colegas previos en lugar de amigos íntimos. <br> Otros expertos, como Nancy Rothbard de Wharton, subrayan que mezclar amistad y trabajo puede llevar a conflictos de interés o dificultades para tomar decisiones objetivas. Si bien las amistades en el entorno laboral pueden mejorar la cooperación y el ambiente general, también pueden crear tensiones cuando surgen diferencias profesionales. Rothbard aconseja que, si se opta por iniciar un negocio con amigos, es vital establecer expectativas claras desde el principio y asegurarse de que ambas partes estén dispuestas a enfrentar conversaciones difíciles de manera profesional.",
        href: "https://www.weforum.org/agenda/2015/12/why-friends-shouldnt-go-into-business-together/",
        hreftwo: "https://magazine.wharton.upenn.edu/issues/fall-winter-2018/the-dark-side-of-workplace-friendships/",  
    },
    {
        id: 3,
        title: "Ahorros: ¿utopía o realidad? Breves consejos para lograrlo",
        subtitle: "20 de Agosto del 2024 ",
        image: "/CardNoticiasTres.jpg",
        content: "Ahorrar de manera eficiente puede tener un gran impacto en tus finanzas, y existen recomendaciones validadas por expertos que lo confirman. Por ejemplo, un informe de Harvard Business Review destaca la importancia de automatizar los ahorros como una forma de asegurarse de que una parte de los ingresos siempre se destine al ahorro sin la tentación de gastarlo primero. De igual manera, estudios de la American Economic Association muestran que la planificación de presupuestos y la eliminación de deudas con altas tasas de interés son esenciales para mejorar el bienestar financiero . <br> Además, la Federal Trade Commission sugiere que renegociar contratos de servicios como seguros o planes telefónicos cada año puede generar ahorros considerables a lo largo del tiempo, ya que los proveedores ofrecen descuentos o promociones a clientes nuevos o que actualizan sus planes. Utilizar aplicaciones de ahorro y programas de lealtad también maximiza las oportunidades para gastar menos en productos básicos, contribuyendo a un ahorro más eficiente en el día a día .",
        href: ""
    },
    {
        id: 4,
        title: "Polémica por estimación de evasión del impuesto corporativo en Chile",
        subtitle: "5 de Agosto del 2024",
        image: "/CardNoticiasCuatro.jpg",
        content: "El Ministerio de Hacienda ha anunciado que la evasión del impuesto corporativo en Chile alcanza el 50% del total de recaudación estimada, una cifra que ha causado escepticismo entre diversos expertos del ámbito fiscal. A pesar de que Chile recauda un 4,68% del PIB en impuestos corporativos, significativamente más que el promedio de la OCDE, las autoridades aún no han publicado un informe desglosado que explique claramente los factores detrás de esta evasión. Además, se destaca que la economía informal en Chile es el doble que en los países de la OCDE, lo que podría ser un factor, aunque insuficiente, para justificar la cifra de evasión tan elevada. <br> Expertos han señalado que los métodos de cálculo utilizados en Chile, basados en un enfoque descendente, podrían estar inflando las estimaciones. En contraste, países como Canadá y Australia utilizan auditorías frecuentes para obtener cifras más precisas. Además, se ha cuestionado si se ha considerado correctamente el impacto de las PYMEs, cuya tributación es significativamente menor debido a beneficios fiscales como el régimen 14D, lo que podría afectar la tasa efectiva de evasión. Ante esta incertidumbre, algunos proponen la creación de una comisión técnica transversal que determine cifras más confiables, mientras se espera un informe oficial del SII en 2024.",
        href:"",
    },
    {
        id: 5,
        title: "Hacienda trabaja en proyecto de renta: se eliminan beneficios y se ajustan impuestos para personas",
        subtitle: "20 de Julio del 2024",
        image: "/Carouselimagethree.jpg",
        content: "El Ministerio de Hacienda se encuentra desarrollando un proyecto de reforma al sistema de renta que contempla desintegrar el régimen tributario actual y aplicar alzas de impuestos a personas con mayores ingresos. Entre las medidas propuestas destacan la creación de un nuevo régimen para PYMEs, la reducción del impuesto corporativo, y deducciones de gastos en favor de la clase media. El objetivo de la iniciativa es compensar la disminución de impuestos y fomentar la inversión y la innovación en el país <br>Este proyecto está generando debate, ya que se busca ajustar la recaudación por medio de nuevas medidas que impacten tanto a empresas como a personas naturales. Expertos señalan que se debe avanzar hacia un sistema tributario más progresivo y justo, en línea con las economías de los países de la OCDE. Además, se prevé que esta reforma impulse el crecimiento y simplifique el sistema tributario, pero sectores como el empresariado advierten sobre posibles desincentivos a la inversión si se eliminan ciertos beneficios.",
        href: ""
    },
    {
        id: 6,
        title: "SII aclara que fiscalizaciones son programadas y funcionarios deben identificarse",
        subtitle: "5 de Julio del 2024",
        image: "/CardServiciosUno.jpg",
        content: "El Servicio de Impuestos Internos (SII) aclaró que sus procedimientos de fiscalización en terreno se llevan a cabo de manera programada y que los funcionarios encargados deben identificarse adecuadamente. Esta declaración surge tras una denuncia sobre una supuesta visita irregular en horario nocturno por parte de fiscalizadores, quienes no habrían cumplido con los protocolos establecidos. La entidad enfatizó que las fiscalizaciones buscan garantizar el correcto cumplimiento de las obligaciones tributarias y que cualquier irregularidad debe ser reportada para su revisión.<br> Además, el SII explicó que las fiscalizaciones siguen un protocolo riguroso, en el cual los funcionarios no solo deben presentarse con identificación visible, sino también entregar la documentación correspondiente a los contribuyentes. Las inspecciones no son sorpresivas, ya que deben ser previamente programadas y notificadas. La institución reiteró la importancia de cumplir con estos requisitos para asegurar la transparencia y legitimidad de sus actuaciones en terreno, instando a los contribuyentes a denunciar cualquier anomalía.",
        href:""
    },


]

export default function NewsSection() {
    const [selectedNews, setSelectedNews] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = news => {
        setSelectedNews(news)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setSelectedNews(null)
        setIsModalOpen(false)
    }

    return (
        <div className="container mx-auto px-4 py-8" >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {newsItems.map(news => (
                    <div
                        key={news.id}
                        className="bg-custom-green rounded-2xl overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
                        onClick={() => openModal(news)}
                    >
                        <div className="relative h-48">
                            <Image
                                src={news.image}
                                alt={news.title}
                                layout="fill"
                                objectFit="cover"
                                className="filter brightness-75"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-custom-blue mb-2">
                                {news.title}
                            </h3>
                            <p className="text-sm text-custom-blue">{news.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8 space-x-4">
                <button className="  p-2 rounded-full">
                    <Image
                        src="/flechaazulizquierda.png"
                        width={50}
                        height={50}
                        className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                        alt="Previous"
                    />
                </button>
                <button className=" p-2 rounded-full">
                    <Image
                        src="/flechaazulderecha.png"
                        width={50}
                        height={50}
                        className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                        alt="Next"
                    />
                </button>
            </div>

            {isModalOpen && (
                <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
                        <h2 className="text-2xl font-bold text-custom-blue mb-4">{selectedNews.title}</h2>
                        <p className="text-custom-blue mb-4">{selectedNews.subtitle}</p>
                        <div className="mb-4">
                            <Image
                                src={selectedNews.image}
                                alt={selectedNews.title}
                                width={400}
                                height={300}
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>
                        <p className="text-gray-800">{selectedNews.content}</p>
                        <p className="p-4">Fuentes: <Link href={selectedNews.href} /> <Link href={selectedNews.hrefdos}/></p>
                        <button
                            onClick={closeModal}
                            className="mt-6 bg-custom-blue text-custom-white px-4 py-2 rounded hover:bg-custom-green hover:text-custom-blue"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
