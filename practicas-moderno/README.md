# 🎓 Plataforma de Prácticas Profesionales - Versión Moderna

## 🚀 Stack Tecnológico Moderno

### **Backend - Django REST Framework**
- **🐍 Python 3.11** - Lenguaje principal
- **🌐 Django 4.2** - Framework web robusto
- **⚡ Django REST Framework** - API REST potente
- **🔗 django-cors-headers** - Manejo de CORS
- **🗄️ SQLite/PostgreSQL** - Base de datos
- **🧪 pytest-django** - Testing avanzado

### **Frontend - React + TypeScript**
- **⚛️ React 18** - Biblioteca de UI moderna
- **📘 TypeScript** - Tipado estático
- **🎨 Tailwind CSS** - Framework de estilos
- **🔄 React Query** - Gestión de estado servidor
- **📋 React Hook Form** - Formularios optimizados
- **🌐 Axios** - Cliente HTTP
- **🔔 React Hot Toast** - Notificaciones
- **🎯 Lucide React** - Iconos modernos

## 📁 Estructura del Proyecto

```
practicas-moderno/
├── backend/                    # Django REST API
│   ├── practicas_backend/
│   │   ├── apps/
│   │   │   ├── usuarios/       # App de usuarios
│   │   │   ├── vacantes/       # App de vacantes
│   │   │   └── informes/       # App de informes
│   │   ├── settings.py         # Configuración Django
│   │   └── urls.py            # URLs principales
│   ├── manage.py              # Comando Django
│   └── requirements.txt       # Dependencias Python
├── frontend/                  # React TypeScript
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   ├── pages/            # Páginas principales
│   │   ├── services/         # Servicios API
│   │   ├── types/           # Tipos TypeScript
│   │   └── App.tsx          # Componente principal
│   ├── public/              # Archivos estáticos
│   └── package.json         # Dependencias Node.js
└── README.md               # Esta documentación
```

## ⚡ Instalación y Ejecución

### **Prerrequisitos**
- Python 3.11+
- Node.js 18+
- npm o yarn

### **1. Configurar Backend (Django)**

```bash
cd backend

# Crear entorno virtual
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Instalar dependencias
pip install -r requirements.txt

# Configurar base de datos
python manage.py makemigrations
python manage.py migrate

# Crear superusuario (opcional)
python manage.py createsuperuser

# Ejecutar servidor
python manage.py runserver
```

**✅ Backend disponible en:** http://localhost:8000

### **2. Configurar Frontend (React)**

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start
```

**✅ Frontend disponible en:** http://localhost:3000

## 🎯 Funcionalidades Implementadas

### **✅ Módulos Principales**
1. **👥 Gestión de Usuarios** - Registro de estudiantes y empresas
2. **💼 Gestión de Vacantes** - Publicación y postulación
3. **📋 Informes de Práctica** - Evaluación y calificación
4. **🔔 Sistema de Notificaciones** - Comunicación automática
5. **📊 Dashboard de Estadísticas** - Métricas en tiempo real

### **🔧 Características Técnicas**
- **API RESTful** con documentación automática
- **Tipado estático** con TypeScript
- **Validación robusta** en frontend y backend
- **Gestión de estado** optimizada con React Query
- **Interfaz responsiva** con Tailwind CSS
- **Testing automatizado** con pytest
- **CORS configurado** para desarrollo

## 🧪 Testing

### **Backend (Django)**
```bash
cd backend
pytest
```

### **Frontend (React)**
```bash
cd frontend
npm test
```

## 📊 Endpoints API Principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/usuarios/` | Listar usuarios |
| POST | `/api/usuarios/` | Crear usuario |
| GET | `/api/usuarios/estudiantes/` | Solo estudiantes |
| GET | `/api/usuarios/empresas/` | Solo empresas |
| GET | `/api/vacantes/` | Listar vacantes |
| POST | `/api/vacantes/` | Crear vacante |
| GET | `/api/postulaciones/` | Listar postulaciones |
| POST | `/api/postulaciones/` | Crear postulación |
| GET | `/api/informes/` | Listar informes |
| POST | `/api/informes/` | Crear informe |

## 🎨 Características de UI/UX

### **Diseño Moderno**
- **Tailwind CSS** para estilos consistentes
- **Componentes reutilizables** con TypeScript
- **Iconos modernos** con Lucide React
- **Navegación intuitiva** por tabs
- **Formularios optimizados** con validación

### **Experiencia de Usuario**
- **Feedback inmediato** con toast notifications
- **Loading states** en todas las acciones
- **Validación en tiempo real** de formularios
- **Diseño responsivo** para móviles
- **Gestión de errores** user-friendly

## 🔄 Ventajas del Stack Moderno

### **Desarrollo**
- ✅ **Tipado estático** reduce errores
- ✅ **Hot reload** en desarrollo
- ✅ **Componentes reutilizables**
- ✅ **API autodocumentada** con DRF
- ✅ **Testing integrado**

### **Producción**
- ✅ **Escalabilidad** con Django
- ✅ **Performance** optimizada con React
- ✅ **SEO friendly** (con SSR opcional)
- ✅ **Mantenibilidad** alta
- ✅ **Despliegue sencillo**

## 🚀 Próximos Pasos

### **Funcionalidades Avanzadas**
1. **Autenticación JWT** con refresh tokens
2. **Roles y permisos** granulares
3. **Upload de archivos** (CVs, documentos)
4. **Chat en tiempo real** con WebSockets
5. **Notificaciones push** del navegador

### **Mejoras Técnicas**
1. **PostgreSQL** en producción
2. **Redis** para caché
3. **Docker** para containerización
4. **CI/CD** con GitHub Actions
5. **Monitoring** con Sentry

## 📝 Comandos Útiles

### **Django**
```bash
# Crear nueva app
python manage.py startapp nombre_app

# Hacer migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Shell interactivo
python manage.py shell

# Recopilar archivos estáticos
python manage.py collectstatic
```

### **React**
```bash
# Build para producción
npm run build

# Analizar bundle
npm run build && npx serve -s build

# Linting
npm run lint

# Formatear código
npm run format
```

## 🎉 Resultado Final

**¡Una plataforma moderna, escalable y mantenible para la gestión de prácticas profesionales!**

- 🎯 **5 módulos funcionales** completos
- 🔧 **Stack tecnológico moderno** (Django + React + TypeScript)
- 🎨 **Interfaz profesional** con Tailwind CSS
- 🧪 **Testing automatizado** incluido
- 📚 **Documentación completa** y clara

**¡Perfecto para el Trabajo #3 de Ingeniería de Software!** 🚀