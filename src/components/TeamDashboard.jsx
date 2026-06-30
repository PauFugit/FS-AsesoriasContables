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
    setError(null);
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
        setPassword('');
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (isLoading) return <div>Cargando datos...</div>;
  if (error && !userData.name) return <div>Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-6">BIENVENIDO/A, {userData.name.toUpperCase()} {userData.lastname.toUpperCase()}</h1>
      {error && <p className="mb-4 bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded text-sm">{error}</p>}
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

// ═══════════════════════════════════════════════════════════════════════
// AUTOMATIZACIÓN — helpers
// ═══════════════════════════════════════════════════════════════════════
const POLL_INTERVAL = 2500; // ms entre polling al status del job

// Si Vercel corta la función a medio camino (timeout) o el túnel del daemon
// cae, la respuesta es HTML/texto en vez de JSON. res.json() revienta con
// "JSON.parse: unexpected character..."; con esto mostramos un error claro.
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
          // Job no existe en el daemon (reinicio u otra sesión) — detener polling
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

// ── Panel de progreso compartido ─────────────────────────────────────────
const JobProgress = ({ job, onStop }) => {
  if (!job) return null;
  const isDone = job.status === 'done' || job.status === 'error' || job.status === 'stopped';
  const color   = job.status === 'done' ? 'bg-green-500' : job.status === 'error' ? 'bg-red-500' : 'bg-custom-blue';
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

// ═══════════════════════════════════════════════════════════════════════
// BOLETAS — formulario individual
// ═══════════════════════════════════════════════════════════════════════
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
  const [job, setJob] = useState(null);
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      setJobId(data.job_id);
      setJob({ status: 'pending', progress: 0, logs: [] });
    } catch (e) { setError(e.message); }
  };

  const handleStop = async () => {
    if (!jobId) return;
    await fetch('/api/automation', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'stop', job_id: jobId }),
    });
  };

  const inputCls = 'w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-custom-blue';
  const labelCls = 'text-xs text-gray-500 mb-1 block';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>RUT Emisor *</label>
          <input className={inputCls} placeholder="76.123.456-7" value={form.rut}
            onChange={e => setField('rut', e.target.value)} required />
        </div>
        <div>
          <label className={labelCls}>Clave SII *</label>
          <input className={inputCls} type="password" placeholder="Clave SII" value={form.clave}
            onChange={e => setField('clave', e.target.value)} required />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="headless_b" checked={form.headless} onChange={e => setField('headless', e.target.checked)} className="w-4 h-4 accent-custom-blue" />
        <label htmlFor="headless_b" className="text-sm text-gray-600">Modo silencioso (Headless) — no abre ventana del navegador</label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      </div>

      <div className="border-t pt-3">
        <p className="text-xs font-semibold text-gray-600 mb-3">📅 Fecha de la boleta</p>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className={labelCls}>Día *</label>
            <input className={inputCls} type="number" min="1" max="31" placeholder="DD"
              value={form.fecha_dia} onChange={e => setField('fecha_dia', e.target.value)} required />
          </div>
          <div>
            <label className={labelCls}>Mes *</label>
            <select className={inputCls} value={form.fecha_mes} onChange={e => setField('fecha_mes', e.target.value)} required>
              {['01','02','03','04','05','06','07','08','09','10','11','12'].map((m, i) => (
                <option key={m} value={m}>{['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'][i]}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Año *</label>
            <input className={inputCls} type="number" min="2020" max="2099" placeholder="AAAA"
              value={form.fecha_anio} onChange={e => setField('fecha_anio', e.target.value)} required />
          </div>
        </div>
      </div>

      <div className="border-t pt-3">
        <p className="text-xs font-semibold text-gray-600 mb-3">👤 Destinatario</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className={labelCls}>RUT Destinatario *</label>
              <input className={inputCls} placeholder="12345678" value={form.rut_dest}
                onChange={e => setField('rut_dest', e.target.value)} required />
            </div>
            <div className="w-16">
              <label className={labelCls}>DV *</label>
              <input className={inputCls} placeholder="K" maxLength={1} value={form.dv_dest}
                onChange={e => setField('dv_dest', e.target.value)} required />
            </div>
          </div>
          <div>
            <label className={labelCls}>Nombre / Razón Social *</label>
            <input className={inputCls} placeholder="Nombre completo" value={form.nombres_dest}
              onChange={e => setField('nombres_dest', e.target.value)} required />
          </div>
          <div>
            <label className={labelCls}>Domicilio *</label>
            <input className={inputCls} placeholder="Calle 123, Ciudad" value={form.domicilio}
              onChange={e => setField('domicilio', e.target.value)} required />
          </div>
          <div>
            <label className={labelCls}>Región</label>
            <input className={inputCls} placeholder="Antofagasta" value={form.region}
              onChange={e => setField('region', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Comuna *</label>
            <input className={inputCls} placeholder="Antofagasta" value={form.comuna}
              onChange={e => setField('comuna', e.target.value)} required />
          </div>
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
              onChange={e => setPrest(i, 'glosa', e.target.value)}
            />
            <input
              className={inputCls}
              placeholder="Valor ($)"
              value={p.valor}
              onChange={e => setPrest(i, 'valor', e.target.value)}
            />
          </div>
        ))}
      </div>

      <button type="submit" disabled={!!running}
        className="w-full py-2.5 bg-custom-blue text-white rounded font-semibold text-sm
                   hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
        {running ? '⏳ Procesando...' : '🚀 Emitir Boleta'}
      </button>

      <JobProgress job={job} onStop={handleStop} />
    </form>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// BOLETAS — masivo Excel
// ═══════════════════════════════════════════════════════════════════════
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
      const res = await fetch('/api/automation', { method: 'POST', body: fd });
      const data = await safeJson(res);
      if (!res.ok) throw new Error(data.error || 'Error al iniciar');
      setJobId(data.job_id);
      setJob({ status: 'pending', progress: 0, logs: [] });
    } catch (e) { setError(e.message); }
  };

  const handleStop = async () => {
    if (!jobId) return;
    await fetch('/api/automation', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'stop', job_id: jobId }),
    });
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
        <p className="text-sm text-gray-500 mb-3">
          Columnas requeridas: RUT | CLAVE | RUT_DEST | DV | NOMBRE_DEST | DOMICILIO | REGIÓN | COMUNA | FECHA_DIA | FECHA_MES | FECHA_ANIO | PRESTACION | VALOR
        </p>
        <input type="file" accept=".xlsx,.xls,.csv" onChange={e => setFile(e.target.files[0])}
          className="text-sm text-gray-600" />
        {file && <p className="text-xs text-green-600 mt-2">✅ {file.name}</p>}
      </div>
      <button type="submit" disabled={!!running || !file}
        className="w-full py-2.5 bg-custom-blue text-white rounded font-semibold text-sm
                   hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
        {running ? '⏳ Procesando...' : '🚀 Iniciar proceso masivo'}
      </button>
      <JobProgress job={job} onStop={handleStop} />
    </form>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// FACTURAS — formulario individual
