import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { UserCircle, Users, Briefcase, FileText, LogOut, Menu, Zap, ReceiptText, ScrollText } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { PencilIcon, CheckIcon, XIcon, TrashIcon, PlusIcon } from '@heroicons/react/solid';


const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => {
  const { data: session, status } = useSession();
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
    <div className={`w-64 bg-custom-blue p-6 flex flex-col fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 overflow-y-auto`}>
      <div className="flex flex-col items-center mb-4">
        <Image
          src={userData.image}
          alt="User"
          width={80}
          height={80}
          className="rounded-full mb-2"
        />
        <h2 className="text-base font-bold text-custom-white">{userData.name?.toUpperCase() || ''}</h2>
        <p className="text-xs text-custom-white">{userData.email}</p>
      </div>
    <nav className="space-y-1 text-white">
      {[
        { icon: UserCircle, label: 'Perfil', value: 'profile' },
        { icon: Users, label: 'Usuarios', value: 'users' },
        { icon: Users, label: 'Clientes', value: 'clients' },
        { icon: Briefcase, label: 'Servicios', value: 'services' },
        { icon: FileText, label: 'Recursos', value: 'resources' },
        { icon: Zap, label: 'Automatización', value: 'automation' },
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
    <button
      onClick={() => signOut({ callbackUrl: `${window.location.origin}/auth/login` })}
      className="flex items-center mt-4 pt-4 border-t border-blue-400 text-left text-white"
    >
      <LogOut className="w-4 h-4 mr-2 text-red-400" />
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
  const [successMessage, setSuccessMessage] = useState('');

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
    setSuccessMessage('');
    setError(null);
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
        setSuccessMessage(result.message || 'Datos actualizados correctamente.');
        setPassword('');
      } catch (error) {
        setError(error.message);
      }
    }
  };
  if (isLoading) return <div>Cargando datos del usuario...</div>;
  if (error && !userData.name) return <div>Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-custom-blue">BIENVENIDO/A, {userData.name.toUpperCase()} {userData.lastname.toUpperCase()}</h1>
      {successMessage && <p className="mb-4 bg-green-100 text-green-700 border border-green-300 px-4 py-2 rounded text-sm">{successMessage}</p>}
      {error && <p className="mb-4 bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded text-sm">{error}</p>}
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

const EMPTY_USER_FORM = { username: '', email: '', password: '', name: '', lastname: '', phone: '', role: 'TEAM' };

const NewUserModal = ({ onClose, onCreated }) => {
  const [form, setForm] = useState(EMPTY_USER_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      const res = await fetch('/api/auth/register', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al crear usuario');
      onCreated(data);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="bg-custom-blue px-6 py-4 rounded-t-xl flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Nuevo Usuario</h2>
          <button onClick={onClose} className="text-white hover:text-blue-200">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-500 text-sm block mb-1">Nombre *</label>
              <input name="name" required value={form.name} onChange={handleChange} className="w-full p-2 border rounded text-sm" placeholder="Nombre" />
            </div>
            <div>
              <label className="text-slate-500 text-sm block mb-1">Apellido *</label>
              <input name="lastname" required value={form.lastname} onChange={handleChange} className="w-full p-2 border rounded text-sm" placeholder="Apellido" />
            </div>
            <div>
              <label className="text-slate-500 text-sm block mb-1">Nombre de usuario *</label>
              <input name="username" required value={form.username} onChange={handleChange} className="w-full p-2 border rounded text-sm" placeholder="usuario123" />
            </div>
            <div>
              <label className="text-slate-500 text-sm block mb-1">Teléfono *</label>
              <input name="phone" required value={form.phone} onChange={handleChange} className="w-full p-2 border rounded text-sm" placeholder="+56 9 1234 5678" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-slate-500 text-sm block mb-1">Correo electrónico *</label>
              <input name="email" type="email" required value={form.email} onChange={handleChange} className="w-full p-2 border rounded text-sm" placeholder="correo@ejemplo.cl" />
            </div>
            <div>
              <label className="text-slate-500 text-sm block mb-1">Contraseña * (mín. 8 caracteres)</label>
              <input name="password" type="password" required value={form.password} onChange={handleChange} className="w-full p-2 border rounded text-sm" placeholder="••••••••" />
            </div>
            <div>
              <label className="text-slate-500 text-sm block mb-1">Rol *</label>
              <select name="role" value={form.role} onChange={handleChange} className="w-full p-2 border rounded text-sm bg-white">
                <option value="TEAM">Equipo (TEAM)</option>
                <option value="CLIENT">Cliente (CLIENT)</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded text-sm hover:bg-gray-50">Cancelar</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-custom-blue text-white rounded text-sm hover:bg-custom-green hover:text-custom-blue transition-colors disabled:opacity-50">
              {loading ? 'Registrando...' : 'Crear Usuario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error('Error al cargar usuarios');
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, active: !currentStatus }),
      });
      if (!response.ok) throw new Error();
      const { data: updatedUser } = await response.json();
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    } catch {}
  };

  if (isLoading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <h1 className="text-xl md:text-2xl font-bold text-custom-blue">LISTADO DE USUARIOS</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 bg-custom-blue text-white px-4 py-2 rounded-lg hover:bg-custom-green hover:text-custom-blue transition-colors text-sm"
        >
          <PlusIcon className="h-4 w-4" /> Nuevo usuario
        </button>
      </div>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Nombre de Usuario</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Rol</th>
            <th className="px-4 py-2 text-left">Teléfono</th>
            <th className="px-4 py-2 text-left">Fecha registro</th>
            <th className="px-4 py-2 text-left">Última actualización</th>
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
              <td className="px-4 py-2">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${user.role === 'TEAM' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                  {user.role}
                </span>
              </td>
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
      {showModal && (
        <NewUserModal
          onClose={() => setShowModal(false)}
          onCreated={(newUser) => setUsers(prev => [...prev, newUser])}
        />
      )}
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

const AddResourceModal = ({ resources, onClose, onAdded }) => {
  const [form, setForm] = useState({ name: '', url: '', type: 'link', resourceId: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (resources.length > 0 && !form.resourceId) {
      setForm(f => ({ ...f, resourceId: resources[0].id }));
    }
  }, [resources]);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.url.trim() || !form.resourceId) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name.trim(), url: form.url.trim(), type: form.type, resourceId: Number(form.resourceId) }),
      });
      if (!res.ok) throw new Error('Error al agregar el recurso');
      const file = await res.json();
      onAdded(file, Number(form.resourceId));
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="bg-custom-blue px-6 py-4 rounded-t-xl flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Agregar recurso</h2>
          <button onClick={onClose} className="text-white hover:text-blue-200">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>}
          <div>
            <label className="text-slate-500 text-sm block mb-1">Categoría *</label>
            <select name="resourceId" value={form.resourceId} onChange={handleChange} className="w-full p-2 border rounded text-sm bg-white">
              {resources.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-slate-500 text-sm block mb-1">Nombre del recurso *</label>
            <input name="name" required value={form.name} onChange={handleChange} className="w-full p-2 border rounded text-sm" placeholder="Ej: Guía de contabilidad 2024" />
          </div>
          <div>
            <label className="text-slate-500 text-sm block mb-1">URL *</label>
            <input name="url" required value={form.url} onChange={handleChange} className="w-full p-2 border rounded text-sm" placeholder="https://..." />
          </div>
          <div>
            <label className="text-slate-500 text-sm block mb-1">Tipo</label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full p-2 border rounded text-sm bg-white">
              <option value="link">Enlace web</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded text-sm hover:bg-gray-50">Cancelar</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-custom-blue text-white rounded text-sm hover:bg-custom-green hover:text-custom-blue transition-colors disabled:opacity-50">
              {loading ? 'Guardando...' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ResourcesTab = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddResource, setShowAddResource] = useState(false);

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
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddResource(true)}
            className="flex items-center gap-1 bg-custom-green text-custom-blue px-4 py-2 rounded-lg hover:bg-custom-blue hover:text-white transition-colors text-sm font-medium"
          >
            <PlusIcon className="h-4 w-4" /> Agregar recurso
          </button>
          <button
            onClick={() => setShowNewCat(!showNewCat)}
            className="flex items-center gap-1 bg-custom-blue text-white px-4 py-2 rounded-lg hover:bg-custom-green hover:text-custom-blue transition-colors text-sm"
          >
            <PlusIcon className="h-4 w-4" /> Nueva categoría
          </button>
        </div>
      </div>
      {showAddResource && (
        <AddResourceModal
          resources={resources}
          onClose={() => setShowAddResource(false)}
          onAdded={(file, resourceId) => setResources(resources.map(r =>
            r.id === resourceId ? { ...r, files: [...r.files, file] } : r
          ))}
        />
      )}

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

