from rest_framework import serializers
from .models import Vacante, Postulacion

class VacanteSerializer(serializers.ModelSerializer):
    empresa_nombre = serializers.SerializerMethodField()
    
    class Meta:
        model = Vacante
        fields = ['id', 'titulo', 'descripcion', 'empresa', 'estado', 
                 'fecha_creacion', 'fecha_actualizacion', 'empresa_nombre']
    
    def get_empresa_nombre(self, obj):
        return obj.empresa.get_full_name()

class PostulacionSerializer(serializers.ModelSerializer):
    estudiante_nombre = serializers.SerializerMethodField()
    vacante_titulo = serializers.SerializerMethodField()
    
    class Meta:
        model = Postulacion
        fields = ['id', 'estudiante', 'vacante', 'estado', 'fecha_postulacion', 
                 'comentarios', 'estudiante_nombre', 'vacante_titulo']
    
    def get_estudiante_nombre(self, obj):
        return obj.estudiante.get_full_name()
    
    def get_vacante_titulo(self, obj):
        return obj.vacante.titulo