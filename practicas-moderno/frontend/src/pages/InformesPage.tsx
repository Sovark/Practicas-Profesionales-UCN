import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FileText, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { informesAPI, postulacionesAPI } from '../services/api.ts';
import { Informe } from '../types/index.ts';

interface InformeForm {
  postulacion: number;
  calificacion: number;
  comentarios: string;
  habilidades_desarrolladas: string;
  recomendaria: boolean;
}

const InformesPage: React.FC = () => {
  const queryClient = useQueryClient();
  
  const { data: informesData } = useQuery('informes', informesAPI.getAll);
  const { data: postulacionesData } = useQuery('postulaciones', postulacionesAPI.getAll);
  
  const informes = informesData?.data?.results || [];
  const postulaciones = postulacionesData?.data?.results || [];
  
  const informeForm = useForm<InformeForm>();
  
  const crearInforme = useMutation(informesAPI.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('informes');
      informeForm.reset();
      toast.success('Informe creado exitosamente');
    },
    onError: () => toast.error('Error al crear informe'),
  });
  
  const onSubmitInforme = (data: InformeForm) => {
    crearInforme.mutate(data);
  };
  
  const postulacionesAceptadas = postulaciones.filter(p => p.estado === 'aceptada');
  const postulacionesConInforme = informes.map(i => i.postulacion);
  const postulacionesSinInforme = postulacionesAceptadas.filter(
    p => !postulacionesConInforme.includes(p.id)
  );

  return (
    <div className="space-y-6">
      {/* Formulario de Informe */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <FileText className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold">Crear Informe de Práctica</h2>
        </div>
        
        <form onSubmit={informeForm.handleSubmit(onSubmitInforme)} className="space-y-4">
          <select
            {...informeForm.register('postulacion', { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona una práctica completada...</option>
            {postulacionesSinInforme.map((postulacion) => (
              <option key={postulacion.id} value={postulacion.id}>
                {postulacion.estudiante_nombre} - {postulacion.vacante_titulo}
              </option>
            ))}
          </select>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calificación (1-5)
            </label>
            <select
              {...informeForm.register('calificacion', { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona calificación...</option>
              {[1,2,3,4,5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          <textarea
            {...informeForm.register('comentarios', { required: true })}
            placeholder="Comentarios sobre el desempeño del estudiante"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <textarea
            {...informeForm.register('habilidades_desarrolladas', { required: true })}
            placeholder="Habilidades desarrolladas durante la práctica"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="flex items-center">
            <input
              {...informeForm.register('recomendaria')}
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              ¿Recomendarías a este estudiante?
            </label>
          </div>
          
          <button
            type="submit"
            disabled={crearInforme.isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {crearInforme.isLoading ? 'Creando...' : 'Crear Informe'}
          </button>
        </form>
      </div>

      {/* Lista de Informes */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">📋 Informes de Práctica</h2>
        
        {informes.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No hay informes registrados. ¡Crea el primero!
          </p>
        ) : (
          <div className="grid gap-4">
            {informes.map((informe) => (
              <div key={informe.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{informe.estudiante_nombre}</h3>
                    <p className="text-gray-600">{informe.vacante_titulo}</p>
                    <p className="text-sm text-gray-500">{informe.empresa_nombre}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-semibold">{informe.calificacion}/5</span>
                    </div>
                    {informe.recomendaria ? (
                      <ThumbsUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <ThumbsDown className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <h4 className="font-medium text-sm text-gray-700">Comentarios:</h4>
                    <p className="text-sm text-gray-600">{informe.comentarios}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-700">Habilidades Desarrolladas:</h4>
                    <p className="text-sm text-gray-600">{informe.habilidades_desarrolladas}</p>
                  </div>
                </div>
                
                <p className="text-xs text-gray-400 mt-3">
                  Fecha: {new Date(informe.fecha_informe).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InformesPage;