// ═══════════════════════════════════════════════════════════════════════
// AUTOMATIZACIÓN — helpers
// ═══════════════════════════════════════════════════════════════════════
const POLL_INTERVAL = 2500;

// Si Vercel corta la función a medio camino (timeout) o el túnel del daemon
// cae, la respuesta es HTML/texto en vez de JSON. res.json() revienta con
// "JSON.parse: unexpected character...", con esto mostramos un error claro.
async function safeJson(res) {
  const text = await res.text();
  try { return JSON.parse(text); }
  catch { throw new Error('El servidor no respondió correctamente (revisa que el daemon esté activo).'); }
}

function useJobPoller(jobId, onUpdate) {
  React.useEffect(() => {
    if (!jobId) return;
    const iv = setInterval(async () => {
      try {
        const res = await fetch(`/api/automation?action=status&job_id=${jobId}`);
        if (res.status === 404) {
          clearInterval(iv);
          onUpdate({ status: 'error', error: 'Job no encontrado en el servidor (daemon reiniciado)', logs: [], progress: 0 });
          return;
        }
        if (!res.ok) return;
        const data = await res.json();
        onUpdate(data);
        if (data.status === 'done' || data.status === 'error' || data.status === 'stopped') {
          clearInterval(iv);
        }
      } catch {}
    }, POLL_INTERVAL);
    return () => clearInterval(iv);
  }, [jobId]);
}

