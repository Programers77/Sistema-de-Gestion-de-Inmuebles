
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Users from './pages/Users';
import Login from './pages/Login';
import Register from './pages/Register';
import { authService, AuthUser } from './services/authService';
import { ICONS } from './constants';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = authService.isAuthenticated();
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const SidebarLink = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to === '/' && location.pathname === '');

  return (
    <Link 
      to={to} 
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        isActive 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <Icon />
      <span className="font-semibold text-sm">{label}</span>
    </Link>
  );
};

const Layout: React.FC<{ children: React.ReactNode, user: AuthUser | null, onLogout: () => void }> = ({ children, user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-white border-r border-slate-100 transition-all duration-300 z-50 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md">
              <span className="font-bold">E</span>
            </div>
            {isSidebarOpen && <span className="font-bold text-xl tracking-tight text-slate-900">EstatePro</span>}
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {/* <SidebarLink to="/" icon={ICONS.Dashboard} label={isSidebarOpen ? 'Tablero' : ''} /> */}
            <SidebarLink to="/properties" icon={ICONS.Properties} label={isSidebarOpen ? 'Propiedades' : ''} />
            <SidebarLink to="/users" icon={ICONS.Users} label={isSidebarOpen ? 'Usuarios' : ''} />
            {/* <SidebarLink to="/sales" icon={ICONS.Sales} label={isSidebarOpen ? 'Ventas' : ''} /> */}
          </nav>

          <div className="p-4 border-t border-slate-50">
            <button 
              onClick={onLogout}
              className={`w-full flex items-center ${isSidebarOpen ? 'space-x-3' : 'justify-center'} px-4 py-3 rounded-xl hover:bg-rose-50 hover:text-rose-600 text-slate-500 transition-colors`}
            >
              <ICONS.Logout />
              {isSidebarOpen && <span className="text-sm font-semibold">Cerrar Sesión</span>}
            </button>
          </div>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-1/2 -right-3 w-6 h-6 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-indigo-600 focus:outline-none"
        >
          {isSidebarOpen ? '‹' : '›'}
        </button>
      </aside>

      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <header className="h-20 bg-white bg-opacity-80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center text-slate-400">
            <span className="text-xs uppercase tracking-widest font-bold">Consola de {user?.rol}</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 border-l border-slate-100 pl-6">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{user?.nombre || 'Usuario'}</p>
                <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">{user?.email}</p>
              </div>
              <img src={`https://i.pravatar.cc/150?u=${user?.id}`} alt="Profile" className="w-10 h-10 rounded-full border border-slate-100 shadow-sm" />
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<AuthUser | null>(authService.getCurrentUser());

  const handleAuthSuccess = (response: any) => {
    setUser(response.user);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/login" 
          element={!user ? <Login onLoginSuccess={handleAuthSuccess} /> : <Navigate to="/properties" replace />} 
        />
        <Route 
          path="/register" 
          element={!user ? <Register onRegisterSuccess={handleAuthSuccess} /> : <Navigate to="/properties" replace />} 
        />
        
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Layout user={user} onLogout={handleLogout}>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/properties" 
          element={
            <ProtectedRoute>
              <Layout user={user} onLogout={handleLogout}>
                <Properties />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/users" 
          element={
            <ProtectedRoute>
              <Layout user={user} onLogout={handleLogout}>
                <Users />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/sales" 
          element={
            <ProtectedRoute>
              <Layout user={user} onLogout={handleLogout}>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/properties" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;