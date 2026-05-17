import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { UserCircle, Users, FileText, LogOut, Menu, GraduationCap, Globe, X, Zap, ReceiptText, ScrollText } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';


const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    image: '/isotipouno.png',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(`/api/users/${session.user.id}`);
          if (!response.ok) throw new Error();
          const data = await response.json();
          setUserData({
            name: data.name || '',
            email: data.email || '',
            image: data.image || '/isotipouno.png',
          });
        } catch {}
      }
    };
    fetchUserData();
  }, [session]);

  return (
    <div className={`w-64 bg-custom-green p-6 flex flex-col fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 overflow-y-auto`}>
      <div className="flex flex-col items-center mb-4">
        <Image
          src={userData.image}
          alt="User"
          width={80}
          height={80}
          className="rounded-full mb-2"
        />
        <h2 className="text-base font-bold text-custom-blue">{userData.name?.toUpperCase() || ''}</h2>
        <p className="text-xs text-gray-800">{userData.email}</p>
      </div>
      <nav className="space-y-1">
        {[
          { icon: UserCircle, label: 'Perfil', value: 'profile' },
          { icon: Users, label: 'Clientes', value: 'clients' },
          { icon: FileText, label: 'Recursos', value: 'resources' },
          { icon: Zap, label: 'Automatización', value: 'automation' },
        ].map((item) => (
          <button
            key={item.value}
            className={`w-full text-left py-2 px-4 rounded flex items-center ${activeTab === item.value ? 'bg-green-200' : ''}`}
            onClick={() => {
              setActiveTab(item.value);
              setIsSidebarOpen(false);
            }}
          >
            <item.icon className="w-5 h-5 mr-2 text-custom-blue" />
            {item.label}
          </button>
        ))}
      </nav>
      <button
        onClick={() => signOut({ callbackUrl: `${window.location.origin}/auth/login` })}
        className="flex items-center mt-4 pt-4 border-t border-green-400 text-left"
      >
        <LogOut className="w-4 h-4 mr-2 text-red-600" />
        Cerrar sesión
      </button>
    </div>
  );
};

