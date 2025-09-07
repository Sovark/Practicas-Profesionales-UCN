import pytest
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from practicas_backend.apps.vacantes.models import Vacante, Postulacion
from practicas_backend.apps.informes.models import Informe
import json

User = get_user_model()

class TestIntegracionCompleta(TestCase):
    """
    Pruebas de Integración: Flujo completo del sistema
    Valida la interacción entre múltiples módulos
    """
    
    def setUp(self):
        """Configuración inicial para pruebas de integración"""
        self.client = Client()
        
    def test_flujo_completo_practica_profesional(self):
        """
        PRUEBA DE INTEGRACIÓN 1: Flujo completo de práctica profesional
        Valida: Registro → Vacante → Postulación → Aceptación → Informe
        """
        # PASO 1: Crear empresa via API
        empresa_data = {
            'username': 'empresa_integracion',
            'email': 'empresa@integracion.com',
            'first_name': 'Empresa',
            'last_name': 'Tecnológica',
            'rol': 'empresa',
            'password': 'password123'
        }
        
        response = self.client.post(
            '/api/usuarios/',
            data=json.dumps(empresa_data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
        empresa = User.objects.get(username='empresa_integracion')
        
        # PASO 2: Crear estudiante via API
        estudiante_data = {
            'username': 'estudiante_integracion',
            'email': 'estudiante@integracion.com',
            'first_name': 'Juan',
            'last_name': 'Pérez',
            'rol': 'estudiante',
            'password': 'password123'
        }
        
        response = self.client.post(
            '/api/usuarios/',
            data=json.dumps(estudiante_data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
        estudiante = User.objects.get(username='estudiante_integracion')
        
        # PASO 3: Empresa crea vacante via API
        vacante_data = {
            'titulo': 'Desarrollador Full Stack',
            'descripcion': 'Práctica en desarrollo web completo',
            'empresa': empresa.id
        }
        
        response = self.client.post(
            '/api/vacantes/',
            data=json.dumps(vacante_data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
        vacante = Vacante.objects.get(titulo='Desarrollador Full Stack')
        
        # PASO 4: Estudiante se postula via API
        postulacion_data = {
            'estudiante': estudiante.id,
            'vacante': vacante.id
        }
        
        response = self.client.post(
            '/api/postulaciones/',
            data=json.dumps(postulacion_data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
        postulacion = Postulacion.objects.get(estudiante=estudiante, vacante=vacante)
        self.assertEqual(postulacion.estado, 'pendiente')
        
        # PASO 5: Empresa acepta postulación via API
        response = self.client.patch(
            f'/api/postulaciones/{postulacion.id}/',
            data=json.dumps({'estado': 'aceptada'}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        postulacion.refresh_from_db()
        self.assertEqual(postulacion.estado, 'aceptada')
        
        # PASO 6: Empresa crea informe via API
        informe_data = {
            'postulacion': postulacion.id,
            'calificacion': 5,
            'comentarios': 'Excelente desempeño durante la práctica de integración',
            'habilidades_desarrolladas': 'React, Django, APIs REST, Base de datos',
            'recomendaria': True
        }
        
        response = self.client.post(
            '/api/informes/',
            data=json.dumps(informe_data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
        informe = Informe.objects.get(postulacion=postulacion)
        
        # VALIDACIONES FINALES DE INTEGRACIÓN
        self.assertEqual(informe.calificacion, 5)
        self.assertTrue(informe.recomendaria)
        self.assertEqual(informe.postulacion.estado, 'aceptada')
        self.assertEqual(informe.postulacion.estudiante, estudiante)
        self.assertEqual(informe.postulacion.vacante.empresa, empresa)
        
        # Flujo completo de integración exitoso
        
    def test_integracion_sistema_notificaciones(self):
        """
        PRUEBA DE INTEGRACIÓN 2: Sistema de notificaciones
        Valida: Creación usuarios → Envío notificación → Marcado como leída
        """
        # PASO 1: Crear remitente
        remitente = User.objects.create_user(
            username='remitente_test',
            email='remitente@test.com',
            rol='empresa',
            password='password123'
        )
        
        # PASO 2: Crear destinatario
        destinatario = User.objects.create_user(
            username='destinatario_test',
            email='destinatario@test.com',
            rol='estudiante',
            password='password123'
        )
        
        # PASO 3: Enviar notificación via API
        notificacion_data = {
            'remitente': remitente.id,
            'destinatario': destinatario.id,
            'tipo': 'info',
            'titulo': 'Notificación de Integración',
            'mensaje': 'Esta es una prueba de integración del sistema de notificaciones'
        }
        
        response = self.client.post(
            '/api/notificaciones/',
            data=json.dumps(notificacion_data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
        
        # PASO 4: Verificar notificación creada
        response = self.client.get('/api/notificaciones/')
        self.assertEqual(response.status_code, 200)
        notificaciones = response.json()['results']
        self.assertEqual(len(notificaciones), 1)
        
        notificacion = notificaciones[0]
        self.assertEqual(notificacion['titulo'], 'Notificación de Integración')
        self.assertFalse(notificacion['leida'])
        
        # PASO 5: Marcar como leída via API
        response = self.client.patch(f'/api/notificaciones/{notificacion["id"]}/marcar_leida/')
        self.assertEqual(response.status_code, 200)
        
        # PASO 6: Verificar que se marcó como leída
        response = self.client.get('/api/notificaciones/')
        notificacion_actualizada = response.json()['results'][0]
        self.assertTrue(notificacion_actualizada['leida'])
        
        # Integración sistema notificaciones exitosa
        
    def test_integracion_validaciones_negocio(self):
        """
        PRUEBA DE INTEGRACIÓN 3: Validaciones de reglas de negocio
        Valida: Restricciones entre módulos y validaciones cruzadas
        """
        # PASO 1: Crear datos base
        empresa = User.objects.create_user(
            username='empresa_validacion',
            email='empresa@validacion.com',
            rol='empresa',
            password='password123'
        )
        
        estudiante = User.objects.create_user(
            username='estudiante_validacion',
            email='estudiante@validacion.com',
            rol='estudiante',
            password='password123'
        )
        
        vacante = Vacante.objects.create(
            titulo='Práctica Validación',
            descripcion='Prueba de validaciones',
            empresa=empresa
        )
        
        # PASO 2: Crear postulación
        postulacion_data = {
            'estudiante': estudiante.id,
            'vacante': vacante.id
        }
        
        response = self.client.post(
            '/api/postulaciones/',
            data=json.dumps(postulacion_data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
        
        # PASO 3: Intentar crear postulación duplicada (debe fallar)
        response = self.client.post(
            '/api/postulaciones/',
            data=json.dumps(postulacion_data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)  # Error por duplicado
        
        # PASO 4: Aceptar postulación
        postulacion = Postulacion.objects.get(estudiante=estudiante, vacante=vacante)
        response = self.client.patch(
            f'/api/postulaciones/{postulacion.id}/',
            data=json.dumps({'estado': 'aceptada'}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        
        # PASO 5: Verificar que se puede crear informe válido
        # (La validación de rango se hace a nivel de modelo, no API)
        
        # PASO 6: Crear informe válido
        informe_valido = {
            'postulacion': postulacion.id,
            'calificacion': 4,  # Dentro del rango
            'comentarios': 'Buen desempeño en validaciones',
            'habilidades_desarrolladas': 'Validación de datos, Testing',
            'recomendaria': True
        }
        
        response = self.client.post(
            '/api/informes/',
            data=json.dumps(informe_valido),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
        
        # VALIDACIONES FINALES
        self.assertEqual(Postulacion.objects.count(), 1)  # Solo una postulación
        self.assertEqual(Informe.objects.count(), 1)      # Solo un informe
        
        # Integración validaciones de negocio exitosa