// ═══════════════════════════════════════════════════════════════════════
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
      const res = await fetch('/api/automation', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'run_facturas_individual',
          rut_empresa: form.rut_empresa,
          rut_usuario: form.rut_usuario || form.rut_empresa,
          clave: form.clave,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al iniciar');
      setJobId(data.job_id);
      setJob({ status: 'pending', progress: 0, logs: [] });
    } catch (e) { setError(e.message); }
  };

  const handleStop = async () => {
    if (!jobId) return;
    await fetch('/api/automation', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'stop', job_id: jobId }),
    });
  };

  const inputCls = 'w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-custom-blue';
  const labelCls = 'text-xs text-gray-500 mb-1 block';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>RUT Empresa *</label>
          <input className={inputCls} placeholder="76.123.456-7" value={form.rut_empresa}
            onChange={e => setForm(f => ({ ...f, rut_empresa: e.target.value }))} required />
        </div>
        <div>
          <label className={labelCls}>RUT Usuario (si es distinto)</label>
          <input className={inputCls} placeholder="Mismo que empresa si se deja vacío" value={form.rut_usuario}
            onChange={e => setForm(f => ({ ...f, rut_usuario: e.target.value }))} />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Clave SII *</label>
          <input className={inputCls} type="password" placeholder="Clave SII" value={form.clave}
            onChange={e => setForm(f => ({ ...f, clave: e.target.value }))} required />
        </div>
      </div>
      <button type="submit" disabled={!!running}
        className="w-full py-2.5 bg-custom-blue text-white rounded font-semibold text-sm
                   hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
        {running ? '⏳ Procesando...' : '🚀 Aceptar Facturas'}
      </button>
      <JobProgress job={job} onStop={handleStop} />
    </form>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// FACTURAS — masivo Excel
// ═══════════════════════════════════════════════════════════════════════
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
    const fd = new FormData();
    fd.append('type', 'facturas');
    fd.append('archivo', file);
    try {
      const res = await fetch('/api/automation', { method: 'POST', body: fd });
      const data = await safeJson(res);
      if (!res.ok) throw new Error(data.error || 'Error al iniciar');
      setJobId(data.job_id);
      setJob({ status: 'pending', progress: 0, logs: [] });
    } catch (e) { setError(e.message); }
  };

  const handleStop = async () => {
    if (!jobId) return;
    await fetch('/api/automation', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'stop', job_id: jobId }),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-500 mb-3">
          Columnas requeridas: RUT_EMPRESA | RUT_USUARIO (opcional) | CLAVE
        </p>
        <input type="file" accept=".xlsx,.xls,.csv" onChange={e => setFile(e.target.files[0])}
          className="text-sm text-gray-600" />
        {file && <p className="text-xs text-green-600 mt-2">✅ {file.name}</p>}
      </div>
      <button type="submit" disabled={!!running || !file}
        className="w-full py-2.5 bg-custom-blue text-white rounded font-semibold text-sm
                   hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
        {running ? '⏳ Procesando...' : '🚀 Iniciar proceso masivo'}
      </button>
      <JobProgress job={job} onStop={handleStop} />
    </form>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// AUTOMATION TAB principal
