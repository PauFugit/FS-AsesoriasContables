import Link from 'next/link'

export const metadata = {
  title: '404 — Página no encontrada | Asesorías Valdivia',
}

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ backgroundImage: "url('/fondodegradado.png')", backgroundSize: 'cover' }}
    >
      <h1 className="text-7xl font-bold text-custom-blue mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-custom-blue mb-2">Página no encontrada</h2>
      <p className="text-gray-600 mb-8">La página que buscas no existe o fue movida.</p>
      <Link
        href="/"
        className="bg-custom-blue text-white px-6 py-3 rounded-lg hover:bg-custom-green hover:text-custom-blue transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
