import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Bell, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { notificacionesAPI, usuariosAPI } from '../services/api.ts';
import { Notificacion } from '../types/index.ts';

interface NotificacionForm {
  usuario: number;
  titulo: string;
  mensaje: string;
  tipo: 'info' | 'success' | 'warning' | 'error';
}

const NotificacionesPage: React.FC = () => {
  const queryClient = useQueryClient();
  
  const { data: notificacionesData } = useQuery('notificaciones', notificacionesAPI.getAll);
  const { data: usuariosData } = useQuery('usuarios', usuariosAPI.getAll);
  
  const notificaciones = notificacionesData?.data?.results || [];
  const usuarios = usuariosData?.data?.results || [];
  
  const notificacionForm = useForm<NotificacionForm>();
  
  const crearNotificacion = useMutation(notificacionesAPI.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('notificaciones');
      notificacionForm.reset();
      toast.success('Notificación enviada exitosamente');
    },
    onError: () => toast.error('Error al enviar notificación'),
  });
  
  const marcarLeida = useMutation(notificacionesAPI.marcarLeida, {
    onSuccess: () => {
      queryClient.invalidateQueries('notificaciones');
      toast.success('Notificación marcada como leída');
    },
    onError: () => toast.error('Error al marcar notificación'),
  });
  
  const onSubmitNotificacion = (data: NotificacionForm) => {
    crearNotificacion.mutate(data);
  };
  
  const handleMarcarLeida = (id: number) => {
    marcarLeida.mutate(id);
  };
  
  const getIconoTipo = (tipo: string) => {
    switch (tipo) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getColorTipo = (tipo: string) => {
    switch (tipo) {
      case 'success': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'error': return 'border-red-200 bg-red-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Formulario de Notificación */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <Bell className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold">Enviar Notificación</h2>
        </div>
        
        <form onSubmit={notificacionForm.handleSubmit(onSubmitNotificacion)} className="space-y-4">
          <select
            {...notificacionForm.register('usuario', { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona un usuario...</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nombre_completo || usuario.username} ({usuario.rol})
              </option>
            ))}
          </select>
          
          <input
            {...notificacionForm.register('titulo', { required: true })}
            placeholder="Título de la notificación"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <textarea
            {...notificacionForm.register('mensaje', { required: true })}
            placeholder="Mensaje de la notificación"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <select
            {...notificacionForm.register('tipo', { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="info">ℹ️ Información</option>
            <option value="success">✅ Éxito</option>
            <option value="warning">⚠️ Advertencia</option>
            <option value="error">❌ Error</option>
          </select>
          
          <button
            type="submit"
            disabled={crearNotificacion.isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {crearNotificacion.isLoading ? 'Enviando...' : 'Enviar Notificación'}
          </button>
        </form>
      </div>

      {/* Lista de Notificaciones */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">🔔 Notificaciones</h2>
        
        {notificaciones.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No hay notificaciones. ¡Envía la primera!
          </p>
        ) : (
          <div className="space-y-3">
            {notificaciones.map((notificacion) => (
              <div
                key={notificacion.id}
                className={`border rounded-lg p-4 ${getColorTipo(notificacion.tipo)} ${
                  notificacion.leida ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getIconoTipo(notificacion.tipo)}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{notificacion.titulo}</h3>
                      <p className="text-gray-700 mt-1">{notificacion.mensaje}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(notificacion.fecha_creacion).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  {!notificacion.leida && (
                    <button
                      onClick={() => handleMarcarLeida(notificacion.id)}
                      className="ml-4 text-sm bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                    >
                      Marcar leída
                    </button>
                  )}
                </div>
                
                {notificacion.leida && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      ✓ Leída
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificacionesPage;