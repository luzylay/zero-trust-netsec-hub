/**
 * Network Security & Identity Standards Knowledge Base
 * Deep dive into NIST SP 800-63 (3, A, B), SBS Res. 504-2021, and Official RFCs
 */

window.STANDARDS_DATA = {
  nist: {
    title: "NIST SP 800-63-3 Suite: Digital Identity Guidelines",
    description: "Marco normativo emitido por el National Institute of Standards and Technology (NIST) para la gestión integral de la identidad digital en sistemas modernos.",
    overview: "Publicado oficialmente como SP 800-63-3 (con adendas 800-63A, 800-63B y 800-63C), este estándar desacopla la identidad digital en tres dimensiones independientes de aseguramiento: IAL (Identidad), AAL (Autenticación) y FAL (Federación).",
    components: [
      {
        code: "SP 800-63-3",
        name: "Digital Identity Guidelines (Base)",
        focus: "Marco general, modelo de amenazas a la identidad, evaluación de impacto de riesgo y selección de niveles de aseguramiento (xAL).",
        keyConcepts: [
          "Modelo de 4 partes: Sujeto (User), CSP (Credential Service Provider), Verifier (Verificador) y RP (Relying Party).",
          "Evaluación de Riesgo de Identidad: Análisis de impacto en 6 categorías (financiero, daño físico, violación de privacidad, descrédito público, cumplimiento legal y misión organizacional).",
          "Principio de menor privilegio y privacidad por diseño (Privacy by Design)."
        ]
      },
      {
        code: "SP 800-63A",
        name: "Enrollment and Identity Proofing",
        focus: "Procesos de inscripción, validación de evidencia y verificación de identidad física y digital.",
        levels: [
          {
            level: "IAL1 (Identity Assurance Level 1)",
            description: "No se requiere validación de identidad en el mundo real. Se acepta autoafirmación de atributos. Adecuado para servicios informativos y perfiles anónimos o seudónimos.",
            evidenceReq: "Ninguna o auto-declarada.",
            validation: "No requerida.",
            verification: "No requerida."
          },
          {
            level: "IAL2 (Identity Assurance Level 2)",
            description: "Prueba de identidad remota o presencial con evidencia de identidad confiable.",
            evidenceReq: "1 documento de identidad SUPERIOR (ej. Pasaporte biométrico, DNI electrónico con chip verificado) O 2 documentos FUERTES (ej. DNI + Licencia de conducir).",
            validation: "Validación de autenticidad contra el emisor autorizado (ej. RENIEC, bases de datos gubernamentales) o inspección física de características de seguridad.",
            verification: "Verificación de titularidad mediante comparación biométrica (1:1 con liveness detection) o entrega postal de código secreto a dirección verificada."
          },
          {
            level: "IAL3 (Identity Assurance Level 3)",
            description: "Máximo nivel de aseguramiento de identidad. Requiere presencia física obligatoria o presencia virtual supervisada con biometría de alta precisión.",
            evidenceReq: "2 documentos de evidencia SUPERIOR verificados contra bases de datos oficiales con biometría integrada.",
            validation: "Validación obligatoria de firmas criptográficas de chips y verificación con el emisor en tiempo real.",
            verification: "Verificación biométrica presencial estricta realizada por un operador capacitado (Identity Proofing Officer)."
          }
        ]
      },
      {
        code: "SP 800-63B",
        name: "Authentication and Lifecycle Management",
        focus: "Mecanismos de autenticación, gestión de credenciales, MFA, y directrices modernas de contraseñas.",
        levels: [
          {
            level: "AAL1 (Authenticator Assurance Level 1)",
            description: "Autenticación de un solo factor (1FA). Proporciona certeza básica de que el solicitante controla el autenticador.",
            authenticators: "Contraseña memorizada (Memorized Secret) o autenticador de software simple.",
            reauth: "Re-autenticación recomendada cada 30 días o ante inactividad prolongada."
          },
          {
            level: "AAL2 (Authenticator Assurance Level 2)",
            description: "Autenticación multifactor (MFA) obligatoria utilizando 2 factores distintos de autenticación a través de protocolos criptográficos seguros.",
            authenticators: "Combinación de algo que sabes (Contraseña) + algo que tienes (OTP generado por app móvil de software, Push Notification firmada, o OTP de hardware).",
            resistance: "Resistencia básica contra ataques de intermediario (Man-in-the-Middle) no basada en canales no seguros (desincentivo explícito de SMS no autenticado)."
          },
          {
            level: "AAL3 (Authenticator Assurance Level 3)",
            description: "Máximo nivel de autenticación. Requiere autenticador físico criptográfico con prueba de posesión basada en hardware y resistencia a phishing (MFA phishing-resistant).",
            authenticators: "Token criptográfico de hardware (FIDO2 / WebAuthn Hardware Security Key, Smart Card PIV/CAC, HSM) con autenticación basada en clave privada protegida en chip resistente a manipulación.",
            resistance: "Inmunidad criptográfica a ataques Man-in-the-Middle (MITM / Attacker-in-the-Middle) mediante enlace de canal criptográfico (Channel Binding)."
          }
        ],
        passwordGuidelines: [
          {
            rule: "Longitud Mínima",
            nistStance: "Mínimo 8 caracteres (recomendado 15+ para administradores). Permitir hasta al menos 64 caracteres.",
            reason: "La entropía de la longitud supera con creces la complejidad forzada."
          },
          {
            rule: "Complejidad Forzada",
            nistStance: "ELIMINADA. No exigir combinación obligatoria de mayúsculas, minúsculas, números y símbolos raros.",
            reason: "Provoca patrones predecibles (ej. P@ssword1!) que los atacantes descifran fácilmente."
          },
          {
            rule: "Expiración Periódica",
            nistStance: "ELIMINADA (salvo sospecha de compromiso comprobado). No forzar cambios cada 30/60/90 días.",
            reason: "Fuerza a los usuarios a realizar mutaciones mínimas y predecibles (ej. Invierno2024! -> Primavera2024!)."
          },
          {
            rule: "Lista de Contraseñas Prohibidas (Blacklist)",
            nistStance: "OBLIGATORIA. Comparar contraseñas contra listas de contraseñas filtradas (HaveIBeenPwned), palabras del diccionario y términos derivados de la empresa.",
            reason: "Impide el uso de credenciales comúnmente vulneradas en ataques de Password Spraying o Credential Stuffing."
          },
          {
            rule: "Preguntas de Seguridad Secretas",
            nistStance: "PROHIBIDAS para recuperación de credenciales.",
            reason: "Respuestas fáciles de obtener mediante ingeniería social o registros públicos (ej. 'Nombre de tu primera mascota')."
          },
          {
            rule: "SMS como Segundo Factor (Out-of-Band)",
            nistStance: "DESACONSEJADO / RESTRINGIDO (Deprecado para AAL alto).",
            reason: "Vulnerable a SIM Swapping, interceptación SS7 y ataques de redirección GSM."
          }
        ]
      },
      {
        code: "SP 800-63C",
        name: "Federation and Assertions",
        focus: "Protocolos federados de identidad (SAML 2.0, OpenID Connect - OIDC, OAuth 2.0) y niveles de aserción (FAL1, FAL2, FAL3).",
        levels: [
          { level: "FAL1", description: "Aserción firmada digitalmente por el Identity Provider (IdP) enviada a través de un canal seguro (TLS)." },
          { level: "FAL2", description: "Aserción firmada por el IdP y cifrada específicamente para la Relying Party (RP) de destino." },
          { level: "FAL3", description: "Aserción firmada, cifrada y vinculada criptográficamente a la clave del suscriptor (Holder-of-Key / Proof-of-Possession Token)." }
        ]
      }
    ]
  },

  sbs504: {
    title: "Resolución SBS N° 504-2021: Reglamento de Gestión de Seguridad de la Información y Ciberseguridad",
    authority: "Superintendencia de Banca, Seguros y AFP (SBS)",
    scope: "Marco regulatorio de cumplimiento obligatorio para el sistema financiero, seguros, administradoras de fondos de pensiones y servicios complementarios.",
    pillars: [
      {
        pillar: "1. Gobernanza y Marco de Gestión",
        articles: "Art. 4, 5, 6, 7",
        details: [
          "Directorio: Responsable final de aprobar las políticas de seguridad de la información y ciberseguridad, y asignar los recursos necesarios.",
          "Comité de Seguridad de la Información y Ciberseguridad: Órgano especializado multidisciplinario que supervisa la estrategia y el apetito de riesgo.",
          "Oficial de Seguridad de la Información (CISO): Rol autónomo e independiente de la Gerencia de TI y de Operaciones para evitar conflicto de intereses.",
          "Cultura y Capacitación: Programas continuos de concientización y entrenamiento técnico para todo el personal y terceros con acceso a infraestructura crítica."
        ]
      },
      {
        pillar: "2. Gestión del Riesgo de Seguridad y Ciberseguridad",
        articles: "Art. 8, 9, 10",
        details: [
          "Inventario y Clasificación de Activos: Identificación exhaustiva de activos de información, servicios de red, repositorios y criticidad en base a la tríada CIA.",
          "Evaluación de Amenazas y Vulnerabilidades: Análisis continuo de riesgos tecnológicos, vectores de ataque cibernético y modelado de amenazas.",
          "Gestión de Riesgo en Terceros (Third-Party Risk): Auditoría estricta de proveedores tecnológicos, servicios en la nube (Cloud Providers) y acuerdos SLA de ciberseguridad."
        ]
      },
      {
        pillar: "3. Controles Operativos, Red y Arquitectura Defensiva",
        articles: "Art. 11, 12, 13, 14",
        details: [
          "Seguridad en Redes y Telecomunicaciones: Segmentación obligatoria de redes (VLANs, DMZ, Firewalls de Próxima Generación NGFW), control de accesos perimetrales y cifrado robusto en tránsito (TLS 1.3, IPSec).",
          "Gestión de Accesos Privilegiados (PAM): Principio de mínimo privilegio, autenticación multifactor (MFA) obligatoria para administradores, sesiones grabadas y rotación periódica de credenciales maestras.",
          "Gestión de Vulnerabilidades y Parches: Ejecución periódica de análisis de vulnerabilidades (Vulnerability Assessments) y pruebas de penetración (Penetration Testing / Red Team) anuales o ante cambios mayores.",
          "Control de Malware y EDR: Despliegue obligatorio de defensas antimalware centralizadas en endpoints, servidores y gateways con capacidades de detección de comportamiento (EDR/XDR)."
        ]
      },
      {
        pillar: "4. Ciberseguridad en Canales Digitales y Servicios Financieros",
        articles: "Art. 15, 16, 17",
        details: [
          "Autenticación Reforzada de Clientes: Doble factor de autenticación dinámico para transacciones financieras digitales (Token digital, Push OTP criptográfico, Biometría).",
          "Detección y Monitoreo de Fraude en Tiempo Real: Sistemas de análisis de comportamiento de transacciones, geolocalización de IPs anómalas y fingerprinting de dispositivos.",
          "Protección de Integridad y Cifrado de Datos en Reposo y Tránsito: Uso de algoritmos de cifrado avalados internacionalmente (AES-256, RSA 2048+, ECC) con custodia en módulos HSM (Hardware Security Module)."
        ]
      },
      {
        pillar: "5. Monitoreo Continuo, SOC y Respuesta a Incidentes",
        articles: "Art. 18, 19, 20, 21, 22",
        details: [
          "Centro de Operaciones de Seguridad (SOC): Monitoreo y correlación de eventos de seguridad 24/7/365 mediante herramientas SIEM y orquestación SOAR.",
          "Registro y Conservación de Logs: Trazabilidad inmutable de accesos y transacciones por un periodo mínimo de conservación normado, protegidos contra alteración.",
          "Plan de Respuesta a Incidentes de Ciberseguridad: Protocolos formales de contención, erradicación, recuperación, análisis forense digital y reporte obligatorio a la SBS dentro de los plazos establecidos ante incidentes significativos.",
          "Ciberinteligencia e Intercambio de Amenazas: Integración con fuentes de Threat Intelligence para anticipar campañas dirigidas (APTs, ransomware)."
        ]
      }
    ]
  },

  rfcs: [
    {
      rfc: "RFC 2865",
      title: "Remote Authentication Dial In User Service (RADIUS)",
      status: "Estándar Oficial IETF",
      transport: "UDP Puerto 1812 (antiguamente 1645)",
      characteristics: "Cliente/Servidor, paquete con cabecera de 20 bytes (Code, Identifier, Length, Authenticator) + pares atributo-valor (AVP). Combina autenticación y autorización. Solo cifra el atributo Password usando clave compartida MD5.",
      securityFlaw: "El cifrado de password mediante MD5 y falta de cifrado de cabeceras permite ataques de análisis de tráfico, replay e inyección si no se encapsula en TLS/IPsec."
    },
    {
      rfc: "RFC 2866",
      title: "RADIUS Accounting",
      status: "Estándar Oficial IETF",
      transport: "UDP Puerto 1813 (antiguamente 1646)",
      characteristics: "Independiente del servicio de autenticación. Mensajes Accounting-Request (Start, Stop, Interim-Update) y Accounting-Response para auditoría de tráfico, duración de sesión y bytes transferidos."
    },
    {
      rfc: "RFC 8907",
      title: "The Terminal Access Controller Access Control System Plus (TACACS+) Protocol",
      status: "Estándar Informativo IETF (Históricamente propietario de Cisco)",
      transport: "TCP Puerto 49",
      characteristics: "Separación total e independiente de las 3 fases: Autenticación, Autorización y Contabilidad. Cifra el cuerpo COMPLETO del paquete (Payload) mediante clave compartida XOR con derivación MD5. Permite autorización granular comando por comando en terminales de red."
    },
    {
      rfc: "RFC 6733",
      title: "Diameter Base Protocol",
      status: "Estándar Oficial IETF (Reemplaza RFC 3588)",
      transport: "TCP o SCTP Puerto 3868",
      characteristics: "Evolución de RADIUS diseñada para redes modernas, LTE/5G e IMS. Cabecera de 20 bytes con Command Flags y Command Codes de 24 bits. AVPs de 32 bits. Seguridad nativa obligatoria mediante TLS o IPsec. Negociación dinámica de capacidades (CER/CEA), heartbeat (DWR/DWA) y failover determinista."
    },
    {
      rfc: "RFC 4120",
      title: "The Kerberos Network Authentication Service (v5)",
      status: "Estándar Oficial IETF",
      transport: "UDP / TCP Puerto 88",
      characteristics: "Autenticación basada en tickets criptográficos mediante un tercero de confianza (KDC: Key Distribution Center compuesto por AS y TGS). Emplea tickets cifrados (TGT y Service Tickets) y marcas de tiempo (Timestamps) con ventana de sincronización NTP (máx 5 min) para mitigar Replay Attacks. Soporta autenticación mutua."
    },
    {
      rfc: "RFC 4301 / RFC 7296",
      title: "Security Architecture for IP / Internet Key Exchange Protocol Version 2 (IKEv2)",
      status: "Estándar Oficial IETF",
      transport: "UDP 500 (IKE) / UDP 4500 (NAT-Traversal) / Protocolo IP 50 (ESP) / Protocolo IP 51 (AH)",
      characteristics: "Arquitectura de seguridad en Capa de Red (Capa 3). Modos Transporte y Túnel. Negociación criptográfica mediante IKEv2 (IKE_SA_INIT y IKE_AUTH). Cifrado simétrico autenticado (AES-GCM), Diffie-Hellman para Perfect Forward Secrecy (PFS) y autenticación con claves precompartidas (PSK) o certificados X.509."
    }
  ]
};