const JobProgress = ({ job, onStop }) => {
  if (!job) return null;
  const isDone = job.status === 'done' || job.status === 'error' || job.status === 'stopped';
  const color  = job.status === 'done' ? 'bg-green-500' : job.status === 'error' ? 'bg-red-500' : 'bg-custom-blue';
  return (
    <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          {job.status === 'running' ? '⏳ Procesando...' :
           job.status === 'done'    ? '✅ Completado' :
           job.status === 'error'   ? '❌ Error' :
           job.status === 'stopped' ? '⏹️ Detenido' : '⏳ Iniciando...'}
        </span>
        {!isDone && (
          <button onClick={onStop} className="text-xs text-red-500 hover:underline">Detener</button>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div className={`${color} h-2 rounded-full transition-all`} style={{ width: `${job.progress}%` }} />
      </div>
      <div className="bg-white border border-gray-200 rounded p-2 max-h-48 overflow-y-auto text-xs font-mono text-gray-700 space-y-0.5">
        {(job.logs || []).slice(-80).map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
};

// ── Boletas Individual ───────────────────────────────────────────────────
const BoletasIndividual = () => {
  const today = new Date();
  const [form, setForm] = useState({
    rut: '', clave: '', headless: true,
    rut_dest: '', dv_dest: '', nombres_dest: '', domicilio: '', region: '', comuna: '',
    fecha_dia: String(today.getDate()).padStart(2, '0'),
    fecha_mes: String(today.getMonth() + 1).padStart(2, '0'),
    fecha_anio: String(today.getFullYear()),
    prestaciones: [{ glosa: '', valor: '' }, { glosa: '', valor: '' },
                   { glosa: '', valor: '' }, { glosa: '', valor: '' }],
  });
  const [jobId, setJobId] = useState(null);
  const [job, setJob]     = useState(null);
  const [error, setError] = useState(null);
  const running = job && (job.status === 'running' || job.status === 'pending');

  useJobPoller(jobId, setJob);

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const setPrest = (i, k, v) => setForm(f => {
    const p = [...f.prestaciones]; p[i] = { ...p[i], [k]: v }; return { ...f, prestaciones: p };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); setJob(null); setJobId(null);
    const prestaciones = form.prestaciones.filter(p => p.glosa.trim());
    if (!prestaciones.length) { setError('Ingresa al menos una prestación.'); return; }
    try {
      const res = await fetch('/api/automation', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'run_boletas_individual',
          rut: form.rut, clave: form.clave,
          rut_dest: form.rut_dest, dv_dest: form.dv_dest,
          nombres_dest: form.nombres_dest, domicilio: form.domicilio,
          region: form.region, comuna: form.comuna,
          fecha_dia: form.fecha_dia, fecha_mes: form.fecha_mes, fecha_anio: form.fecha_anio,
          headless: form.headless,
          prestaciones,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al iniciar');
      setJobId(data.job_id); setJob({ status: 'pending', progress: 0, logs: [] });
    } catch (e) { setError(e.message); }
  };

  const handleStop = async () => {
    if (!jobId) return;
    await fetch('/api/automation', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'stop', job_id: jobId }) });
  };

  const inputCls = 'w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-custom-blue';
  const labelCls = 'text-xs text-gray-500 mb-1 block';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className={labelCls}>RUT Emisor *</label>
          <input className={inputCls} placeholder="76.123.456-7" value={form.rut} onChange={e => setField('rut', e.target.value)} required /></div>
        <div><label className={labelCls}>Clave SII *</label>
          <input className={inputCls} type="password" placeholder="Clave SII" value={form.clave} onChange={e => setField('clave', e.target.value)} required /></div>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="headless_b" checked={form.headless} onChange={e => setField('headless', e.target.checked)} className="w-4 h-4 accent-custom-blue" />
        <label htmlFor="headless_b" className="text-sm text-gray-600">Modo silencioso (Headless) — no abre ventana del navegador</label>
      </div>
      <div className="border-t pt-3">
        <p className="text-xs font-semibold text-gray-600 mb-3">📅 Fecha de la boleta</p>
        <div className="grid grid-cols-3 gap-3">
          <div><label className={labelCls}>Día *</label>
            <input className={inputCls} type="number" min="1" max="31" value={form.fecha_dia} onChange={e => setField('fecha_dia', e.target.value)} required /></div>
          <div><label className={labelCls}>Mes *</label>
            <select className={inputCls} value={form.fecha_mes} onChange={e => setField('fecha_mes', e.target.value)} required>
              {['01','02','03','04','05','06','07','08','09','10','11','12'].map((m, i) => (
                <option key={m} value={m}>{['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'][i]}</option>
              ))}
            </select></div>
          <div><label className={labelCls}>Año *</label>
            <input className={inputCls} type="number" min="2020" max="2099" value={form.fecha_anio} onChange={e => setField('fecha_anio', e.target.value)} required /></div>
        </div>
      </div>
      <div className="border-t pt-3">
        <p className="text-xs font-semibold text-gray-600 mb-3">👤 Destinatario</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex gap-2">
            <div className="flex-1"><label className={labelCls}>RUT Destinatario *</label>
              <input className={inputCls} placeholder="12345678" value={form.rut_dest} onChange={e => setField('rut_dest', e.target.value)} required /></div>
            <div className="w-16"><label className={labelCls}>DV *</label>
              <input className={inputCls} placeholder="K" maxLength={1} value={form.dv_dest} onChange={e => setField('dv_dest', e.target.value)} required /></div>
          </div>
          <div><label className={labelCls}>Nombre / Razón Social *</label>
            <input className={inputCls} placeholder="Nombre completo" value={form.nombres_dest} onChange={e => setField('nombres_dest', e.target.value)} required /></div>
          <div><label className={labelCls}>Domicilio *</label>
            <input className={inputCls} placeholder="Calle 123, Ciudad" value={form.domicilio} onChange={e => setField('domicilio', e.target.value)} required /></div>
          <div><label className={labelCls}>Región</label>
            <input className={inputCls} placeholder="Antofagasta" value={form.region} onChange={e => setField('region', e.target.value)} /></div>
          <div><label className={labelCls}>Comuna *</label>
            <input className={inputCls} placeholder="Antofagasta" value={form.comuna} onChange={e => setField('comuna', e.target.value)} required /></div>
        </div>
      </div>
      <div className="border-t pt-3">
        <p className="text-xs font-semibold text-gray-600 mb-3">💼 Prestaciones (mín. 1)</p>
        {form.prestaciones.map((p, i) => (
          <div key={i} className="mb-3 border border-gray-200 rounded p-2">
            <label className={labelCls}>Prestación {i+1}{i===0?' *':''}</label>
            <textarea
              className={`${inputCls} resize-none mb-2`}
              rows={2}
              placeholder="Descripción de la prestación"
              value={p.glosa}
              onChange={e => setPrest(i,'glosa',e.target.value)}
            />
            <input
              className={inputCls}
              placeholder="Valor ($)"
              value={p.valor}
              onChange={e => setPrest(i,'valor',e.target.value)}
            />
          </div>
        ))}
      </div>
      <button type="submit" disabled={!!running}
        className="w-full py-2.5 bg-custom-blue text-white rounded font-semibold text-sm hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
        {running ? '⏳ Procesando...' : '🚀 Emitir Boleta'}
      </button>
      <JobProgress job={job} onStop={handleStop} />
    </form>
  );
};

// ── Boletas Masivo ───────────────────────────────────────────────────────
const BoletasMasivo = () => {
  const [file, setFile]         = useState(null);
  const [headless, setHeadless] = useState(true);
  const [jobId, setJobId]       = useState(null);
  const [job, setJob]           = useState(null);
  const [error, setError]       = useState(null);
  const running = job && (job.status === 'running' || job.status === 'pending');
  useJobPoller(jobId, setJob);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { setError('Selecciona un archivo Excel.'); return; }
    setError(null); setJob(null); setJobId(null);
    const fd = new FormData();
    fd.append('type', 'boletas');
    fd.append('archivo', file);
    fd.append('headless', headless ? 'true' : 'false');
    try {
      const res  = await fetch('/api/automation', { method: 'POST', body: fd });
      const data = await safeJson(res);
      if (!res.ok) throw new Error(data.error || 'Error al iniciar');
      setJobId(data.job_id); setJob({ status: 'pending', progress: 0, logs: [] });
    } catch (e) { setError(e.message); }
  };

  const handleStop = async () => {
    if (!jobId) return;
    await fetch('/api/automation', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'stop', job_id: jobId }) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>}
      <div className="flex items-center gap-2">
        <input type="checkbox" id="headless_bm" checked={headless} onChange={e => setHeadless(e.target.checked)} className="w-4 h-4 accent-custom-blue" />
        <label htmlFor="headless_bm" className="text-sm text-gray-600">Modo silencioso (Headless) — no abre ventana del navegador</label>
      </div>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-500 mb-3">Columnas: RUT | CLAVE | RUT_DEST | DV | NOMBRE_DEST | DOMICILIO | REGIÓN | COMUNA | FECHA_DIA | FECHA_MES | FECHA_ANIO | PRESTACION | VALOR</p>
        <input type="file" accept=".xlsx,.xls,.csv" onChange={e => setFile(e.target.files[0])} className="text-sm text-gray-600" />
        {file && <p className="text-xs text-green-600 mt-2">✅ {file.name}</p>}
      </div>
      <button type="submit" disabled={!!running || !file}
        className="w-full py-2.5 bg-custom-blue text-white rounded font-semibold text-sm hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
        {running ? '⏳ Procesando...' : '🚀 Iniciar proceso masivo'}
      </button>
      <JobProgress job={job} onStop={handleStop} />
    </form>
  );
};

