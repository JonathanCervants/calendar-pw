# language: es
Característica: Ejecución de flujos de prueba en múltiples navegadores
  Como ingeniero de QA o automatizador
  Quiero ejecutar los escenarios de prueba en distintos navegadores (Desktop y Mobile)
  Para validar la compatibilidad y correcto funcionamiento del sistema en diferentes entornos

  @cross_browser @desktop
  Escenario Esquema: Ejecución de flujos en navegadores de escritorio
    Dado que el entorno de pruebas está configurado para "<proyecto_navegador>"
    Cuando ejecuto la suite de pruebas automatizadas
    Entonces los flujos se completan correctamente en "<proyecto_navegador>"

    Ejemplos:
      | proyecto_navegador |
      | chromium-desktop   |
      | firefox-desktop    |
      | webkit-desktop     |

  @cross_browser @mobile
  Escenario Esquema: Ejecución de flujos en dispositivos móviles
    Dado que la emulación está configurada para el dispositivo "<dispositivo_móvil>"
    Cuando ejecuto la suite de pruebas para vistas móviles
    Entonces la interfaz se adapta al viewport y los flujos finalizan con éxito en "<dispositivo_móvil>"

    Ejemplos:
      | dispositivo_móvil |
      | chromium-mobile   |
      | webkit-mobile     |
