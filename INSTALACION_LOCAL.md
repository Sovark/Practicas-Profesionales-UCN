# 🚀 Guía de Instalación Local - Sistema de Gestión de Prácticas Profesionales UCN

## 📋 Prerrequisitos del Sistema

### **Software Requerido**
- **Python 3.8+** - [Descargar desde python.org](https://www.python.org/downloads/)
- **Node.js 18+** - [Descargar desde nodejs.org](https://nodejs.org/)
- **Git** - [Descargar desde git-scm.com](https://git-scm.com/)
- **Editor de código** (recomendado: Visual Studio Code)

### **Verificar Instalaciones**
```bash
# Verificar Python
python --version
# o
py --version

# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar Git
git --version
```

---

## 📥 Paso 1: Clonar el Repositorio

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/Practicas-Profesionales-UCN.git

# Navegar al directorio del proyecto
cd Practicas-Profesionales-UCN
```

---

## 🐍 Paso 2: Configuración del Backend (Django)

### **2.1 Navegar al directorio backend**
```bash
cd practicas-moderno/backend
```

### **2.2 Crear entorno virtual**
```bash
# Windows
python -m venv venv
# o
py -m venv venv

# Linux/Mac
python3 -m venv venv
```

### **2.3 Activar entorno virtual**
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

**Nota**: Deberías ver `(venv)` al inicio de tu línea de comandos.

### **2.4 Instalar dependencias de Python**
```bash
# Actualizar pip
python -m pip install --upgrade pip

# Instalar dependencias
pip install -r requirements.txt
```

### **2.5 Configurar base de datos**
```bash
# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate
```

### **2.6 (Opcional) Crear superusuario**
```bash
python manage.py createsuperuser
```
Sigue las instrucciones para crear un usuario administrador.

### **2.7 Verificar instalación del backend**
```bash
# Iniciar servidor de desarrollo
python manage.py runserver
```

Deberías ver:
```
Starting development server at http://127.0.0.1:8000/
```

**✅ Backend funcionando en: http://127.0.0.1:8000**

---

## ⚛️ Paso 3: Configuración del Frontend (React)

### **3.1 Abrir nueva terminal y navegar al frontend**
```bash
# Desde la raíz del proyecto
cd practicas-moderno/frontend
```

### **3.2 Instalar dependencias de Node.js**
```bash
# Instalar dependencias
npm install --legacy-peer-deps
```

**Nota**: Usamos `--legacy-peer-deps` para resolver conflictos de dependencias.

### **3.3 Verificar instalación del frontend**
```bash
# Iniciar servidor de desarrollo
npm start
```

Deberías ver:
```
Local:            http://localhost:3000
```

**✅ Frontend funcionando en: http://localhost:3000**

---

## 🔧 Paso 4: Verificación del Sistema Completo

### **4.1 Verificar Backend**
- Abre http://127.0.0.1:8000/api/ en tu navegador
- Deberías ver la página de la API REST

### **4.2 Verificar Frontend**
- Abre http://localhost:3000 en tu navegador
- Deberías ver la interfaz del sistema

### **4.3 Verificar Comunicación**
- En el frontend, intenta registrar un usuario
- Si funciona correctamente, el sistema está completamente operativo

---

## 🧪 Paso 5: Ejecutar Pruebas (Opcional)

### **5.1 Pruebas Unitarias**
```bash
# En el directorio backend con entorno virtual activado
python manage.py test tests.test_usuarios
python manage.py test tests.test_postulaciones
python manage.py test tests.test_informes
```

### **5.2 Pruebas de Integración**
```bash
python manage.py test tests.test_integration
```

### **5.3 Todas las Pruebas**
```bash
python manage.py test tests
```

---

## 📂 Estructura de Archivos Importantes

```
practicas-moderno/
├── backend/
│   ├── venv/                    # Entorno virtual (se crea automáticamente)
│   ├── practicas_backend/
│   │   ├── apps/               # Módulos de la aplicación
│   │   ├── settings.py         # Configuración Django
│   │   └── urls.py            # URLs principales
│   ├── manage.py              # Comando Django
│   ├── requirements.txt       # Dependencias Python
│   └── db.sqlite3            # Base de datos (se crea automáticamente)
├── frontend/
│   ├── node_modules/          # Dependencias Node.js (se crea automáticamente)
│   ├── src/                   # Código fuente React
│   ├── package.json           # Configuración del proyecto
│   └── tailwind.config.js     # Configuración Tailwind CSS
└── README.md
```

---

## ⚠️ Solución de Problemas Comunes

### **Error: "python no se reconoce como comando"**
- **Windows**: Usa `py` en lugar de `python`
- **Solución**: Asegúrate de que Python esté en el PATH del sistema

### **Error: "No module named 'django'"**
- **Causa**: Entorno virtual no activado
- **Solución**: Activa el entorno virtual con `venv\Scripts\activate`

### **Error: "npm install falla"**
- **Solución**: Usa `npm install --legacy-peer-deps --force`

### **Error: "Port 3000 is already in use"**
- **Solución**: Mata el proceso o usa otro puerto con `npm start -- --port 3001`

### **Error: "Port 8000 is already in use"**
- **Solución**: Usa otro puerto con `python manage.py runserver 8001`

### **Error de CORS en el navegador**
- **Causa**: Backend y frontend en puertos diferentes
- **Solución**: Ya está configurado en `settings.py`, reinicia ambos servidores

---

## 🔄 Comandos de Desarrollo Útiles

### **Backend**
```bash
# Crear nuevas migraciones después de cambios en modelos
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Acceder al shell de Django
python manage.py shell

# Crear superusuario
python manage.py createsuperuser

# Ejecutar servidor en puerto específico
python manage.py runserver 8001
```

### **Frontend**
```bash
# Instalar nueva dependencia
npm install nombre-paquete

# Ejecutar en modo desarrollo
npm start

# Construir para producción
npm run build

# Ejecutar en puerto específico
npm start -- --port 3001
```

---

## 🌐 URLs de Acceso

Una vez que ambos servidores estén funcionando:

- **🎨 Frontend (Interfaz de Usuario)**: http://localhost:3000
- **🔧 Backend API**: http://127.0.0.1:8000/api/
- **👨‍💼 Panel de Administración Django**: http://127.0.0.1:8000/admin/
- **📊 API Root**: http://127.0.0.1:8000/api/ (navegable)

---

## 📱 Funcionalidades Disponibles

### **En el Frontend (http://localhost:3000)**
1. **👥 Usuarios**: Registro de estudiantes y empresas
2. **💼 Vacantes**: Publicación y postulación a vacantes
3. **📋 Informes**: Evaluación de prácticas completadas
4. **🔔 Notificaciones**: Mensajería entre usuarios
5. **📊 Estadísticas**: Dashboard con métricas del sistema

### **En el Admin (http://127.0.0.1:8000/admin/)**
- Gestión completa de la base de datos
- Visualización de todos los modelos
- Herramientas de administración avanzadas

---

## 🔒 Credenciales por Defecto

### **Superusuario (si lo creaste)**
- **Usuario**: El que definiste durante `createsuperuser`
- **Contraseña**: La que definiste durante `createsuperuser`

### **Base de Datos**
- **Tipo**: SQLite
- **Archivo**: `backend/db.sqlite3`
- **No requiere configuración adicional**

---

## 🚀 ¡Listo para Usar!

Si seguiste todos los pasos correctamente, deberías tener:

✅ **Backend Django** funcionando en puerto 8000  
✅ **Frontend React** funcionando en puerto 3000  
✅ **Base de datos** configurada y migrada  
✅ **Sistema completo** operativo y funcional  

**🎉 ¡El Sistema de Gestión de Prácticas Profesionales UCN está listo para usar!**

---

## 📞 Soporte

Si encuentras problemas durante la instalación:

1. **Verifica prerrequisitos**: Asegúrate de tener todas las versiones correctas
2. **Revisa los logs**: Los errores suelen dar pistas sobre el problema
3. **Consulta la documentación**: Cada tecnología tiene documentación oficial
4. **Reinicia los servidores**: A veces un simple reinicio soluciona problemas

---

*Guía de instalación para el Sistema de Gestión de Prácticas Profesionales UCN*