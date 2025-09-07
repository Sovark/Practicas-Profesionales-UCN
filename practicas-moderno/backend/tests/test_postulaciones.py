import pytest
from django.test import TestCase
from django.contrib.auth import get_user_model
from practicas_backend.apps.vacantes.models import Vacante, Postulacion

User = get_user_model()

class TestPostulacionWorkflow(TestCase):
    """
    Caso de Prueba 2: Flujo de Postulaciones
    Funcionalidad crítica: Postulación y cambio de estados
    """
    
    def setUp(self):
        """Configuración inicial para las pruebas"""
        # Crear empresa
        self.empresa = User.objects.create_user(
            username='empresa_test',
            email='empresa@test.com',
            rol='empresa',
            password='password123'
        )
        
        # Crear estudiante
        self.estudiante = User.objects.create_user(
            username='estudiante_test',
            email='estudiante@test.com',
            rol='estudiante',
            password='password123'
        )
        
        # Crear vacante
        self.vacante = Vacante.objects.create(
            titulo='Desarrollador Python',
            descripcion='Práctica en desarrollo backend',
            empresa=self.empresa
        )
    
    def test_crear_postulacion_exitosa(self):
        """Prueba que se puede crear una postulación correctamente"""
        # Act
        postulacion = Postulacion.objects.create(
            estudiante=self.estudiante,
            vacante=self.vacante
        )
        
        # Assert
        self.assertEqual(postulacion.estudiante, self.estudiante)
        self.assertEqual(postulacion.vacante, self.vacante)
        self.assertEqual(postulacion.estado, 'pendiente')
        self.assertIsNotNone(postulacion.fecha_postulacion)
    
    def test_cambiar_estado_postulacion_a_aceptada(self):
        """Prueba que se puede cambiar el estado de una postulación a aceptada"""
        # Arrange
        postulacion = Postulacion.objects.create(
            estudiante=self.estudiante,
            vacante=self.vacante
        )
        
        # Act
        postulacion.estado = 'aceptada'
        postulacion.save()
        
        # Assert
        postulacion.refresh_from_db()
        self.assertEqual(postulacion.estado, 'aceptada')
    
    def test_no_duplicar_postulaciones(self):
        """Prueba que no se pueden crear postulaciones duplicadas"""
        # Arrange
        Postulacion.objects.create(
            estudiante=self.estudiante,
            vacante=self.vacante
        )
        
        # Act & Assert
        with self.assertRaises(Exception):
            Postulacion.objects.create(
                estudiante=self.estudiante,
                vacante=self.vacante  # Postulación duplicada
            )