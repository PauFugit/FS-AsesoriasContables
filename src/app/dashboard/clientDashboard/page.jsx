'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export default function ClientDashboard({ initialUser }) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return <div>Access denied. Please log in.</div>
    },
  })
  const [user, setUser] = useState(initialUser)
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email && !user) {
      fetch(`/api/users?email=${session.user.email}`)
        .then(res => res.json())
        .then(data => setUser(data))
    }
  }, [session, status, user])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (user?.role !== 'CLIENT') {
    return <div>Access denied. This page is only for clients.</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-6">
        <div className="mb-8">
          <Image src="/isotipodos.png" alt="Logo" width={150} height={50} />
        </div>
        <div className="mb-6">
          <Image 
            src={session?.user?.image || '/client1.png'} 
            alt="User" 
            width={64} 
            height={64} 
            className="rounded-full" 
          />
          <p className="mt-2 font-semibold">{user?.name} {user?.lastname}</p>
          <p className="text-sm">{user?.email}</p>
        </div>
        <nav>
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left py-2 px-4 rounded ${activeTab === 'profile' ? 'bg-blue-700' : ''}`}
          >
            Perfil
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`w-full text-left py-2 px-4 rounded ${activeTab === 'resources' ? 'bg-blue-700' : ''}`}
          >
            Recursos complementarios
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10">
        {activeTab === 'profile' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Bienvenido/a, {user?.name}</h2>
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Información General</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombres</label>
                  <input type="text" value={user?.name || ''} readOnly className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Apellidos</label>
                  <input type="text" value={user?.lastname || ''} readOnly className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" value={user?.email || ''} readOnly className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input type="tel" value={user?.phone || ''} readOnly className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-8 mb-4">Información Comercial</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Empresa</label>
                  <input type="text" value={user?.company || ''} readOnly className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Empresa</label>
                  <input type="email" value={user?.companyEmail || ''} readOnly className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono Empresa</label>
                  <input type="tel" value={user?.companyPhone || ''} readOnly className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dirección Empresa</label>
                  <input type="text" value={user?.companyAdress || ''} readOnly className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Recursos Complementarios</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Recursos Contables', 'Recursos Académicos', 'Recursos Web'].map((category) => (
                <div key={category} className="bg-white shadow rounded-lg p-6">
                  <Image 
                    src={`/${category.toLowerCase().replace(' ', '-')}.png`} 
                    alt={category} 
                    width={64} 
                    height={64} 
                    className="mb-4" 
                  />
                  <h3 className="text-xl font-semibold mb-2">{category}</h3>
                  <p className="text-gray-600 mb-4">Descripción de los recursos específicos para esta categoría.</p>
                  <Link href={`/resources/${category.toLowerCase().replace(' ', '-')}`} className="text-blue-600 hover:underline">
                    Ver recursos
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}