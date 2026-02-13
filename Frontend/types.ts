
export enum PropertyStatus {
  AVAILABLE = 'disponible',
  SOLD = 'vendido',
  RESERVED = 'reservado'
}

export enum PropertyType {
  HOUSE = 'casa',
  APARTMENT = 'apartamento',
  COMMERCIAL = 'local',
  LAND = 'terreno'
}

export interface Property {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  direccion: string;
  ciudad: string;
  tipo: PropertyType;
  habitaciones: number;
  banos: number;
  area: number;
  estado: PropertyStatus;
  userId: number;
  imagen?: string;
  createdAt?: string;
  updatedAt?: string;
  // El backend incluye el usuario en las respuestas de lista
  User?: {
    id: number;
    nombre: string;
    email: string;
  };
}

export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: 'admin' | 'vendedor' | 'cliente';
  telefono?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  message: string;
  user: {
    id: number;
    nombre: string;
    email: string;
    rol: string;
  };
  token: string;
}

// Added missing Sale interface
export interface Sale {
  id: number;
  propertyId: number;
  agentId: number;
  amount: number;
  date: string;
  clientName: string;
}
