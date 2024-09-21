import React, { useState } from 'react';
import Image from 'next/image';
import { UserCircle, FileText, GraduationCap, Globe, LogOut, X, Menu } from 'lucide-react';

const ResourceModal = ({ isOpen, onClose, resource }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold">{resource.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          {resource.content.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              {item.type === 'pdf' && <FileText className="w-5 h-5 text-red-500 flex-shrink-0" />}
              {item.type === 'link' && <Globe className="w-5 h-5 text-blue-500 flex-shrink-0" />}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {item.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function TeamDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [activeResource, setActiveResource] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const resources = [
    {
      icon: FileText,
      title: 'RECURSOS CONTABLES',
      description: 'Documentos y enlaces relacionados con contabilidad y finanzas.',
      content: [
        { type: 'pdf', name: 'Plan de cuentas 2023.pdf', url: '/path/to/plan-de-cuentas-2023.pdf' },
        { type: 'pdf', name: 'Guía de impuestos.pdf', url: '/path/to/guia-de-impuestos.pdf' },
        { type: 'link', name: 'Portal SII', url: 'https://www.sii.cl/' },
      ]
    },
    {
      icon: GraduationCap,
      title: 'RECURSOS ACADÉMICOS',
      description: 'Material educativo y recursos de aprendizaje.',
      content: [
        { type: 'pdf', name: 'Introducción a la contabilidad.pdf', url: '/path/to/introduccion-contabilidad.pdf' },
        { type: 'link', name: 'Curso online de Excel', url: 'https://www.example.com/excel-course' },
        { type: 'pdf', name: 'Glosario de términos financieros.pdf', url: '/path/to/glosario-financiero.pdf' },
      ]
    },
    {
      icon: Globe,
      title: 'RECURSOS WEB',
      description: 'Enlaces útiles y herramientas en línea.',
      content: [
        { type: 'link', name: 'Calculadora de IVA', url: 'https://www.example.com/iva-calculator' },
        { type: 'link', name: 'Conversor de divisas', url: 'https://www.example.com/currency-converter' },
        { type: 'link', name: 'Blog de noticias financieras', url: 'https://www.example.com/finance-news' },
      ]
    },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-green-500 text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div className={`w-64 bg-green-100 p-6 flex flex-col fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30`}>
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/client1.png"
            alt="User"
            width={80}
            height={80}
            className="rounded-full mb-2"
          />
          <h2 className="text-lg font-semibold">USUARIO FICTICIO</h2>
          <p className="text-sm text-gray-600">usuario@correo.cl</p>
        </div>
        <nav className="flex-1 space-y-2">
          <button
            className={`w-full text-left py-2 px-4 rounded flex items-center ${
              activeTab === 'profile' ? 'bg-green-200' : ''
            }`}
            onClick={() => {
              setActiveTab('profile');
              setIsSidebarOpen(false);
            }}
          >
            <UserCircle className="w-5 h-5 mr-2" />
            Perfil
          </button>
          <button
            className={`w-full text-left py-2 px-4 rounded flex items-center ${
              activeTab === 'resources' ? 'bg-green-200' : ''
            }`}
            onClick={() => {
              setActiveTab('resources');
              setIsSidebarOpen(false);
            }}
          >
            <FileText className="w-5 h-5 mr-2" />
            Recursos complementarios
          </button>
        </nav>
        <button className="flex items-center text-red-600 mt-6">
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar sesión
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-10 mt-16 md:mt-0">
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-xl md:text-2xl font-bold mb-6">BIENVENIDO/A, USUARIO/A FICTICIO/A</h1>
            <form>
              <div className="mb-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">INFORMACIÓN GENERAL</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className="w-full p-2 border rounded" placeholder="Nombres" />
                  <input className="w-full p-2 border rounded" placeholder="Apellidos" />
                  <input className="w-full p-2 border rounded" placeholder="RUT" />
                  <input className="w-full p-2 border rounded" placeholder="Teléfono de contacto (1)" />
                  <input className="w-full p-2 border rounded" placeholder="Teléfono de contacto (2)" />
                  <input className="w-full p-2 border rounded" placeholder="Dirección" />
                  <input className="w-full p-2 border rounded" placeholder="Correo electrónico" />
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">INFORMACIÓN COMERCIAL</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className="w-full p-2 border rounded" placeholder="Nombre empresa" />
                  <input className="w-full p-2 border rounded" placeholder="Teléfono empresa" />
                  <input className="w-full p-2 border rounded" placeholder="Correo electrónico" />
                  <input className="w-full p-2 border rounded md:col-span-2" placeholder="Dirección empresa" />
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4">
                <button className="px-4 py-2 border rounded text-blue-600 hover:bg-blue-50 w-full md:w-auto">Cancelar</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full md:w-auto">Guardar</button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-xl md:text-2xl font-bold mb-6">RECURSOS COMPLEMENTARIOS</h1>
            <p className="mb-6">Haz click en cada recurso para acceder a él.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  className="bg-blue-50 p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setActiveResource(resource)}
                >
                  <resource.icon className="w-12 h-12 text-blue-600 mb-2" />
                  <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ResourceModal
        isOpen={!!activeResource}
        onClose={() => setActiveResource(null)}
        resource={activeResource}
      />
    </div>
  );
}