/**
 * Comprehensive Curriculum & Knowledge Base for Network Security & Digital Identity
 * Covers all 4 Units, 18 weeks, theoretical principles, architecture, attacks, and defenses.
 */

window.CURRICULUM_DATA = [
  {
    id: "unit-1",
    unitNumber: 1,
    title: "Unidad 1: Introducción a Network Security y Panorama de Amenazas",
    weeks: "Semanas 1 y 2",
    summary: "Principios fundamentales de seguridad de la información y redes, taxonomía y ciclo de vida del malware (virus, gusanos, troyanos, backdoors), arquitecturas de botnets y servidores C2, metodologías de ataque en redes LAN (acceso, conexiones, ingeniería social), y técnicas de monitoreo y telemetría.",
    sessions: [
      {
        id: "u1-s1",
        title: "Sesión 1.1: Principios Fundamentales y Triada de Seguridad",
        topics: ["Triada CIA extendida", "Vulnerabilidad vs Amenaza vs Riesgo", "Capas de Defensa en Profundidad (Defense in Depth)"],
        content: `
### 1. Principios Fundamentales de la Seguridad de la Información

La seguridad en redes y sistemas informáticos se fundamenta en garantizar que los activos de información estén protegidos contra accesos no autorizados, modificaciones ilícitas e interrupciones en el servicio.

#### La Tríada CIA Extendida:
1. **Confidencialidad (Confidentiality):** Garantiza que la información y el tráfico de red solo sean accesibles por entidades autorizadas. Se implementa mediante:
   - Cifrado simétrico y asimétrico (AES-256, RSA, ECC).
   - Control de acceso basado en roles (RBAC).
   - Segmentación de red y túneles VPN cifrados.
2. **Integridad (Integrity):** Asegura que los datos no hayan sido alterados, modificados o destruidos de forma no autorizada durante el almacenamiento o en tránsito por la red. Se implementa mediante:
   - Funciones Hash criptográficas (SHA-256, SHA-3).
   - Códigos de Autenticación de Mensajes (HMAC).
   - Firmas digitales e infraestructuras PKI.
3. **Disponibilidad (Availability):** Garantiza que los servicios, redes y datos estén accesibles y operativos para los usuarios autorizados cuando lo requieran. Se implementa mediante:
   - Redundancia de hardware y enlaces (HSRP, VRRP, BGP multihoming).
   - Balanceo de carga y clustering de servidores.
   - Mitigación de ataques de Denegación de Servicio Distribuida (DDoS).
   - Planes de Continuidad del Negocio (BCP) y Recuperación ante Desastres (DRP).

#### Pilares Adicionales:
- **Autenticidad (Authenticity):** Certeza verificable del origen y de la identidad de la entidad emisora.
- **Trazabilidad / Contabilidad (Accountability & Auditability):** Capacidad de registrar y auditar cada acción realizada en la red vinculándola a un usuario o proceso específico.
- **No Repudio (Non-Repudiation):** Imposibilidad de que el emisor o receptor de una transacción niegue haberla ejecutado (respaldado por firmas digitales y certificados X.509).

---

### 2. Ecuación y Relación de Riesgo Cibernético

$$\\text{Riesgo (Risk)} = \\text{Amenaza (Threat)} \\times \\text{Vulnerabilidad (Vulnerability)} \\times \\text{Impacto (Impact)}$$

- **Vulnerabilidad (Debilidad):** Falla en el diseño, implementación o configuración de un sistema o protocolo (ej. software sin parches, contraseñas débiles, falta de autenticación en ARP).
- **Amenaza (Vector potencial):** Evento o actor malicioso (hacker, ransomware, malware) con el potencial de explotar una vulnerabilidad.
- **Impacto (Consecuencia):** Daño financiero, operativo, reputacional o legal si la amenaza se materializa.
- **Controles de Seguridad:** Salvaguardas administrativas, técnicas y físicas aplicadas para mitigar el riesgo a un nivel residual aceptable.
`
      },
      {
        id: "u1-s2",
        title: "Sesión 1.2: Taxonomía y Ciclo de Vida del Malware",
        topics: ["Virus informáticos", "Gusanos (Worms)", "Troyanos y RATs", "Backdoors (Puertas Traseras)", "Técnicas de Detección"],
        content: `
### 1. Taxonomía del Malware

El software malicioso (Malware) comprende cualquier programa diseñado con la intención deliberada de causar daños, robar información o subvertir la operatividad de sistemas de red.

| Tipo de Malware | Vector de Propagación | Requiere Intervención Humana | Carga Útil (Payload) Principal |
| :--- | :--- | :--- | :--- |
| **Virus** | Se adhiere a ejecutables legítimos (.exe, .dll, macros) | **Sí** (el usuario debe ejecutar el archivo huésped) | Corrupción de archivos, alteración del Master Boot Record (MBR), robo de datos |
| **Gusano (Worm)** | Se propaga de forma autónoma por la red explotando vulnerabilidades en protocolos de red | **No** (propagación 100% automatizada e independiente) | Saturación de ancho de banda, apertura de puertos, despliegue masivo de payloads |
| **Troyano (Trojan)** | Se disfraza de software legítimo o deseable (crack, instalador) | **Sí** (el usuario es engañado para instalarlo) | Apertura de backdoors (RAT), robo de credenciales (Stealers), descarga de otros malwares (Droppers) |
| **Backdoor (Puerta Trasera)** | Mecanismo encubierto instalado en el sistema operativo o servicio | Depende del método de instalación | Permite acceso remoto administrativo no autenticado al atacante en cualquier momento |

---

### 2. Ciclo de Vida del Virus y Gusanos

1. **Etapa de Creación / Desarrollo:** El autor programa el código malicioso, ensambla la carga útil y aplica técnicas de evasión (ofuscación, empaquetado con UPX, criptografía polimórfica/metamórfica).
2. **Etapa de Infección / Replicación:**
   - *Virus:* Infección del sector de arranque (Boot Sector), archivos del sistema o macros de oficina.
   - *Gusano:* Escaneo masivo de rangos de red IP (TCP SYN scan) en busca de puertos vulnerables (ej. SMB puerto 445 en EternalBlue / WannaCry, MS-SQL puerto 1433 en Slammer).
3. **Etapa de Latencia (Dormancy):** El malware permanece inactivo para eludir el análisis en sandboxes y evadir sospechas, esperando un disparador (trigger) por fecha, comando C2 o evento del sistema.
4. **Etapa de Activación / Ejecución del Payload:** Despliegue de la acción destructiva o lucrativa: cifrado de discos (Ransomware), exfiltración de credenciales, o enrolamiento en una botnet.

---

### 3. Técnicas de Detección de Malware

1. **Detección Basada en Firmas (Signature-Based):**
   - Compara el hash (MD5, SHA-256) o secuencias de bytes del binario contra una base de datos de firmas conocidas.
   - *Limitación:* Ineficaz ante malware nuevo (Zero-Day) o variantes polimórficas.
2. **Comprobación de Integridad / Suma de Verificación (CRC / Hash):**
   - Almacena una línea base (baseline) de los hashes de los ejecutables del sistema. Si el valor hash cambia, alerta sobre posible infección o inyección.
3. **Programas de Vigilancia (Hooking & API Monitoring):**
   - Interceptan llamadas al sistema (System Calls / Windows API) como \`CreateRemoteThread\`, \`VirtualAllocEx\` o intentos de modificación de claves del Registro (\`Run/RunOnce\`).
4. **Búsqueda Heurística (Heuristic Analysis):**
   - Examina el código en busca de secuencias de instrucciones sospechosas (ej. bucles de descifrado, rutinas de evasión de depuradores) sin requerir una firma exacta.
5. **Análisis del Comportamiento (Behavioral / EDR / XDR con IA & ML):**
   - Ejecuta el proceso en un entorno aislado (Sandbox) o monitorea la telemetría en tiempo real: conexiones de red anómalas a IPs no categorizadas, volumen inusual de escrituras en disco (síntoma de ransomware), o inyección de código en procesos legítimos (\`svchost.exe\`, \`lsass.exe\`).
`
      },
      {
        id: "u1-s3",
        title: "Sesión 1.3: Botnets y Servidores de Comando y Control (C2)",
        topics: ["Arquitectura de Botnets", "Topologías C2 (Centralizado vs P2P vs DGA)", "Mitigación y Sinkholing"],
        content: `
### 1. ¿Qué es una Botnet?

Una **Botnet** (red de robots) es una infraestructura distribuida de dispositivos informáticos comprometidos (denominados *Bots* o *Zombies*) que son controlados de forma remota y coordinada por un atacante (denominado *Botmaster* o *Herder*) a través de canales de comunicación encubiertos.

#### Usos de las Botnets:
- Ataques de Denegación de Servicio Distribuida masivos (DDoS L3/L4 y L7).
- Minería ilícita de criptomonedas (Cryptojacking).
- Distribución masiva de Spam y campañas de Phishing.
- Redes de proxies residenciales para ocultar el tráfico de ciberdelincuentes.
- Robo y exfiltración masiva de credenciales bancarias e identidad.

---

### 2. Arquitecturas de Mando y Control (C&C / C2)

\`\`\`mermaid
flowchart TD
    subgraph Centralizada
    BM1[Botmaster] --> C2Server[Servidor C2 HTTP / IRC]
    C2Server --> Bot1[Bot 1]
    C2Server --> Bot2[Bot 2]
    C2Server --> Bot3[Bot 3]
    end

    subgraph Descentralizada_P2P
    BM2[Botmaster] --> NodeA[Nodo P2P A]
    NodeA <--> NodeB[Nodo P2P B]
    NodeB <--> NodeC[Nodo P2P C]
    NodeA <--> NodeC
    end
\`\`\`

1. **Arquitectura Centralizada (IRC / HTTP / HTTPS):**
   - Todos los bots se conectan a una o varias direcciones IP / Nombres de Dominio fijos de servidores C2.
   - *Protocolos:* Antiguamente canales IRC (#channel); actualmente HTTP/HTTPS cifrado mediante TLS para camuflarse en el tráfico web corporativo legítimo.
   - *Vulnerabilidad defensiva:* Presenta un punto único de fallo (Single Point of Failure). Si los defensores toman control de la IP del C2 o el registrador suspende el dominio, la botnet queda descabezada.
2. **Arquitectura Descentralizada Peer-to-Peer (P2P):**
   - No existe un servidor central. Cada bot actúa como cliente y servidor, reenviando comandos firmados criptográficamente por el Botmaster a sus nodos vecinos.
   - *Ejemplo histórico:* Storm Worm, GameOver Zeus.
   - *Ventaja del atacante:* Alta resiliencia; dar de baja unos pocos nodos no desmantela la red.
3. **Mecanismos Avanzados de Evasión:**
   - **DGA (Domain Generation Algorithms):** El malware genera matemáticamente cientos de nombres de dominio pseudoaleatorios por día utilizando una semilla temporal (ej. la fecha actual). El bot intenta conectarse a todos ellos hasta encontrar el que el atacante registró para ese día.
   - **Fast-Flux DNS:** Técnica que asocia un único dominio a decenas de direcciones IP de bots que cambian constantemente cada pocos segundos mediante valores TTL de DNS extremadamente bajos.
   - **Canales Encubiertos:** Uso de DNS over HTTPS (DoH), APIs de Telegram, Discord o transacciones en la Blockchain de Bitcoin para recibir instrucciones.

---

### 3. Técnicas de Mitigación y Defensas Anti-Botnet

- **DNS Sinkholing:** Los investigadores de seguridad o autoridades redirigen el tráfico de dominios maliciosos de C2 hacia servidores de análisis controlados (Sinkholes) en lugar del C2 real, cortando la comunicación con los atacantes y permitiendo censar a las víctimas.
- **Inspección de Tráfico y Análisis de Beaconing:** Detección de patrones regulares de conexión de red saliente hacia destinos externos sospechosos (heartbeat o balizas periódicas con jitter).
- **Control de Reputación IP / DNS:** Bloqueo perimetral en NGFW de dominios recién registrados (Newly Registered Domains - NRD) o con mala reputación de Threat Intelligence.
`
      },
      {
        id: "u1-s4",
        title: "Sesión 1.4: Metodologías de Ataque a Redes LAN y Monitoreo",
        topics: ["Ataques de Acceso", "Ataques a Conexiones y Capa 2 (ARP Spoofing, DHCP Starvation, SYN Flood)", "Ingeniería Social", "Dispositivos de Monitoreo (SNMPv3, NetFlow, SPAN, TAP)"],
        content: `
### 1. Metodologías de Ataque en Redes Locales (LAN)

#### A. Ataques de Acceso:
- **Fuerza Bruta Directa e Híbrida:** Intentos exhaustivos de combinaciones de credenciales contra servicios de autenticación (SSH, RDP, Telnet, Web).
- **Ataque por Diccionario:** Uso de listas precompiladas de contraseñas de alta frecuencia (ej. \`rockyou.txt\`).
- **Password Spraying:** Intento de una sola contraseña común (ej. \`Primavera2026!\`) contra cientos de cuentas de usuario distintas, eludiendo bloqueos por intentos fallidos por cuenta.
- **Pass-the-Hash / Pass-the-Ticket:** Reutilización de hashes NTLM o tickets Kerberos capturados en memoria RAM (LSASS) sin necesidad de descifrar la contraseña en texto claro.

#### B. Ataques a las Conexiones y Capa de Enlace (Layer 2 Attacks):
\`\`\`mermaid
sequenceDiagram
    participant Victima as PC Víctima (192.168.1.50)
    participant Atacante as Atacante MITM (192.168.1.100)
    participant Gateway as Router Gateway (192.168.1.1)

    Note over Atacante: Gratuitous ARP Spoofing
    Atacante->>Victima: ARP Reply: 192.168.1.1 is at MAC_Atacante
    Atacante->>Gateway: ARP Reply: 192.168.1.50 is at MAC_Atacante
    Note over Victima, Gateway: Tablas ARP envenenadas
    Victima->>Atacante: Tráfico hacia Internet (interceptado y reenviado)
    Atacante->>Gateway: Reenvía tráfico legítimo
\`\`\`

1. **ARP Poisoning / ARP Spoofing (Man-in-the-Middle):**
   - El atacante envía respuestas ARP falsificadas (Gratuitous ARP) a la víctima y al gateway, asociando la dirección IP legítima con la dirección MAC del atacante.
   - *Defensa:* **Dynamic ARP Inspection (DAI)** en switches Cisco, que valida paquetes ARP contra la base de datos de DHCP Snooping.
2. **DHCP Starvation:**
   - El atacante inunda el switch con miles de solicitudes DHCP Request con direcciones MAC falsificadas, agotando todo el pool de direcciones IP del servidor DHCP legítimo y procediendo a levantar un servidor Rogue DHCP para interceptar el tráfico.
   - *Defensa:* **DHCP Snooping** (marca puertos como Trusted/Untrusted) y **Port Security** (limita el número de MACs por puerto).
3. **MAC Flooding:**
   - Inundación de la tabla CAM (Content Addressable Memory) del switch con miles de direcciones MAC falsas hasta desbordarla, forzando al switch a entrar en modo 'fail-open' (hub), transmitiendo todos los paquetes por todos los puertos (Broadcast).
   - *Defensa:* **Port Security** con límite máximo de MACs y violación en modo \`shutdown\` o \`restrict\`.
4. **TCP SYN Flood (Denegación de Servicio):**
   - Explotación del Three-Way Handshake de TCP enviando miles de paquetes SYN con IPs de origen falsificadas, sin responder con el ACK final, agotando la cola de conexiones semiabiertas (Backlog Queue) del servidor.
   - *Defensa:* **TCP SYN Cookies**, firewalls con inspección de estado y límites de tasa (rate limiting).

#### C. Ataques por Ingeniería Social:
- **Phishing tradicional:** Envío masivo de correos electrónicos engañosos imitando marcas u organizaciones legítimas.
- **Spear Phishing:** Ataques altamente dirigidos y personalizados a un individuo u organización específica tras recopilar inteligencia OSINT.
- **Whaling:** Spear phishing dirigido a altos ejecutivos (CEO, CFO) para autorizar transferencias fraudulentas (Business Email Compromise - BEC).
- **Vishing & Smishing:** Ingeniería social mediante llamadas telefónicas de voz (Vishing) o mensajes SMS (Smishing).
- **Baiting & Pretexting:** Uso de cebos (ej. memorias USB maliciosas abandonadas en recepciones) o creación de un escenario ficticio convincente para obtener acceso físico o lógico.

---

### 2. Dispositivos y Técnicas de Monitoreo de Red

| Mecanismo de Monitoreo | Capa OSI / Enfoque | Tipo de Datos Recopilados | Casos de Uso en Ciberseguridad |
| :--- | :--- | :--- | :--- |
| **SNMPv3** | Capa de Aplicación (UDP 161/162) | Métricas de estado de hardware, ancho de banda, CPU, contadores de interfaz con cifrado (AES) y autenticación (SHA). | Monitoreo de disponibilidad, detección de caídas de interfaces y saturación de enlaces. |
| **NetFlow / IPFIX** | Capa de Red y Transporte (L3/L4) | Metadatos de flujos de red: IP origen/destino, puerto origen/destino, protocolo, bytes, paquetes y marcas de tiempo. | Detección de anomalías de tráfico masivo, exfiltración de datos, escaneos de puertos y ataques DDoS sin almacenar el contenido del payload. |
| **Syslog (RFC 5424)** | Capa de Aplicación (UDP/TCP 514, TLS 6514) | Registros cronológicos de eventos del sistema (login exitoso/fallido, cambios de configuración, alertas de firewall). | Trazabilidad forense, cumplimiento normativo y correlación centralizada en SIEM. |
| **Port Mirroring (SPAN / RSPAN / ERSPAN)** | Capa de Enlace / Red | Copia exacta bit a bit del tráfico físico o VLAN hacia un puerto donde está conectado un sensor NIDS (Snort, Zeek). | Inspección profunda de paquetes (DPI) y análisis forense de tráfico completo. |
| **Network TAP (Test Access Point)** | Capa Física (Capa 1) | Dispositivo de hardware pasivo intercalado en el cable que duplica las señales ópticas o de cobre sin introducir latencia ni afectar al switch. | Captura forense de alta velocidad 10G/40G/100G garantizada sin pérdida de paquetes por sobrecarga de CPU de switch. |
`
      }
    ]
  },

  {
    id: "unit-2",
    unitNumber: 2,
    title: "Unidad 2: Autenticación, Autorización y Contabilidad (AAA) & Gestión de Identidad",
    weeks: "Semanas 3, 4, 5 y 6",
    summary: "El framework AAA formal, protocolos de autenticación centralizada (RADIUS, TACACS+, DIAMETER, Kerberos v5), estándares internacionales NIST SP 800-63-3 (IAL, AAL, FAL), directrices modernas de contraseñas y MFA, marco regulatorio SBS Res. 504-2021, y configuración práctica en Cisco IOS.",
    sessions: [
      {
        id: "u2-s1",
        title: "Sesión 2.1: El Framework AAA y Protocolos Centralizados",
        topics: ["Concepto de Autenticación, Autorización y Contabilidad", "Protocolo TACACS+ (RFC 8907)", "Protocolo Kerberos v5 (RFC 4120)"],
        content: `
### 1. El Framework AAA (Authentication, Authorization, Accounting)

El modelo **AAA** es el pilar de la gestión centralizada de accesos e identidades en arquitecturas de red empresariales y de proveedores de servicios:

1. **Autenticación (Authentication - ¿Quién eres?):**
   - Es el proceso mediante el cual una entidad demuestra su identidad ante un sistema de verificación.
   - *Mecanismos:* Factores basados en conocimiento (contraseñas), posesión (tokens FIDO2, smart cards, OTP) o inherencia (biometría de huella, rostro).
2. **Autorización (Authorization - ¿Qué puedes hacer?):**
   - Es el proceso de conceder derechos específicos, permisos y privilegios a la entidad ya autenticada.
   - *Modelos:* Control de acceso basado en roles (**RBAC**), control de acceso basado en atributos (**ABAC**), o listas de control de comandos (Command Authorization).
3. **Contabilidad / Registro (Accounting - ¿Qué hiciste y durante cuánto tiempo?):**
   - Es el proceso de recopilar, auditar y registrar las acciones realizadas por el usuario durante su sesión activa (hora de inicio, comandos ejecutados, bytes transferidos, hora de desconexión).

---

### 2. Protocolo TACACS+ (RFC 8907)

**TACACS+ (Terminal Access Controller Access Control System Plus)** es un protocolo optimizado para la administración segura de dispositivos de red (Routers, Switches, Firewalls):

- **Capa de Transporte:** Utiliza **TCP en el puerto 49**, garantizando entrega confiable orientada a la conexión.
- **Separación de Servicios:** Desacopla de forma 100% independiente las tres funciones: Autenticación, Autorización y Contabilidad. Esto permite autenticar mediante Kerberos/LDAP pero autorizar comandos específicos mediante TACACS+.
- **Seguridad Criptográfica:** Cifra el **CUERPO COMPLETO (Payload)** del paquete, protegiendo tanto contraseñas como comandos ejecutados y nombres de usuario. Solo la cabecera fija de 12 bytes viaja sin cifrar.
- **Autorización Granular por Comando:** Permite interceptar cada comando individual escrito por el administrador en la consola (\`show running-config\`, \`reload\`, \`interface GigabitEthernet0/0\`) y consultar en tiempo real al servidor TACACS+ si el usuario tiene permiso para ejecutar ese comando específico.

---

### 3. Protocolo Kerberos v5 (RFC 4120)

Kerberos es el estándar de la industria para autenticación de un solo inicio de sesión (**SSO**) en redes no confiables (utilizado nativamente en Microsoft Active Directory):

\`\`\`mermaid
sequenceDiagram
    participant C as Cliente (Usuario)
    participant AS as Authentication Server (AS)
    participant TGS as Ticket Granting Server (TGS)
    participant SS as Servidor de Servicio (Target)

    Note over C, AS: Paso 1: Autenticación Inicial
    C->>AS: 1. AS-REQ (ID Usuario, Timestamp cifrado con Hash Password)
    AS->>C: 2. AS-REP [TGT cifrado con K_TGS + Clave de Sesión Cliente-TGS cifrada con K_Cliente]
    
    Note over C, TGS: Paso 2: Solicitud de Ticket de Servicio
    C->>TGS: 3. TGS-REQ [TGT + Autenticador cifrado con Clave de Sesión Cliente-TGS + ID Servicio]
    TGS->>C: 4. TGS-REP [Service Ticket cifrado con K_Servicio + Clave de Sesión Cliente-Servidor]
    
    Note over C, SS: Paso 3: Acceso al Recurso
    C->>SS: 5. AP-REQ [Service Ticket + Autenticador cifrado]
    SS->>C: 6. AP-REP (Autenticación Mutua opcional)
\`\`\`

- **Key Distribution Center (KDC):** Compuesto por dos componentes lógicos:
  1. **Authentication Server (AS):** Valida la identidad inicial del usuario y entrega el **TGT (Ticket Granting Ticket)**.
  2. **Ticket Granting Server (TGS):** Emite tickets de servicio (**Service Tickets**) para recursos específicos a cambio de un TGT válido.
- **Protección contra Replay Attacks:** Utiliza marcas de tiempo criptográficas (**Timestamps**) que requieren sincronización estricta de relojes mediante protocolo **NTP** (con una tolerancia típica máxima de 5 minutos).
- **Autenticación Mutua:** El cliente verifica la autenticidad del servidor y el servidor verifica la del cliente antes de transmitir datos sensibles.
`
      },
      {
        id: "u2-s2",
        title: "Sesión 2.2: RADIUS vs DIAMETER (Arquitectura y RFCs)",
        topics: ["Protocolo RADIUS (RFC 2865/2866)", "Protocolo DIAMETER (RFC 6733)", "Cuadro Comparativo Técnico Profundo"],
        content: `
### 1. Protocolo RADIUS (RFC 2865 / RFC 2866)

**RADIUS (Remote Authentication Dial-In User Service)** es el estándar abierto dominante para control de acceso a redes (Wi-Fi corporativo 802.1X, VPNs de acceso remoto, conexiones dial-up y enlaces WAN):

- **Transporte:** Protocolo **UDP**. Utiliza los puertos asignados por la IANA:
  - **UDP 1812** para Autenticación y Autorización.
  - **UDP 1813** para Contabilidad (Accounting).
  *(Históricamente utilizaba los puertos no oficiales 1645 y 1646).*
- **Arquitectura de Paquete:** Cabecera fija de 20 bytes:
  \`[Code (1B) | Identifier (1B) | Length (2B) | Authenticator (16B) | Attributes (AVPs variable)]\`
- **Acoplamiento de Servicios:** RADIUS **combina Autenticación y Autorización** en un único mensaje de respuesta: si el usuario es válido, el servidor responde con un \`Access-Accept\` que incluye simultáneamente los atributos de autorización (VLAN asignada, ACLs, timeout de sesión).
- **Vulnerabilidad Criptográfica:** RADIUS **solo cifra el campo Password** dentro del atributo \`User-Password\` usando una función MD5 basada en la clave compartida (\`Shared Secret\`). El nombre de usuario y todos los demás atributos viajan en texto plano, lo que facilita el espionaje de red si no se transporta sobre un túnel IPsec o TLS (RadSec - RFC 6614).

---

### 2. Protocolo DIAMETER (RFC 6733)

**DIAMETER** fue diseñado por la IETF como la evolución de nueva generación para subsanar todas las limitaciones estructurales de RADIUS en redes móviles LTE/4G, 5G, IMS y acceso a banda ancha:

- **Transporte Fiable:** Utiliza **TCP o SCTP (Stream Control Transmission Protocol) en el puerto 3868**, garantizando control de congestión, entrega ordenada y detección de caídas a nivel de transporte.
- **Seguridad Obligatoria:** Requiere de forma nativa soporte para cifrado en capa de transporte mediante **TLS** o a nivel de red con **IPsec**.
- **Espacio de Atributos Extendido:** Utiliza pares atributo-valor (**AVPs**) con identificadores de 32 bits (frente a los 8 bits de RADIUS), soportando atributos propietarios de fabricantes (Vendor-Specific Attributes) sin colisiones.
- **Gestión Avanzada de Enlaces:** Incluye mensajes integrados de prueba de vida (Device-Watchdog-Request \`DWR\` / Device-Watchdog-Answer \`DWA\`) y negociación dinámica de capacidades (Capabilities-Exchange-Request \`CER\` / \`CEA\`).
- **Soporte de Roaming y Failover:** Mecanismos deterministas de redirección de mensajes y conmutación por error ante caídas de servidores AAA sin pérdida de sesiones.

---

### 3. Matriz Comparativa Exhaustiva: RADIUS vs TACACS+ vs DIAMETER

| Criterio Técnico | RADIUS (RFC 2865/2866) | TACACS+ (RFC 8907) | DIAMETER (RFC 6733) |
| :--- | :--- | :--- | :--- |
| **Capa de Transporte** | UDP (1812 Auth, 1813 Acct) | TCP (Puerto 49) | TCP / SCTP (Puerto 3868) |
| **Separación AAA** | Combina Autenticación y Autorización | Separa 100% Auth, Authz y Acct | Separa Auth/Authz y Acct con aplicaciones dedicadas |
| **Nivel de Cifrado** | Solo cifra la contraseña (MD5) | Cifra el Payload completo del paquete | Cifrado completo del canal con TLS o IPsec |
| **Granularidad de Comandos** | No permite autorizar comando por comando | Autorización granular de cada comando CLI | Orientado a políticas de sesión y QoS móvil |
| **Espacio de Atributos (AVP)** | 8 bits (256 valores máximos) | Atributos clave/valor en texto | 32 bits (más de 4 mil millones de valores) |
| **Detección de Caída de Enlace** | Basado en timeouts de retransmisión de aplicación | A nivel de conexión TCP / RST | Nativo a nivel de protocolo (DWR/DWA) y SCTP |
| **Caso de Uso Principal** | Acceso de red a usuarios finales (802.1X Wi-Fi, VPN) | Administración de dispositivos de red (Cisco CLI) | Redes de Telecomunicaciones 4G/5G, Roaming, IMS |
`
      },
      {
        id: "u2-s3",
        title: "Sesión 2.3: Configuración Práctica de AAA en Cisco IOS",
        topics: ["Comandos fundamentales Cisco IOS", "Configuración de RADIUS y TACACS+", "Listas de métodos de respaldo (Fallback)", "Verificación y Troubleshooting"],
        content: `
### 1. Modelo de Configuración de AAA en Cisco IOS

Para habilitar AAA en cualquier switch o router Cisco, se debe activar el nuevo modelo de seguridad mediante el comando global \`aaa new-model\`.

\`\`\`bash
! =====================================================
! PASO 1: Habilitar el modelo AAA y crear usuario local de emergencia
! =====================================================
Router# configure terminal
Router(config)# username admin privilege 15 secret SuperAdminKey2026!
Router(config)# aaa new-model

! =====================================================
! PASO 2: Definir el Servidor RADIUS / TACACS+
! =====================================================
! Para RADIUS (Sintaxis moderna IOS 15.x+):
Router(config)# radius server RADIUS_CORP
Router(config-radius-server)# address ipv4 192.168.10.50 auth-port 1812 acct-port 1813
Router(config-radius-server)# key RadiusSecretKey2026!
Router(config-radius-server)# exit

! Agrupar servidores en un grupo de servidores AAA:
Router(config)# aaa group server radius GRP_RADIUS
Router(config-sg-radius)# server name RADIUS_CORP
Router(config-sg-radius)# exit

! Para TACACS+ (Administración de Routers):
Router(config)# tacacs server TACACS_CORP
Router(config-server-tacacs)# address ipv4 192.168.10.60
Router(config-server-tacacs)# key TacacsKeyPass2026!
Router(config-server-tacacs)# exit

Router(config)# aaa group server tacacs+ GRP_TACACS
Router(config-sg-tacacs+)# server name TACACS_CORP
Router(config-sg-tacacs+)# exit

! =====================================================
! PASO 3: Definir Listas de Métodos (Authentication Lists)
! =====================================================
! Autenticación de login: Primero consultar TACACS+, si no responde, caer a base de datos LOCAL
Router(config)# aaa authentication login default group GRP_TACACS local
Router(config)# aaa authentication login CONSOLE_AUTH local

! Autorización para el modo EXEC (enable) y comandos:
Router(config)# aaa authorization exec default group GRP_TACACS local
Router(config)# aaa authorization commands 15 default group GRP_TACACS local

! Contabilidad de comandos y sesiones:
Router(config)# aaa accounting exec default start-stop group GRP_TACACS
Router(config)# aaa accounting commands 15 default start-stop group GRP_TACACS

! =====================================================
! PASO 4: Aplicar a las líneas VTY (SSH/Telnet) y Consola
! =====================================================
Router(config)# line console 0
Router(config-line)# login authentication CONSOLE_AUTH
Router(config-line)# exit

Router(config)# line vty 0 4
Router(config-line)# transport input ssh
Router(config-line)# login authentication default
Router(config-line)# authorization exec default
Router(config-line)# exit
\`\`\`

---

### 2. Comandos de Verificación y Diagnóstico (Troubleshooting)

- \`show aaa servers\`: Muestra el estado operativo de los servidores AAA configurados, número de paquetes enviados, respuestas recibidas y fallos de timeout.
- \`show running-config | include aaa\`: Verifica la configuración de listas de métodos AAA.
- \`test aaa group GRP_TACACS admin SuperAdminKey2026! legacy\`: Envía una prueba de autenticación directa desde el CLI al servidor AAA para validar credenciales y conectividad sin cerrar sesión.
- \`debug aaa authentication\`: Depuración en tiempo real del proceso de autenticación de usuarios.
`
      },
      {
        id: "u2-s4",
        title: "Sesión 2.4: Estándares Oficiales NIST SP 800-63 y SBS Res. 504-2021",
        topics: ["NIST SP 800-63-3 Framework (IAL, AAL, FAL)", "Directrices modernas de contraseñas NIST 800-63B", "Reglamento SBS 504-2021 de Ciberseguridad"],
        content: `
### 1. El Marco NIST SP 800-63-3 (Digital Identity Guidelines)

El Instituto Nacional de Estándares y Tecnología (NIST) redefine la gestión de identidad digital descomponiéndola en tres niveles ortogonales e independientes:

\`\`\`mermaid
flowchart LR
    subgraph NIST_800_63_Framework[NIST SP 800-63-3 Suite]
        IAL[IAL: Identity Assurance Level<br/>NIST SP 800-63A<br/>¿Quién eres en el mundo real?]
        AAL[AAL: Authenticator Assurance Level<br/>NIST SP 800-63B<br/>¿Cómo demuestras el control de tu credencial?]
        FAL[FAL: Federation Assurance Level<br/>NIST SP 800-63C<br/>¿Cómo se transmiten las aserciones de identidad?]
    end
\`\`\`

#### Resumen de Niveles AAL (NIST SP 800-63B):
- **AAL1:** Autenticación de un solo factor (contraseña). Resistencia mínima contra atacantes pasivos.
- **AAL2:** Autenticación Multifactor (MFA) obligatoria con canales separados (ej. Contraseña + Software OTP o Push Token seguro). Protege contra ataques remotos masivos.
- **AAL3:** Autenticación Multifactor basada en Hardware Criptográfico resistente a Phishing (Hardware Security Key FIDO2/WebAuthn o Smart Card PIV/CAC). Requiere prueba de posesión mediante clave privada asimétrica no exportable y enlace de canal (Channel Binding).

---

### 2. Normativa SBS Res. N° 504-2021

La **Resolución SBS N° 504-2021** establece los requisitos obligatorios para la gestión de seguridad de la información y ciberseguridad en el sector financiero y asegurador:

1. **Gobernanza:** Obligatoriedad de designar un **Oficial de Seguridad de la Información (CISO)** con reporte directo al Directorio o Comité Ejecutivo, con independencia funcional de la Gerencia de TI.
2. **Defensa Perimetral y Segmentación:** Segmentación de redes mediante zonas de confianza (Trust, Untrust, DMZ) y despliegue de NGFW con inspección de estado y correlación de amenazas.
3. **Gestión de Accesos Privilegiados (PAM):** Control estricto y trazabilidad de cuentas con privilegios administrativos (credenciales rotativas, MFA obligatorio, auditoría de sesiones).
4. **Centro de Operaciones de Seguridad (SOC):** Monitoreo continuo 24/7 de eventos e incidentes con plataformas SIEM/SOAR.
5. **Autenticación Reforzada en Canales Digitales:** Implementación de doble factor dinámico para todas las operaciones monetarias y transferencias en banca digital.
`
      }
    ]
  },

  {
    id: "unit-3",
    unitNumber: 3,
    title: "Unidad 3: Seguridad Perimetral, Firewalls e IDPS",
    weeks: "Semanas 7, 8, 9, 10 y 11",
    summary: "Arquitectura y evolución de firewalls (Stateless, Stateful, NGFW), zonificación de seguridad, NAT/PAT, sistemas de detección y prevención de intrusos (NIDS, NIPS, HIDS, HIPS con Snort y Suricata), y tecnologías de decepción (Honeypots y Honeynets).",
    sessions: [
      {
        id: "u3-s1",
        title: "Sesión 3.1: Arquitectura y Evolución de Firewalls",
        topics: ["Packet Filtering Stateless", "Stateful Inspection Firewall", "Next-Generation Firewalls (NGFW)", "Zonificación y NAT/PAT"],
        content: `
### 1. Evolución de las Tecnologías de Firewall

\`\`\`mermaid
flowchart TD
    G1[1ª Generación: Filtro de Paquetes Stateless<br/>Capa 3 y 4 - Analiza cabeceras aisladas sin contexto]
    G2[2ª Generación: Inspección de Estado - Stateful<br/>Capa 4 - Tabla de Estado de Conexiones TCP/UDP]
    G3[3ª Generación: Application Proxy / Gateway<br/>Capa 7 - Termina la conexión y valida protocolo de aplicación]
    G4[4ª Generación: Next-Generation Firewall - NGFW<br/>Capa 7 Profunda - DPI, App-ID, User-ID, SSL Decryption, IPS Integrado]
    
    G1 --> G2 --> G3 --> G4
\`\`\`

1. **Filtro de Paquetes sin Estado (Stateless Packet Filtering - L3/L4):**
   - Evalúa cada paquete de forma individual basándose exclusivamente en reglas estáticas de ACL (IP origen/destino, puerto origen/destino, protocolo).
   - *Desventaja:* No sabe si un paquete TCP es parte de una conexión ya establecida o una nueva solicitud; vulnerable a ataques de falsificación de banderas TCP (ACK scans).
2. **Firewall de Inspección de Estado (Stateful Inspection - L4):**
   - Mantiene una **Tabla de Estado de Conexiones (State Table)** en memoria RAM. Registra la secuencia de estados del Three-Way Handshake de TCP (SYN, SYN-ACK, ESTABLISHED, FIN/RST) y puertos dinámicos de UDP.
   - Si un paquete entrante coincide con una conexión saliente registrada en la tabla de estado, se permite automáticamente sin requerir reglas de entrada abiertas.
3. **Firewalls de Próxima Generación (NGFW - Layer 7):**
   - **Deep Packet Inspection (DPI):** Analiza el contenido completo de la carga útil del paquete más allá del puerto TCP/UDP estándar.
   - **App-ID:** Identifica la aplicación real independientemente del puerto utilizado (ej. detecta tráfico de BitTorrent o SSH encapsulado en el puerto TCP 80/443).
   - **User-ID:** Vincula los eventos de red y reglas de filtrado a identidades de usuarios de Active Directory / LDAP en lugar de direcciones IP dinámicas.
   - **Inspección SSL/TLS (SSL Decryption):** Descifra e inspecciona el tráfico HTTPS para detectar malware oculto antes de reenviarlo al usuario.

---

### 2. Zonificación de Seguridad y Conceptos de NAT

- **Zonas de Red Típicas:**
  - **Zona Interna (Trust / LAN):** Nivel de seguridad alto (100). Estaciones de trabajo y recursos corporativos internos.
  - **Zona Externa (Untrust / WAN):** Nivel de seguridad 0 (Internet). Origen no confiable.
  - **Zona Desmilitarizada (DMZ):** Nivel de seguridad intermedio (ej. 50). Aloja servidores de cara al público (Web, DNS, Correo) aislados de la red LAN corporativa.
- **Mecanismos de Traducción de Direcciones de Red (NAT):**
  - **NAT Estático (1:1):** Mapea permanentemente una dirección IP privada a una dirección IP pública fija (utilizado comúnmente para servidores en DMZ).
  - **NAT Dinámico:** Mapea IPs privadas a un pool de IPs públicas disponibles por orden de llegada.
  - **PAT (Port Address Translation / NAT Overload):** Mapea miles de direcciones IP privadas a una ÚNICA dirección IP pública utilizando números de puerto de origen aleatorios distintos (1024 a 65535).
`
      },
      {
        id: "u3-s2",
        title: "Sesión 3.2: Sistemas de Detección y Prevención de Intrusos (IDPS)",
        topics: ["NIDS vs NIPS", "HIDS vs HIPS", "Detección por Firmas vs Anomalías", "Reglas y Sintaxis de Snort"],
        content: `
### 1. Clasificación de Sistemas IDPS

| Criterio | NIDS (Network IDS) | NIPS (Network IPS) | HIDS / HIPS (Host-Based) |
| :--- | :--- | :--- | :--- |
| **Ubicación** | Conectado a puerto SPAN o TAP pasivo | En línea (**Inline**) en el flujo de tráfico | Instalado como agente en el Endpoint / Servidor |
| **Acción ante Amenaza** | Pasiva: Genera alertas y logs | Activa: Descarta paquetes (**Drop**), resetea conexiones TCP (**TCP Reset**) | Activa/Pasiva: Bloquea procesos, aísla host o revierte cambios en disco |
| **Impacto en Rendimiento** | Cero latencia en el tráfico de producción | Introduce micro-latencia si el motor de inspección se satura | Consume CPU y memoria local del host |
| **Visibilidad de Tráfico Cifrado** | Nula (salvo que el tráfico se descifre antes) | Nula sin SSL Offloading | **Total** (inspecciona la memoria y llamadas al SO antes del cifrado) |

---

### 2. Motores y Métodos de Detección

1. **Detección Basada en Firmas (Signature-Based):**
   - Compara patrones de bytes conocidos y expresiones regulares en el tráfico contra una base de reglas (ej. reglas de Snort o Emerging Threats).
   - *Ventaja:* Tasa de falsos positivos extremadamente baja para amenazas conocidas.
   - *Limitación:* Ciega ante ataques de Día Cero (Zero-Day) y tráfico ofuscado.
2. **Detección Basada en Anomalías (Anomaly-Based / Heurística):**
   - Establece una línea base de comportamiento normal de la red y genera alertas cuando el tráfico estadístico se desvía del perfil (ej. un servidor web enviando repentinamente peticiones DNS a 500 req/s).
   - *Ventaja:* Capacidad de detectar nuevas técnicas de ataque no catalogadas.
   - *Desafío:* Alta tasa de falsos positivos durante variaciones normales de carga de trabajo.

---

### 3. Estructura y Sintaxis de Reglas en Snort

Una regla de Snort se compone del **Encabezado de la Regla (Rule Header)** y las **Opciones de la Regla (Rule Options)**:

\`\`\`snort
# Regla para detectar un ataque de inyección SQL (SQLi) en peticiones HTTP
alert tcp any any -> 192.168.1.100 80 (
    msg:"ALERTA DE SEGURIDAD - Posible Intento de SQL Injection detectado";
    content:"UNION SELECT";
    nocase;
    http_uri;
    classtype:web-application-attack;
    sid:1000001;
    rev:1;
)

# Regla para detectar un escaneo de puertos Nmap Xmas Scan
alert tcp any any -> any any (
    msg:"ESCÁNEO DETECTADO - Nmap TCP Xmas Tree Scan";
    flags:FPU;
    classtype:attempted-recon;
    sid:1000002;
    rev:1;
)
\`\`\`
`
      },
      {
        id: "u3-s3",
        title: "Sesión 3.3: Tecnologías de Decepción y Honeypots",
        topics: ["Honeypots de Baja vs Alta Interacción", "Honeynets y Honeytokens", "Ciberinteligencia Defensiva"],
        content: `
### 1. Concepto de Honeypot

Un **Honeypot** (tarro de miel) es un recurso informático intencionalmente señuelo desplegado en la red cuyo único valor es ser sondeado, atacado o comprometido. Debido a que un honeypot no tiene propósitos legítimos de producción, **cualquier tráfico dirigido hacia él es considerado sospechoso o malicioso por defecto**.

#### Tipos de Honeypots por Nivel de Interacción:
- **Baja Interacción (Low-Interaction Honeypots):**
  - Emulan únicamente respuestas de red y banners de servicios comunes (ej. emula un servidor SSH que responde a comandos básicos pero no tiene un SO real detrás).
  - *Herramientas:* Honeyd, Cowrie (modo básico).
  - *Ventaja:* Fácil despliegue, consumo mínimo de recursos y riesgo casi nulo de ser usado como plataforma de salto para atacar la red real.
- **Alta Interacción (High-Interaction Honeypots):**
  - Despliegan un sistema operativo y aplicaciones completamente reales dentro de un entorno virtual estrictamente aislado y monitoreado.
  - *Herramientas:* Dionaea, Conpot (SCADA/ICS), T-Pot.
  - *Ventaja:* Permite capturar exploits Zero-Day completos, observar las tácticas, técnicas y procedimientos (TTPs) del atacante en tiempo real y recolectar muestras de malware.

---

### 2. Honeynets y Honeytokens

- **Honeynet:** Una red completa de señuelos interconectados compuesta por múltiples honeypots, servidores simulados, routers ficticios y firewalls para estudiar ataques coordinados a nivel de infraestructura.
- **Honeytoken / Canary Token:** Dato o credencial señuelo ficticia (ej. un archivo \`passwords.xlsx\` con credenciales falsas o una clave de API falsa) colocada estratégicamente en un repositorio. Si alguien intenta utilizar esa clave o abrir el documento, se dispara una alerta inmediata indicando una brecha de datos interna.
`
      }
    ]
  },

  {
    id: "unit-4",
    unitNumber: 4,
    title: "Unidad 4: Redes Privadas Virtuales (VPNs) y Criptografía Aplicada",
    weeks: "Semanas 12 a 16",
    summary: "Criptografía moderna aplicada a redes, arquitectura IPSec (AH, ESP, Modo Transporte, Modo Túnel), protocolo de intercambio de claves IKEv1 e IKEv2, túneles VPN Sitio a Sitio y Acceso Remoto, y VPNs SSL/TLS.",
    sessions: [
      {
        id: "u4-s1",
        title: "Sesión 4.1: Criptografía Aplicada a Redes y Fundamentos VPN",
        topics: ["Cifrado Simétrico vs Asimétrico", "Funciones Hash y HMAC", "Infraestructura de Clave Pública (PKI)", "Clasificación de VPNs"],
        content: `
### 1. Criptografía Moderna en Comunicaciones de Red

La seguridad en redes se basa en la combinación eficiente de primitivas criptográficas:

1. **Cifrado Simétrico (Cifrado de Datos Masivo):**
   - Utiliza una **única clave secreta compartida** para cifrar y descifrar.
   - *Algoritmos estándar:* **AES-GCM (Galois/Counter Mode)** de 256 bits (que proporciona cifrado autenticado y confidencialidad en una sola operación) y **ChaCha20-Poly1305**.
2. **Cifrado Asimétrico / Clave Pública (Intercambio de Claves y Firmas):**
   - Utiliza un par de claves matemáticamente vinculadas: una **Clave Pública** (distribuible) y una **Clave Privada** (secreta).
   - *Algoritmos:* **RSA** (mínimo 2048 o 4096 bits) y Criptografía de Curvas Elípticas (**ECC / ECDSA / Ed25519**).
3. **Funciones Hash y HMAC (Integridad y Autenticación de Mensajes):**
   - Una función hash produce un resumen de longitud fija unidireccional (ej. **SHA-256**, **SHA-3**).
   - Un **HMAC (Hash-based Message Authentication Code)** combina el contenido del mensaje con una clave secreta para garantizar que el paquete no ha sido alterado y proviene de un emisor auténtico.

---

### 2. Clasificación de Redes Privadas Virtuales (VPN)

\`\`\`mermaid
flowchart TD
    VPN[Tipos de Redes Privadas Virtuales]
    VPN --> S2S[VPN Sitio a Sitio - Site-to-Site<br/>Conecta dos sedes/sucursales a través de gateways IPSec dedicados]
    VPN --> RA[VPN de Acceso Remoto - Remote Access<br/>Conecta usuarios móviles/teletrabajadores a la red corporativa]
    
    S2S --> IPSec_Tunnel[Túnel IPSec Permanente]
    RA --> ClientBased[VPN Basada en Cliente<br/>IPSec IKEv2 / OpenVPN / WireGuard]
    RA --> Clientless[VPN Sin Cliente - Web Portal<br/>SSL/TLS Browser-Based]
\`\`\`
`
      },
      {
        id: "u4-s2",
        title: "Sesión 4.2: Arquitectura y Operaciones de IPSec (RFC 4301)",
        topics: ["Protocolos AH (51) vs ESP (50)", "Modo Transporte vs Modo Túnel", "Protocolo IKE (IKEv1 vs IKEv2)", "Intercambio Diffie-Hellman"],
        content: `
### 1. Arquitectura IPSec: Protocolos de Seguridad

IPSec opera en la **Capa de Red (Capa 3 del modelo OSI)**, proporcionando protección transparente a todos los protocolos de capas superiores (TCP, UDP, ICMP):

\`\`\`mermaid
classDiagram
    class IPSec_Protocols {
        +AH (Protocolo IP 51)
        +ESP (Protocolo IP 50)
    }
    class AH_Features {
        +Integridad de Datos
        +Autenticación de Origen
        +Protección contra Replay
        -SIN Confidencialidad (No Cifra)
        -Incompatible con NAT (Modifica Cabecera IP)
    }
    class ESP_Features {
        +Confidencialidad (Cifrado AES)
        +Integridad de Datos (HMAC)
        +Autenticación de Origen
        +Protección contra Replay
        +Compatible con NAT-Traversal (UDP 4500)
    }
    IPSec_Protocols <|-- AH_Features
    IPSec_Protocols <|-- ESP_Features
\`\`\`

---

### 2. Modos de Operación de IPSec

\`\`\`
===================================================================
1. MODO TRANSPORTE (Transport Mode - Host a Host):
   [ Cabecera IP Original ] [ Cabecera ESP ] [ Carga Útil TCP/UDP CIFRADA ] [ ESP Trailer ] [ ESP Auth ]
   - Solo cifra el Payload; la cabecera IP original queda visible.
   - Usado principalmente para comunicación directa entre 2 servidores.

2. MODO TÚNEL (Tunnel Mode - Gateway a Gateway / VPN):
   [ NUEVA Cabecera IP Gateway ] [ Cabecera ESP ] [ Cabecera IP Original CIFRADA ] [ Carga Útil CIFRADA ] [ ESP Trailer ] [ ESP Auth ]
   - Cifra el PAQUETE IP COMPLETO (cabecera original + datos) y le añade una nueva cabecera IP de enrutamiento público.
   - Estándar obligatorio para túneles VPN Sitio a Sitio.
===================================================================
\`\`\`

---

### 3. El Protocolo IKE (Internet Key Exchange)

IKE negocia dinámicamente las Asociaciones de Seguridad (**Security Associations - SAs**) y las claves criptográficas:

#### Diferencias entre IKEv1 e IKEv2 (RFC 7296):
- **IKEv1:** Requiere dos fases separadas. La Fase 1 (establece el túnel de gestión ISAKMP) requiere **6 paquetes en Main Mode** o **3 en Aggressive Mode**. La Fase 2 (Quick Mode) requiere **3 paquetes adicionales**. Total: hasta 9 paquetes.
- **IKEv2:** Altamente optimizado y seguro. Establece la conexión completa en solo **4 paquetes** en dos intercambios:
  1. \`IKE_SA_INIT\` (2 paquetes): Negocia algoritmos criptográficos y realiza el intercambio Diffie-Hellman.
  2. \`IKE_AUTH\` (2 paquetes): Autentica a los pares y crea la primera SA hija de IPSec.
- **Soporte Nativo de NAT-Traversal (NAT-T):** Si detecta un dispositivo NAT intermedio, encapsula automáticamente los paquetes ESP (IP 50) dentro de datagramas **UDP en el puerto 4500**.
- **Soporte MOBIKE:** Permite a clientes móviles cambiar de dirección IP (ej. pasar de Wi-Fi a red celular 5G) sin desconectar el túnel VPN.
`
      },
      {
        id: "u4-s3",
        title: "Sesión 4.3: VPNs SSL/TLS vs IPSec y Configuración Avanzada",
        topics: ["Arquitectura SSL VPN (Clientless vs Full Tunnel)", "Comparativa IPSec vs SSL/TLS", "Configuración de Túnel IPSec Site-to-Site"],
        content: `
### 1. Arquitectura de VPNs SSL/TLS

Las VPNs basadas en SSL/TLS operan en las capas superiores (Capa de Transporte y Aplicación):

1. **VPN SSL Sin Cliente (Clientless / Web Portal):**
   - El usuario solo necesita un navegador web estándar compatible con TLS 1.3.
   - El gateway VPN actúa como un Proxy Inverso que traduce peticiones HTTPS del navegador hacia servicios internos (HTTP, RDP web, SSH web).
   - *Ventaja:* No requiere privilegios de administrador ni instalación de software en el equipo cliente.
   - *Limitación:* Solo soporta aplicaciones web o protocolos traducibles por proxy.
2. **VPN SSL Basada en Cliente (Client-Based / Full Tunnel):**
   - Instala un adaptador de red virtual (TAP/TUN) en el sistema operativo cliente (ej. Cisco AnyConnect, OpenVPN, WireGuard).
   - *Ventaja:* Acceso completo a nivel de Capa 3 para cualquier aplicación y protocolo de red corporativo.

---

### 2. Comparativa Integral: IPSec vs SSL/TLS VPNs

| Dimensión | IPSec VPN (Capa 3) | SSL/TLS VPN (Capa 4 / Capa 7) |
| :--- | :--- | :--- |
| **Capa del Modelo OSI** | Capa 3 (Red) | Capa 4 a 7 (Transporte / Aplicación) |
| **Compatibilidad con Firewalls/NAT** | Requiere NAT-Traversal (UDP 4500) o reglas IP 50 | Atraviesa casi cualquier firewall sin configuración (TCP 443 estándar) |
| **Despliegue en Clientes** | Requiere configuración de cliente IPsec | Sin cliente (navegador) o cliente liviano |
| **Granularidad de Control de Acceso** | Acceso a nivel de red completa o subred | Permite restringir acceso a aplicaciones web específicas por usuario |
| **Caso de Uso Óptimo** | Enlaces Site-to-Site entre sucursales y Data Centers | Teletrabajadores, accesos remotos y dispositivos no corporativos (BYOD) |

---

### 3. Plantilla de Configuración IPSec Site-to-Site en Cisco IOS (IKEv2)

\`\`\`bash
! =====================================================
! PASO 1: Configurar la Propuesta IKEv2 (Fase 1)
! =====================================================
Router(config)# crypto ikev2 proposal PROP_IKEV2
Router(config-ikev2-proposal)# encryption aes-gcm-256
Router(config-ikev2-proposal)# prf sha384
Router(config-ikev2-proposal)# group 19 20
Router(config-ikev2-proposal)# exit

Router(config)# crypto ikev2 policy POL_IKEV2
Router(config-ikev2-policy)# proposal PROP_IKEV2
Router(config-ikev2-policy)# exit

! =====================================================
! PASO 2: Configurar el Keyring y Perfil IKEv2
! =====================================================
Router(config)# crypto ikev2 keyring KR_VPN
Router(config-ikev2-keyring)# peer SUCURSAL_B
Router(config-ikev2-keyring-peer)# address 200.100.50.2
Router(config-ikev2-keyring-peer)# pre-shared-key local PresharedKeyIKEv2Secret2026!
Router(config-ikev2-keyring-peer)# pre-shared-key remote PresharedKeyIKEv2Secret2026!
Router(config-ikev2-keyring-peer)# exit

Router(config)# crypto ikev2 profile PROF_IKEV2
Router(config-ikev2-profile)# match identity remote address 200.100.50.2 255.255.255.255
Router(config-ikev2-profile)# identity local address 190.200.10.1
Router(config-ikev2-profile)# authentication remote pre-share
Router(config-ikev2-profile)# authentication local pre-share
Router(config-ikev2-profile)# keyring local KR_VPN
Router(config-ikev2-profile)# exit

! =====================================================
! PASO 3: Configurar el Transform Set y Crypto Map (Fase 2)
! =====================================================
Router(config)# crypto ipsec transform-set TS_ESP esp-gcm 256
Router(config)# ip access-list extended ACL_VPN_INTERESTING_TRAFFIC
Router(config-ext-nacl)# permit ip 192.168.10.0 0.0.0.255 192.168.20.0 0.0.0.255
Router(config-ext-nacl)# exit

Router(config)# crypto map CMAP_IPSEC 10 ipsec-isakmp
Router(config-crypto-map)# set peer 200.100.50.2
Router(config-crypto-map)# set transform-set TS_ESP
Router(config-crypto-map)# set ikev2-profile PROF_IKEV2
Router(config-crypto-map)# match address ACL_VPN_INTERESTING_TRAFFIC
Router(config-crypto-map)# exit

! Aplicar el crypto map en la interfaz externa WAN:
Router(config)# interface GigabitEthernet0/0
Router(config-if)# crypto map CMAP_IPSEC
Router(config-if)# exit
\`\`\`
`
      }
    ]
  }
];
