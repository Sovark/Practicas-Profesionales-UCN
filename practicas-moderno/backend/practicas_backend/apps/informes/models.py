from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator

class Informe(models.Model):
    postulacion = models.OneToOneField(
        'vacantes.Postulacion',
        on_delete=models.CASCADE,
        related_name='informe'
    )
    calificacion = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(7)],
        help_text="Calificación de 1 a 7"
    )
    comentarios = models.TextField()
    habilidades_desarrolladas = models.TextField()
    recomendaria = models.BooleanField(default=True)
    fecha_informe = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'informes'
        ordering = ['-fecha_informe']
    
    def __str__(self):
        return f"Informe - {self.postulacion.estudiante.get_full_name()} - {self.postulacion.vacante.titulo}"

class Notificacion(models.Model):
    TIPOS = [
        ('info', 'Información'),
        ('success', 'Éxito'),
        ('warning', 'Advertencia'),
        ('error', 'Error'),
    ]
    
    remitente = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notificaciones_enviadas'
    )
    destinatario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notificaciones_recibidas'
    )
    titulo = models.CharField(max_length=200)
    mensaje = models.TextField()
    tipo = models.CharField(max_length=20, choices=TIPOS, default='info')
    leida = models.BooleanField(default=False)
    fecha_envio = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'notificaciones'
        ordering = ['-fecha_envio']
    
    def __str__(self):
        return f"{self.titulo} - {self.remitente.username} → {self.destinatario.username}"