from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    ROLES = [
        ('estudiante', 'Estudiante'),
        ('empresa', 'Empresa'),
        ('coordinador', 'Coordinador'),
    ]
    
    rol = models.CharField(max_length=20, choices=ROLES, default='estudiante')
    telefono = models.CharField(max_length=15, blank=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    activo = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'usuarios'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
    
    def __str__(self):
        return f"{self.get_full_name()} ({self.rol})"