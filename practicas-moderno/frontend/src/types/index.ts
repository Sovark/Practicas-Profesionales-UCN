export interface Usuario {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  nombre_completo?: string;
  rol: 'estudiante' | 'empresa' | 'coordinador';
  telefono?: string;
  fecha_registro: string;
  activo: boolean;
}

export interface Vacante {
  id: number;
  titulo: string;
  descripcion: string;
  empresa: number;
  empresa_nombre?: string;
  estado: 'activa' | 'pausada' | 'cerrada';
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface Postulacion {
  id: number;
  estudiante: number;
  estudiante_nombre?: string;
  vacante: number;
  vacante_titulo?: string;
  estado: 'pendiente' | 'revisando' | 'aceptada' | 'rechazada';
  fecha_postulacion: string;
  comentarios?: string;
}

export interface Informe {
  id: number;
  postulacion: number;
  calificacion: number;
  comentarios: string;
  habilidades_desarrolladas: string;
  recomendaria: boolean;
  fecha_informe: string;
}

export interface Notificacion {
  id: number;
  usuario: number;
  titulo: string;
  mensaje: string;
  tipo: 'info' | 'success' | 'warning' | 'error';
  leida: boolean;
  fecha_creacion: string;
}

export interface Estadisticas {
  total_usuarios: number;
  total_estudiantes: number;
  total_empresas: number;
  total_vacantes: number;
  total_postulaciones: number;
  total_informes: number;
  promedio_calificaciones: number;
}