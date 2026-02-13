
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import StatCard from '../components/StatCard';
import { ICONS, MOCK_PROPERTIES, MOCK_SALES, MOCK_USERS } from '../constants';

const Dashboard: React.FC = () => {
  const chartData = [
    { name: 'Ene', ventas: 4000 },
    { name: 'Feb', ventas: 3000 },
    { name: 'Mar', ventas: 2000 },
    { name: 'Abr', ventas: 2780 },
    { name: 'May', ventas: 1890 },
    { name: 'Jun', ventas: 2390 },
    { name: 'Jul', ventas: 3490 },
  ];

  const propertyTypeData = useMemo(() => {
    const counts: Record<string, number> = {};
    MOCK_PROPERTIES.forEach(p => {
      // Changed p.type to p.tipo
      counts[p.tipo] = (counts[p.tipo] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, []);

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Vista General del Mercado</h1>
        <p className="text-slate-500 mt-1">Sigue el rendimiento de tu agencia y listados.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Propiedades" 
          value={MOCK_PROPERTIES.length} 
          icon={<ICONS.Properties />} 
          trend={{ value: 12, isUp: true }}
          color="bg-indigo-500"
        />
        <StatCard 
          title="Ventas Totales" 
          value={`$${(MOCK_SALES.reduce((acc, s) => acc + s.amount, 0) / 1000000).toFixed(1)}M`} 
          icon={<ICONS.Sales />} 
          trend={{ value: 8, isUp: true }}
          color="bg-emerald-500"
        />
        <StatCard 
          title="Agentes Activos" 
          // Changed u.status to u.isActive
          value={MOCK_USERS.filter(u => u.isActive).length} 
          icon={<ICONS.Users />} 
          color="bg-amber-500"
        />
        <StatCard 
          title="Consultas Pendientes" 
          value="42" 
          icon={<ICONS.Plus />} 
          trend={{ value: 5, isUp: false }}
          color="bg-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Crecimiento de Ingresos</h3>
            <select className="text-sm bg-slate-50 border-none rounded-lg px-3 py-1 text-slate-600 outline-none">
              <option>Últimos 6 meses</option>
              <option>Último año</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                {/* Fixed: removed invalid 'label' prop which was causing TS error */}
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                {/* Fixed: added 'name' prop to define the series label for the tooltip */}
                <Area type="monotone" dataKey="ventas" name="Ventas" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Distribución por Tipo</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={propertyTypeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} width={80} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" name="Cantidad" radius={[0, 4, 4, 0]} barSize={20}>
                  {propertyTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Ventas Recientes</h3>
          <button className="text-indigo-600 text-sm font-semibold hover:underline">Ver Todo</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Propiedad</th>
                <th className="px-6 py-4 font-semibold">Agente</th>
                <th className="px-6 py-4 font-semibold">Cliente</th>
                <th className="px-6 py-4 font-semibold">Monto</th>
                <th className="px-6 py-4 font-semibold">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_SALES.map((sale) => {
                const property = MOCK_PROPERTIES.find(p => p.id === sale.propertyId);
                const agent = MOCK_USERS.find(u => u.id === sale.agentId);
                return (
                  <tr key={sale.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {/* Changed property.image to property.imagen and property.title to property.titulo */}
                        <img src={property?.imagen} className="w-10 h-10 rounded-lg object-cover mr-3" />
                        <span className="font-medium text-slate-900">{property?.titulo}</span>
                      </div>
                    </td>
                    {/* Changed agent.name to agent.nombre */}
                    <td className="px-6 py-4 text-slate-600">{agent?.nombre}</td>
                    <td className="px-6 py-4 text-slate-600">{sale.clientName}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">${sale.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-500">{sale.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
