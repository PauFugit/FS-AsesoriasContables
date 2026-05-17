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
            throw new Error('Error al cargar datos del usuario');
          }
          const data = await response.json();
          setUserData({
            name: data.name || '',
            email: data.email || '',
            image: data.image || '/isotipouno.png',
          });
        } catch (error) {

        }
      }
    };

    fetchUserData();
  }, [session]);

  return (
    <div className={`w-64 bg-custom-blue p-6 flex flex-col fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30`}>
      <div className="flex flex-col items-center mb-6">
        <Image
          src={userData.image}
          alt="User"
          width={100}
          height={100}
          className="rounded-full mb-2"
        />
        <h2 className="text-lg font-bold text-custom-white">{userData.name?.toUpperCase() || ''}</h2>
        <p className="text-sm text-custom-white">{userData.email}</p>
      </div>
    <nav className="flex-1 space-y-2 text-white">
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
            activeTab === item.value ? 'bg-blue-200' : ''
          }`}
          onClick={() => {
            setActiveTab(item.value);
            setIsSidebarOpen(false);
          }}
        >
          <item.icon className="w-5 h-5 mr-2 text-custom-white" />
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
            throw new Error('Error al cargar datos del usuario');
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
          throw new Error('Error al actualizar datos del usuario');
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
          <button type="submit" className="px-4 py-2 bg-custom-blue text-white rounded hover:bg-custom-white hover:text-custom-blue w-full md:w-auto">Actualizar Datos</button>
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

    }
  };

  if (isLoading) return <div>Cargando usuarios...</div>;
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
          throw new Error('Error al cargar clientes');
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
        throw new Error('Error al actualizar estado del cliente');
      }

      const { data: updatedClient } = await response.json();
      setClients(clients.map(client => 
        client.id === updatedClient.id ? updatedClient : client
      ));
    } catch (error) {

    }
  };

  if (isLoading) return <div>Cargando clientes...</div>;
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
            <Image src={service.image} alt={service.title} width={250} height={250} />
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
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Nueva categoría
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [showNewCat, setShowNewCat] = useState(false);

  // Nuevo archivo dentro de una categoría
  const [addingFileTo, setAddingFileTo] = useState(null);
  const [newFileName, setNewFileName] = useState('');
  const [newFileUrl, setNewFileUrl] = useState('');
  const [newFileType, setNewFileType] = useState('link');

  useEffect(() => { fetchResources(); }, []);

  const fetchResources = async () => {
    try {
      const res = await fetch('/api/resource');
      if (!res.ok) throw new Error('Error al cargar recursos');
      const { data } = await res.json();
      setResources(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCatName.trim()) return;
    try {
      const res = await fetch('/api/resource', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCatName.trim(), description: newCatDesc.trim() }),
      });
      if (!res.ok) throw new Error();
      const created = await res.json();
      setResources([...resources, { ...created, files: [] }]);
      setNewCatName(''); setNewCatDesc(''); setShowNewCat(false);
    } catch { }
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm('¿Eliminar esta categoría y todos sus archivos?')) return;
    try {
      const res = await fetch(`/api/resource/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setResources(resources.filter(r => r.id !== id));
    } catch { }
  };

  const handleAddFile = async (resourceId) => {
    if (!newFileName.trim() || !newFileUrl.trim()) return;
    try {
      const res = await fetch('/api/file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newFileName.trim(), url: newFileUrl.trim(), type: newFileType, resourceId }),
      });
      if (!res.ok) throw new Error();
      const file = await res.json();
      setResources(resources.map(r =>
        r.id === resourceId ? { ...r, files: [...r.files, file] } : r
      ));
      setNewFileName(''); setNewFileUrl(''); setNewFileType('link'); setAddingFileTo(null);
    } catch { }
  };

  const handleDeleteFile = async (fileId, resourceId) => {
    if (!confirm('¿Eliminar este archivo?')) return;
    try {
      const res = await fetch(`/api/file/${fileId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setResources(resources.map(r =>
        r.id === resourceId ? { ...r, files: r.files.filter(f => f.id !== fileId) } : r
      ));
    } catch { }
  };

  if (isLoading) return <div className="p-6">Cargando recursos...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <h1 className="text-xl md:text-2xl font-bold text-custom-blue">ADMINISTRADOR DE RECURSOS</h1>
        <button
          onClick={() => setShowNewCat(!showNewCat)}
          className="flex items-center gap-1 bg-custom-blue text-white px-4 py-2 rounded-lg hover:bg-custom-green hover:text-custom-blue transition-colors text-sm"
        >
          <PlusIcon className="h-4 w-4" /> Nueva categoría
        </button>
      </div>

      {showNewCat && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3 text-custom-blue">Nueva categoría</h3>
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={newCatName}
            onChange={e => setNewCatName(e.target.value)}
            className="border rounded px-3 py-2 w-full mb-2 text-sm"
          />
          <input
            type="text"
            placeholder="Descripción (opcional)"
            value={newCatDesc}
            onChange={e => setNewCatDesc(e.target.value)}
            className="border rounded px-3 py-2 w-full mb-3 text-sm"
          />
          <div className="flex gap-2">
            <button onClick={handleAddCategory} className="bg-custom-blue text-white px-4 py-2 rounded text-sm hover:bg-custom-green hover:text-custom-blue transition-colors">Crear</button>
            <button onClick={() => setShowNewCat(false)} className="border px-4 py-2 rounded text-sm hover:bg-gray-50">Cancelar</button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {resources.length === 0 && <p className="text-gray-500 text-sm">No hay categorías aún. Crea la primera.</p>}
        {resources.map(resource => (
          <div key={resource.id} className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-custom-blue">{resource.name}</h2>
                {resource.description && <p className="text-xs text-gray-500 mt-0.5">{resource.description}</p>}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setAddingFileTo(resource.id); setNewFileName(''); setNewFileUrl(''); setNewFileType('link'); }}
                  className="text-xs flex items-center gap-1 bg-custom-blue text-white px-3 py-1.5 rounded hover:bg-custom-green hover:text-custom-blue transition-colors"
                >
                  <PlusIcon className="h-3 w-3" /> Añadir
                </button>
                <button onClick={() => handleDeleteCategory(resource.id)} className="text-red-500 hover:text-red-700">
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {addingFileTo === resource.id && (
              <div className="bg-yellow-50 border-t border-yellow-200 px-4 py-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Nombre del archivo o enlace"
                    value={newFileName}
                    onChange={e => setNewFileName(e.target.value)}
                    className="border rounded px-2 py-1.5 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="URL (https://...)"
                    value={newFileUrl}
                    onChange={e => setNewFileUrl(e.target.value)}
                    className="border rounded px-2 py-1.5 text-sm"
                  />
                  <select
                    value={newFileType}
                    onChange={e => setNewFileType(e.target.value)}
                    className="border rounded px-2 py-1.5 text-sm"
                  >
                    <option value="link">Enlace web</option>
                    <option value="pdf">PDF</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleAddFile(resource.id)} className="bg-custom-blue text-white px-3 py-1.5 rounded text-sm hover:bg-custom-green hover:text-custom-blue transition-colors">Guardar</button>
                  <button onClick={() => setAddingFileTo(null)} className="border px-3 py-1.5 rounded text-sm hover:bg-gray-50">Cancelar</button>
                </div>
              </div>
            )}

            <ul className="divide-y">
              {resource.files.length === 0 && (
                <li className="px-4 py-3 text-sm text-gray-400 italic">Sin archivos aún.</li>
              )}
              {resource.files.map(file => (
                <li key={file.id} className="px-4 py-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${file.type === 'pdf' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                      {file.type === 'pdf' ? 'PDF' : 'Link'}
                    </span>
                    <a
                      href={/^https?:\/\//.test(file.url) ? file.url : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline truncate"
                    >
                      {file.name}
                    </a>
                  </div>
                  <button onClick={() => handleDeleteFile(file.id, resource.id)} className="text-red-400 hover:text-red-600 flex-shrink-0">
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
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