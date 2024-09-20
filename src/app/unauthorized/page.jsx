export default function UnauthorizedPage() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
          <p className="text-xl text-gray-700">You do not have permission to view this page.</p>
          <a href="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Return to Home
          </a>
        </div>
      </div>
    )
  }