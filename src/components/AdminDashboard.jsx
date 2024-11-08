import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { UserCircle, Users, Briefcase, FileText, LogOut, Menu } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { PencilIcon, CheckIcon, XIcon, TrashIcon, PlusIcon } from '@heroicons/react/solid';


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
          src={userData.image}
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
        { icon: Users, label: 'Usuarios', value: 'users' },
        { icon: Users, label: 'Clientes', value: 'clients' },
        { icon: Briefcase, label: 'Servicios', value: 'services' },
        { icon: FileText, label: 'Recursos', value: 'resources' },
      ].map((item) => (
        <button
          key={item.value}
          className={`w-full text-left py-2 px-4 rounded flex items-center ${
            activeTab === item.value ? 'bg-green-200' : ''
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
    <Link href="/api/auth/signout" className="flex items-center  mt-6">
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
            email: data.email || ''
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
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-custom-blue">BIENVENIDO/A, {userData.name.toUpperCase()} {userData.lastname.toUpperCase()}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">INFORMACIÓN GENERAL</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">Nombre de usuario: </label>
            <input className="w-full p-2 border rounded" placeholder="Nombre de usuario" name="username" value={userData.username} onChange={handleInputChange} />
            <label htmlFor="name" className="text-slate-500 mb-2 block text-sm">Nombre: </label>
            <input className="w-full p-2 border rounded" placeholder="Nombre" name="name" value={userData.name} onChange={handleInputChange} />
            <label htmlFor="lastname" className="text-slate-500 mb-2 block text-sm">Apellido: </label>
            <input className="w-full p-2 border rounded" placeholder="Apellido" name="lastname" value={userData.lastname} onChange={handleInputChange} />
            <label htmlFor="phone" className="text-slate-500 mb-2 block text-sm">Teléfono: </label>
            <input className="w-full p-2 border rounded" placeholder="Teléfono" name="phone" value={userData.phone} onChange={handleInputChange} />
            <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">Nueva Contraseña: </label>
            <input className="w-full p-2 border rounded" type="password" placeholder="Dejar en blanco para no cambiar" name="password" value={password} onChange={handlePasswordChange} />
            <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">Correo Electrónico: </label>
            <input className="w-full p-2 border rounded" placeholder="Correo electrónico" name="email" value={userData.email} onChange={handleInputChange} />
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

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Error al cargar usuarios');
        }
        const { data } = await response.json();
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleUsersStatus = async (id, currentStatus) => {
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, active: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar usuario');
      }

      const { data: updatedUser } = await response.json();
      setUsers(users.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      ));
    } catch (error) {
      console.error('Error al actualizar estado de usuario:', error);
    }
  };

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-custom-blue">LISTADO DE USUARIOS </h1>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Nombre de Usuario</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Teléfono</th>
            <th className="px-4 py-2 text-left">Fecha registro</th>
            <th className="px-4 py-2 text-left">Ultima actualización</th>
            {session?.user?.role === 'ADMIN' && (
              <th className="px-4 py-2 text-left">Estado</th>
            )}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="px-4 py-2">{`${user.name} ${user.lastname}`}</td>
              <td className="px-4 py-2">{user.username || 'N/A'}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.phone || 'N/A'}</td>
              <td className="px-4 py-2">{user.createdAt || 'N/A'}</td>
              <td className="px-4 py-2">{user.updatedAt || 'N/A'}</td>
              {session?.user?.role === 'ADMIN' && (
                <td className="px-4 py-2">
                  <Switch
                    checked={user.active}
                    onCheckedChange={() => toggleUsersStatus(user.id, user.active)}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



const ClientsTab = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/clients');
        if (!response.ok) {
          throw new Error('Failed to fetch clients');
        }
        const { data } = await response.json();
        setClients(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  const toggleClientStatus = async (id, currentStatus) => {
    try {
      const response = await fetch('/api/clients', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, active: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update client status');
      }

      const { data: updatedClient } = await response.json();
      setClients(clients.map(client => 
        client.id === updatedClient.id ? updatedClient : client
      ));
    } catch (error) {
      console.error('Error updating client status:', error);
    }
  };

  if (isLoading) return <div>Loading clients...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-custom-blue">LISTADO DE CLIENTES </h1>
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
            <th className="px-4 py-2 text-left">Link Drive</th>
            {session?.user?.role === 'ADMIN' && (
              <th className="px-4 py-2 text-left">Estado</th>
            )}
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
              <td className="px-4 py-2">{client.driveURL || 'N/A'}</td>
              {session?.user?.role === 'ADMIN' && (
                <td className="px-4 py-2">
                  <Switch
                    checked={client.active}
                    onCheckedChange={() => toggleClientStatus(client.id, client.active)}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ServicesTab = () => {
  const services = [
    { id: 1, image: '/cardasesoriascontables.png', title: 'Asesorías Contables', description: 'Nuestro servicio contable abarca desde la contabilidad diaria hasta la preparación de estados financieros y reportes fiscales. Nos aseguramos de que tus registros contables estén actualizados y cumplan con las normativas vigentes. Además, te proporcionamos análisis financieros que te ayudarán a entender mejor la situación económica de tu empresa y a planificar su crecimiento.', price: 'Precio no definido' },
    { id: 2, image: '/cardasesorialaboral.png', title: 'Asesorías Laborales', description: 'Ofrecemos asesoría en todas las áreas relacionadas con la gestión de recursos humanos, incluyendo la elaboración de contratos, nóminas, cumplimiento de normativas laborales y resolución de conflictos. Nuestro objetivo es garantizar un ambiente laboral justo y conforme a la ley, optimizando la gestión de tu equipo humano.', price: 'Precio no definido' },
    { id: 3, image: '/cardasesoriatributaria.png', title: 'Asesorías Tributarias', description: 'En el área tributaria, te ayudamos a cumplir con todas tus obligaciones fiscales de manera eficiente y estratégica. Esto incluye la preparación y presentación de declaraciones de impuestos, planificación fiscal para optimizar la carga tributaria y asesoría en caso de inspecciones o requerimientos por parte de las autoridades fiscales.', price: 'Precio no definido' },
    { id: 4, image: '/cardauditoria.png', title: 'Auditorías', description: 'Nuestro servicio de auditorías proporciona una revisión exhaustiva e independiente de tus estados financieros y procesos operativos. Realizamos auditorías internas y externas que aseguran la veracidad de la información financiera y la eficiencia de los procesos, identificando áreas de mejora y garantizando la transparencia y confianza en la gestión de tu empresa.', price: 'Precio no definido' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-custom-blue">SERVICIOS PUBLICADOS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-blue-50 p-4 rounded-lg">
            <Image src={service.image} width={250} height={250} />
            <h3 className="text-lg font-semibold mb-2 text-custom-blue">{service.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{service.description}</p>
            <p className="text-custom-blue font-bold">{service.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ResourcesTab = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients');
      if (!response.ok) {
        throw new Error('Error al cargar recursos');
      }
      const { data } = await response.json();
      setClients(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleEdit = (id, currentValue) => {
    setEditingId(id);
    setEditValue(currentValue || '');
  };

  const handleSave = async (id) => {
    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driveURL: editValue }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el recurso');
      }

      setClients(clients.map(client => 
        client.id === id ? { ...client, driveURL: editValue } : client
      ));
      setEditingId(null);
    } catch (error) {
      console.error('Error saving driveURL:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este recurso?')) return;

    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driveURL: null }),
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el recurso');
      }

      setClients(clients.map(client => 
        client.id === id ? { ...client, driveURL: null } : client
      ));
    } catch (error) {
      console.error('Error deleting driveURL:', error);
      // You might want to show an error message to the user here
    }
  };

  if (isLoading) return <div>Cargando recursos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-custom-blue">ADMINISTRADOR DE RECURSOS</h1>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Empresa</th>
            <th className="px-4 py-2 text-left">RUT Empresa</th>
            <th className="px-4 py-2 text-left">Link Drive</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="border-b">
              <td className="px-4 py-2">{`${client.name} ${client.lastname}`}</td>
              <td className="px-4 py-2">{client.email}</td>
              <td className="px-4 py-2">{client.company || 'N/A'}</td>
              <td className="px-4 py-2">{client.companyRUT || 'N/A'}</td>
              <td className="px-4 py-2">
                {editingId === client.id ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  client.driveURL ? (
                    <a href={client.driveURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {client.driveURL}
                    </a>
                  ) : 'N/A'
                )}
              </td>
              <td className="px-4 py-2">
                {editingId === client.id ? (
                  <>
                    <button onClick={() => handleSave(client.id)} className="text-green-600 hover:text-green-800 mr-2">
                      <CheckIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => setEditingId(null)} className="text-red-600 hover:text-red-800">
                      <XIcon className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(client.id, client.driveURL)} className="text-blue-600 hover:text-blue-800 mr-2">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    {client.driveURL && (
                      <button onClick={() => handleDelete(client.id)} className="text-red-600 hover:text-red-800">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    )}
                    {!client.driveURL && (
                      <button onClick={() => handleEdit(client.id, '')} className="text-green-600 hover:text-green-800">
                        <PlusIcon className="h-5 w-5" />
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function AdminDashboard() {
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
        {activeTab === 'users' && <UsersTab />}
        {activeTab === 'clients' && <ClientsTab />}
        {activeTab === 'services' && <ServicesTab />}
        {activeTab === 'resources' && <ResourcesTab />}
      </div>
    </div>
  );
}