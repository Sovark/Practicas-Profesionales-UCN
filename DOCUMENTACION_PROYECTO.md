# 🎓 Sistema de Gestión de Prácticas Profesionales UCN
## Documentación Técnica Completa

---

## 📋 Índice
1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Stack Tecnológico](#stack-tecnológico)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Funcionalidades Implementadas](#funcionalidades-implementadas)
6. [Base de Datos](#base-de-datos)
7. [API REST](#api-rest)
8. [Interfaz de Usuario](#interfaz-de-usuario)
9. [Pruebas Unitarias](#pruebas-unitarias)
10. [Instalación y Configuración](#instalación-y-configuración)
11. [Casos de Uso](#casos-de-uso)
12. [Conclusiones](#conclusiones)

---

## 🎯 Resumen Ejecutivo

### **Objetivo del Proyecto**
Sistema completo para la gestión integral de prácticas profesionales que permite la administración de estudiantes, empresas, vacantes, postulaciones e informes de evaluación.

### **Alcance**
- **Usuarios**: Estudiantes y empresas
- **Procesos**: Registro → Vacantes → Postulaciones → Evaluaciones
- **Módulos**: 5 módulos principales completamente funcionales
- **Tecnología**: Stack moderno con Django + React

### **Estado del Proyecto**
✅ **COMPLETADO AL 100%** - Todos los requisitos implementados y probados

---

## 🏗️ Arquitectura del Sistema

### **Patrón Arquitectónico**
- **Tipo**: Arquitectura de 3 capas + SPA
- **Backend**: API REST con Django REST Framework
- **Frontend**: Single Page Application con React
- **Base de Datos**: SQLite (desarrollo) / PostgreSQL (producción)

### **Comunicación**
```
Frontend (React) ←→ HTTP/JSON ←→ Backend (Django) ←→ Base de Datos
```

### **Principios de Diseño**
- **Separación de responsabilidades**
- **API First approach**
- **Componentes reutilizables**
- **Tipado estático con TypeScript**

---

## 🛠️ Stack Tecnológico

### **Backend**
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Python** | 3.8+ | Lenguaje principal |
| **Django** | 4.2+ | Framework web |
| **Django REST Framework** | 3.14+ | API REST |
| **SQLite** | 3.x | Base de datos |
| **django-cors-headers** | 4.0+ | Manejo de CORS |

### **Frontend**
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.2+ | Framework UI |
| **TypeScript** | 4.9+ | Tipado estático |
| **Tailwind CSS** | 3.3+ | Estilos |
| **React Query** | 3.39+ | Estado del servidor |
| **React Hook Form** | 7.47+ | Manejo de formularios |
| **Axios** | 1.5+ | Cliente HTTP |
| **Lucide React** | 0.288+ | Iconografía |

### **Herramientas de Desarrollo**
- **Node.js**: v22.19.0
- **npm**: v10.9.3
- **Create React App**: Configuración inicial
- **PyTest**: Pruebas unitarias

---

## 📁 Estructura del Proyecto

```
practicas-moderno/
├── backend/                           # Aplicación Django
│   ├── practicas_backend/
│   │   ├── apps/
│   │   │   ├── usuarios/             # 👥 Gestión de usuarios
│   │   │   │   ├── models.py         # Modelo Usuario personalizado
│   │   │   │   ├── serializers.py    # Serialización API
│   │   │   │   ├── views.py          # Vistas y endpoints
│   │   │   │   └── urls.py           # Rutas del módulo
│   │   │   ├── vacantes/             # 💼 Vacantes y postulaciones
│   │   │   │   ├── models.py         # Modelos Vacante/Postulacion
│   │   │   │   ├── serializers.py    # Serialización API
│   │   │   │   ├── views.py          # Lógica de negocio
│   │   │   │   └── urls.py           # Rutas del módulo
│   │   │   ├── informes/             # 📋 Informes de práctica
│   │   │   │   ├── models.py         # Modelo Informe
│   │   │   │   ├── serializers.py    # Serialización API
│   │   │   │   ├── views.py          # Evaluaciones
│   │   │   │   └── urls.py           # Rutas del módulo
│   │   │   └── notificaciones/       # 🔔 Sistema de mensajería
│   │   │       ├── models.py         # Modelo Notificacion
│   │   │       ├── serializers.py    # Serialización API
│   │   │       ├── views.py          # Mensajería
│   │   │       └── urls.py           # Rutas del módulo
│   │   ├── settings.py               # Configuración Django
│   │   └── urls.py                   # URLs principales
│   ├── tests/                        # 🧪 Pruebas unitarias
│   │   ├── test_usuarios.py          # Tests de usuarios
│   │   ├── test_postulaciones.py     # Tests de postulaciones
│   │   └── test_informes.py          # Tests de informes
│   ├── manage.py                     # Comando Django
│   ├── requirements.txt              # Dependencias Python
│   └── DOCUMENTACION_PRUEBAS.md      # Documentación de tests
├── frontend/                         # Aplicación React
│   ├── src/
│   │   ├── components/               # Componentes reutilizables
│   │   │   └── Layout.tsx            # Layout principal
│   │   ├── pages/                    # Páginas principales
│   │   │   ├── UsuariosPage.tsx      # 👥 Gestión usuarios/vacantes
│   │   │   ├── InformesPage.tsx      # 📋 Informes de práctica
│   │   │   ├── NotificacionesPage.tsx # 🔔 Sistema mensajería
│   │   │   └── EstadisticasPage.tsx  # 📊 Dashboard estadísticas
│   │   ├── services/                 # Servicios API
│   │   │   └── api.ts                # Cliente HTTP y endpoints
│   │   ├── types/                    # Definiciones TypeScript
│   │   │   └── index.ts              # Interfaces y tipos
│   │   ├── App.tsx                   # Componente principal
│   │   ├── index.tsx                 # Punto de entrada
│   │   └── index.css                 # Estilos Tailwind
│   ├── package.json                  # Dependencias Node.js
│   ├── tailwind.config.js            # Configuración Tailwind
│   └── demo.html                     # Demo estático
├── README.md                         # Documentación principal
└── DOCUMENTACION_COMPLETA.md         # Este archivo
```

---

## ⚙️ Funcionalidades Implementadas

### **1. 👥 Módulo de Usuarios**
#### **Características**:
- ✅ Registro de estudiantes y empresas
- ✅ Roles diferenciados (estudiante/empresa)
- ✅ Validación de datos de entrada
- ✅ Listado de usuarios registrados
- ✅ Filtrado por tipo de usuario

#### **Endpoints**:
- `GET /api/usuarios/` - Listar todos los usuarios
- `POST /api/usuarios/` - Crear nuevo usuario
- `GET /api/usuarios/estudiantes/` - Listar solo estudiantes
- `GET /api/usuarios/empresas/` - Listar solo empresas

### **2. 💼 Módulo de Vacantes y Postulaciones**
#### **Características**:
- ✅ Publicación de vacantes por empresas
- ✅ Sistema de postulaciones para estudiantes
- ✅ Estados de postulación (pendiente, aceptada, rechazada)
- ✅ Gestión de estados por empresa
- ✅ Filtrado automático de vacantes ocupadas
- ✅ Prevención de postulaciones duplicadas

#### **Endpoints**:
- `GET /api/vacantes/` - Listar vacantes disponibles
- `POST /api/vacantes/` - Crear nueva vacante
- `GET /api/postulaciones/` - Listar postulaciones
- `POST /api/postulaciones/` - Crear postulación
- `PATCH /api/postulaciones/{id}/` - Actualizar estado

### **3. 📋 Módulo de Informes**
#### **Características**:
- ✅ Creación de informes para prácticas completadas
- ✅ Sistema de calificación (1-5)
- ✅ Comentarios detallados sobre desempeño
- ✅ Registro de habilidades desarrolladas
- ✅ Sistema de recomendaciones (Sí/No)
- ✅ Solo para postulaciones aceptadas

#### **Endpoints**:
- `GET /api/informes/` - Listar informes
- `POST /api/informes/` - Crear nuevo informe

### **4. 🔔 Módulo de Notificaciones**
#### **Características**:
- ✅ Mensajería interna entre usuarios
- ✅ Tipos de notificación (info, éxito, advertencia, error)
- ✅ Control de estado (leída/no leída)
- ✅ Interfaz intuitiva de comunicación
- ✅ Envío entre estudiantes y empresas

#### **Endpoints**:
- `GET /api/notificaciones/` - Listar notificaciones
- `POST /api/notificaciones/` - Crear notificación
- `PATCH /api/notificaciones/{id}/marcar_leida/` - Marcar como leída

### **5. 📊 Módulo de Estadísticas**
#### **Características**:
- ✅ Dashboard con métricas en tiempo real
- ✅ Contadores de usuarios, vacantes, postulaciones
- ✅ Promedio de calificaciones de informes
- ✅ Tasa de éxito de postulaciones
- ✅ Gráficos y visualizaciones

---

## 🗄️ Base de Datos

### **Modelo de Datos**

#### **Usuario (Personalizado)**
```python
class Usuario(AbstractUser):
    rol = models.CharField(choices=[('estudiante', 'Estudiante'), ('empresa', 'Empresa')])
    fecha_registro = models.DateTimeField(auto_now_add=True)
```

#### **Vacante**
```python
class Vacante(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    empresa = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    estado = models.CharField(choices=[('activa', 'Activa'), ('pausada', 'Pausada'), ('cerrada', 'Cerrada')])
```

#### **Postulación**
```python
class Postulacion(models.Model):
    estudiante = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    vacante = models.ForeignKey(Vacante, on_delete=models.CASCADE)
    estado = models.CharField(choices=[('pendiente', 'Pendiente'), ('aceptada', 'Aceptada'), ('rechazada', 'Rechazada')])
    
    class Meta:
        unique_together = ['estudiante', 'vacante']  # Previene duplicados
```

#### **Informe**
```python
class Informe(models.Model):
    postulacion = models.OneToOneField(Postulacion, on_delete=models.CASCADE)
    calificacion = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comentarios = models.TextField()
    habilidades_desarrolladas = models.TextField()
    recomendaria = models.BooleanField()
```

#### **Notificación**
```python
class Notificacion(models.Model):
    remitente = models.ForeignKey(Usuario, related_name='notificaciones_enviadas')
    destinatario = models.ForeignKey(Usuario, related_name='notificaciones_recibidas')
    tipo = models.CharField(choices=[('info', 'Info'), ('success', 'Éxito'), ('warning', 'Advertencia'), ('error', 'Error')])
    titulo = models.CharField(max_length=200)
    mensaje = models.TextField()
    leida = models.BooleanField(default=False)
```

### **Relaciones**
- Usuario 1:N Vacantes (empresa publica múltiples vacantes)
- Usuario 1:N Postulaciones (estudiante puede postular a múltiples vacantes)
- Vacante 1:N Postulaciones (vacante puede tener múltiples postulaciones)
- Postulación 1:1 Informe (cada postulación aceptada tiene un informe)
- Usuario 1:N Notificaciones (como remitente y destinatario)

---

## 🔌 API REST

### **Arquitectura de la API**
- **Estilo**: RESTful
- **Formato**: JSON
- **Autenticación**: Django Session (expandible a JWT)
- **Paginación**: Django REST Framework pagination
- **Serialización**: Django REST Framework serializers

### **Endpoints Principales**

#### **Usuarios**
| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| GET | `/api/usuarios/` | Listar usuarios | - |
| POST | `/api/usuarios/` | Crear usuario | username, email, first_name, last_name, rol, password |
| GET | `/api/usuarios/estudiantes/` | Listar estudiantes | - |
| GET | `/api/usuarios/empresas/` | Listar empresas | - |

#### **Vacantes**
| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| GET | `/api/vacantes/` | Listar vacantes | - |
| POST | `/api/vacantes/` | Crear vacante | titulo, descripcion, empresa |
| PATCH | `/api/vacantes/{id}/` | Actualizar vacante | estado |

#### **Postulaciones**
| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| GET | `/api/postulaciones/` | Listar postulaciones | - |
| POST | `/api/postulaciones/` | Crear postulación | estudiante, vacante |
| PATCH | `/api/postulaciones/{id}/` | Actualizar estado | estado |

#### **Informes**
| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| GET | `/api/informes/` | Listar informes | - |
| POST | `/api/informes/` | Crear informe | postulacion, calificacion, comentarios, habilidades_desarrolladas, recomendaria |

#### **Notificaciones**
| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| GET | `/api/notificaciones/` | Listar notificaciones | - |
| POST | `/api/notificaciones/` | Crear notificación | remitente, destinatario, tipo, titulo, mensaje |
| PATCH | `/api/notificaciones/{id}/marcar_leida/` | Marcar como leída | - |

### **Respuestas de la API**
```json
// Formato estándar de respuesta exitosa
{
  "count": 10,
  "next": null,
  "previous": null,
  "results": [...]
}

// Formato de error
{
  "error": "Descripción del error",
  "details": {...}
}
```

---

## 🎨 Interfaz de Usuario

### **Diseño y UX**
- **Framework**: Tailwind CSS para diseño moderno
- **Responsivo**: Adaptable a desktop, tablet y móvil
- **Iconografía**: Lucide React para iconos consistentes
- **Colores**: Paleta profesional con azul como color principal
- **Tipografía**: Fuentes del sistema para mejor rendimiento

### **Componentes Principales**

#### **Layout**
- Header con título y navegación
- Sidebar con menú de módulos
- Área de contenido principal
- Footer con información del proyecto

#### **Páginas**

##### **UsuariosPage**
- **Formulario de registro**: Estudiantes y empresas
- **Formulario de vacantes**: Creación por empresas
- **Lista de vacantes disponibles**: Con sistema de postulación
- **Gestión de postulaciones**: Cambio de estados
- **Tabla de usuarios registrados**: Vista completa

##### **InformesPage**
- **Formulario de informe**: Para postulaciones aceptadas
- **Lista de informes**: Con calificaciones y comentarios
- **Filtrado**: Solo postulaciones completadas

##### **NotificacionesPage**
- **Formulario de envío**: Mensajería entre usuarios
- **Lista de notificaciones**: Con estados y tipos
- **Marcado de leídas**: Gestión de estado

##### **EstadisticasPage**
- **Dashboard**: Métricas en tiempo real
- **Contadores**: Usuarios, vacantes, postulaciones
- **Gráficos**: Visualización de datos

### **Características de UX**
- ✅ **Feedback inmediato**: Toasts para acciones
- ✅ **Estados de carga**: Indicadores durante peticiones
- ✅ **Validación en tiempo real**: Formularios reactivos
- ✅ **Navegación intuitiva**: Menú claro y organizado
- ✅ **Responsive design**: Funciona en todos los dispositivos

---

## 🧪 Pruebas Unitarias

### **Framework de Pruebas**
- **Backend**: Django TestCase + PyTest
- **Cobertura**: Funcionalidades críticas del sistema
- **Base de datos**: SQLite en memoria para pruebas

### **Casos de Prueba Implementados**

#### **Test Suite 1: Creación de Usuarios**
```python
class TestUsuarioCreation(TestCase):
    def test_crear_estudiante_exitoso()      # ✅ PASÓ
    def test_crear_empresa_exitoso()         # ✅ PASÓ  
    def test_username_unico_requerido()      # ✅ PASÓ
```

#### **Test Suite 2: Flujo de Postulaciones**
```python
class TestPostulacionWorkflow(TestCase):
    def test_crear_postulacion_exitosa()           # ✅ PASÓ
    def test_cambiar_estado_postulacion_a_aceptada() # ✅ PASÓ
    def test_no_duplicar_postulaciones()           # ✅ PASÓ
```

#### **Test Suite 3: Creación de Informes**
```python
class TestInformeCreation(TestCase):
    def test_crear_informe_exitoso()               # ✅ PASÓ
    def test_validar_calificacion_rango()          # ✅ PASÓ
    def test_informe_solo_para_postulaciones_aceptadas() # ✅ PASÓ
```

### **Resultados de Pruebas**
- **Total**: 9 pruebas
- **Exitosas**: 9 (100%)
- **Fallidas**: 0
- **Tiempo**: 6.128 segundos
- **Cobertura**: Alta en funcionalidades críticas

### **Comandos de Ejecución**
```bash
# Ejecutar todas las pruebas
py manage.py test tests

# Ejecutar suite específica
py manage.py test tests.test_usuarios

# Con verbosidad
py manage.py test tests --verbosity=2
```

---

## 🚀 Instalación y Configuración

### **Prerrequisitos**
- Python 3.8+
- Node.js 18+
- npm 10+
- Git

### **Instalación Backend**
```bash
# Clonar repositorio
git clone <repository-url>
cd practicas-moderno/backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar base de datos
py manage.py makemigrations
py manage.py migrate

# Crear superusuario (opcional)
py manage.py createsuperuser

# Iniciar servidor
py manage.py runserver
```

### **Instalación Frontend**
```bash
# Navegar al frontend
cd ../frontend

# Instalar dependencias
npm install --legacy-peer-deps

# Iniciar servidor de desarrollo
npm start
```

### **URLs de Acceso**
- **Frontend**: http://localhost:3000
- **Backend API**: http://127.0.0.1:8000/api/
- **Admin Django**: http://127.0.0.1:8000/admin/

### **Variables de Entorno**
```bash
# Backend (.env)
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///db.sqlite3

# Frontend (.env)
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

---

## 📋 Casos de Uso

### **Caso de Uso 1: Registro y Publicación de Vacante**
1. **Empresa se registra** en el sistema
2. **Empresa crea vacante** con título y descripción
3. **Vacante aparece** en lista de disponibles
4. **Estudiantes pueden ver** la vacante publicada

### **Caso de Uso 2: Postulación y Aceptación**
1. **Estudiante se registra** en el sistema
2. **Estudiante ve vacantes** disponibles
3. **Estudiante se postula** a vacante de interés
4. **Empresa revisa postulación** y la acepta
5. **Vacante desaparece** de lista de disponibles

### **Caso de Uso 3: Evaluación de Práctica**
1. **Postulación está aceptada** (práctica completada)
2. **Empresa crea informe** de evaluación
3. **Empresa califica** del 1 al 5
4. **Empresa agrega comentarios** y habilidades desarrolladas
5. **Informe queda registrado** en el sistema

### **Caso de Uso 4: Comunicación**
1. **Usuario envía notificación** a otro usuario
2. **Destinatario recibe mensaje** en su bandeja
3. **Destinatario lee mensaje** y se marca como leído
4. **Comunicación queda registrada** en el historial

### **Caso de Uso 5: Seguimiento Estadístico**
1. **Administrador accede** al dashboard
2. **Sistema muestra métricas** en tiempo real
3. **Se visualizan estadísticas** de uso del sistema
4. **Se pueden tomar decisiones** basadas en datos

---

## 📊 Métricas del Proyecto

### **Líneas de Código**
| Componente | Archivos | Líneas Aprox. |
|------------|----------|---------------|
| **Backend Python** | 15+ | 2,000+ |
| **Frontend TypeScript** | 10+ | 1,500+ |
| **Configuración** | 5+ | 200+ |
| **Documentación** | 3+ | 1,000+ |
| **Total** | **33+** | **4,700+** |

### **Funcionalidades**
- **Módulos**: 5 completamente funcionales
- **Endpoints API**: 15+ endpoints REST
- **Páginas Frontend**: 4 páginas principales
- **Modelos de Datos**: 4 modelos principales
- **Pruebas**: 9 casos de prueba unitarios

### **Tiempo de Desarrollo**
- **Planificación**: 10%
- **Backend**: 40%
- **Frontend**: 35%
- **Integración**: 10%
- **Pruebas**: 5%

---

## 🎯 Conclusiones

### **Objetivos Cumplidos**
✅ **Sistema completo** de gestión de prácticas profesionales  
✅ **Arquitectura moderna** con separación frontend/backend  
✅ **API REST robusta** con Django REST Framework  
✅ **Interfaz intuitiva** con React y TypeScript  
✅ **Base de datos normalizada** con relaciones correctas  
✅ **Pruebas unitarias** que validan funcionalidades críticas  
✅ **Documentación completa** del proyecto  

### **Fortalezas del Sistema**
- **Escalabilidad**: Arquitectura preparada para crecimiento
- **Mantenibilidad**: Código organizado y documentado
- **Usabilidad**: Interfaz intuitiva y responsive
- **Robustez**: Validaciones y manejo de errores
- **Modernidad**: Stack tecnológico actualizado

### **Tecnologías Destacadas**
- **Django + DRF**: Backend robusto y escalable
- **React + TypeScript**: Frontend moderno y tipado
- **Tailwind CSS**: Diseño profesional y responsive
- **SQLite**: Base de datos eficiente para desarrollo

### **Impacto Académico**
Este proyecto demuestra:
- **Dominio de tecnologías modernas**
- **Capacidad de desarrollo full-stack**
- **Implementación de buenas prácticas**
- **Documentación profesional**
- **Pruebas de calidad de software**

### **Proyección Futura**
El sistema está preparado para:
- **Despliegue en producción**
- **Integración con sistemas externos**
- **Escalamiento horizontal**
- **Nuevas funcionalidades**
- **Mantenimiento a largo plazo**

---

## 📞 Información del Proyecto

**🎓 Desarrollado para**: Universidad Católica del Norte (UCN)  
**📅 Fecha**: 2024  
**🏷️ Versión**: 1.0.0  
**📄 Licencia**: Proyecto Académico  

**🛠️ Stack Principal**: Django + React + TypeScript + Tailwind CSS  
**🧪 Calidad**: 100% de pruebas unitarias exitosas  
**📊 Estado**: Completado y funcional  

---

*Sistema completo de gestión con tecnologías modernas - Listo para producción*