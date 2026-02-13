
import React, { useState, useEffect, useMemo } from 'react';
import { ICONS } from '../constants';
import PropertyCard from '../components/PropertyCard';
import { Property, PropertyStatus, PropertyType } from '../types';
import { houseService } from '../services/houseService';
import { generatePropertyDescription } from '../services/geminiService';

const Properties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });
  const [activeTab, setActiveTab] = useState('Todas');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState<Omit<Property, 'id'>>({
    titulo: '',
    descripcion: '',
    precio: 0,
    direccion: '',
    ciudad: '',
    tipo: PropertyType.HOUSE,
    estado: PropertyStatus.AVAILABLE,
    habitaciones: 0,
    banos: 0,
    area: 0,
    userId: 0 // Será sobrescrito por el backend con el ID del token
  });

  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<{title: string, content: string} | null>(null);

  useEffect(() => {
    loadHouses();
  }, []);

  const loadHouses = async () => {
    try {
      const data = await houseService.getAll();
      setProperties(data);
    } catch (error) {
      console.error("Error al cargar propiedades:", error);
    }
  };

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const matchesSearch = p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           p.ciudad.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === 'Todas' || p.estado === activeTab;
      const matchesPrice = p.precio >= priceRange.min && p.precio <= priceRange.max;
      return matchesSearch && matchesTab && matchesPrice;
    });
  }, [properties, searchTerm, activeTab, priceRange]);

  const handleAIAction = async (id: string) => {
    const property = properties.find(p => p.id.toString() === id);
    if (!property) return;
    setAiLoading(true);
    try {
      // Mapeo temporal para el servicio de Gemini si usa nombres antiguos
      const mappedPropertyForAI = {
        ...property,
        title: property.titulo,
        location: `${property.ciudad}, ${property.direccion}`
      } as any;
      const description = await generatePropertyDescription(mappedPropertyForAI);
      setAiResult({ title: property.titulo, content: description });
    } finally {
      setAiLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingProperty(null);
    setFormData({
      titulo: '', descripcion: '', precio: 0, direccion: '', ciudad: '',
      tipo: PropertyType.HOUSE, estado: PropertyStatus.AVAILABLE,
      habitaciones: 0, banos: 0, area: 0, userId: 0
    });
    setIsModalOpen(true);
  };

  const openEditModal = (property: Property) => {
    setEditingProperty(property);
    setFormData({ ...property });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProperty) {
        await houseService.update(editingProperty.id.toString(), formData);
      } else {
        await houseService.create(formData);
      }
      loadHouses();
      setIsModalOpen(false);
    } catch (error) {
      alert("Error al guardar: " + error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este inmueble?')) {
      try {
        await houseService.delete(id.toString());
        setProperties(prev => prev.filter(p => p.id !== id));
      } catch (error) {
        alert("Error al eliminar");
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gestión de Inmuebles</h1>
          <p className="text-slate-500">Administra el inventario de propiedades en tiempo real.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-all flex items-center justify-center shadow-lg shadow-indigo-200"
        >
          <ICONS.Plus />
          <span className="ml-2">Nueva Propiedad</span>
        </button>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                  <ICONS.Search />
                </div>
                <input 
                  type="text" 
                  placeholder="Buscar por título, ciudad o dirección..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex bg-slate-50 p-1 rounded-xl">
                {['Todas', PropertyStatus.AVAILABLE, PropertyStatus.SOLD, PropertyStatus.RESERVED].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {tab === 'Todas' ? tab : tab}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-slate-50">
              <div className="flex items-center space-x-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Precio Mín ($):</span>
                <input 
                  type="number" 
                  className="w-24 px-2 py-1 bg-slate-50 rounded-lg text-sm outline-none"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
                />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Máx:</span>
                <input 
                  type="number" 
                  className="w-32 px-2 py-1 bg-slate-50 rounded-lg text-sm outline-none"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <div key={property.id} className="relative group">
                <PropertyCard 
                  property={property} 
                  onAIAction={handleAIAction}
                  onEdit={openEditModal}
                />
                <button 
                  onClick={() => handleDelete(property.id)}
                  className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur rounded-full text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-rose-100 hover:bg-rose-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
            ))}
          </div>
          
          {filteredProperties.length === 0 && (
            <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-400">No hay inmuebles que coincidan con la búsqueda.</p>
            </div>
          )}
        </div>

       
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">{editingProperty ? 'Editar Inmueble' : 'Registrar Venta'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Título Comercial</label>
                  <input required className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.titulo} onChange={e => setFormData({...formData, titulo: e.target.value})} />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Precio ($)</label>
                  <input type="number" required className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.precio} onChange={e => setFormData({...formData, precio: Number(e.target.value)})} />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tipo de Inmueble</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value as PropertyType})}>
                    <option value={PropertyType.HOUSE}>Casa</option>
                    <option value={PropertyType.APARTMENT}>Apartamento</option>
                    <option value={PropertyType.COMMERCIAL}>Local Comercial</option>
                    <option value={PropertyType.LAND}>Terreno</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ciudad</label>
                  <input required className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.ciudad} onChange={e => setFormData({...formData, ciudad: e.target.value})} />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dirección Exacta</label>
                  <input required className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.direccion} onChange={e => setFormData({...formData, direccion: e.target.value})} />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Estado</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.estado} onChange={e => setFormData({...formData, estado: e.target.value as PropertyStatus})}>
                    <option value={PropertyStatus.AVAILABLE}>Disponible</option>
                    <option value={PropertyStatus.SOLD}>Vendido</option>
                    <option value={PropertyStatus.RESERVED}>Reservado</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-3 md:col-span-2">
                   <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hab.</label>
                    <input type="number" className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.habitaciones} onChange={e => setFormData({...formData, habitaciones: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Baños</label>
                    <input type="number" className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.banos} onChange={e => setFormData({...formData, banos: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Area m²</label>
                    <input type="number" className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.area} onChange={e => setFormData({...formData, area: Number(e.target.value)})} />
                  </div>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Descripción</label>
                  <textarea rows={3} className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} />
                </div>
                
                <div className="md:col-span-2 pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-200 transition-all">Cancelar</button>
                  <button type="submit" className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98]">
                    {editingProperty ? 'Actualizar Datos' : 'Registrar Inmueble'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;
