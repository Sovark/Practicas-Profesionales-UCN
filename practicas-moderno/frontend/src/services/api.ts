import axios from 'axios';
import { Usuario, Vacante, Postulacion, Informe, Notificacion, Estadisticas } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Usuarios
export const usuariosAPI = {
  getAll: () => api.get<Usuario[]>('/usuarios/'),
  getById: (id: number) => api.get<Usuario>(`/usuarios/${id}/`),
  create: (data: Partial<Usuario>) => api.post<Usuario>('/usuarios/', data),
  update: (id: number, data: Partial<Usuario>) => api.put<Usuario>(`/usuarios/${id}/`, data),
  delete: (id: number) => api.delete(`/usuarios/${id}/`),
  getEstudiantes: () => api.get<Usuario[]>('/usuarios/estudiantes/'),
  getEmpresas: () => api.get<Usuario[]>('/usuarios/empresas/'),
  getEstadisticas: () => api.get<Estadisticas>('/usuarios/estadisticas/'),
};

// Vacantes
export const vacantesAPI = {
  getAll: () => api.get<Vacante[]>('/vacantes/'),
  getById: (id: number) => api.get<Vacante>(`/vacantes/${id}/`),
  create: (data: Partial<Vacante>) => api.post<Vacante>('/vacantes/', data),
  update: (id: number, data: Partial<Vacante>) => api.put<Vacante>(`/vacantes/${id}/`, data),
  delete: (id: number) => api.delete(`/vacantes/${id}/`),
};

// Postulaciones
export const postulacionesAPI = {
  getAll: () => api.get<Postulacion[]>('/postulaciones/'),
  getById: (id: number) => api.get<Postulacion>(`/postulaciones/${id}/`),
  create: (data: Partial<Postulacion>) => api.post<Postulacion>('/postulaciones/', data),
  update: (id: number, data: Partial<Postulacion>) => api.put<Postulacion>(`/postulaciones/${id}/`, data),
  delete: (id: number) => api.delete(`/postulaciones/${id}/`),
};

// Informes
export const informesAPI = {
  getAll: () => api.get<Informe[]>('/informes/'),
  getById: (id: number) => api.get<Informe>(`/informes/${id}/`),
  create: (data: Partial<Informe>) => api.post<Informe>('/informes/', data),
  update: (id: number, data: Partial<Informe>) => api.put<Informe>(`/informes/${id}/`, data),
  delete: (id: number) => api.delete(`/informes/${id}/`),
};

// Notificaciones
export const notificacionesAPI = {
  getAll: () => api.get<Notificacion[]>('/notificaciones/'),
  getByUsuario: (usuarioId: number) => api.get<Notificacion[]>(`/notificaciones/?usuario=${usuarioId}`),
  marcarLeida: (id: number) => api.patch(`/notificaciones/${id}/`, { leida: true }),
};

export default api;