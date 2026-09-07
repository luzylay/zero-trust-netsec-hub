/**
 * Interactive Assessment Quiz Bank
 * Realistic certification-grade questions with in-depth technical explanations
 */

window.QUIZZES_DATA = [
  {
    id: "q1",
    unit: "Unidad 1",
    question: "¿Cuál es la diferencia fundamental en el vector de propagación entre un Virus informático y un Gusano (Worm)?",
    options: [
      "El virus se propaga únicamente a través de la red sin intervención, mientras que el gusano requiere ejecución por el usuario.",
      "El virus requiere adherirse a un archivo huésped ejecutable y ser ejecutado por un usuario, mientras que el gusano se propaga de forma autónoma aprovechando vulnerabilidades en protocolos de red.",
      "El virus solo ataca sistemas Linux y el gusano ataca exclusivamente sistemas Windows.",
      "No existe diferencia; ambos términos son sinónimos formales bajo el estándar RFC 4949."
    ],
    answer: 1,
    explanation: "Por definición formal de ciberseguridad, un virus informático es un fragmento de código que se adhiere a un archivo ejecutable legítimo y requiere una acción manual del usuario (ejecutarlo) para infectar. En cambio, un gusano (Worm) es un programa independiente que se replica y propaga de forma autónoma a través de la infraestructura de red explotando fallas de protocolos y servicios abiertos."
  },
  {
    id: "q2",
    unit: "Unidad 1",
    question: "En una red LAN conmutada (Switched LAN), un atacante busca posicionarse como intermediario (Man-in-the-Middle) enviando respuestas ARP no solicitadas (Gratuitous ARP). ¿Qué contramedida técnica a nivel de switch L2 previene este ataque?",
    options: [
      "Configurar Spanning Tree Protocol (STP) en modo Rapid-PVST.",
      "Habilitar Dynamic ARP Inspection (DAI) junto con DHCP Snooping.",
      "Deshabilitar el protocolo CDP y LLDP en todos los puertos.",
      "Cambiar la dirección IP del Gateway por una dirección de clase B."
    ],
    answer: 1,
    explanation: "Dynamic ARP Inspection (DAI) inspecciona cada trama ARP entrante en puertos no confiables y valida la correspondencia IP-MAC contra la tabla de enlaces generada por DHCP Snooping (DHCP Snooping Binding Database). Si la trama ARP es ilegítima o falsificada, el switch la descarta inmediatamente, neutralizando el ARP Spoofing."
  },
  {
    id: "q3",
    unit: "Unidad 2",
    question: "¿Cuál de las siguientes afirmaciones describe con precisión la diferencia de seguridad y transporte entre RADIUS y TACACS+?",
    options: [
      "RADIUS usa TCP 49 y cifra todo el paquete; TACACS+ usa UDP 1812 y solo cifra la contraseña.",
      "RADIUS usa UDP (1812/1813) y solo cifra el campo Password con MD5; TACACS+ usa TCP (49) y cifra el cuerpo completo (payload) del paquete.",
      "Tanto RADIUS como TACACS+ operan sobre SCTP puerto 3868 con TLS obligatorio.",
      "TACACS+ combina autenticación y autorización en una sola respuesta, mientras RADIUS las desacopla totalmente."
    ],
    answer: 1,
    explanation: "RADIUS (RFC 2865) transporta datagramas sobre UDP en los puertos 1812 (Auth) y 1813 (Acct), combinando autenticación y autorización en un solo mensaje, y únicamente cifra el atributo de la contraseña. Por el contrario, TACACS+ (RFC 8907) opera sobre TCP puerto 49, separa de forma modular Autenticación, Autorización y Contabilidad, y cifra el payload completo del paquete."
  },
  {
    id: "q4",
    unit: "Unidad 2",
    question: "En el protocolo Kerberos v5 (RFC 4120), ¿por qué es crítico que todos los equipos de la red tengan sus relojes sincronizados mediante NTP?",
    options: [
      "Porque Kerberos utiliza marcas de tiempo (Timestamps) en los autenticadores para prevenir ataques de repetición (Replay Attacks).",
      "Porque los paquetes UDP de Kerberos caducan a nivel de TTL si el reloj difiere.",
      "Porque la clave privada del KDC se regenera cada segundo exacto.",
      "Para calcular el ancho de banda consumido por el usuario en el TGS."
    ],
    answer: 0,
    explanation: "Kerberos v5 incluye marcas de tiempo (Timestamps) cifradas dentro del Autenticador generado por el cliente. El servidor compara esta marca de tiempo con su reloj local; si la diferencia supera la tolerancia máxima configurada (típicamente 5 minutos), la solicitud es rechazada para evitar que un atacante que capture un ticket en tránsito pueda reinyectarlo (Replay Attack)."
  },
  {
    id: "q5",
    unit: "Unidad 2",
    question: "Según la guía oficial NIST SP 800-63B, ¿cuál de las siguientes prácticas de gestión de contraseñas es la recomendada oficialmente?",
    options: [
      "Forzar la expiración y cambio de contraseñas de todos los usuarios obligatoriamente cada 30 o 60 días.",
      "Exigir una combinación estricta de mayúsculas, minúsculas, dígitos y caracteres especiales no alfanuméricos.",
      "Fomentar contraseñas largas (frases de contraseña), eliminar la expiración periódica arbitraria y cotejar contra listas de contraseñas filtradas (Blacklists).",
      "Utilizar preguntas de seguridad secretas como primer método de recuperación."
    ],
    answer: 2,
    explanation: "NIST SP 800-63B revocó las prácticas antiguas de forzar expiraciones periódicas arbitrarias y reglas de complejidad que fomentan patrones débiles. En su lugar, NIST exige verificar las contraseñas contra listas de contraseñas vulneradas/conocidas (Blacklist), permitir longitudes amplias (frases de contraseña de 15+ caracteres) y solo exigir cambio ante indicios reales de compromiso."
  },
  {
    id: "q6",
    unit: "Unidad 2",
    question: "Bajo la normativa SBS Res. N° 504-2021 de la Superintendencia de Banca, Seguros y AFP, ¿cuál es el requisito formal respecto al Oficial de Seguridad de la Información (CISO)?",
    options: [
      "Debe ser el mismo Gerente de Tecnologías de la Información (TI) para centralizar la toma de decisiones técnicas.",
      "Debe contar con independencia jerárquica y funcional respecto a las áreas de TI y de operaciones de negocio.",
      "Es un rol opcional que solo aplica para entidades con más de 1 millón de clientes.",
      "Solo puede ser contratado como consultor externo a tiempo parcial."
    ],
    answer: 1,
    explanation: "La Resolución SBS N° 504-2021 exige explícitamente que el CISO (o responsable de Seguridad de la Información) posea autonomía e independencia de las gerencias que administran la infraestructura de TI o las operaciones comerciales, garantizando que las decisiones de riesgo y ciberseguridad no tengan conflictos de interés."
  },
  {
    id: "q7",
    unit: "Unidad 3",
    question: "¿Qué ventaja primordial ofrece un Firewall de Próxima Generación (NGFW) frente a un Firewall tradicional de Inspección de Estado (Stateful)?",
    options: [
      "Opera exclusivamente en Capa 2 y no requiere direcciones IP.",
      "Realiza Inspección Profunda de Paquetes (DPI), identificación de aplicaciones reales (App-ID) independientemente del puerto y control por identidad de usuario (User-ID).",
      "Elimina la necesidad de utilizar cifrado TLS en las conexiones web.",
      "Sustituye completamente a los routers en redes WAN."
    ],
    answer: 1,
    explanation: "Mientras un firewall stateful tradicional solo inspecciona cabeceras L3/L4 y la tabla de conexiones por puerto TCP/UDP, un NGFW examina la carga útil completa (DPI), reconoce aplicaciones independientemente del puerto en que viajen (App-ID), aplica descifrado SSL/TLS, integra prevención de intrusos (IPS) y vincula el tráfico a identidades de usuario (User-ID)."
  },
  {
    id: "q8",
    unit: "Unidad 4",
    question: "En la arquitectura de túneles VPN IPSec, ¿cuál es la diferencia principal entre el protocolo AH (Authentication Header - IP 51) y ESP (Encapsulating Security Payload - IP 50)?",
    options: [
      "AH proporciona confidencialidad (cifrado) y ESP no cifra.",
      "ESP proporciona confidencialidad (cifrado de datos) además de integridad y autenticación; AH solo proporciona integridad y autenticación pero NUNCA cifra la carga útil.",
      "AH es compatible con NAT-Traversal y ESP no funciona a través de NAT.",
      "ESP opera en Capa 7 y AH opera en Capa 2."
    ],
    answer: 1,
    explanation: "AH (IP 51) garantiza la autenticidad e integridad del paquete completo (incluyendo campos de la cabecera IP), pero NO proporciona confidencialidad (los datos viajan en texto plano) y es incompatible con NAT. Por el contrario, ESP (IP 50) proporciona cifrado robusto de la carga útil (confidencialidad), autenticación e integridad, y es el estándar utilizado en el 99% de las VPNs modernas."
  }
];
