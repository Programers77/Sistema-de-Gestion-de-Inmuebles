
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';

interface RegisterProps {
  onRegisterSuccess: (data: any) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    rol: 'vendedor'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);
    try {
      const { confirmPassword, ...dataToSubmit } = formData;
      const response = await authService.register(dataToSubmit);
      onRegisterSuccess(response);
    } catch (err: any) {
      setError(err.message || 'Error al registrar usuario. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80" 
          className="w-full h-full object-cover opacity-30"
          alt="Inmobiliaria Registro"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-transparent to-slate-900"></div>
      </div>

      <div className="relative z-10 w-full max-w-xl p-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in-95 duration-700 mx-4">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg mx-auto mb-4 border border-white/20">
            <span className="font-bold text-3xl">E</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Únete a EstatePro</h1>
          <p className="text-slate-300 mt-2">Crea tu cuenta de agente y empieza a vender.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-500/20 border border-rose-500/50 rounded-xl text-rose-200 text-sm flex items-center">
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Nombre Completo</label>
            <input 
              type="text" 
              required
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-500"
              placeholder="Ej. Juan Pérez"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Correo Electrónico</label>
            <input 
              type="email" 
              required
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-500"
              placeholder="agente@estatepro.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Contraseña</label>
            <input 
              type="password" 
              required
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-500"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Confirmar</label>
            <input 
              type="password" 
              required
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-500"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          <div className="space-y-2">
             <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Teléfono</label>
             <input 
              type="text" 
              required
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-500"
              placeholder="0412..."
              value={formData.telefono}
              onChange={(e) => setFormData({...formData, telefono: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Rol</label>
            <select 
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.rol}
              onChange={(e) => setFormData({...formData, rol: e.target.value})}
            >
              <option value="vendedor" className="text-slate-900">Vendedor</option>
              <option value="cliente" className="text-slate-900">Cliente</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="md:col-span-2 mt-4 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/30 transition-all flex items-center justify-center disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Crear Cuenta Ahora'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-sm text-slate-400">
            ¿Ya tienes cuenta? <Link to="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 ml-1">Inicia Sesión aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;