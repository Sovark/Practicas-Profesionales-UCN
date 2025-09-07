import React from 'react';
import { useQuery } from 'react-query';
import { BarChart3, Users, Briefcase, FileText, TrendingUp } from 'lucide-react';
import { estadisticasAPI } from '../services/api.ts';

const EstadisticasPage: React.FC = () => {
  const { data: estadisticas, isLoading } = useQuery('estadisticas', estadisticasAPI.getGenerales);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Cargando estadísticas...</div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Usuarios',
      value: estadisticas?.total_usuarios || 0,
      icon: Users,
      color: 'bg-blue-500',
      description: 'Usuarios registrados'
    },
    {
      title: 'Estudiantes',
      value: estadisticas?.total_estudiantes || 0,
      icon: Users,
      color: 'bg-green-500',
      description: 'Estudiantes activos'
    },
    {
      title: 'Empresas',
      value: estadisticas?.total_empresas || 0,
      icon: Briefcase,
      color: 'bg-purple-500',
      description: 'Empresas registradas'
    },
    {
      title: 'Vacantes',
      value: estadisticas?.total_vacantes || 0,
      icon: Briefcase,
      color: 'bg-orange-500',
      description: 'Vacantes publicadas'
    },
    {
      title: 'Vacantes Activas',
      value: estadisticas?.vacantes_activas || 0,
      icon: TrendingUp,
      color: 'bg-emerald-500',
      description: 'Vacantes disponibles'
    },
    {
      title: 'Postulaciones',
      value: estadisticas?.total_postulaciones || 0,
      icon: FileText,
      color: 'bg-cyan-500',
      description: 'Postulaciones enviadas'
    },
    {
      title: 'Postulaciones Aceptadas',
      value: estadisticas?.postulaciones_aceptadas || 0,
      icon: FileText,
      color: 'bg-green-600',
      description: 'Prácticas confirmadas'
    },
    {
      title: 'Informes',
      value: estadisticas?.total_informes || 0,
      icon: FileText,
      color: 'bg-indigo-500',
      description: 'Informes completados'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <BarChart3 className="h-6 w-6 text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Dashboard de Estadísticas</h1>
        </div>
        <p className="text-gray-600">
          Resumen general del sistema de prácticas profesionales
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">{stat.description}</p>
            </div>
          );
        })}
      </div>

      {/* Métricas Adicionales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Promedio de Calificaciones */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">📊 Promedio de Calificaciones</h3>
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">
                {estadisticas?.promedio_calificaciones || 0}
              </div>
              <div className="text-gray-500">de 7.0</div>
              <div className="mt-2 text-sm text-gray-600">
                Calificación promedio de las prácticas
              </div>
            </div>
          </div>
        </div>

        {/* Tasa de Éxito */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">🎯 Tasa de Éxito</h3>
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">
                {estadisticas?.total_postulaciones > 0 
                  ? Math.round((estadisticas?.postulaciones_aceptadas / estadisticas?.total_postulaciones) * 100)
                  : 0}%
              </div>
              <div className="text-gray-500">de postulaciones</div>
              <div className="mt-2 text-sm text-gray-600">
                Postulaciones aceptadas vs total
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen por Categorías */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">📈 Resumen del Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800">Usuarios</h4>
            <p className="text-2xl font-bold text-blue-600">
              {(estadisticas?.total_estudiantes || 0) + (estadisticas?.total_empresas || 0)}
            </p>
            <p className="text-sm text-blue-600">
              {estadisticas?.total_estudiantes || 0} estudiantes + {estadisticas?.total_empresas || 0} empresas
            </p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800">Actividad</h4>
            <p className="text-2xl font-bold text-green-600">
              {(estadisticas?.total_postulaciones || 0)}
            </p>
            <p className="text-sm text-green-600">
              Postulaciones en {estadisticas?.total_vacantes || 0} vacantes
            </p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-800">Completadas</h4>
            <p className="text-2xl font-bold text-purple-600">
              {estadisticas?.total_informes || 0}
            </p>
            <p className="text-sm text-purple-600">
              Prácticas con informe completado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasPage;