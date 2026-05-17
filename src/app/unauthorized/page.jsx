export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Acceso no autorizado</h1>
        <p className="text-xl text-gray-700">No tienes permisos para ver esta página.</p>
        <a href="/" className="mt-4 inline-block bg-custom-blue text-white px-4 py-2 rounded hover:bg-blue-800">
          Volver al inicio
        </a>
      </div>
    </div>
  )
}
