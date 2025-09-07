from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from practicas_backend.apps.usuarios.views import UsuarioViewSet
from practicas_backend.apps.vacantes.views import VacanteViewSet, PostulacionViewSet
from practicas_backend.apps.informes.views import InformeViewSet, NotificacionViewSet

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'vacantes', VacanteViewSet)
router.register(r'postulaciones', PostulacionViewSet)
router.register(r'informes', InformeViewSet)
router.register(r'notificaciones', NotificacionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
]