const ProfileTab = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    lastname: '',
    phone: '',
    email: '',
  });
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'loading') return;
    if (status !== 'authenticated' || !session?.user?.id) {
      setIsLoading(false);
      return;
    }
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${session.user.id}`);
        if (!response.ok) throw new Error('Error al cargar datos del usuario');
        const data = await response.json();
        setUserData({
          username: data.username || '',
          name: data.name || '',
          lastname: data.lastname || '',
          phone: data.phone || '',
          email: data.email || ''
        });
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [status, session]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (session?.user?.id) {
      try {
        const dataToUpdate = { ...userData, id: session.user.id };
        if (password) dataToUpdate.password = password;
        const response = await fetch(`/api/users`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToUpdate),
        });
        if (!response.ok) throw new Error('Error al actualizar datos del usuario');
        const result = await response.json();
        alert(result.message);
        setPassword('');
      } catch (error) {
        setError(error.message);
        alert(error.message);
      }
    }
  };

  if (isLoading) return <div>Cargando datos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-6">BIENVENIDO/A, {userData.name.toUpperCase()} {userData.lastname.toUpperCase()}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">INFORMACIÓN GENERAL</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="text-slate-500 mb-2 block text-sm">Nombre de usuario: </label>
            <input className="w-full p-2 border rounded" placeholder="Nombre de usuario" name="username" value={userData.username} onChange={handleInputChange} />
            <label className="text-slate-500 mb-2 block text-sm">Nombre: </label>
            <input className="w-full p-2 border rounded" placeholder="Nombre" name="name" value={userData.name} onChange={handleInputChange} />
            <label className="text-slate-500 mb-2 block text-sm">Apellido: </label>
            <input className="w-full p-2 border rounded" placeholder="Apellido" name="lastname" value={userData.lastname} onChange={handleInputChange} />
            <label className="text-slate-500 mb-2 block text-sm">Teléfono: </label>
            <input className="w-full p-2 border rounded" placeholder="Teléfono" name="phone" value={userData.phone} onChange={handleInputChange} />
            <label className="text-slate-500 mb-2 block text-sm">Correo electrónico: </label>
            <input className="w-full p-2 border rounded" placeholder="Correo electrónico" name="email" value={userData.email} onChange={handleInputChange} />
            <label className="text-slate-500 mb-2 block text-sm">Nueva Contraseña: </label>
            <input className="w-full p-2 border rounded" type="password" placeholder="Dejar en blanco para no cambiar" name="password" value={password} onChange={handlePasswordChange} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4">
          <button type="submit" className="px-4 py-2 bg-custom-blue text-white rounded hover:bg-custom-green w-full md:w-auto">Actualizar Datos</button>
          <button type="button" className="px-4 py-2 border rounded text-blue-600 hover:bg-blue-50 w-full md:w-auto" onClick={() => { setUserData(prevData => ({ ...prevData })); setPassword(''); }}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

const ClientsTab = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/clients')
      .then(res => res.ok ? res.json() : Promise.reject('Error al cargar clientes'))
      .then(({ data }) => { setClients(data); setIsLoading(false); })
      .catch(err => { setError(typeof err === 'string' ? err : 'Error al cargar clientes'); setIsLoading(false); });
  }, []);

  if (isLoading) return <div>Cargando clientes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-custom-blue">LISTADO DE CLIENTES</h1>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Nombre de Usuario</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Teléfono</th>
            <th className="px-4 py-2 text-left">Empresa</th>
            <th className="px-4 py-2 text-left">Correo Empresa</th>
            <th className="px-4 py-2 text-left">Teléfono Empresa</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="border-b">
              <td className="px-4 py-2">{`${client.name} ${client.lastname}`}</td>
              <td className="px-4 py-2">{client.username || 'N/A'}</td>
              <td className="px-4 py-2">{client.email}</td>
              <td className="px-4 py-2">{client.phone || 'N/A'}</td>
              <td className="px-4 py-2">{client.company || 'N/A'}</td>
              <td className="px-4 py-2">{client.companyEmail || 'N/A'}</td>
              <td className="px-4 py-2">{client.companyPhone || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CATEGORY_ICONS = [FileText, GraduationCap, Globe];

const ResourcesTab = () => {
  const [activeResource, setActiveResource] = useState(null);
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/resource')
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(({ data }) => { setResources(data); setIsLoading(false); })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="p-6">Cargando recursos...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-6">RECURSOS COMPLEMENTARIOS</h1>
      <p className="mb-6">Haz click en cada recurso para acceder a él.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => {
          const Icon = CATEGORY_ICONS[index % CATEGORY_ICONS.length];
          return (
            <div
              key={resource.id}
              className="bg-blue-50 p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setActiveResource(resource)}
            >
              <Icon className="w-12 h-12 text-custom-blue mb-2" />
              <h3 className="text-lg font-semibold mb-2">{resource.name}</h3>
              <p className="text-sm text-gray-600">{resource.description}</p>
            </div>
          );
        })}
      </div>
      <ResourceModal
        isOpen={!!activeResource}
        onClose={() => setActiveResource(null)}
        resource={activeResource}
      />
    </div>
  );
};

const ResourceModal = ({ isOpen, onClose, resource }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold">{resource.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          {(resource.files || []).map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              {item.type === 'pdf' && <FileText className="w-5 h-5 text-red-500 flex-shrink-0" />}
              {item.type === 'link' && <Globe className="w-5 h-5 text-blue-500 flex-shrink-0" />}
              <a
                href={/^https?:\/\//.test(item.url) ? item.url : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {item.name}
              </a>
            </div>
          ))}
          {(!resource.files || resource.files.length === 0) && (
            <p className="text-gray-400 text-sm italic">Sin archivos en esta categoría.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const AUTOMATION_ITEMS = [
  {
    icon: ReceiptText,
    title: 'Facturas Electrónicas',
    description: 'Automatiza la aceptación de facturas electrónicas en el portal del SII. Permite procesar empresas de forma individual o masiva mediante un archivo Excel, con soporte de hasta 3 operaciones simultáneas y generación automática de reportes.',
    tools: [
      {
        name: 'AutomatizadorFacturas',
        description: 'App de escritorio Windows. Automatiza la aceptación de facturas en SII con modo individual y masivo (Excel). Requiere Chrome instalado.',
        downloadUrl: 'https://github.com/Pauaua/AutomatizadorFacturas/releases/download/v1.0.0/AutomatizadorAV_Installer.exe',
      },
    ],
  },
  {
    icon: ScrollText,
    title: 'Creación de Boletas',
    description: 'Automatiza la emisión de boletas de honorarios en el portal del SII. Incluye modo individual para ingreso manual y modo masivo para carga desde Excel, con operación en modo headless y registro de actividad en tiempo real.',
    tools: [
      {
        name: 'AutomatizadorBoletas',
        description: 'App de escritorio Windows. Automatiza la emisión de boletas de honorarios en SII con modo individual y masivo (Excel). Requiere Chrome instalado.',
        downloadUrl: 'https://github.com/Pauaua/AutomatizadorBoletas/releases/download/v1.0.0/Instalador_AutomatizadorBoletas.exe',
      },
    ],
  },
];

const AutomationModal = ({ item, onClose }) => {
  if (!item) return null;
  const Icon = item.icon;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-custom-blue px-6 py-4 rounded-t-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-white" />
            <h2 className="text-lg font-bold text-white">{item.title}</h2>
          </div>
          <button onClick={onClose} className="text-white hover:text-blue-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-500 text-sm mb-6">{item.description}</p>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="px-4 py-3 text-left font-semibold text-custom-blue">Aplicación</th>
                  <th className="px-4 py-3 text-left font-semibold text-custom-blue">Descripción</th>
                  <th className="px-4 py-3 text-left font-semibold text-custom-blue">Enlace</th>
                </tr>
              </thead>
              <tbody>
                {item.tools.map((tool, i) => (
                  <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{tool.name}</td>
                    <td className="px-4 py-3 text-gray-600">{tool.description}</td>
                    <td className="px-4 py-3">
                      {tool.downloadUrl !== '#' ? (
                        <a
                          href={tool.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-custom-blue hover:underline font-medium"
                        >
                          Descargar →
                        </a>
                      ) : (
                        <span className="text-gray-400 italic">Próximamente</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const AutomationTab = () => {
  const [activeItem, setActiveItem] = useState(null);
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-6 h-6 text-custom-blue" />
        <h1 className="text-xl md:text-2xl font-bold text-custom-blue">AUTOMATIZACIÓN</h1>
      </div>
      <p className="text-gray-500 text-sm mb-6">Accede a las herramientas de automatización disponibles para agilizar tus procesos.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {AUTOMATION_ITEMS.map((item) => (
          <button
            key={item.title}
            onClick={() => setActiveItem(item)}
            className="group flex flex-col gap-4 border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-custom-blue transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 group-hover:bg-custom-blue p-3 rounded-lg transition-colors">
                <item.icon className="w-6 h-6 text-custom-blue group-hover:text-white transition-colors" />
              </div>
              <h2 className="font-bold text-custom-blue text-lg">{item.title}</h2>
            </div>
            <p className="text-sm text-gray-500">{item.description}</p>
            <span className="text-xs font-medium text-custom-blue group-hover:underline mt-auto">Ver herramientas →</span>
          </button>
        ))}
      </div>
      <AutomationModal item={activeItem} onClose={() => setActiveItem(null)} />
    </div>
  );
};

export default function TeamDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-custom-green text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        <Menu className="w-6 h-6" />
      </button>

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 p-4 md:p-10 mt-16 md:mt-0">
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'clients' && <ClientsTab />}
        {activeTab === 'resources' && <ResourcesTab />}
        {activeTab === 'automation' && <AutomationTab />}
      </div>
    </div>
  );
}
