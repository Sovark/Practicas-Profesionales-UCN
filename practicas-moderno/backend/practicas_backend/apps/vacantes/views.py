from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Vacante, Postulacion
from .serializers import VacanteSerializer, PostulacionSerializer

class VacanteViewSet(viewsets.ModelViewSet):
    queryset = Vacante.objects.all()
    serializer_class = VacanteSerializer
    
    @action(detail=False, methods=['get'])
    def estadisticas(self, request):
        """Estadísticas de vacantes"""
        total_vacantes = Vacante.objects.count()
        vacantes_activas = Vacante.objects.filter(estado='activa').count()
        
        return Response({
            'total_vacantes': total_vacantes,
            'vacantes_activas': vacantes_activas,
        })

class PostulacionViewSet(viewsets.ModelViewSet):
    queryset = Postulacion.objects.all()
    serializer_class = PostulacionSerializer
    
    @action(detail=False, methods=['get'])
    def estadisticas(self, request):
        """Estadísticas de postulaciones"""
        total_postulaciones = Postulacion.objects.count()
        postulaciones_aceptadas = Postulacion.objects.filter(estado='aceptada').count()
        
        return Response({
            'total_postulaciones': total_postulaciones,
            'postulaciones_aceptadas': postulaciones_aceptadas,
        })