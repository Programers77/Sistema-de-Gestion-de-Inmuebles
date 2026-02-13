
import React from 'react';
import { Property, PropertyStatus } from '../types';

interface PropertyCardProps {
  property: Property;
  onEdit?: (property: Property) => void;
  onAIAction?: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onEdit, onAIAction }) => {
  const getStatusColor = (status: PropertyStatus) => {
    switch (status) {
      case PropertyStatus.AVAILABLE: return 'bg-emerald-100 text-emerald-700';
      case PropertyStatus.SOLD: return 'bg-slate-100 text-slate-700';
      case PropertyStatus.RESERVED: return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: PropertyStatus) => {
    switch (status) {
      case PropertyStatus.AVAILABLE: return 'Disponible';
      case PropertyStatus.SOLD: return 'Vendido';
      case PropertyStatus.RESERVED: return 'Reservado';
      default: return status;
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-slate-200">
        <img 
          src={property.imagen || `https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80`} 
          alt={property.titulo} 
          className="w-full h-full object-cover" 
        />
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${getStatusColor(property.estado)}`}>
          {getStatusLabel(property.estado)}
        </span>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-slate-900 line-clamp-1 flex-1 mr-2">{property.titulo}</h3>
          <p className="text-indigo-600 font-bold">${Number(property.precio).toLocaleString()}</p>
        </div>
        <p className="text-slate-500 text-sm mb-4 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          {property.ciudad}, {property.direccion}
        </p>
        <div className="flex items-center space-x-4 text-slate-600 text-xs border-t border-slate-50 pt-4">
          <span className="flex items-center"><span className="font-bold mr-1">{property.habitaciones}</span> Hab</span>
          <span className="flex items-center"><span className="font-bold mr-1">{property.banos}</span> Baños</span>
          <span className="flex items-center"><span className="font-bold mr-1">{property.area}</span> m²</span>
        </div>
        <div className="mt-4 flex space-x-2">
         
          <button 
            onClick={() => onEdit?.(property)}
            className="p-2 text-slate-400 hover:text-slate-600 border border-slate-200 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
