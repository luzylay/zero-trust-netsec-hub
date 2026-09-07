# NETWORK SECURITY & DIGITAL IDENTITY: GUÍA MAESTRA DE ESTUDIO OFICIAL

> **Compendio Oficial y Espacio Teórico-Práctico**  
> Basado en la indagación profunda de los estándares de la IETF, la suite **NIST SP 800-63-3**, la **Resolución SBS N° 504-2021**, y la arquitectura de seguridad Cisco IOS.

---

## ÍNDICE GENERAL

1. [Unidad 1: Fundamentos de Seguridad en Redes y Panorama de Amenazas](#unidad-1)
   - 1.1 Triada CIA y Principios de Seguridad
   - 1.2 Taxonomía del Malware: Virus, Gusanos, Troyanos y Backdoors
   - 1.3 Técnicas de Detección: Firmas, Heurística, CRC y Comportamiento
   - 1.4 Arquitectura de Botnets, Servidores C2 y Mecanismos de Evasión (DGA, Fast-Flux)
   - 1.5 Metodologías de Ataque en Redes LAN: Acceso, Capa 2 (ARP Spoofing, DHCP Starvation, SYN Flood) e Ingeniería Social
   - 1.6 Telemetría y Monitoreo: SNMPv3, NetFlow, Syslog, SPAN y Network TAPs

2. [Unidad 2: Autenticación, Autorización y Contabilidad (AAA) & Gestión de Identidad](#unidad-2)
   - 2.1 El Framework AAA Formal
   - 2.2 Protocolo TACACS+ (RFC 8907)
   - 2.3 Protocolo Kerberos v5 (RFC 4120) y Modelo de Tickets (KDC, AS, TGS)
   - 2.4 Protocolo RADIUS (RFC 2865 / 2866) vs DIAMETER (RFC 6733)
   - 2.5 Configuración Práctica de AAA en Cisco IOS (Comandos y Listas de Métodos)
   - 2.6 Suite NIST SP 800-63-3: Niveles IAL, AAL y FAL + Directrices Modernas de Contraseñas
   - 2.7 Normativa SBS Res. N° 504-2021: Gobierno, CISO, PAM, SOC y Canales Digitales

3. [Unidad 3: Seguridad Perimetral, Firewalls e IDPS](#unidad-3)
   - 3.1 Evolución de Firewalls: Stateless vs Stateful vs Next-Generation (NGFW)
   - 3.2 Zonificación de Seguridad y Mecanismos de NAT/PAT
   - 3.3 Sistemas de Detección y Prevención de Intrusos: NIDS/NIPS vs HIDS/HIPS (Snort/Suricata)
   - 3.4 Tecnologías de Decepción: Honeypots de Baja/Alta Interacción, Honeynets y Honeytokens

4. [Unidad 4: Redes Privadas Virtuales (VPNs) y Criptografía Aplicada](#unidad-4)
   - 4.1 Criptografía Moderna: AES-GCM, RSA, Curvas Elípticas, Hash, HMAC y PKI
   - 4.2 Arquitectura IPSec (RFC 4301): Protocolos AH (51) vs ESP (50), Modos Transporte y Túnel
   - 4.3 Protocolo IKE (IKEv1 vs IKEv2 / RFC 7296) y Diffie-Hellman
   - 4.4 VPNs SSL/TLS: Clientless (Web Portal) vs Client-Based (Full Tunnel)

---

<a name="unidad-1"></a>
# UNIDAD 1: FUNDAMENTOS DE SEGURIDAD EN REDES Y PANORAMA DE AMENAZAS

### 1.1 Triada CIA Extendida y Relación de Riesgo
- **Confidencialidad:** Protección contra accesos no autorizados (Cifrado AES-256, TLS 1.3, RBAC).
- **Integridad:** Certeza de no alteración ni manipulación (Funciones Hash SHA-256/3, HMAC, Firmas Digitales).
- **Disponibilidad:** Garantía de acceso oportuno y continuo (Redundancia HSRP/VRRP, BGP multihoming, mitigación DDoS).
- **Autenticidad y Trazabilidad:** Validación inequívoca del emisor y registro inmutable de acciones.
- **Ecuación del Riesgo:** $\text{Riesgo} = \text{Amenaza} \times \text{Vulnerabilidad} \times \text{Impacto}$.

### 1.2 Taxonomía del Malware
- **Virus:** Requiere adherirse a un archivo ejecutable huésped (.exe, .dll, macro) y ejecución manual por el usuario.
- **Gusano (Worm):** Se replica y propaga de forma 100% autónoma por la red explotando vulnerabilidades de servicios/protocolos (ej. WannaCry / EternalBlue SMB TCP 445).
- **Troyano:** Software malicioso disfrazado de utilidad legítima que entrega cargas útiles secundarias (RATs, droppers, stealers).
- **Backdoor:** Mecanismo encubierto para acceso remoto administrativo continuo sin pasar por la autenticación normal.

### 1.3 Técnicas de Detección
1. **Firmas (Signature-Based):** Comparación de hashes o cadenas de bytes específicas.
2. **Integridad (CRC / Hash):** Monitoreo de alteraciones en binarios críticos del sistema.
3. **Vigilancia (API Hooking):** Intercepción de llamadas privilegiadas al núcleo del SO.
4. **Heurística:** Detección de patrones sospechosos sin firma exacta.
5. **Comportamiento (Behavioral / EDR con IA):** Análisis dinámico en sandbox de actividades anómalas en RAM, disco y red.

### 1.4 Botnets y Servidores de Comando y Control (C2)
- **Topología Centralizada:** Bots se conectan a un servidor web/IRC C2 único (Punto único de fallo).
- **Topología Descentralizada (P2P):** Nodos interconectados que reenvían instrucciones firmadas criptográficamente.
- **Técnicas de Evasión:** DGA (Domain Generation Algorithm) y Fast-Flux DNS con TTLs ultra bajos.
- **Defensas:** DNS Sinkholing (redirección forzada hacia servidores de investigación) y bloqueo de dominios por Threat Intelligence.

### 1.5 Ataques en Capa 2 y LAN
- **ARP Spoofing / MITM:** Intercepción de tráfico mediante Gratuitous ARP falso. *Defensa:* Dynamic ARP Inspection (DAI) + DHCP Snooping.
- **DHCP Starvation:** Agotamiento del pool IP del DHCP con MACs aleatorias para desplegar un Rogue DHCP. *Defensa:* DHCP Snooping + Port Security.
- **TCP SYN Flood:** Inundación de paquetes SYN sin completar el handshake para colapsar la cola de backlog. *Defensa:* TCP SYN Cookies y límites de tasa en firewall.

---

<a name="unidad-2"></a>
# UNIDAD 2: FRAMEWORK AAA, PROTOCOLOS Y GESTIÓN DE IDENTIDAD DIGITAL

### 2.1 Framework AAA
- **Autenticación (Authentication):** Verificación probatoria de identidad (¿Quién es el usuario?).
- **Autorización (Authorization):** Asignación de privilegios y permisos de acceso (¿Qué puede hacer el usuario?).
- **Contabilidad (Accounting):** Registro y auditoría temporal de actividades y recursos consumidos.

### 2.2 Comparativa Exhaustiva de Protocolos AAA

| Parámetro | RADIUS (RFC 2865/2866) | TACACS+ (RFC 8907) | DIAMETER (RFC 6733) | Kerberos v5 (RFC 4120) |
| :--- | :--- | :--- | :--- | :--- |
| **Transporte** | UDP 1812 (Auth), UDP 1813 (Acct) | TCP 49 | TCP / SCTP 3868 | UDP / TCP 88 |
| **Separación AAA** | Combina Auth y Authz | Separa 100% Auth, Authz y Acct | Separa Auth/Authz y Acct | Autenticación + SSO basado en Tickets |
| **Cifrado** | Solo cifra el Password (MD5) | Cifra el Payload completo del paquete | Cifrado nativo TLS / IPsec | Cifrado de Tickets con claves del KDC |
| **Granularidad** | A nivel de sesión / VLAN | Comando por comando en CLI | Basado en políticas y QoS móvil | A nivel de SPN / Servicio |
| **Caso Típico** | Wi-Fi 802.1X, VPNs de acceso remoto | Administración de Routers/Switches Cisco | Telecomunicaciones 4G/5G, IMS | Active Directory / Redes Corporativas |

### 2.3 Plantilla de Configuración de AAA en Cisco IOS
```bash
! Habilitar modelo AAA
Router(config)# aaa new-model

! Configurar servidor RADIUS
Router(config)# radius-server host 192.168.10.50 auth-port 1812 acct-port 1813 key RadiusSecret2026!

! Configurar servidor TACACS+
Router(config)# tacacs-server host 192.168.10.60 key TacacsSecret2026!

! Configurar listas de autenticación con respaldo local (Fallback)
Router(config)# aaa authentication login default group tacacs+ group radius local
Router(config)# aaa authorization exec default group tacacs+ local

! Aplicar a líneas VTY
Router(config)# line vty 0 4
Router(config-line)# transport input ssh
Router(config-line)# login authentication default
```

### 2.4 Suite NIST SP 800-63-3 (Digital Identity Guidelines)
- **IAL (Identity Assurance Level - 800-63A):**
  - *IAL1:* Auto-declarada, sin validación documental.
  - *IAL2:* Validación remota/presencial con documento oficial (DNIe/Pasaporte) y biometría 1:1.
  - *IAL3:* Presencia física supervisada con 2 documentos de alta seguridad y biometría forense.
- **AAL (Authenticator Assurance Level - 800-63B):**
  - *AAL1:* 1 factor (Contraseña memorizada).
  - *AAL2:* MFA obligatorio con 2 factores independientes (Contraseña + OTP por App/Push).
  - *AAL3:* MFA basado en Hardware Criptográfico resistente a Phishing (FIDO2 / WebAuthn o Smart Card) con Channel Binding.
- **Directrices de Contraseñas NIST 800-63B:**
  - Longitud mínima de 8 caracteres (recomendado 15+).
  - Eliminada la complejidad forzada y la expiración periódica arbitraria.
  - Obligatorio cotejo contra listas negras de contraseñas vulneradas. Prohibidas las preguntas secretas.

### 2.5 Resolución SBS N° 504-2021 de Ciberseguridad
- **Rol del CISO:** Autonomía jerárquica con reporte directo al Directorio, independiente de TI.
- **Gestión PAM:** Bóveda de credenciales rotativas, MFA obligatorio y auditoría de comandos para administradores.
- **SOC 24/7:** Monitoreo y correlación en tiempo real con plataformas SIEM/SOAR y plan probado de respuesta a incidentes.
- **Canales Digitales:** Doble factor dinámico y monitoreo antifraude transaccional en tiempo real.

---

<a name="unidad-3"></a>
# UNIDAD 3: SEGURIDAD PERIMETRAL, FIREWALLS E IDPS

### 3.1 Tecnologías de Firewall
- **Stateless (L3/L4):** Filtrado estático por ACL sin memoria de conexiones.
- **Stateful Inspection (L4):** Mantiene tabla de estado de conexiones TCP/UDP en RAM; aprueba retorno legítimo.
- **Next-Generation Firewall (NGFW - L7):** Deep Packet Inspection (DPI), App-ID (identificación de aplicación real), User-ID (identidad de usuario), y SSL Decryption.

### 3.2 Sistemas IDPS (Snort / Suricata)
- **NIDS / NIPS:** Inspección de tráfico de red en modo pasivo (SPAN/TAP) o activo en línea (Inline con Drop/Reset).
- **HIDS / HIPS:** Agente en host/servidor (Wazuh, OSSEC) con visibilidad directa sobre tráfico descifrado y llamadas al SO.
- **Regla Snort de Ejemplo:**
```snort
alert tcp any any -> 192.168.1.100 80 (
    msg:"ALERTA - Intento de SQL Injection UNION SELECT";
    content:"UNION SELECT";
    nocase;
    http_uri;
    sid:1000001;
    rev:1;
)
```

---

<a name="unidad-4"></a>
# UNIDAD 4: REDES PRIVADAS VIRTUALES (VPN) Y CRIPTOGRAFÍA APLICADA

### 4.1 Arquitectura IPSec (RFC 4301)
- **AH (Protocolo IP 51):** Proporciona integridad y autenticación; **NO cifra datos** y es incompatible con NAT.
- **ESP (Protocolo IP 50):** Proporciona **cifrado (confidencialidad con AES-GCM)**, autenticación e integridad. Compatible con NAT-Traversal (UDP 4500).
- **Modos de Operación:**
  - *Modo Transporte:* Solo cifra el payload TCP/UDP; cabecera IP original visible (Host-to-Host).
  - *Modo Túnel:* Cifra el paquete IP original completo y agrega una nueva cabecera IP (Site-to-Site VPN).

### 4.2 Protocolo IKE (Internet Key Exchange)
- **IKEv1:** Dos fases (Fase 1: Main Mode 6 paquetes; Fase 2: Quick Mode 3 paquetes).
- **IKEv2 (RFC 7296):** Optimizado en solo 4 paquetes (`IKE_SA_INIT` y `IKE_AUTH`), con soporte nativo para NAT-T y MOBIKE.
