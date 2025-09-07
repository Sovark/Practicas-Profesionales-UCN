from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Usuario
from .serializers import UsuarioSerializer, UsuarioListSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
    def get_serializer_class(self):
        if self.action == 'list':
            return UsuarioListSerializer
        return UsuarioSerializer
    
    @action(detail=False, methods=['get'])
    def estudiantes(self, request):
        """Obtener solo estudiantes"""
        estudiantes = Usuario.objects.filter(rol='estudiante', activo=True)
        serializer = UsuarioListSerializer(estudiantes, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def empresas(self, request):
        """Obtener solo empresas"""
        empresas = Usuario.objects.filter(rol='empresa', activo=True)
        serializer = UsuarioListSerializer(empresas, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def estadisticas(self, request):
        """Estadísticas de usuarios"""
        total_usuarios = Usuario.objects.filter(activo=True).count()
        total_estudiantes = Usuario.objects.filter(rol='estudiante', activo=True).count()
        total_empresas = Usuario.objects.filter(rol='empresa', activo=True).count()
        
        return Response({
            'total_usuarios': total_usuarios,
            'total_estudiantes': total_estudiantes,
            'total_empresas': total_empresas,
        })