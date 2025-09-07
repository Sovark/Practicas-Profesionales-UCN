#!/usr/bin/env python
"""
Script para ejecutar las pruebas unitarias del sistema
Usar: py run_tests.py
"""
import os
import sys
import django
from django.conf import settings
from django.test.utils import get_runner

if __name__ == "__main__":
    os.environ['DJANGO_SETTINGS_MODULE'] = 'practicas_backend.settings'
    django.setup()
    TestRunner = get_runner(settings)
    test_runner = TestRunner()
    
    # Ejecutar los 3 casos de prueba principales
    test_modules = [
        'tests.test_usuarios',
        'tests.test_postulaciones', 
        'tests.test_informes'
    ]
    
    print("🧪 Ejecutando Casos de Prueba Unitarios")
    print("=" * 50)
    
    failures = test_runner.run_tests(test_modules)
    
    if failures:
        print(f"\n❌ {failures} pruebas fallaron")
        sys.exit(1)
    else:
        print("\n✅ Todas las pruebas pasaron exitosamente")
        sys.exit(0)