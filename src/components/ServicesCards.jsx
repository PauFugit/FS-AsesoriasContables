import Image from 'next/image'

const Card = ({ title, description, imageSrc, buttonText, buttonImageSrc, isReversed }) => (
  <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} overflow-hidden  mx-6 my-8 bg-transparent`}>
    <div className="w-full lg:w-3/5 p-8 flex flex-col justify-center">
      <div className="lg:hidden w-full mb-4">
        <Image
          src={imageSrc}
          alt={title}
          width={450}
          height={300}
          className="w-full h-auto object-cover"
        />
      </div>
      <h2 className="text-4xl md:text-7xl font-semibold text-custom-blue mb-8">{title}</h2>
      <p className="text-custom-blue my-6 text-md md:text-2xl">{description}</p>
      <div className="flex items-center space-x-4 mt-8">
        <button className="flex items-center space-x-2 bg-custom-blue text-custom-white px-4 py-2 rounded-full hover:bg-custom-green hover:text-custom-blue">
          <span className="text-2xl">{buttonText}</span>
        </button>
        <Image
          src={buttonImageSrc}
          alt="Button image"
          width={80}
          height={80}
          className="rounded-full"
        />
      </div>
    </div>
    <div className="hidden lg:flex lg:w-1/3 items-center justify-center p-8">
      <div className="relative w-full aspect-square">
        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    </div>
  </div>
)

const cardData = [
  {
    title: "ASESORÍAS CONTABLES",
    description: "Nuestro servicio contable abarca desde la contabilidad diaria hasta la preparación de estados financieros y reportes fiscales. Nos aseguramos de que tus registros contables estén actualizados y cumplan con las normativas vigentes. Además, te proporcionamos análisis financieros que te ayudarán a entender mejor la situación económica de tu empresa y a planificar su crecimiento.",
    imageSrc: "/cardasesoriascontables.png",
    buttonText: "Cotiza aquí",
    buttonImageSrc: "/flechaazulizquierda.png"
  },
  {
    title: "ASESORÍAS LABORALES",
    description: "Ofrecemos asesoría en todas las áreas relacionadas con la gestión de recursos humanos, incluyendo la elaboración de contratos, nóminas, cumplimiento de normativas laborales y resolución de conflictos. Nuestro objetivo es garantizar un ambiente laboral justo y conforme a la ley, optimizando la gestión de tu equipo humano.",
    imageSrc: "/cardasesorialaboral.png",
    buttonText: "Cotiza aquí",
    buttonImageSrc: "/flechaazulizquierda.png"
  },
  {
    title: "ASESORÍAS TRIBUTARIAS",
    description: "En el área tributaria, te ayudamos a cumplir con todas tus obligaciones fiscales de manera eficiente y estratégica. Esto incluye la preparación y presentación de declaraciones de impuestos, planificación fiscal para optimizar la carga tributaria y asesoría en caso de inspecciones o requerimientos por parte de las autoridades fiscales.",
    imageSrc: "/cardasesoriatributaria.png",
    buttonText: "Cotiza aquí",
    buttonImageSrc: "/flechaazulizquierda.png"
  },
  {
    title: "AUDITORÍAS",
    description: "Nuestro servicio de auditorías proporciona una revisión exhaustiva e independiente de tus estados financieros y procesos operativos. Realizamos auditorías internas y externas que aseguran la veracidad de la información financiera y la eficiencia de los procesos, identificando áreas de mejora y garantizando la transparencia y confianza en la gestión de tu empresa.",
    imageSrc: "/cardauditoria.png",
    buttonText: "Cotiza aquí",
    buttonImageSrc: "/flechaazulizquierda.png"
  },
]

export default function ServicesCards() {
  return (
    <div className="w-full">
      {cardData.map((card, index) => (
        <Card key={index} {...card} isReversed={index % 2 !== 0} />
      ))}
    </div>
  )
}