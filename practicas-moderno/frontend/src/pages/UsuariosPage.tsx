import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Plus, User, Building2 } from 'lucide-react';
import { usuariosAPI, vacantesAPI, postulacionesAPI } from '../services/api';
import { Usuario, Vacante } from '../types';

interface UsuarioForm {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  rol: 'estudiante' | 'empresa';
  password: string;
}

interface VacanteForm {
  titulo: string;
  descripcion: string;
  empresa: number;
}

const UsuariosPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedEstudiante, setSelectedEstudiante] = useState<number | null>(null);
  
  // Queries
  const { data: usuarios = [] } = useQuery('usuarios', usuariosAPI.getAll);
  const { data: vacantes = [] } = useQuery('vacantes', vacantesAPI.getAll);
  const { data: estudiantes = [] } = useQuery('estudiantes', usuariosAPI.getEstudiantes);
  const { data: empresas = [] } = useQuery('empresas', usuariosAPI.getEmpresas);

  // Forms
  const usuarioForm = useForm<UsuarioForm>();
  const vacanteForm = useForm<VacanteForm>();

  // Mutations
  const crearUsuario = useMutation(usuariosAPI.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('usuarios');
      queryClient.invalidateQueries('estudiantes');
      queryClient.invalidateQueries('empresas');
      usuarioForm.reset();
      toast.success('Usuario creado exitosamente');
    },
    onError: () => toast.error('Error al crear usuario'),
  });

  const crearVacante = useMutation(vacantesAPI.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('vacantes');
      vacanteForm.reset();
      toast.success('Vacante creada exitosamente');
    },
    onError: () => toast.error('Error al crear vacante'),
  });

  const crearPostulacion = useMutation(postulacionesAPI.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('postulaciones');
      toast.success('Postulación enviada exitosamente');
    },
    onError: () => toast.error('Error al enviar postulación'),
  });

  const onSubmitUsuario = (data: UsuarioForm) => {
    crearUsuario.mutate(data);
  };

  const onSubmitVacante = (data: VacanteForm) => {
    crearVacante.mutate(data);
  };

  const handlePostularse = (vacanteId: number) => {
    if (!selectedEstudiante) {
      toast.error('Selecciona un estudiante primero');
      return;
    }
    
    crearPostulacion.mutate({
      estudiante: selectedEstudiante,
      vacante: vacanteId,
    });
  };

  return (
    <div className="space-y-6">
      {/* Formularios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registro de Usuario */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">Registro de Usuario</h2>
          </div>
          
          <form onSubmit={usuarioForm.handleSubmit(onSubmitUsuario)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                {...usuarioForm.register('first_name', { required: true })}
                placeholder="Nombre"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                {...usuarioForm.register('last_name', { required: true })}
                placeholder="Apellido"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <input
              {...usuarioForm.register('username', { required: true })}
              placeholder="Nombre de usuario"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <input
              {...usuarioForm.register('email', { required: true })}
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <input
              {...usuarioForm.register('password', { required: true })}
              type="password"
              placeholder="Contraseña"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <select
              {...usuarioForm.register('rol', { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="estudiante">👨🎓 Estudiante</option>
              <option value="empresa">🏢 Empresa</option>
            </select>
            
            <button
              type="submit"
              disabled={crearUsuario.isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              {crearUsuario.isLoading ? 'Creando...' : 'Registrar Usuario'}
            </button>
          </form>
        </div>

        {/* Crear Vacante */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Building2 className="h-5 w-5 text-green-600 mr-2" />
            <h2 className="text-lg font-semibold">Crear Vacante</h2>
          </div>
          
          <form onSubmit={vacanteForm.handleSubmit(onSubmitVacante)} className="space-y-4">
            <select
              {...vacanteForm.register('empresa', { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecciona una empresa...</option>
              {empresas.map((empresa) => (
                <option key={empresa.id} value={empresa.id}>
                  {empresa.nombre_completo || empresa.username}
                </option>
              ))}
            </select>
            
            <input
              {...vacanteForm.register('titulo', { required: true })}
              placeholder="Título de la práctica"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            
            <textarea
              {...vacanteForm.register('descripcion', { required: true })}
              placeholder="Descripción de la práctica"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            
            <button
              type="submit"
              disabled={crearVacante.isLoading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              {crearVacante.isLoading ? 'Creando...' : 'Publicar Vacante'}
            </button>
          </form>
        </div>
      </div>

      {/* Vacantes Disponibles */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">🔍 Vacantes Disponibles</h2>
        
        {/* Selector de Estudiante */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seleccionar Estudiante para Postular:
          </label>
          <select
            value={selectedEstudiante || ''}
            onChange={(e) => setSelectedEstudiante(Number(e.target.value) || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona un estudiante...</option>
            {estudiantes.map((estudiante) => (
              <option key={estudiante.id} value={estudiante.id}>
                {estudiante.nombre_completo || estudiante.username}
              </option>
            ))}
          </select>
        </div>

        {/* Lista de Vacantes */}
        <div className="grid gap-4">
          {vacantes.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No hay vacantes disponibles. ¡Crea la primera!
            </p>
          ) : (
            vacantes.map((vacante) => {
              const empresa = usuarios.find(u => u.id === vacante.empresa);
              return (
                <div key={vacante.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{vacante.titulo}</h3>
                      <p className="text-gray-600 mt-1">{vacante.descripcion}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        🏢 {empresa?.nombre_completo || empresa?.username || 'Empresa no encontrada'}
                      </p>
                    </div>
                    <button
                      onClick={() => handlePostularse(vacante.id)}
                      disabled={!selectedEstudiante || crearPostulacion.isLoading}
                      className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                      Postularse
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Lista de Usuarios */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">👥 Usuarios Registrados</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Registro
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {usuario.nombre_completo || usuario.username}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {usuario.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      usuario.rol === 'estudiante' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {usuario.rol === 'estudiante' ? '👨🎓 Estudiante' : '🏢 Empresa'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(usuario.fecha_registro).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsuariosPage;