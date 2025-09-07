import pytest
from django.test import TestCase
from django.contrib.auth import get_user_model
from practicas_backend.apps.usuarios.models import Usuario

User = get_user_model()

class TestUsuarioCreation(TestCase):
    """
    Caso de Prueba 1: Creación de Usuario
    Funcionalidad crítica: Registro de estudiantes y empresas
    """
    
    def test_crear_estudiante_exitoso(self):
        """Prueba que se puede crear un estudiante correctamente"""
        # Arrange
        datos_estudiante = {
            'username': 'estudiante_test',
            'email': 'estudiante@test.com',
            'first_name': 'Juan',
            'last_name': 'Pérez',
            'rol': 'estudiante',
            'password': 'password123'
        }
        
        # Act
        usuario = User.objects.create_user(**datos_estudiante)
        
        # Assert
        self.assertEqual(usuario.username, 'estudiante_test')
        self.assertEqual(usuario.email, 'estudiante@test.com')
        self.assertEqual(usuario.rol, 'estudiante')
        self.assertTrue(usuario.check_password('password123'))
        self.assertIsNotNone(usuario.id)
    
    def test_crear_empresa_exitoso(self):
        """Prueba que se puede crear una empresa correctamente"""
        # Arrange
        datos_empresa = {
            'username': 'empresa_test',
            'email': 'empresa@test.com',
            'first_name': 'Empresa',
            'last_name': 'Tecnológica',
            'rol': 'empresa',
            'password': 'password123'
        }
        
        # Act
        usuario = User.objects.create_user(**datos_empresa)
        
        # Assert
        self.assertEqual(usuario.username, 'empresa_test')
        self.assertEqual(usuario.rol, 'empresa')
        self.assertTrue(usuario.check_password('password123'))
    
    def test_username_unico_requerido(self):
        """Prueba que no se pueden crear usuarios con usernames duplicados"""
        # Arrange
        User.objects.create_user(
            username='usuario_test',
            email='test1@test.com',
            rol='estudiante',
            password='password123'
        )
        
        # Act & Assert
        from django.db import IntegrityError
        with self.assertRaises(IntegrityError):
            User.objects.create_user(
                username='usuario_test',  # Username duplicado
                email='test2@test.com',
                rol='empresa',
                password='password123'
            )