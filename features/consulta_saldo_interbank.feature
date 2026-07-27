# language: es
Característica: Consulta de saldo en Interbank y notificación por WhatsApp
  Como usuario de Interbank
  Quiero consultar el saldo de mi cuenta bancaria de forma automatizada
  Para recibir el reporte actualizado de mi saldo en mi cuenta de WhatsApp

  Antecedentes:
    Dado que el usuario tiene acceso a la Banca por Internet de Interbank
    Y tiene configurado el número de destino de WhatsApp

  @interbank @saldo
  Escenario: Consulta de saldo en la Banca por Internet de Interbank
    Dado que navego a la página de inicio de sesión "https://bancaporinternet.interbank.pe/login"
    Cuando el usuario ingresa su tipo de documento, número de tarjeta y clave web
    Y accede al panel principal de cuentas
    Entonces el sistema identifica y captura el saldo disponible de la cuenta
    Y guarda el monto del saldo en memoria para su posterior notificación

  @whatsapp @notificacion
  Escenario: Envío del reporte de saldo por WhatsApp Web
    Dado que se tiene el saldo capturado previamente
    Y se abre WhatsApp Web para el contacto especificado
    Cuando el chat del destinatario está disponible
    Y se envía el mensaje formateado con el saldo disponible
    Entonces se verifica que el mensaje haya sido entregado en el chat de WhatsApp

  @flujo_completo
  Escenario Esquema: Flujo integral de consulta e informe de saldo por WhatsApp
    Dado que inicio la sesión en la Banca por Internet para la cuenta "<cuenta_origen>"
    Cuando se extrae el saldo actual de la cuenta
    Y se inicia la conexión con WhatsApp Web para enviar el mensaje al "<numero_telefono>"
    Entonces el destinatario "<numero_telefono>" recibe el saldo de la "<cuenta_origen>" en WhatsApp

    Ejemplos:
      | cuenta_origen        | numero_telefono |
      | Cuenta Simple Sueldo | +51987654321    |
      | Cuenta Ahorros       | +51987654321    |
