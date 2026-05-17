'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }) {
  useEffect(() => {}, [error])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ backgroundImage: "url('/fondodegradado.png')", backgroundSize: 'cover' }}
    >
      <h1 className="text-5xl font-bold text-custom-blue mb-4">¡Algo salió mal!</h1>
      <p className="text-gray-600 mb-8">Ha ocurrido un error inesperado. Por favor intenta nuevamente.</p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-custom-blue text-white px-6 py-3 rounded-lg hover:bg-custom-green hover:text-custom-blue transition-colors"
        >
          Intentar de nuevo
        </button>
        <Link
          href="/"
          className="bg-white text-custom-blue border border-custom-blue px-6 py-3 rounded-lg hover:bg-custom-blue hover:text-white transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
