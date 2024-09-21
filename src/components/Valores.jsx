import Image from "next/image";


const values = [
  {
    title: 'HONESTIDAD',
    image: '/iconohonestidad.png', // Actualiza con la ruta correcta
  },
  {
    title: 'RESPONSABILIDAD',
    image: '/iconoresponsabilidad.png', // Actualiza con la ruta correcta
  },
  {
    title: 'RESPETO',
    image: '/iconorespeto.png', // Actualiza con la ruta correcta
    additionalText: 'Por nuestros/as clientes y nuestro trabajo',
  },
]

const Valores = () => {
  return (
    <div className="py-10 px-20 font-grotesk" style={{ backgroundImage: "url('/fondovalores.png')", backgroundSize: "cover" }}>

      <h2 className="text-5xl xs:text-5xl sm:text-6xl text-custom-blue font-bold sm:font-normal text-right mini:text-center md:text-left mb-12" style={{letterSpacing:"0.1rem"}}>NUESTROS VALORES</h2>
      <div className="flex flex-col md:flex-row justify-around items-center">
        {values.map((value, index) => (
          <div key={index} className="relative flex flex-col items-center mb-8 md:mb-0 md:px-4">
            <div className="w-64 h-64 rounded-full flex items-center justify-center relative mb-4">
              <Image src={value.image} alt={value.title} className="object-fit"
               width='300' height='300' 
              ></Image>
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default Valores;