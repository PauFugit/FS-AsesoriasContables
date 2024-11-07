import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { UserCircle, FileText, LogOut, Menu, GraduationCap, Globe, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"



const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    image: '/isotipouno.png', // Default image
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(`/api/users/${session.user.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          setUserData({
            name: data.name || '',
            lastname: data.lastname || '',
            email: data.email || '',
            image: data.image || '/isotipouno.png',
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [session]);

  return (
    <div className={`w-64 bg-custom-green p-6 flex flex-col fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30`}>
      <div className="flex flex-col items-center mb-6">
        <Image
          src={userData.image || '/isotipouno.png'}
          alt="User"
          width={100}
          height={100}
          className="rounded-full mb-2"
        />
        <h2 className="text-lg font-bold text-custom-blue">{userData.name.toUpperCase()}</h2>
        <p className="text-sm text-gray-800">{userData.email}</p>
      </div>
      <nav className="flex-1 space-y-2">
        {[
          { icon: UserCircle, label: 'Perfil', value: 'profile' },
          { icon: FileText, label: 'Recursos', value: 'resources' },
        ].map((item) => (
          <button
            key={item.value}
            className={`w-full text-left py-2 px-4 rounded flex items-center ${activeTab === item.value ? 'bg-custom-green' : ''
              }`}
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
      <Link href="/api/auth/signout" className="flex items-center mt-6">
        <LogOut className="w-4 h-4 mr-2 text-red-600" />
        Cerrar sesión
      </Link>
    </div>
  );
};
const ProfileTab = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    lastname: '',
    phone: '',
    email: '',
    company: '',
    companyEmail: '',
    companyPhone: '',
    companyRUT: ''
  });
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(`/api/users/${session.user.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          setUserData({
            username: data.username || '',
            name: data.name || '',
            lastname: data.lastname || '',
            phone: data.phone || '',
            email: data.email || '',
            company: data.company || '',
            companyEmail: data.companyEmail || '',
            companyPhone: data.companyPhone || '',
            companyRUT: data.companyRUT || '',
          });
          setIsLoading(false);
        } catch (error) {
          setError(error.message);
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [session]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (session?.user?.id) {
      try {
        const dataToUpdate = { ...userData, id: session.user.id };
        if (password) {
          dataToUpdate.password = password;
        }
  
        const response = await fetch(`/api/users`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToUpdate),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update user data');
        }
  
        const result = await response.json();
        alert(result.message);
        setPassword(''); // Clear the password field after successful update
      } catch (error) {
        setError(error.message);
        alert(error.message);
      }
    }
  };
  if (isLoading) return <div>Loading user data...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-6">BIENVENIDO/A, {userData.name.toUpperCase()} {userData.lastname.toUpperCase()}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">INFORMACIÓN GENERAL</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label htmlFor="username" className="text-slate-500 mb-2 block  text-sm">Nombre de usuario: </label>
            <input className="w-full p-2 border rounded" placeholder="Nombre de usuario" name="username" value={userData.username} onChange={handleInputChange} />
            <label htmlFor="name" className="text-slate-500 mb-2 block  text-sm">Nombre: </label>
            <input className="w-full p-2 border rounded" placeholder="Nombre" name="name" value={userData.name} onChange={handleInputChange} />
            <label htmlFor="lastname" className="text-slate-500 mb-2 block  text-sm">Apellido: </label>
            <input className="w-full p-2 border rounded" placeholder="Apellido" name="lastname" value={userData.lastname} onChange={handleInputChange} />
            <label htmlFor="phone" className="text-slate-500 mb-2 block  text-sm">Teléfono: </label>
            <input className="w-full p-2 border rounded" placeholder="Teléfono" name="phone" value={userData.phone} onChange={handleInputChange} />
            <label htmlFor="email" className="text-slate-500 mb-2 block  text-sm">Correo electrónico: </label>
            <input className="w-full p-2 border rounded" placeholder="Correo electrónico" name="email" value={userData.email} onChange={handleInputChange} />
            <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">Nueva Contraseña: </label>
            <input className="w-full p-2 border rounded" type="password" placeholder="Dejar en blanco para no cambiar" name="password" value={password} onChange={handlePasswordChange} />
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">INFORMACIÓN COMERCIAL</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label htmlFor="company" className="text-slate-500 mb-2 block  text-sm">Nombre de la Empresa: </label>
            <input className="w-full p-2 border rounded" placeholder="Nombre empresa" name="company" value={userData.company} onChange={handleInputChange} />
            <label htmlFor="companyEmail" className="text-slate-500 mb-2 block  text-sm">Correo electrónico comercial: </label>
            <input className="w-full p-2 border rounded" placeholder="Correo electrónico" name="companyEmail" value={userData.companyEmail} onChange={handleInputChange} />
            <label htmlFor="companyPhone" className="text-slate-500 mb-2 block  text-sm">Teléfono de contacto comercial: </label>
            <input className="w-full p-2 border rounded" placeholder="Teléfono empresa" name="companyPhone" value={userData.companyPhone} onChange={handleInputChange} />
            <label htmlFor="companyRUT" className="text-slate-500 mb-2 block  text-sm">RUT Empresa: </label>
            <input className="w-full p-2 border rounded" placeholder="RUT empresa" name="companyRUT" value={userData.companyRUT} onChange={handleInputChange} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4">
          <button type="submit" className="px-4 py-2 bg-custom-blue text-white rounded hover:bg-custom-green w-full md:w-auto">Actualizar Datos</button>
          <button type="button" className="px-4 py-2 border rounded text-blue-600 hover:bg-blue-50 w-full md:w-auto" onClick={() => {
            setUserData(prevData => ({ ...prevData }));
            setPassword('');
          }}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};


