from django.db import models
from django.conf import settings

class Vacante(models.Model):
    ESTADOS = [
        ('activa', 'Activa'),
        ('pausada', 'Pausada'),
        ('cerrada', 'Cerrada'),
    ]
    
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    empresa = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='vacantes_publicadas'
    )
    estado = models.CharField(max_length=20, choices=ESTADOS, default='activa')
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'vacantes'
        ordering = ['-fecha_creacion']
    
    def __str__(self):
        return f"{self.titulo} - {self.empresa.get_full_name()}"

class Postulacion(models.Model):
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('revisando', 'En Revisión'),
        ('aceptada', 'Aceptada'),
        ('rechazada', 'Rechazada'),
    ]
    
    estudiante = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='postulaciones'
    )
    vacante = models.ForeignKey(
        Vacante,
        on_delete=models.CASCADE,
        related_name='postulaciones'
    )
    estado = models.CharField(max_length=20, choices=ESTADOS, default='pendiente')
    fecha_postulacion = models.DateTimeField(auto_now_add=True)
    comentarios = models.TextField(blank=True)
    
    class Meta:
        db_table = 'postulaciones'
        unique_together = ['estudiante', 'vacante']
        ordering = ['-fecha_postulacion']
    
    def __str__(self):
        return f"{self.estudiante.get_full_name()} -> {self.vacante.titulo}"