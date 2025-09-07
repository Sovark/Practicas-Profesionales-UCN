from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Avg
from .models import Informe, Notificacion
from .serializers import InformeSerializer, NotificacionSerializer

class InformeViewSet(viewsets.ModelViewSet):
    queryset = Informe.objects.all()
    serializer_class = InformeSerializer
    
    @action(detail=False, methods=['get'])
    def estadisticas(self, request):
        """Estadísticas de informes"""
        total_informes = Informe.objects.count()
        promedio_calificaciones = Informe.objects.aggregate(
            promedio=Avg('calificacion')
        )['promedio'] or 0
        
        return Response({
            'total_informes': total_informes,
            'promedio_calificaciones': round(promedio_calificaciones, 2),
        })

class NotificacionViewSet(viewsets.ModelViewSet):
    queryset = Notificacion.objects.all()
    serializer_class = NotificacionSerializer
    
    @action(detail=True, methods=['patch'])
    def marcar_leida(self, request, pk=None):
        """Marcar notificación como leída"""
        notificacion = self.get_object()
        notificacion.leida = True
        notificacion.save()
        return Response({'status': 'marcada como leída'})