// ═══════════════════════════════════════════════════════════════════════
const AutomationTab = () => {
  const [activeProcess, setActiveProcess] = useState(null); // 'boletas' | 'facturas'
  const [activeMode, setActiveMode]       = useState('individual'); // 'individual' | 'masivo'
  const [daemonOk, setDaemonOk]           = useState(null); // null | true | false

  // Verificar que el daemon está accesible
  React.useEffect(() => {
    fetch('/api/automation?action=health')
      .then(r => r.ok ? r.json() : null)
      .then(d => setDaemonOk(d?.ok === true))
      .catch(() => setDaemonOk(false));
  }, []);

  const tabCls = (v) =>
    `px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
      activeMode === v
        ? 'border-custom-blue text-custom-blue bg-white'
        : 'border-transparent text-gray-500 hover:text-gray-700'
    }`;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex items-center gap-3 mb-2">
        <Zap className="w-6 h-6 text-custom-blue" />
        <h1 className="text-xl md:text-2xl font-bold text-custom-blue">AUTOMATIZACIÓN</h1>
      </div>

      {/* Estado del daemon */}
      <div className={`text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-6 ${
        daemonOk === null ? 'bg-gray-100 text-gray-500' :
        daemonOk ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}>
        <span className={`w-2 h-2 rounded-full ${
          daemonOk === null ? 'bg-gray-400' : daemonOk ? 'bg-green-500' : 'bg-red-500'
        }`} />
        {daemonOk === null ? 'Verificando daemon...' :
         daemonOk ? 'Daemon conectado' : 'Daemon no disponible — ejecuta iniciar_daemon.bat en el PC'}
      </div>

      {/* Selector de proceso */}
      {!activeProcess ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button onClick={() => setActiveProcess('boletas')}
            className="group flex flex-col gap-4 border border-gray-200 rounded-lg p-6
                       hover:shadow-md hover:border-custom-blue transition-all text-left">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 group-hover:bg-custom-blue p-3 rounded-lg transition-colors">
                <ScrollText className="w-6 h-6 text-custom-blue group-hover:text-white transition-colors" />
              </div>
              <h2 className="font-bold text-custom-blue text-lg">Creación de Boletas</h2>
            </div>
            <p className="text-sm text-gray-500">
              Emite boletas de honorarios electrónicas en el SII. Modo individual o carga masiva por Excel.
            </p>
            <span className="text-xs font-medium text-custom-blue group-hover:underline mt-auto">Iniciar →</span>
          </button>

          <button onClick={() => setActiveProcess('facturas')}
            className="group flex flex-col gap-4 border border-gray-200 rounded-lg p-6
                       hover:shadow-md hover:border-custom-blue transition-all text-left">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 group-hover:bg-custom-blue p-3 rounded-lg transition-colors">
                <ReceiptText className="w-6 h-6 text-custom-blue group-hover:text-white transition-colors" />
              </div>
              <h2 className="font-bold text-custom-blue text-lg">Facturas Electrónicas</h2>
            </div>
            <p className="text-sm text-gray-500">
              Acepta facturas electrónicas pendientes en el SII. Modo individual o carga masiva por Excel.
            </p>
            <span className="text-xs font-medium text-custom-blue group-hover:underline mt-auto">Iniciar →</span>
          </button>
        </div>
      ) : (
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4">
            <button onClick={() => setActiveProcess(null)}
              className="text-sm text-gray-500 hover:text-custom-blue">← Volver</button>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-semibold text-custom-blue">
              {activeProcess === 'boletas' ? 'Creación de Boletas' : 'Facturas Electrónicas'}
            </span>
          </div>

          {/* Tabs Individual / Masivo */}
          <div className="flex gap-1 border-b border-gray-200 mb-6">
            <button className={tabCls('individual')} onClick={() => setActiveMode('individual')}>
              👤 Individual
            </button>
            <button className={tabCls('masivo')} onClick={() => setActiveMode('masivo')}>
              📊 Masivo (Excel)
            </button>
          </div>

          {activeProcess === 'boletas' && activeMode === 'individual' && <BoletasIndividual />}
          {activeProcess === 'boletas' && activeMode === 'masivo'     && <BoletasMasivo />}
          {activeProcess === 'facturas' && activeMode === 'individual' && <FacturasIndividual />}
          {activeProcess === 'facturas' && activeMode === 'masivo'    && <FacturasMasivo />}
        </div>
      )}
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
