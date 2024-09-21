'use client'

import Image from 'next/image'


const AboutUs = () => {
  return (
    <div className="font-grotesk">
    <header className="bg-custom-green text-white text-center py-8">
        <h1 className="text-6xl " style={{letterSpacing:"0.5rem"}}>ASESORÍAS VALDIVIA</h1>
      </header>
    <div className=" py-12 w-full" style={{ backgroundImage: "url('/fondoaboutus.png')", backgroundSize: "cover" }}>
      <div className="container mx-auto py-12">
        <div className="flex flex-wrap justify-center items-center mb-8">
          <div className="w-1/2 md:w-1/4 px-4 mb-8 md:mb-0">
            <img src="/credencialricardo.png" alt="Ricardo Valdivia Salis" className="w-full h-auto" />

          </div>
          <div className="w-1/2 md:w-1/4 px-4 mb-8 md:mb-0">
            <img src="/credencialgabriela.png" alt="Gabriela Oyanadel Dubost" className="w-full h-auto" />

          </div>
          <div className="w-1/2 md:w-1/4 px-4 mb-8 md:mb-0">
            <img src="/credencialariel.png" alt="Ariel Villaman Sanchez" className="w-full h-auto" />

          </div>
          <div className="w-1/2 md:w-1/4 px-4 mb-8 md:mb-0">
            <img src="/credencialhector.png" alt="Hector Valdivia Ramos" className="w-full h-auto" />

          </div>
          
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-left">
            <h2 className="text-4xl text-custom-green mb-4">QUIÉNES SOMOS</h2>
            <p className="text-white text-m sm:text-l mini:px-4">Somos Asesorías Valdivia, una firma de consultoría especializada en servicios contables, laborales, tributarios y de auditoría. Nuestro equipo está liderado por Ricardo Valdivia Salis, Contador Auditor e Ingeniero Comercial, quien aporta más de 18 años de experiencia en el sector. Nos enorgullece contar con la confianza de más de setenta empresas, que nos eligen por nuestra dedicación y compromiso con la excelencia. En Asesorías Valdivia SPA, nuestro objetivo es ofrecer soluciones integrales y personalizadas que faciliten el cumplimiento tributario y promuevan el crecimiento eficiente de nuestros clientes.</p>
          </div>
          <div className="text-right">
          <h2 className="text-4xl text-custom-green mb-4">HISTORIA</h2>
            <p className="text-white text-m sm:text-l mini:px-4">Impulsada durante la crisis sanitaria del COVID-19, Asesorías Valdivia fue fundada por Ricardo Valdivia Salis, Contador Auditor e Ingeniero Comercial con 18 años de experiencia en los ámbitos contable, tributario y laboral. Inicialmente, Ricardo ofreció sus servicios a empresas de conocidos y amigos, y hoy más de setenta empresas confían en nuestra pericia y dedicación. En 2021, Gabriela Oyanadel Dubost, Ingeniera en Administración de Empresas con especialización en Recursos Humanos, se unió al equipo, fortaleciendo significativamente nuestra área laboral. Actualmente seguimos comprometidos con brindar un servicio de excelencia y apoyo constante a nuestros clientes.</p>
          </div>
          <div className="text-left">
          <h2 className="text-4xl text-custom-green mb-4">NUESTROS SERVICIOS</h2>
            <p className="text-white text-m sm:text-l mini:px-4">En Asesorías Valdivia, ofrecemos una gama completa de servicios profesionales diseñados para satisfacer las necesidades de nuestros clientes. Nuestros servicios contables aseguran una gestión financiera precisa y eficiente, mientras que nuestros servicios laborales se centran en la administración y optimización de recursos humanos. En el ámbito tributario, proporcionamos asesoramiento experto para el cumplimiento de las obligaciones fiscales. Además, nuestras auditorías rigurosas garantizan la transparencia y exactitud de la información financiera, ayudando a las empresas a mantener altos estándares de control y cumplimiento.</p>
          </div>
          <div className="text-right">
            <h2 className="text-4xl text-custom-green mb-4">NUESTROS CLIENTES</h2>
            <p className="text-white text-m sm:text-l mini:px-4">En Asesorías Valdivia, atendemos a una diversa gama de clientes, que abarca desde restaurantes y empresas de ingeniería hasta empresas de marketing, transporte y marítimas, entre otros. Esta diversidad nos ha permitido adquirir una vasta experiencia en distintos tipos de contabilidades y sectores industriales. Nuestra capacidad para adaptarnos a las necesidades específicas de cada rubro nos ha consolidado como una firma de confianza para más de setenta empresas, que valoran nuestra experiencia, compromiso y dedicación al brindar soluciones eficientes y personalizadas.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AboutUs;