// ── Facturas Individual ──────────────────────────────────────────────────
const FacturasIndividual = () => {
  const [form, setForm]   = useState({ rut_empresa: '', rut_usuario: '', clave: '' });
  const [jobId, setJobId] = useState(null);
  const [job, setJob]     = useState(null);
  const [error, setError] = useState(null);
  const running = job && (job.status === 'running' || job.status === 'pending');
  useJobPoller(jobId, setJob);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); setJob(null); setJobId(null);
    try {
      const res  = await fetch('/api/automation', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'run_facturas_individual', rut_empresa: form.rut_empresa,
          rut_usuario: form.rut_usuario || form.rut_empresa, clave: form.clave }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al iniciar');
      setJobId(data.job_id); setJob({ status: 'pending', progress: 0, logs: [] });
    } catch (e) { setError(e.message); }
  };

  const handleStop = async () => {
    if (!jobId) return;
    await fetch('/api/automation', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'stop', job_id: jobId }) });
  };

  const inputCls = 'w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-custom-blue';
  const labelCls = 'text-xs text-gray-500 mb-1 block';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className={labelCls}>RUT Empresa *</label>
          <input className={inputCls} placeholder="76.123.456-7" value={form.rut_empresa} onChange={e => setForm(f=>({...f,rut_empresa:e.target.value}))} required /></div>
        <div><label className={labelCls}>RUT Usuario (si es distinto)</label>
          <input className={inputCls} placeholder="Mismo que empresa si se deja vacío" value={form.rut_usuario} onChange={e => setForm(f=>({...f,rut_usuario:e.target.value}))} /></div>
        <div className="md:col-span-2"><label className={labelCls}>Clave SII *</label>
          <input className={inputCls} type="password" placeholder="Clave SII" value={form.clave} onChange={e => setForm(f=>({...f,clave:e.target.value}))} required /></div>
      </div>
      <button type="submit" disabled={!!running}
        className="w-full py-2.5 bg-custom-blue text-white rounded font-semibold text-sm hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
        {running ? '⏳ Procesando...' : '🚀 Aceptar Facturas'}
      </button>
      <JobProgress job={job} onStop={handleStop} />
    </form>
  );
};

