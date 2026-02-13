
import { Property } from "../types";
import { getApiUrl, getAuthHeaders, handleResponse } from './apiConfig';

export const houseService = {
  // GET /api/properties
  getAll: async (): Promise<Property[]> => {
    const response = await fetch(getApiUrl('/properties'), {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // GET /api/properties/:id
  getById: async (id: string): Promise<Property> => {
    const response = await fetch(getApiUrl(`/properties/${id}`), {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // POST /api/properties
  create: async (houseData: Omit<Property, 'id'>): Promise<Property> => {
    const response = await fetch(getApiUrl('/properties'), {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(houseData),
    });
    return handleResponse(response);
  },

  // PUT /api/properties/:id
  update: async (id: string, houseData: Partial<Property>): Promise<Property> => {
    const response = await fetch(getApiUrl(`/properties/${id}`), {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(houseData),
    });
    return handleResponse(response);
  },

  // DELETE /api/properties/:id
  delete: async (id: string): Promise<void> => {
    const response = await fetch(getApiUrl(`/properties/${id}`), {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('No se pudo eliminar el inmueble');
  }
};