const ResourcesTab = () => {
  const [activeResource, setActiveResource] = useState(null);
  const [userData, setUserData] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      if (session && session.user.id) {
        try {
          const response = await fetch(`/api/users/${session.user.id}`);
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [session]);

  const resources = [
    {
      icon: FileText,
      title: 'BIBLIOTECA DIGITAL',
      description: 'Acceso a carpetas con documentos contables en formato digital.',
      content: [
        { type: 'WEB', name: 'Acceso a google drive', urldrive: userData?.driveURL || '#' },
      ]
    },
    {
      icon: Globe,
      title: 'RECURSOS WEB',
      description: 'Enlaces útiles y herramientas en línea.',
      content: [
        { type: 'link', name: 'Calcular', url: 'https://www.calcular.cl/' },
        { type: 'link', name: 'Calculador Boleta Honorarios', url: 'https://www.boleteo.cl' },
        { type: 'link', name: 'Dirección del Trabajo', url:'https://www.dt.gob.cl'},
        { type: 'link', name: 'Previred', url: 'https://www.previred.com/' },
        { type: 'link', name: 'Portal SII', url: 'https://www.sii.cl/' },
        { type: 'pdf', name: 'Documento PDF', url: '/pdfs/pdfrecursoweb.pdf' },
      ]
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-6">RECURSOS COMPLEMENTARIOS</h1>
      <p className="mb-6">Haz click en cada recurso para acceder a él.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="bg-blue-50 p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setActiveResource(resource)}
          >
            <resource.icon className="w-12 h-12 text-custom-blue mb-2" />
            <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
            <p className="text-sm text-gray-600">{resource.description}</p>
          </div>
        ))}
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
  if (!resource) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{resource.title}</DialogTitle>
          <Button onClick={onClose} variant="ghost" className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="space-y-4">
          {resource.content.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              {item.type === 'WEB' && <FileText className="w-5 h-5 text-red-500 flex-shrink-0" />}
              {item.type === 'link' && <Globe className="w-5 h-5 text-blue-500 flex-shrink-0" />}
              {item.type === 'pdf' && <FileText className="w-5 h-5 text-green-500 flex-shrink-0" />}
              <Link
                href={item.urldrive || item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};


export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile menu button */}
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

      {/* Main content */}
      <div className="flex-1 p-4 md:p-10 mt-16 md:mt-0">
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'resources' && <ResourcesTab />}
      </div>
    </div>
  );
}