// ── Facturas Masivo ──────────────────────────────────────────────────────
const FacturasMasivo = () => {
  const [file, setFile]   = useState(null);
  const [jobId, setJobId] = useState(null);
  const [job, setJob]     = useState(null);
  const [error, setError] = useState(null);
  const running = job && (job.status === 'running' || job.status === 'pending');
  useJobPoller(jobId, setJob);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { setError('Selecciona un archivo Excel.'); return; }
    setError(null); setJob(null); setJobId(null);
    const fd = new FormData(); fd.append('type','facturas'); fd.append('archivo',file);
    try {
      const res  = await fetch('/api/automation', { method: 'POST', body: fd });
      const data = await safeJson(res);
      if (!res.ok) throw new Error(data.error || 'Error al iniciar');
      setJobId(data.job_id); setJob({ status: 'pending', progress: 0, logs: [] });
    } catch (e) { setError(e.message); }
  };

  const handleStop = async () => {
    if (!jobId) return;
    await fetch('/api/automation', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'stop', job_id: jobId }) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-500 mb-3">Columnas: RUT_EMPRESA | RUT_USUARIO (opcional) | CLAVE</p>
        <input type="file" accept=".xlsx,.xls,.csv" onChange={e => setFile(e.target.files[0])} className="text-sm text-gray-600" />
        {file && <p className="text-xs text-green-600 mt-2">✅ {file.name}</p>}
      </div>
      <button type="submit" disabled={!!running || !file}
        className="w-full py-2.5 bg-custom-blue text-white rounded font-semibold text-sm hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
        {running ? '⏳ Procesando...' : '🚀 Iniciar proceso masivo'}
      </button>
      <JobProgress job={job} onStop={handleStop} />
    </form>
  );
};

