
import { User } from "../types";
import { getApiUrl, getAuthHeaders, handleResponse } from './apiConfig';

export const userService = {
  // GET /users (auth)
  getAll: async (): Promise<User[]> => {
    const response = await fetch(getApiUrl('/users'), {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // PUT /users/:id (auth)
  update: async (id: string, userData: Partial<User>): Promise<User> => {
    const response = await fetch(getApiUrl(`/users/${id}`), {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // DELETE /users/:id (auth)
  delete: async (id: string): Promise<void> => {
    const response = await fetch(getApiUrl(`/users/${id}`), {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('No se pudo eliminar el usuario');
  }
};
