
import React from 'react';
import { PropertyStatus, PropertyType, Property, User, Sale } from './types';

// Updated MOCK_PROPERTIES to match Property interface
export const MOCK_PROPERTIES: Property[] = [
  {
    id: 1,
    titulo: 'Villa de Lujo con Vista al Mar',
    precio: 1250000,
    direccion: 'Carrera 1',
    ciudad: 'Malibú',
    tipo: PropertyType.HOUSE,
    estado: PropertyStatus.AVAILABLE,
    habitaciones: 5,
    banos: 4,
    area: 4500,
    imagen: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    userId: 1,
    descripcion: 'Una impresionante villa moderna con vistas al Océano Pacífico.'
  },
  {
    id: 2,
    titulo: 'Penthouse Moderno en el Centro',
    precio: 850000,
    direccion: 'Avenida 5',
    ciudad: 'Nueva York',
    tipo: PropertyType.APARTMENT,
    estado: PropertyStatus.SOLD,
    habitaciones: 3,
    banos: 2,
    area: 2100,
    imagen: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    userId: 2,
    descripcion: 'Vistas impresionantes del horizonte de la ciudad desde el corazón de Manhattan.'
  },
  {
    id: 3,
    titulo: 'Casa Familiar Acogedora',
    precio: 450000,
    direccion: 'Calle 10',
    ciudad: 'Austin',
    tipo: PropertyType.HOUSE,
    estado: PropertyStatus.AVAILABLE,
    habitaciones: 4,
    banos: 3,
    area: 2800,
    imagen: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
    userId: 3,
    descripcion: 'Hogar cálido perfecto para familias.'
  },
  {
    id: 4,
    titulo: 'Espacio Comercial en Grand Avenue',
    precio: 2100000,
    direccion: 'Grand Ave',
    ciudad: 'Chicago',
    tipo: PropertyType.COMMERCIAL,
    estado: PropertyStatus.RESERVED,
    habitaciones: 0,
    banos: 2,
    area: 5500,
    imagen: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    userId: 1,
    descripcion: 'Excelente ubicación comercial.'
  },
  {
    id: 5,
    titulo: 'Loft Moderno en Distrito de Artes',
    precio: 620000,
    direccion: 'Arts District',
    ciudad: 'Los Ángeles',
    tipo: PropertyType.APARTMENT,
    estado: PropertyStatus.AVAILABLE,
    habitaciones: 2,
    banos: 2,
    area: 1500,
    imagen: 'https://images.unsplash.com/photo-1536376074432-cd22f0853507?auto=format&fit=crop&w=800&q=80',
    userId: 2,
    descripcion: 'Loft de diseño industrial.'
  }
];

// Updated MOCK_USERS to match User interface
export const MOCK_USERS: User[] = [
  { id: 1, nombre: 'Alex Rivera', rol: 'admin', email: 'alex@estatepro.com', isActive: true },
  { id: 2, nombre: 'Sarah Chen', rol: 'vendedor', email: 'sarah@estatepro.com', isActive: true },
  { id: 3, nombre: 'Marcus Johnson', rol: 'vendedor', email: 'marcus@estatepro.com', isActive: false },
];

// Updated MOCK_SALES with correct types
export const MOCK_SALES: Sale[] = [
  { id: 1, propertyId: 2, agentId: 2, amount: 850000, date: '2023-10-15', clientName: 'Jane Smith' },
  { id: 2, propertyId: 1, agentId: 1, amount: 1250000, date: '2023-11-02', clientName: 'Robert Dow' },
];

export const ICONS = {
  Dashboard: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  Properties: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  Users: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Sales: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  AI: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Logout: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
};