// ── AutomationTab principal ──────────────────────────────────────────────
const AutomationTab = () => {
  const [activeProcess, setActiveProcess] = useState(null);
  const [activeMode, setActiveMode]       = useState('individual');
  const [daemonOk, setDaemonOk]           = useState(null);

  React.useEffect(() => {
    fetch('/api/automation?action=health')
      .then(r => r.ok ? r.json() : null)
      .then(d => setDaemonOk(d?.ok === true))
      .catch(() => setDaemonOk(false));
  }, []);

  const tabCls = (v) =>
    `px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
      activeMode === v ? 'border-custom-blue text-custom-blue bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'
    }`;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex items-center gap-3 mb-2">
        <Zap className="w-6 h-6 text-custom-blue" />
        <h1 className="text-xl md:text-2xl font-bold text-custom-blue">AUTOMATIZACIÓN</h1>
      </div>
      <div className={`text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-6 ${
        daemonOk === null ? 'bg-gray-100 text-gray-500' : daemonOk ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}>
        <span className={`w-2 h-2 rounded-full ${daemonOk === null ? 'bg-gray-400' : daemonOk ? 'bg-green-500' : 'bg-red-500'}`} />
        {daemonOk === null ? 'Verificando daemon...' : daemonOk ? 'Daemon conectado' : 'Daemon no disponible — ejecuta iniciar_daemon.bat en el PC'}
      </div>

      {!activeProcess ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button onClick={() => setActiveProcess('boletas')}
            className="group flex flex-col gap-4 border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-custom-blue transition-all text-left">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 group-hover:bg-custom-blue p-3 rounded-lg transition-colors">
                <ScrollText className="w-6 h-6 text-custom-blue group-hover:text-white transition-colors" />
              </div>
              <h2 className="font-bold text-custom-blue text-lg">Creación de Boletas</h2>
            </div>
            <p className="text-sm text-gray-500">Emite boletas de honorarios electrónicas en el SII. Modo individual o carga masiva por Excel.</p>
            <span className="text-xs font-medium text-custom-blue group-hover:underline mt-auto">Iniciar →</span>
          </button>
          <button onClick={() => setActiveProcess('facturas')}
            className="group flex flex-col gap-4 border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-custom-blue transition-all text-left">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 group-hover:bg-custom-blue p-3 rounded-lg transition-colors">
                <ReceiptText className="w-6 h-6 text-custom-blue group-hover:text-white transition-colors" />
              </div>
              <h2 className="font-bold text-custom-blue text-lg">Facturas Electrónicas</h2>
            </div>
            <p className="text-sm text-gray-500">Acepta facturas electrónicas pendientes en el SII. Modo individual o carga masiva por Excel.</p>
            <span className="text-xs font-medium text-custom-blue group-hover:underline mt-auto">Iniciar →</span>
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <button onClick={() => setActiveProcess(null)} className="text-sm text-gray-500 hover:text-custom-blue">← Volver</button>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-semibold text-custom-blue">
              {activeProcess === 'boletas' ? 'Creación de Boletas' : 'Facturas Electrónicas'}
            </span>
          </div>
          <div className="flex gap-1 border-b border-gray-200 mb-6">
            <button className={tabCls('individual')} onClick={() => setActiveMode('individual')}>👤 Individual</button>
            <button className={tabCls('masivo')} onClick={() => setActiveMode('masivo')}>📊 Masivo (Excel)</button>
          </div>
          {activeProcess === 'boletas'   && activeMode === 'individual' && <BoletasIndividual />}
          {activeProcess === 'boletas'   && activeMode === 'masivo'     && <BoletasMasivo />}
          {activeProcess === 'facturas'  && activeMode === 'individual' && <FacturasIndividual />}
          {activeProcess === 'facturas'  && activeMode === 'masivo'     && <FacturasMasivo />}
        </div>
      )}
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
        {activeTab === 'automation' && <AutomationTab />}
      </div>
    </div>
  );
}