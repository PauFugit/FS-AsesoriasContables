import Image from 'next/image';



export default function MisionVision() {
    return (
        
            <div style={{backgroundImage: "url('/fondodegradado.png')", backgroundSize: "cover" }}>
                <div className="bg-custom-blue text-white text-center py-14">
                </div>
                <header className="bg-custom-blue text-white text-center py-8">
                    <h1 className="text-4xl font-bold">MISIÓN Y VISIÓN</h1>
                </header>
                <br></br>
                <br></br>
                <br></br>
                <main className="container mx-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <section className="text-left">
                            <h2 className="text-2xl font-bold text-custom-blue mb-4">MISIÓN:</h2>
                            <p className="text-lg text-gray-700 mb-4">
                                Proporcionar servicios contables y financieros de alta calidad a nuestros clientes, ayudándoles a cumplir con sus obligaciones fiscales y financieras de manera eficiente y efectiva.
                            </p>

                        </section>
                        <section className="text-left">
                            <h2 className="text-2xl font-bold text-custom-blue mb-4">VISIÓN:</h2>
                            <p className="text-lg text-gray-700 mb-4">
                                Ser la empresa líder en servicios contables y financieros en Chile, reconocida por su excelencia en el servicio al cliente y su compromiso con la calidad.
                            </p>
                        </section>
                    </div>
                </main>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                
            </div>
       
    );
}