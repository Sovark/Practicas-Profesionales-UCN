from rest_framework import serializers
from .models import Informe, Notificacion

class InformeSerializer(serializers.ModelSerializer):
    estudiante_nombre = serializers.SerializerMethodField()
    vacante_titulo = serializers.SerializerMethodField()
    empresa_nombre = serializers.SerializerMethodField()
    
    class Meta:
        model = Informe
        fields = ['id', 'postulacion', 'calificacion', 'comentarios', 
                 'habilidades_desarrolladas', 'recomendaria', 'fecha_informe',
                 'estudiante_nombre', 'vacante_titulo', 'empresa_nombre']
    
    def get_estudiante_nombre(self, obj):
        return obj.postulacion.estudiante.get_full_name()
    
    def get_vacante_titulo(self, obj):
        return obj.postulacion.vacante.titulo
    
    def get_empresa_nombre(self, obj):
        return obj.postulacion.vacante.empresa.get_full_name()

class NotificacionSerializer(serializers.ModelSerializer):
    remitente_nombre = serializers.SerializerMethodField()
    destinatario_nombre = serializers.SerializerMethodField()
    
    class Meta:
        model = Notificacion
        fields = ['id', 'remitente', 'destinatario', 'titulo', 'mensaje', 'tipo', 'leida', 
                 'fecha_envio', 'remitente_nombre', 'destinatario_nombre']
    
    def get_remitente_nombre(self, obj):
        return obj.remitente.get_full_name() or obj.remitente.username
    
    def get_destinatario_nombre(self, obj):
        return obj.destinatario.get_full_name() or obj.destinatario.username