
import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants';
import { User } from '../types';
import { userService } from '../services/userService';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    nombre: '',
    email: '',
    password: 'Password123!', // Password por defecto para creación rápida
    rol: 'vendedor' as User['rol'],
    telefono: ''
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  const filteredUsers = users.filter(u => 
    u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Usamos el servicio de auth/register para crear nuevos usuarios desde el panel de admin si fuera necesario
      // O un endpoint específico de creación. Asumiremos registro normal por ahora.
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      if (response.ok) {
        loadUsers();
        setIsModalOpen(false);
        setNewUser({ nombre: '', email: '', password: 'Password123!', rol: 'vendedor', telefono: '' });
      } else {
        const err = await response.json();
        alert(err.message);
      }
    } catch (error) {
      alert("Error al crear usuario");
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar a este usuario?')) {
      try {
        await userService.delete(id.toString());
        setUsers(prev => prev.filter(u => u.id !== id));
      } catch (error) {
        alert("No se pudo eliminar al usuario");
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gestión de Usuarios</h1>
          <p className="text-slate-500">Control de personal y permisos del sistema.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-all flex items-center justify-center shadow-lg shadow-indigo-200"
        >
          <ICONS.Plus />
          <span className="ml-2">Añadir Usuario</span>
        </button>
      </header>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-3 flex items-center text-slate-400">
              <ICONS.Search />
            </div>
            <input 
              type="text" 
              placeholder="Buscar por nombre o email..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Usuario</th>
                <th className="px-6 py-4">Rol</th>
                <th className="px-6 py-4">Teléfono</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold mr-3">
                        {user.nombre.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{user.nombre}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold capitalize ${
                      user.rol === 'admin' ? 'bg-indigo-100 text-indigo-700' : 
                      user.rol === 'vendedor' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {user.rol}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {user.telefono || 'Sin teléfono'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center text-sm ${user.isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${user.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      {user.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">Nuevo Usuario</h2>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nombre Completo</label>
                  <input required className="w-full px-5 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="Nombre completo" value={newUser.nombre} onChange={e => setNewUser({...newUser, nombre: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</label>
                  <input type="email" required className="w-full px-5 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="Correo corporativo" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rol</label>
                    <select className="w-full px-5 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" value={newUser.rol} onChange={e => setNewUser({...newUser, rol: e.target.value as User['rol']})}>
                      <option value="vendedor">Vendedor</option>
                      <option value="admin">Administrador</option>
                      <option value="cliente">Cliente</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Teléfono</label>
                    <input className="w-full px-5 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="0412..." value={newUser.telefono} onChange={e => setNewUser({...newUser, telefono: e.target.value})} />
                  </div>
                </div>
                <div className="flex gap-3 pt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-100 rounded-2xl font-bold text-slate-600">Cancelar</button>
                  <button type="submit" className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100">Crear Usuario</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
