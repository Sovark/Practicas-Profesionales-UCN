# 🎓 Sistema de Gestión de Prácticas Profesionales UCN

Sistema completo para la gestión de prácticas profesionales desarrollado con tecnologías modernas. Permite la administración integral de estudiantes, empresas, vacantes, postulaciones e informes de práctica.

## 🚀 Características Principales

### 👥 **Gestión de Usuarios**
- Registro de estudiantes y empresas
- Roles diferenciados con permisos específicos
- Sistema de autenticación integrado
- Perfiles completos con información relevante

### 💼 **Gestión de Vacantes**
- Publicación de ofertas de práctica por empresas
- Sistema de postulaciones para estudiantes
- Estados de seguimiento (pendiente, aceptada, rechazada)
- Filtrado automático de vacantes ocupadas

### 📋 **Informes de Práctica**
- Evaluación de estudiantes (escala 1-5)
- Comentarios detallados sobre desempeño
- Registro de habilidades desarrolladas
- Sistema de recomendaciones

### 🔔 **Sistema de Notificaciones**
- Mensajería interna entre usuarios
- Notificaciones automáticas de estado
- Tipos diferenciados (info, éxito, advertencia, error)
- Control de lectura/no lectura

### 📊 **Dashboard de Estadísticas**
- Métricas en tiempo real
- Promedio de calificaciones
- Tasa de éxito de postulaciones
- Estadísticas generales del sistema

## 🛠️ Stack Tecnológico

### **Backend**
- **Django 4.2+** - Framework web de Python
- **Django REST Framework** - API REST
- **SQLite/PostgreSQL** - Base de datos
- **django-cors-headers** - Manejo de CORS

### **Frontend**
- **React 18.2+** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **React Query** - Gestión de estado del servidor
- **React Hook Form** - Manejo de formularios
- **Axios** - Cliente HTTP
- **Lucide React** - Iconografía

## 📁 Estructura del Proyecto

```
practicas-moderno/
├── backend/                    # Aplicación Django
│   ├── practicas_backend/
│   │   ├── apps/
│   │   │   ├── usuarios/      # Gestión de usuarios
│   │   │   ├── vacantes/      # Vacantes y postulaciones
│   │   │   ├── informes/      # Informes de práctica
│   │   │   └── notificaciones/ # Sistema de mensajería
│   │   ├── settings.py
│   │   └── urls.py
│   ├── manage.py
│   └── requirements.txt
├── frontend/                   # Aplicación React
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   ├── pages/            # Páginas principales
│   │   ├── services/         # Servicios API
│   │   └── types/           # Definiciones TypeScript
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🚀 Instalación y Configuración

### **Prerrequisitos**
- Python 3.8+
- Node.js 18+
- npm o yarn

### **Backend (Django)**
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### **Frontend (React)**
```bash
cd frontend
npm install
npm start
```

## 🌐 URLs de Acceso

- **Frontend**: http://localhost:3000
- **Backend API**: http://127.0.0.1:8000/api/
- **Admin Django**: http://127.0.0.1:8000/admin/

## 📋 Funcionalidades por Módulo

### **Módulo Usuarios**
- ✅ Registro de estudiantes y empresas
- ✅ Listado de usuarios registrados
- ✅ Creación y gestión de vacantes
- ✅ Sistema de postulaciones
- ✅ Gestión de estados de postulación

### **Módulo Informes**
- ✅ Creación de informes para prácticas completadas
- ✅ Calificación del 1 al 5
- ✅ Comentarios y observaciones
- ✅ Registro de habilidades desarrolladas
- ✅ Sistema de recomendaciones

### **Módulo Notificaciones**
- ✅ Envío de mensajes entre usuarios
- ✅ Tipos de notificación diferenciados
- ✅ Control de estado leído/no leído
- ✅ Interfaz intuitiva de mensajería

### **Módulo Estadísticas**
- ✅ Dashboard con métricas clave
- ✅ Gráficos y visualizaciones
- ✅ Estadísticas en tiempo real
- ✅ Reportes de rendimiento

## 🔧 API Endpoints

### **Usuarios**
- `GET /api/usuarios/` - Listar usuarios
- `POST /api/usuarios/` - Crear usuario
- `GET /api/usuarios/estudiantes/` - Listar estudiantes
- `GET /api/usuarios/empresas/` - Listar empresas

### **Vacantes**
- `GET /api/vacantes/` - Listar vacantes
- `POST /api/vacantes/` - Crear vacante
- `PATCH /api/vacantes/{id}/` - Actualizar vacante

### **Postulaciones**
- `GET /api/postulaciones/` - Listar postulaciones
- `POST /api/postulaciones/` - Crear postulación
- `PATCH /api/postulaciones/{id}/` - Actualizar estado

### **Informes**
- `GET /api/informes/` - Listar informes
- `POST /api/informes/` - Crear informe

### **Notificaciones**
- `GET /api/notificaciones/` - Listar notificaciones
- `POST /api/notificaciones/` - Crear notificación
- `PATCH /api/notificaciones/{id}/marcar_leida/` - Marcar como leída

## 🎯 Casos de Uso

1. **Empresa publica vacante** → Estudiantes se postulan → Empresa acepta/rechaza
2. **Postulación aceptada** → Se completa la práctica → Se genera informe
3. **Sistema de comunicación** → Notificaciones automáticas entre usuarios
4. **Seguimiento estadístico** → Dashboard con métricas del sistema

## 👨‍💻 Desarrollo

### **Comandos Útiles**

**Backend:**
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic
```

**Frontend:**
```bash
npm run build      # Compilar para producción
npm run test       # Ejecutar tests
npm run lint       # Verificar código
```

## 📝 Licencia

Proyecto académico desarrollado para la Universidad Católica del Norte (UCN).

## 🤝 Contribución

Este es un proyecto académico. Para contribuciones, por favor contacta al equipo de desarrollo.

---

**🎓 Desarrollado para Prácticas Profesionales UCN**  
*Sistema completo de gestión con tecnologías modernas*