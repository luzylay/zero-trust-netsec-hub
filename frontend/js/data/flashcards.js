/**
 * Flashcards Bank for Network Security & Digital Identity
 */

window.FLASHCARDS_DATA = [
  {
    id: "fc-1",
    category: "Unidad 1 - Amenazas",
    front: "¿Qué caracteriza a un ataque de tipo Password Spraying?",
    back: "Intenta una sola contraseña común o de temporada (ej. 'Invierno2026!') contra una lista masiva de usuarios distintos para eludir las políticas de bloqueo de cuenta por intentos fallidos consecutivos."
  },
  {
    id: "fc-2",
    category: "Unidad 1 - Capa 2",
    front: "¿Qué función cumple DHCP Snooping en un switch de acceso?",
    back: "Distingue entre puertos confiables (Trusted, donde está el servidor DHCP legítimo) y no confiables (Untrusted, donde están los clientes). Bloquea ofertas DHCP fraudulentas (Rogue DHCP) y construye la tabla de enlaces para DAI."
  },
  {
    id: "fc-3",
    category: "Unidad 2 - AAA",
    front: "¿Qué puertos oficiales utiliza el protocolo RADIUS según la IANA?",
    back: "UDP 1812 para Autenticación y Autorización, y UDP 1813 para Contabilidad (Accounting). Históricamente utilizaba los puertos 1645 y 1646."
  },
  {
    id: "fc-4",
    category: "Unidad 2 - AAA",
    front: "¿En qué puerto y protocolo de transporte opera TACACS+?",
    back: "Opera sobre TCP en el puerto 49. Ofrece entrega confiable orientada a conexión y cifra el cuerpo completo (payload) del paquete."
  },
  {
    id: "fc-5",
    category: "Unidad 2 - Kerberos",
    front: "¿Cuáles son los componentes principales del KDC en Kerberos v5?",
    back: "El AS (Authentication Server, emisor del TGT tras validar credenciales) y el TGS (Ticket Granting Server, emisor de los Service Tickets para acceder a los recursos solicitados)."
  },
  {
    id: "fc-6",
    category: "Unidad 2 - Estándares",
    front: "En NIST SP 800-63B, ¿qué distingue al nivel de autenticación AAL3?",
    back: "Requiere un autenticador de hardware criptográfico resistente a phishing (FIDO2 / WebAuthn o Smart Card) con prueba de posesión de clave privada no exportable y enlace de canal (Channel Binding)."
  },
  {
    id: "fc-7",
    category: "Unidad 3 - Firewalls",
    front: "¿Qué diferencia a un Firewall Stateful de uno Stateless?",
    back: "El Stateful mantiene una tabla de estado en memoria con las conexiones activas TCP/UDP y permite el tráfico de retorno legítimo automáticamente sin necesidad de reglas de entrada permisivas."
  },
  {
    id: "fc-8",
    category: "Unidad 4 - IPSec",
    front: "¿Qué es el modo NAT-Traversal (NAT-T) en IPSec y qué puerto utiliza?",
    back: "Es la técnica que encapsula paquetes ESP (IP 50) dentro de datagramas UDP en el puerto 4500 para permitir que el tráfico IPSec atraviese routers que realizan traducción de direcciones (NAT/PAT)."
  },
  {
    id: "fc-9",
    category: "Normativa SBS 504-2021",
    front: "¿Cuál es la frecuencia exigida para pruebas de penetración (Ethical Hacking) y análisis de vulnerabilidades?",
    back: "Debe ejecutarse al menos una vez al año y de manera obligatoria previa al despliegue en producción de cambios tecnológicos o aplicaciones significativas en canales digitales."
  },
  {
    id: "fc-10",
    category: "Unidad 4 - Criptografía",
    front: "¿Por qué el algoritmo AES-GCM es el estándar preferido en IPSec y TLS 1.3?",
    back: "Porque es un esquema AEAD (Authenticated Encryption with Associated Data) que proporciona confidencialidad y verificación de integridad/autenticación en una sola operación matemática acelerada por hardware."
  }
];
