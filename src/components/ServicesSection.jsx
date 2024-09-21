import CardAsesorias from '@/components/CardAsesorias';

export default function ServicesSection() {
  return (
    <div className="py-10 px-10 font-grotesk" style={{ backgroundImage: "url('/fondodegradado.png')", backgroundSize: "cover" }}>
      <CardAsesorias
        title="ASESORÍAS CONTABLES"
        description="Nuestro servicio contable abarca desde la contabilidad diaria hasta la preparación de estados financieros y reportes fiscales. Nos aseguramos de que tus registros contables estén actualizados y cumplan con las normativas vigentes. Además, te proporcionamos análisis financieros que te ayudarán a entender mejor la situación económica de tu empresa y a planificar su crecimiento."
        imageSrc='/cardasesoriascontables.png'
        alt="Imagen Asesorías Contables"
        reverse
      />
      <CardAsesorias
        title="ASESORÍAS LABORALES"
        description="Ofrecemos asesoría en todas las áreas relacionadas con la gestión de recursos humanos, incluyendo la elaboración de contratos, nóminas, cumplimiento de normativas laborales y resolución de conflictos. Nuestro objetivo es garantizar un ambiente laboral justo y conforme a la ley, optimizando la gestión de tu equipo humano."
        imageSrc='/cardasesorialaboral.png'
      />
      <CardAsesorias
        title="ASESORÍAS TRIBUTARIAS"
        description="En el área tributaria, te ayudamos a cumplir con todas tus obligaciones fiscales de manera eficiente y estratégica. Esto incluye la preparación y presentación de declaraciones de impuestos, planificación fiscal para optimizar la carga tributaria y asesoría en caso de inspecciones o requerimientos por parte de las autoridades fiscales."
        imageSrc='/cardasesoriatributaria.png'
        reverse
      />
      <CardAsesorias
        title="AUDITORIAS"
        description="Nuestro servicio de auditorías proporciona una revisión exhaustiva e independiente de tus estados financieros y procesos operativos. Realizamos auditorías internas y externas que aseguran la veracidad de la información financiera y la eficiencia de los procesos, identificando áreas de mejora y garantizando la transparencia y confianza en la gestión de tu empresa."
        imageSrc='/cardauditoria.png'
      />
    </div>
  )
}