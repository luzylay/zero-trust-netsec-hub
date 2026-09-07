/**
 * Comprehensive Enterprise Curriculum & Knowledge Base for Network Security & Digital Identity
 * Covers all 4 Units, 18 weeks, theoretical principles, architecture, real-world case studies,
 * industry tooling, operational pitfalls, and defense-in-depth hardening.
 * Strictly zero emojis, academic/enterprise grade.
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
        topics: [
          "Triada CIA Extendida (Confidencialidad, Integridad, Disponibilidad)",
          "Pilares de Autenticidad, Trazabilidad y No Repudio",
          "Modelos de Riesgo Cibernético (Amenaza, Vulnerabilidad, Impacto)",
          "Arquitectura de Defensa en Profundidad (Defense in Depth)",
          "Casos de Estudio de la Industria (Equifax, Colonial Pipeline)"
        ],
        content: `
### 1. Principios Fundamentales de la Seguridad de la Información

La seguridad en redes y sistemas informáticos se fundamenta en garantizar que los activos de información estén protegidos contra accesos no autorizados, modificaciones ilícitas e interrupciones en el servicio. La protección debe ser integral, abarcando hardware, software, datos en reposo, datos en tránsito y el factor humano.

#### La Tríada CIA Extendida:
1. **Confidencialidad (Confidentiality):** Garantiza que la información y el tráfico de red solo sean accesibles por entidades autorizadas.
   - Cifrado simétrico de alto rendimiento para datos en tránsito (AES-256-GCM, ChaCha20-Poly1305).
   - Criptografía asimétrica para intercambio seguro de claves (ECDH, RSA-4096).
   - Control de acceso basado en roles (**RBAC**) y atributos (**ABAC**).
   - Segmentación perimetral mediante VLANs y túneles VPN IPsec/TLS.
2. **Integridad (Integrity):** Asegura que los datos no hayan sido alterados, modificados o destruidos de forma no autorizada durante el almacenamiento o en tránsito.
   - Funciones Hash criptográficas resistentes a colisiones (SHA-256, SHA-3, BLAKE3).
   - Códigos de Autenticación de Mensajes basados en Hash (**HMAC-SHA256**).
   - Firmas digitales e Infraestructuras de Clave Pública (**PKI X.509**).
3. **Disponibilidad (Availability):** Garantiza que los servicios, redes y datos estén accesibles y operativos para los usuarios autorizados cuando lo requieran.
   - Redundancia de hardware y enlaces (protocolos HSRP, VRRP, GLBP, BGP Multihoming).
   - Balanceo de carga en Capa 4 y Capa 7 con failover automatizado.
   - Mitigación de ataques de Denegación de Servicio Distribuida (**DDoS**) mediante Anycast BGP y Scrubbing Centers.
   - Planes de Continuidad del Negocio (**BCP**) y Recuperación ante Desastres (**DRP**) con RTO y RPO auditados.

#### Pilares Adicionales de Seguridad:
- **Autenticidad (Authenticity):** Certeza verificable del origen y de la identidad de la entidad emisora mediante certificados digitales o firmas criptográficas.
- **Trazabilidad / Contabilidad (Accountability & Auditability):** Capacidad de registrar y auditar cada acción realizada en la red vinculándola de manera unívoca a un usuario o proceso.
- **No Repudio (Non-Repudiation):** Imposibilidad de que el emisor o receptor de una transacción niegue haberla ejecutado, respaldado por sellos de tiempo confiables (**RFC 3161**) y criptografía asimétrica.

---

### 2. Modelo Matemático y Ecuación de Riesgo Cibernético

$$\\text{Riesgo (Risk)} = \\text{Amenaza (Threat)} \\times \\text{Vulnerabilidad (Vulnerability)} \\times \\text{Impacto (Impact)}$$

- **Vulnerabilidad (Debilidad):** Falla en el diseño, implementación o configuración de un sistema o protocolo (ej. software desactualizado, falta de cifrado en telnet, inyección SQL).
- **Amenaza (Vector Potencial):** Evento o actor malicioso (ciberdelincuente, ransomware, malware estado-nación) con la capacidad de explotar una vulnerabilidad.
- **Impacto (Consecuencia):** Daño financiero, operativo, reputacional o legal derivado de la materialización de la amenaza.
- **Riesgo Residual:** Nivel de riesgo que permanece una vez implementados los controles de seguridad (**Controles Administrativos, Técnicos y Físicos**).

---

### 3. Casos Reales de la Industria

1. **Incidente Equifax (2017) - Quiebre de Confidencialidad:**
   - *Vector:* Vulnerabilidad en Apache Struts (CVE-2017-5638) no parcheada durante más de 60 días en un portal de disputas.
   - *Consecuencia:* Exfiltración de datos personales y crediticios de más de 147 millones de personas.
   - *Fallo de Control:* Carencia de inventario de activos, fallas en la inspección TLS interna (el certificado del sensor de red estaba vencido, impidiendo ver la exfiltración).
2. **Incidente Colonial Pipeline (2021) - Quiebre de Disponibilidad:**
   - *Vector:* Acceso a una cuenta heredada de VPN empresarial sin autenticación multifactor (**MFA**), obtenida a través de una fuga de credenciales en la Dark Web.
   - *Consecuencia:* Despliegue de ransomware DarkSide que paralizó el suministro del 45% del combustible de la costa este de EE.UU.
   - *Fallo de Control:* Ausencia de políticas de MFA mandatorias y falta de depuración de accesos legados.

---

### 4. Herramientas de la Industria y Comandos Prácticos

- **Nmap (Network Mapper):** Auditoría de puertos y detección de vulnerabilidades.
\`\`\`bash
# Escaneo sigiloso TCP SYN con deteccion de versiones y scripts de vulnerabilidad
nmap -sS -sV --script vuln -p 1-10000 -T4 192.168.1.0/24
\`\`\`

- **OpenSSL:** Verificación de certificados y robustez de cifrado en servicios web y de red.
\`\`\`bash
# Inspeccion de la cadena de confianza TLS y protocolos soportados
openssl s_client -connect 192.168.1.10:443 -tls1_3 -servername secure.empresa.local
\`\`\`

- **OpenVAS / Greenbone:** Escáner automatizado de vulnerabilidades de infraestructura corporativa.

---

### 5. Precauciones y Trampas de Implementación

- **Falsa Sensación de Seguridad por Perímetro Único:** Confiar exclusivamente en un firewall perimetral sin segmentación interna permite que una intrusión en una estación de trabajo comprometa todo el dominio Active Directory.
- **Ignorar la Disponibilidad en Decisiones de Cifrado:** Implementar túneles IPsec sobredimensionados en hardware sin aceleración criptográfica (**AES-NI**) puede saturar la CPU de los routers y provocar caídas de enlace bajo alto tráfico.
- **Falta de Rotación y Gestión de Claves:** Usar claves precompartidas (**PSK**) estáticas en VPNs durante años sin rotación programada anula las garantías de no repudio.
`
      },
      {
        id: "u1-s2",
        title: "Sesión 1.2: Taxonomía y Ciclo de Vida del Malware",
        topics: [
          "Taxonomía de Malware (Virus, Gusanos, Troyanos, RATs, Ransomware, Rootkits)",
          "Ciclo de Vida de las Infecciones",
          "Técnicas de Evasión (Polimorfismo, Metamorfismo, Sandboxing Bypass)",
          "Detección Basada en Firmas, Heurística y Análisis de Comportamiento (EDR/XDR)",
          "Caso de Estudio: WannaCry (2017) y NotPetya"
        ],
        content: `
### 1. Taxonomía del Malware Moderno

El software malicioso (**Malware**) engloba programas diseñados deliberadamente para causar daños, robar credenciales, alterar la integridad del sistema o establecer control no autorizado sobre infraestructuras de red.

| Tipo de Malware | Vector de Propagación | Intervención Humana | Impacto Primario |
| :--- | :--- | :--- | :--- |
| **Virus** | Infección de ejecutables (.exe, .dll, macros) | Requiere ejecución por parte del usuario | Corrupción de archivos, alteración del MBR, robo de datos locales |
| **Gusano (Worm)** | Automatizado vía red explotando vulnerabilidades | No requiere interacción humana | Saturación de ancho de banda, propagación masiva, backdoors |
| **Troyano (Trojan)** | Camuflado en software aparentemente legítimo | Engaño mediante ingeniería social | Apertura de RATs, keylogging, descarga secundaria de payloads |
| **Ransomware** | Phishing, RDP expuesto, vulnerabilidades L7 | Variable | Cifrado simétrico/asimétrico masivo de discos y extorsión |
| **Rootkit** | Inyección a nivel de kernel o hypervisor | Acceso root/SYSTEM previo | Ocultación de procesos, módulos de red y persistencia invisible |
| **Spyware / InfoStealer** | Archivos adjuntos, paquetes web maliciosos | Ejecución de archivo trampa | Extracción de tokens de sesión de navegador, contraseñas y billeteras |

---

### 2. Ciclo de Vida de la Infección y Vectores de Evasión

1. **Desarrollo y Armado (Weaponization):** El actor de amenazas ensambla el payload malicioso, aplicando empaquetadores (**UPX, Themida**), cifrado polimórfico o metamórfico para alterar los hashes MD5/SHA-256 en cada compilación.
2. **Entrega y Explotación (Delivery & Exploitation):** Tráfico malicioso transmitido mediante phishing, descargas desatendidas (Drive-by Download) o explotación de vulnerabilidades en servicios expuestos (ej. SMB, RDP).
3. **Instalación y Persistencia (Installation & Persistence):** Creación de claves en el Registro de Windows (\`HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\`), tareas programadas o servicios de sistema ocultos.
4. **Comando y Control (C2 Beaconing):** El binario infectado establece comunicación cifrada saliente (TLS, DNS tunneling, WebSockets) con la infraestructura del atacante.
5. **Acción sobre Objetivos (Actions on Objectives):** Exfiltración de datos confidenciales, cifrado de volúmenes de almacenamiento o movimiento lateral hacia controladores de dominio.

---

### 3. Técnicas de Detección de Malware

1. **Detección Basada en Firmas:** Compara secuencias de bytes y hashes estáticos contra bases de datos globales de amenazas. Es ineficaz ante ataques Zero-Day o variantes con polimorfismo.
2. **Análisis Heurístico y Desensamblado Estático:** Analiza las llamadas a la API de Windows (\`VirtualAllocEx\`, \`WriteProcessMemory\`, \`CreateRemoteThread\`) en busca de patrones típicos de inyección DLL.
3. **Análisis Dinámico en Sandbox:** Ejecución controlada del archivo en una máquina virtual instrumentada para monitorear modificaciones de archivos, claves de registro y tráfico de red saliente.
4. **Sistemas EDR / XDR con Aprendizaje Automático:** Telemetría en tiempo real que detecta anomalías de comportamiento (ej. el proceso \`word.exe\` intentando invocar \`powershell.exe -enc\` con privilegios elevados).

---

### 4. Caso de Estudio: El Gusano Ransomware WannaCry (2017)

- **Vector de Entrada:** Explotación de la vulnerabilidad en el protocolo SMBv1 de Microsoft (**CVE-2017-0143 / EternalBlue**), filtrada del grupo Equation Group.
- **Mecanismo de Propagación:** Escaneo masivo y autónomo del puerto TCP 445 en subredes locales e Internet. Una vez infectado un equipo, actuaba como gusano para propagarse a todos los hosts accesibles sin interacción de usuario.
- **Carga Útil:** Cifrado de archivos con algoritmo AES-128-CBC + RSA-2048 y solicitud de rescate en Bitcoin.
- **Detención:** Descubrimiento de un dominio no registrado ("Killswitch") al que el malware consultaba antes de ejecutar el cifrado.

---

### 5. Herramientas y Comandos Prácticos

- **YARA:** Creación de reglas para escaneo e identificación de patrones de malware.
\`\`\`text
rule Detectar_Inyeccion_ProcessHollowing {
    strings:
        $api1 = "NtUnmapViewOfSection" ascii
        $api2 = "VirtualAllocEx" ascii
        $api3 = "WriteProcessMemory" ascii
    condition:
        all of them and uint16(0) == 0x5A4D
}
\`\`\`

- **Sysinternals Suite (Process Hacker, Autoruns):** Auditoría en vivo de memoria y persistencia.
\`\`\`bash
# Listado de conexiones de red activas asociadas a identificadores de proceso (PID)
netstat -ano -p tcp | findstr "ESTABLISHED"
\`\`\`

---

### 6. Precauciones y Trampas Operativas

- **Desactivar SMBv1 en toda la red:** SMBv1 es un protocolo obsoleto que carece de autenticación robusta y cifrado; debe ser deshabilitado mediante directivas GPO.
- **No confiar en la extensión del archivo:** Archivos con doble extensión (ej. \`factura.pdf.exe\`) engañan al usuario si el explorador de Windows tiene desmarcada la opción de mostrar extensiones conocidas.
`
      },
      {
        id: "u1-s3",
        title: "Sesión 1.3: Botnets y Servidores de Comando y Control (C2)",
        topics: [
          "Arquitectura y Topologías de Botnets (Centralizada IRC/HTTP, P2P, Híbrida)",
          "Evasión Avanzada: DGA (Domain Generation Algorithms) y Fast-Flux DNS",
          "Canales Encubiertos (DNS Tunneling, DoH, Cloud APIs)",
          "Estrategias Defensivas: DNS Sinkholing, Análisis de Beaconing y Threat Intelligence",
          "Caso de Estudio: Mirai Botnet (2016) y GameOver Zeus"
        ],
        content: `
### 1. ¿Qué es una Botnet?

Una **Botnet** es una red distribuida de dispositivos informáticos comprometidos (denominados *Bots* o *Zombies*) que son controlados de forma remota y coordinada por un atacante (*Botmaster*) a través de un canal de Comando y Control (**C2 / C&C**).

#### Casos de Uso Malicioso de las Botnets:
- **Ataques de Denegación de Servicio Distribuida (DDoS):** Saturación de enlaces por amplificación DNS/NTP o inundación de peticiones HTTP en Capa 7.
- **Campañas Masivas de Phishing y Spam:** Envío distribuido de millones de correos para evitar listas negras basadas en reputación de IP.
- **Redes de Proxies Residenciales:** Enrutamiento encubierto del tráfico de bandas de cibercrimen para eludir controles de geolocalización.
- **Cryptojacking Distribuido:** Monopolización no autorizada de ciclos de CPU/GPU para minería de criptomonedas.

---

### 2. Topologías de Infraestructura C2

\`\`\`mermaid
flowchart TD
    subgraph Arquitectura_Centralizada
    BM1[Botmaster] --> C2Server[Servidor C2 Central]
    C2Server --> Bot1[Bot 1]
    C2Server --> Bot2[Bot 2]
    C2Server --> Bot3[Bot 3]
    end

    subgraph Arquitectura_P2P_Descentralizada
    BM2[Botmaster] --> NodeA[Nodo P2P 1]
    NodeA <--> NodeB[Nodo P2P 2]
    NodeB <--> NodeC[Nodo P2P 3]
    NodeA <--> NodeC
    end
\`\`\`

1. **Arquitectura Centralizada (HTTP/HTTPS/TLS):**
   - Los bots envían consultas periódicas (heartbeats o beacons) a una dirección IP o nombre de dominio central.
   - *Punto Débil Defensivo:* Posee un punto único de fallo (Single Point of Failure). Si los defensores confiscan la IP o dan de baja el dominio, la botnet queda neutralizada.
2. **Arquitectura Descentralizada Peer-to-Peer (P2P):**
   - No existe un servidor central; cada bot actúa como cliente y servidor, reenviando comandos firmados criptográficamente mediante clave asimétrica a los nodos vecinos.
   - *Ejemplo Histórico:* GameOver Zeus, Storm Worm. Gran resiliencia ante decomisos judiciales.
3. **Mecanismos de Evasión Dinámica:**
   - **DGA (Domain Generation Algorithms):** Algoritmo matemático integrado en el malware que genera cientos de dominios pseudoaleatorios por día utilizando como semilla la fecha UTC o cotizaciones financieras. El botmaster solo necesita registrar uno de ellos para retomar el control.
   - **Fast-Flux DNS:** Técnica que asocia un nombre de dominio a cientos de direcciones IP de bots que rotan continuamente con valores TTL (Time-To-Live) de DNS extremadamente cortos (60 a 300 segundos).
   - **Canales Encubiertos (DNS Tunneling):** Exfiltración de datos codificados en consultas DNS (ej. \`datos_robados.attacker-c2.com\`) para eludir firewalls que permiten tráfico saliente en puerto UDP 53.

---

### 3. Caso de Estudio: La Botnet Mirai (2016)

- **Dispositivos Comprometidos:** Cientos de miles de cámaras IP, grabadores DVR y routers domésticos con arquitectura ARM/MIPS.
- **Vector de Infección:** Escaneo masivo del puerto Telnet (TCP 23) y uso de un diccionario de apenas 62 combinaciones de credenciales por defecto (\`admin:admin\`, \`root:123456\`).
- **Impacto:** Ataque DDoS récord de 1.2 Tbps contra el proveedor de DNS Dyn, dejando sin servicio a plataformas como Twitter, Netflix, GitHub y Spotify en toda la costa este de EE.UU.

---

### 4. Estrategias Defensivas y Herramientas

- **DNS Sinkholing:** Configuración de servidores DNS corporativos para responder con una dirección IP interna controlada (loopback \`127.0.0.1\` o honeypot) a consultas dirigidas a dominios C2 conocidos, anulando la conexión y permitiendo identificar qué IP interna está infectada.
- **Detección de Beaconing con RITA / Zeek:**
\`\`\`bash
# Ejemplo de deteccion de intervalos periodicos de baliza (beaconing) en registros de red Zeek
rita show-beacons dataset_corporativo
\`\`\`

- **Inspección de Tráfico DNS en Wireshark / TShark:**
\`\`\`bash
# Filtrado de consultas DNS anormalmente largas (indicador de DNS Tunneling)
tshark -r captura_red.pcap -Y "dns.flags.response == 0 and dns.qry.name.len > 50" -T fields -e dns.qry.name
\`\`\`

---

### 5. Precauciones Operativas

- **Segmentación de Dispositivos IoT:** Cámaras, sensores y dispositivos embebidos deben ubicarse en VLANs aisladas sin acceso directo a Internet ni visibilidad hacia la red de servidores.
- **Bloqueo de DNS Externos no Autorizados:** Forzar a que todos los endpoints utilicen únicamente el servidor DNS interno corporativo con filtrado de reputación RPZ (**Response Policy Zones**).
`
      },
      {
        id: "u1-s4",
        title: "Sesión 1.4: Metodologías de Ataque a Redes LAN y Monitoreo",
        topics: [
          "Ataques de Acceso (Fuerza Bruta, Password Spraying, Pass-the-Hash)",
          "Ataques de Capa 2 (ARP Poisoning, DHCP Starvation, MAC Flooding, VLAN Hopping)",
          "Ingeniería Social (Phishing, Spear Phishing, Whaling, Vishing, Pretexting)",
          "Mecanismos de Monitoreo (SNMPv3, NetFlow/IPFIX, Syslog RFC 5424, SPAN, Network TAPs)",
          "Defensas de Switch: Port Security, DHCP Snooping, Dynamic ARP Inspection (DAI)"
        ],
        content: `
### 1. Metodologías de Ataque en Redes de Acceso Local (LAN)

Las redes locales construidas sobre protocolos de enlace tradicionales (Ethernet / 802.3, ARP, DHCP) carecen de autenticación nativa, lo que permite que un atacante con acceso físico o lógico a un puerto de switch ejecute ataques de interceptación y denegación de servicio.

\`\`\`mermaid
sequenceDiagram
    participant Victima as PC Víctima (192.168.1.50)
    participant Atacante as Atacante MITM (192.168.1.100)
    participant Gateway as Router Gateway (192.168.1.1)

    Note over Atacante: Envenenamiento de Tablas ARP
    Atacante->>Victima: Gratuitous ARP: 192.168.1.1 tiene MAC_Atacante
    Atacante->>Gateway: Gratuitous ARP: 192.168.1.50 tiene MAC_Atacante
    Note over Victima, Gateway: Tráfico redirigido a través del atacante
    Victima->>Atacante: Datos enviados (Capa 3 y Capa 7)
    Atacante->>Gateway: Reenvío de tráfico legítimo (Man-in-the-Middle)
\`\`\`

#### Principales Vectores de Ataque en Capa 2:
1. **ARP Poisoning / Spoofing (Man-in-the-Middle):**
   - El atacante envía respuestas ARP falsas sin solicitud previa (*Gratuitous ARP*) asociando la IP del Gateway con su propia MAC.
   - *Defensa:* **Dynamic ARP Inspection (DAI)**, que valida cada paquete ARP contra la base de datos de DHCP Snooping.
2. **DHCP Starvation y Rogue DHCP Server:**
   - El atacante agota el pool de IPs del servidor legítimo emitiendo miles de peticiones DHCP Discover con MACs ficticias, para luego levantar un servidor DHCP malicioso que asigna su propia IP como DNS y Gateway.
   - *Defensa:* **DHCP Snooping**, configurando los puertos de usuarios como *Untrusted* y los puertos de servidores/uplinks como *Trusted*.
3. **MAC Address Table Flooding:**
   - Inundación de la tabla CAM del switch con miles de direcciones MAC falsas por segundo, forzando al switch a entrar en modo *fail-open* (comportándose como un Hub) y enviando todo el tráfico a todos los puertos.
   - *Defensa:* **Port Security**, limitando el número máximo de MACs aprendidas por puerto.

---

### 2. Dispositivos y Protocolos de Telemetría y Monitoreo de Red

| Mecanismo de Telemetría | Capa OSI | Datos Recopilados | Uso en Operaciones de Seguridad (SOC) |
| :--- | :--- | :--- | :--- |
| **SNMPv3** | Capa 7 (UDP 161/162) | Métricas de hardware, contadores de interfaz, estado de enlaces cifrados con AES/SHA | Alertas de caídas de interfaces, saturación de ancho de banda |
| **NetFlow / IPFIX** | Capa 3/4 (UDP) | Metadatos de flujo: IP origen/destino, puerto, protocolo, bytes, duración | Detección de anomalías de tráfico masivo, escaneos y exfiltración |
| **Syslog (RFC 5424)** | Capa 7 (UDP/TCP 514, TLS 6514) | Eventos del sistema, intentos de login, cambios de configuración | Auditoría forense y correlación centralizada en SIEM |
| **Port Mirroring (SPAN)** | Capa 2/3 | Copia bit a bit del tráfico físico hacia un sensor NIDS | Inspección profunda de paquetes (**DPI**) con Snort/Suricata |
| **Network TAP** | Capa 1 (Física) | Duplicación pasiva por hardware de señales ópticas/cobre | Captura forense 10G/40G sin impacto en la CPU del switch |

---

### 3. Configuración de Hardening en Cisco IOS CLI

\`\`\`cisco
! 1. Activacion de DHCP Snooping global y por VLAN
ip dhcp snooping
ip dhcp snooping vlan 10,20
interface GigabitEthernet0/1
 description UPLINK_HACIA_ROUTER_Y_DHCP_SERVER
 ip dhcp snooping trust

! 2. Activacion de Dynamic ARP Inspection (DAI)
ip arp inspection vlan 10,20
ip arp inspection validate src-mac dst-mac ip

! 3. Configuracion de Port Security en puertos de acceso
interface range FastEthernet0/1 - 24
 switchport mode access
 switchport port-security
 switchport port-security maximum 2
 switchport port-security violation restrict
 switchport port-security mac-address sticky
\`\`\`

---

### 4. Precauciones y Trampas Operativas

- **No habilitar DHCP Snooping antes de DAI:** Si se habilita DAI sin tener activa y poblada la base de datos de DHCP Snooping, el switch descartará inmediatamente TODO el tráfico ARP legítimo, aislando a todos los usuarios de la red.
- **Riesgo de SNMPv1 y SNMPv2c:** Ambas versiones transmiten la cadena de comunidad (*Community String*) en texto claro sin cifrar. Deben ser erradicadas en favor de **SNMPv3 con nivel authPriv** (autenticación SHA + cifrado AES).
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
        topics: [
          "Arquitectura y Componentes del Framework AAA",
          "Protocolo TACACS+ (RFC 8907): Arquitectura TCP 49, Desacoplamiento y Cifrado Total",
          "Protocolo Kerberos v5 (RFC 4120): KDC, AS, TGS, Tickets TGT y Service Tickets",
          "Vulnerabilidades Críticas de Kerberos: Kerberoasting, AS-REP Roasting, Golden/Silver Tickets",
          "Caso de Estudio: Compromiso de Active Directory en Redes Corporativas"
        ],
        content: `
### 1. El Framework AAA (Authentication, Authorization, Accounting)

El framework **AAA** es el pilar de la gestión centralizada de accesos e identidades en infraestructuras corporativas:

1. **Autenticación (Authentication - ¿Quién es la entidad?):** Proceso de verificación rigurosa de la identidad declarada mediante uno o más factores (**Conocimiento, Posesión, Inherencia**).
2. **Autorización (Authorization - ¿Qué tiene permitido hacer?):** Asignación de privilegios, listas de comandos, atributos de red (VLANs, ACLs descargables) aplicados a la sesión del usuario.
3. **Contabilidad / Registro (Accounting - ¿Qué acciones ejecutó y cuándo?):** Recopilación y registro de métricas operativas (marcas de tiempo de login/logout, comandos ejecutados, paquetes y bytes transmitidos) para auditoría y no repudio.

---

### 2. Protocolo TACACS+ (RFC 8907)

**TACACS+ (Terminal Access Controller Access Control System Plus)** es el estándar de facto para la administración segura de dispositivos de infraestructura (Routers, Switches, Firewalls):

- **Capa de Transporte:** Utiliza **TCP en el puerto 49**, garantizando entrega orientada a la conexión y control de flujo.
- **Desacoplamiento Total:** Separa de forma independiente los tres servicios (**Autenticación, Autorización y Contabilidad**), permitiendo autenticar contra un servidor LDAP/Active Directory pero autorizar comandos específicos en un servidor TACACS+ dedicado.
- **Cifrado del Payload Completo:** A diferencia de RADIUS, TACACS+ cifra la totalidad del cuerpo del paquete (incluyendo comandos de configuración y nombres de usuario). Solo la cabecera fija de 12 bytes viaja en texto claro.
- **Autorización Granular por Comando:** Permite inspeccionar cada comando individual introducido por el administrador en tiempo real antes de permitir su ejecución en la consola.

---

### 3. Protocolo Kerberos v5 (RFC 4120)

Kerberos es el protocolo de autenticación distribuida basado en tickets de confianza utilizado por Microsoft Active Directory y entornos Unix/Linux:

\`\`\`mermaid
sequenceDiagram
    participant Usuario as Cliente (Usuario)
    participant AS as KDC: Authentication Server
    participant TGS as KDC: Ticket Granting Server
    participant Server as Servidor de Aplicación

    Usuario->>AS: 1. Petición AS-REQ (Nombre de usuario + Timestamp cifrado)
    AS->>Usuario: 2. Respuesta AS-REP (Ticket TGT cifrado con clave KDC + Clave de Sesión TGT)
    Usuario->>TGS: 3. Petición TGS-REQ (TGT + Autenticador cifrado)
    TGS->>Usuario: 4. Respuesta TGS-REP (Service Ticket cifrado con clave del Servicio)
    Usuario->>Server: 5. Petición AP-REQ (Service Ticket)
    Server->>Usuario: 6. Acceso concedido al recurso
\`\`\`

#### Ataques y Vulnerabilidades Críticas de Kerberos:
- **Kerberoasting:** Solicitud de Service Tickets (TGS) para cuentas de servicio con nombres SPN (**Service Principal Names**). El atacante extrae el ticket cifrado con la contraseña de la cuenta de servicio y realiza fuerza bruta offline con Hashcat para recuperar la contraseña en texto plano.
- **AS-REP Roasting:** Explotación de cuentas que tienen desactivada la preautenticación Kerberos (\`DONT_REQ_PREAUTH\`). El atacante solicita un AS-REP directamente y extrae el hash para crackeo offline.
- **Golden Ticket:** Ataque de persistencia total tras comprometer la cuenta de sistema \`krbtgt\`. El atacante puede forjar TGTs válidos con privilegios de Domain Admin con vigencia de hasta 10 años.

---

### 4. Configuración Práctica en Cisco IOS CLI

\`\`\`cisco
! 1. Habilitar el nuevo modelo AAA
aaa new-model

! 2. Definir servidores TACACS+ primario y secundario
tacacs server ISE_PRIMARY
 address ipv4 10.10.10.50
 key 6 C1sc0Secr3tK3yP@ss2026
 timeout 5

tacacs server ISE_SECONDARY
 address ipv4 10.10.10.51
 key 6 C1sc0Secr3tK3yP@ss2026
 timeout 5

! 3. Crear grupos de servidores y listas de metodos
aaa group server tacacs+ TACACS_CLUSTER
 server name ISE_PRIMARY
 server name ISE_SECONDARY

! 4. Listas de Autenticacion, Autorizacion y Contabilidad
aaa authentication login default group TACACS_CLUSTER local
aaa authorization exec default group TACACS_CLUSTER local
aaa authorization commands 15 default group TACACS_CLUSTER local
aaa accounting commands 15 default start-stop group TACACS_CLUSTER
\`\`\`

---

### 5. Precauciones y Trampas Operativas

- **Clave Secreta Compartida Débil:** La seguridad del cifrado de TACACS+ y RADIUS depende críticamente de la entropía de la clave compartida (*Shared Secret*). Claves cortas permiten la recuperación de credenciales mediante ataques de diccionario sobre capturas de red.
- **Configurar Siempre el Fallback Local:** La palabra clave \`local\` al final de la lista de métodos garantiza que, si los servidores TACACS+ no responden por caída de red, el administrador pueda iniciar sesión con la cuenta local de rescate.
`
      },
      {
        id: "u2-s2",
        title: "Sesión 2.2: Protocolos RADIUS, DIAMETER y Modelos de Autorización",
        topics: [
          "Protocolo RADIUS (RFC 2865 / 2866): UDP 1812/1813, AVPs y Cifrado XOR con MD5",
          "Protocolo DIAMETER (RFC 6733): Evolución sobre TCP/SCTP con TLS y Soporte Móvil",
          "Modelos de Control de Acceso: DAC, MAC, RBAC, ABAC y Zero Trust Architecture (NIST SP 800-207)",
          "Análisis Forense de Paquetes RADIUS en Wireshark",
          "Implementación con FreeRADIUS en Linux"
        ],
        content: `
### 1. Protocolo RADIUS (RFC 2865 y RFC 2866)

**RADIUS (Remote Authentication Dial-In User Service)** es el protocolo estándar de autenticación y contabilidad para control de acceso a redes cableadas (802.1X), redes inalámbricas WPA2/WPA3 Enterprise y servidores VPN:

\`\`\`mermaid
flowchart LR
    User[Suplicante 802.1X] <--> |EAPoL| NAS[NAS / Switch / AP]
    NAS <--> |RADIUS UDP 1812/1813| RadiusServer[Servidor RADIUS / FreeRADIUS]
    RadiusServer <--> |LDAP / Kerberos| DB[(Directorio Corporativo)]
\`\`\`

- **Capa de Transporte:** Utiliza **UDP en puertos 1812 (Autenticación/Autorización) y 1813 (Accounting)** (o los puertos heredados 1645/1646).
- **Estructura de Paquetes:** Compuesto por una cabecera de 20 bytes (Código, Identificador, Longitud, Authenticator) seguida de atributos TLV (**Type-Length-Value / AVPs**).
- **Debilidad Criptográfica del Cifrado de Contraseña en RADIUS:**
  - RADIUS **SOLO cifra el atributo User-Password**. Todo el resto del paquete (nombre de usuario, IP asignada, atributos de grupo) viaja en texto claro.
  - El cifrado del password utiliza una operación XOR con un flujo generado por **MD5(Shared_Secret + Request_Authenticator)**. Dado que MD5 es vulnerable a colisiones, capturas de red prolongadas facilitan ataques de recuperación de contraseña si el secreto compartido es débil.

---

### 2. Comparativa Técnica: RADIUS vs TACACS+ vs DIAMETER

| Criterio Técnico | RADIUS (RFC 2865/2866) | TACACS+ (RFC 8907) | DIAMETER (RFC 6733) |
| :--- | :--- | :--- | :--- |
| **Transporte** | UDP 1812/1813 | TCP 49 | TCP / SCTP puerto 3868 |
| **Servicios AAA** | Combina Autenticación y Autorización | Separa Autenticación, Autorización y Accounting | Desacoplado con arquitectura modular |
| **Cifrado** | Solo el campo User-Password (MD5/XOR) | Cifra el Payload completo del paquete | Cifrado nativo de capa de transporte (TLS / DTLS / IPsec) |
| **Autorización Granular** | No (basado en atributos por sesión) | Sí (comando por comando en tiempo real) | Sí (orientado a políticas complejas y telecomunicaciones) |
| **Casos de Uso** | Redes Wi-Fi 802.1X, VPNs, ISPs | Administración de routers, switches, firewalls | Redes móviles 4G/5G LTE, IMS, Roaming de telecomunicaciones |

---

### 3. Modelos Modernos de Control de Acceso

1. **DAC (Discretionary Access Control):** El propietario del archivo o recurso decide quién tiene acceso. Alto riesgo de fuga de información.
2. **MAC (Mandatory Access Control):** El sistema impone etiquetas de seguridad (Top Secret, Secret, Confidencial). Común en entornos militares (SELinux).
3. **RBAC (Role-Based Access Control):** Los permisos se asignan a roles organizacionales (ej. \`Operador_NOC\`, \`Auditor_Seguridad\`).
4. **ABAC (Attribute-Based Access Control):** Evaluación dinámica de políticas basadas en atributos del sujeto (identidad, rol), recurso (sensibilidad), acción (lectura/escritura) y entorno (**hora, geolocalización, postura del dispositivo**). Base de **Zero Trust (NIST SP 800-207)**.

---

### 4. Implementación y Configuración con FreeRADIUS en Linux

\`\`\`bash
# 1. Definicion del cliente NAS en /etc/freeradius/3.0/clients.conf
client switch-core-01 {
    ipaddr = 192.168.10.2
    secret = Cl@veUltr@Segur@Empresari@l2026!
    shortname = core-sw1
    nas_type = cisco
}

# 2. Definicion de usuario con atributos de autorizacion en /etc/freeradius/3.0/users
"jlopez" Cleartext-Password := "PasswordRobusto2026!"
    Service-Type = Administrative-User,
    Cisco-AVPair = "shell:priv-lvl=15"

# 3. Ejecucion de FreeRADIUS en modo depuracion para trazabilidad de paquetes
freeradius -X
\`\`\`

---

### 5. Precauciones y Trampas Operativas

- **Uso de Claves Compartidas Débiles en WPA2-Enterprise:** Si la clave compartida entre el Access Point y el servidor RADIUS es interceptada, un atacante puede descifrar los atributos de autorización y suplantar al servidor de autenticación.
- **Migración hacia RadSec (RFC 6614):** Enlaces RADIUS que atraviesen redes no confiables o Internet deben encapsularse obligatoriamente mediante **TLS sobre TCP puerto 2083 (RadSec)** para proteger la confidencialidad de los nombres de usuario y atributos.
`
      },
      {
        id: "u2-s3",
        title: "Sesión 2.3: Marco Normativo y Directrices Modernas de Identidad",
        topics: [
          "NIST SP 800-63-3: Niveles IAL, AAL y FAL",
          "Directrices Modernas de Contraseñas (NIST SP 800-63B)",
          "Resolución SBS N° 504-2021: Normativa Peruana de Seguridad de la Información y Ciberseguridad",
          "Arquitectura MFA Phishing-Resistant (FIDO2 / WebAuthn)",
          "Auditoría y Listas de Control de Acceso"
        ],
        content: `
### 1. Suite NIST SP 800-63-3: Digital Identity Guidelines

El marco del **National Institute of Standards and Technology (NIST)** define los estándares mundiales para la gestión moderna de identidades digitales y control de accesos, estructurado en tres dimensiones de aseguramiento (**xAL**):

1. **IAL (Identity Assurance Level - Comprobación de Identidad):**
   - **IAL1:** Auto-afirmación sin verificación formal de documentos (ej. registro en foros).
   - **IAL2:** Verificación remota o presencial de documentos de identidad oficiales validados contra registros civiles.
   - **IAL3:** Presencia física obligatoria con verificación biométrica presencial y documentación de seguridad validada por un agente autorizado.
2. **AAL (Authenticator Assurance Level - Autenticación y MFA):**
   - **AAL1:** Autenticación de un solo factor (contraseña simple).
   - **AAL2:** Autenticación multifactor (**MFA**) mediante factores independientes (contraseña + OTP por app o token criptográfico).
   - **AAL3:** Autenticación multifactor basada en hardware criptográfico resistente a la suplantación (**Phishing-Resistant MFA: tokens FIDO2 / WebAuthn, Smart Cards PIV/CAC**).
3. **FAL (Federation Assurance Level - Aserciones Federadas SAML/OIDC):**
   - **FAL1:** Aserción firmada por el Identity Provider (**IdP**).
   - **FAL2:** Aserción firmada y cifrada con la clave pública del Relying Party (**RP**).
   - **FAL3:** Aserción vinculada criptográficamente al autenticador del usuario mediante prueba de posesión de clave (**Proof-of-Possession**).

---

### 2. Directrices Modernas de Contraseñas del NIST (SP 800-63B)

El NIST revolucionó las prácticas de contraseñas eliminando mitos obsoletos que perjudicaban la seguridad real:

| Regla Tradicional (Obsoleta) | Postura Oficial NIST SP 800-63B | Justificación Criptográfica y de Usabilidad |
| :--- | :--- | :--- |
| **Rotación periódica forzada (cada 30-90 días)** | **Prohibida** salvo ante sospecha fundada de compromiso | La rotación frecuente induce a los usuarios a crear patrones predecibles (ej. \`Enero2026!\` -> \`Febrero2026!\`). |
| **Reglas de complejidad arbitrarias (1 mayúscula, 1 número, 1 símbolo)** | **Desaconsejadas**; priorizar longitud (mínimo 8-16 caracteres) | La entropía real radica en la longitud, no en sustituciones previsibles (como cambiar 'a' por '@'). |
| **Bloqueo estricto de caracteres y espacio** | **Permitir todos los caracteres ASCII y espacios** | Facilita el uso de frases de contraseña (*passphrases*) de alta entropía (ej. \`caballo-bateria-grapadora-azul\`). |
| **Preguntas de seguridad (nombre de primera mascota)** | **Prohibidas** | Las respuestas son fácilmente obtenibles mediante ingeniería social o registros públicos. |
| **Verificación contra listas negras de contraseñas** | **Mandatoria** | Comparar contraseñas contra bases de datos de credenciales filtradas (ej. HaveIBeenPwned). |

---

### 3. Resolución SBS N° 504-2021 (Regulación Financiera del Perú)

La **Superintendencia de Banca, Seguros y AFP (SBS)** del Perú establece exigencias mandatorias de ciberseguridad para entidades financieras y empresas de servicios complementarios:

- **Gobierno y Rol del CISO (Art. 5-7):** Obligatoriedad de designar un Oficial de Seguridad de la Información (**CISO**) con independencia funcional respecto a las áreas de Tecnología/Operaciones.
- **Centro de Operaciones de Seguridad (SOC 24/7):** Monitoreo continuo de eventos e incidentes de seguridad con capacidades de contención y respuesta en tiempo real.
- **Gestión de Cuentas Privilegiadas (PAM):** Control estricto, rotación automatizada y grabación de sesiones para todas las credenciales administrativas y de infraestructura crítica.
- **Segmentación y Protección en Canales Digitales:** Implementación de autenticación reforzada de doble factor para transferencias bancarias y operaciones monetarias en banca móvil y web.

---

### 4. Precauciones y Trampas Operativas

- **Falsa Seguridad de los SMS OTP:** La autenticación mediante códigos enviados por SMS es altamente vulnerable a ataques de **SIM Swapping** e interceptación en redes de señalización SS7. El NIST desaconseja SMS para niveles AAL2/AAL3 en favor de FIDO2 o aplicaciones TOTP.
- **Auditoría de Cuentas de Servicio Huérfanas:** Cuentas creadas para proyectos temporales que conservan privilegios elevados de administrador de dominio deben ser deshabilitadas y eliminadas mediante revisiones periódicas de acceso (**Access Reviews**).
`
      }
    ]
  },

  {
    id: "unit-3",
    unitNumber: 3,
    title: "Unidad 3: Seguridad Perimetral, Firewalls, IDS/IPS y VPNs",
    weeks: "Semanas 7 y 8",
    summary: "Arquitectura de seguridad perimetral, evolución de firewalls (Stateless, Stateful, NGFW Capa 7), diseño de zonas DMZ, sistemas de detección y prevención de intrusiones (Snort, Suricata, Zeek), firmas y análisis de anomalías, y túneles VPN IPsec (IKEv1/IKEv2, Fase 1, Fase 2, ESP, AH).",
    sessions: [
      {
        id: "u1-s1_u3",
        id: "u3-s1",
        title: "Sesión 3.1: Seguridad Perimetral, Arquitectura de Firewalls y DMZ",
        topics: [
          "Evolución de Firewalls (Packet Filtering, Stateful Inspection, Next-Generation Firewalls L7)",
          "Diseño de Arquitecturas de Red Segura (Zonas de Confianza, DMZ, Microsegmentación)",
          "Inspección Profunda de Paquetes (DPI) y Desencriptado TLS/SSL Man-in-the-Middle",
          "Filtrado de Paquetes con iptables / nftables en Linux",
          "Caso de Estudio: Fuga de Datos de Target a través de Proveedor HVAC"
        ],
        content: `
### 1. Evolución Tecnológica de los Firewalls

El firewall es el elemento central de control de flujo de tráfico en los límites de red corporativos:

1. **Firewalls de Filtrado de Paquetes (Stateless - 1ra Generación):**
   - Inspeccionan cada paquete de forma aislada basándose en las cabeceras de Capa 3 y 4 (IP origen/destino, puerto origen/destino, protocolo).
   - *Limitación:* No mantienen estado de conexión; permiten ataques de spoofing y requieren abrir rangos masivos de puertos efímeros para el tráfico de retorno.
2. **Firewalls de Inspección con Estado (Stateful Inspection - 2da Generación):**
   - Mantienen una tabla de estado dinámica de conexiones activas (**State Table**). Si un paquete entrante corresponde a una sesión TCP/UDP previamente iniciada desde el interior (ej. flag TCP ACK tras SYN-ACK), es permitido automáticamente.
3. **Firewalls de Próxima Generación (NGFW - Capa 7):**
   - Integran inspección profunda de aplicaciones (**App-ID**), prevención de intrusiones (**IPS**), antivirus de gateway, filtrado de URLs y descifrado e inspección TLS/SSL activa. Permiten bloquear aplicaciones específicas (ej. BitTorrent, TeamViewer) incluso si operan en el puerto estándar HTTPS 443.

---

### 2. Diseño de Arquitecturas Seguras: Zonas DMZ

\`\`\`mermaid
flowchart LR
    Internet((Internet Pública)) <--> |Untrusted| FW[Firewall Perimetral]
    FW <--> |DMZ: HTTP / SMTP / DNS| DMZ[Servidores Públicos DMZ]
    FW <--> |Trusted: LAN Corporativa| LAN[Estaciones y Servidores Internos]
    DMZ -.-> |Bloqueado por Defecto| LAN
\`\`\`

- **Principio de Mínimo Privilegio en Zonas:**
  - *Internet -> DMZ:* Permitir únicamente los puertos de servicio estrictamente públicos (TCP 80/443 para Web, TCP 25 para Correo).
  - *DMZ -> LAN Interna:* **BLOQUEADO POR DEFECTO**. Ningún servidor de la DMZ puede iniciar conexiones hacia la red interna. Si un servidor web es comprometido, el atacante no puede alcanzar la base de datos interna directamente.
  - *LAN Interna -> DMZ:* Permitido únicamente para administración mediante protocolos seguros (SSH, HTTPS).

---

### 3. Caso de Estudio: Brecha de Seguridad de Target (2013)

- **Vector Inicial:** Robo de credenciales de acceso remoto VPN de un proveedor externo de mantenimiento de aire acondicionado (HVAC).
- **Fallo de Arquitectura:** Carencia de segmentación perimetral interna entre la red corporativa general y el entorno de datos de tarjetas de pago (**PCI-DSS**).
- **Consecuencia:** Los atacantes se movieron lateralmente desde el portal de proveedores hasta las terminales Punto de Venta (**POS**), instalando malware de lectura de memoria RAM y robando más de 40 millones de tarjetas de crédito.

---

### 4. Implementación Práctica de Firewall con iptables / nftables

\`\`\`bash
# 1. Politicas por defecto: Descartar todo (Default DROP)
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# 2. Permitir trafico de loopback interno
iptables -A INPUT -i lo -j ACCEPT

# 3. Inspeccion de estado: Permitir conexiones establecidas y relacionadas
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# 4. Permitir acceso SSH administrativo restringido a una subred de gestion
iptables -A INPUT -p tcp -s 192.168.50.0/24 --dport 22 -m conntrack --ctstate NEW -j ACCEPT

# 5. Permitir trafico web publico a la DMZ
iptables -A INPUT -p tcp -m multiport --dports 80,443 -m conntrack --ctstate NEW -j ACCEPT
\`\`\`

---

### 5. Precauciones y Trampas Operativas

- **Falsa Seguridad sin Inspección SSL/TLS:** Dado que más del 90% del tráfico web actual viaja cifrado bajo HTTPS/TLS 1.3, un firewall que no realice desencriptado e inspección profunda (SSL Forward Proxy) es ciego ante ataques L7 y malware descargado en túneles web.
- **Reglas con Destino 'ANY ANY':** Reglas temporales creadas para pruebas con comodines \`any any\` que no son retiradas representan una de las principales brechas en auditorías perimetrales.
`
      },
      {
        id: "u3-s2",
        title: "Sesión 3.2: Sistemas de Detección y Prevención de Intrusiones (IDS/IPS)",
        topics: [
          "Diferencias Arquitectónicas entre IDS (Pasivo/Promiscuo) e IPS (En Línea/Inline)",
          "Motores de Inspección: Detección Basada en Firmas vs Análisis de Anomalías de Comportamiento",
          "Reglas de Detección en Snort 3 y Suricata",
          "Análisis de Tráfico y Telemetría con Zeek (Bro)",
          "Evasión de NIDS: Fragmentación IP, Evasión TCP y Ofuscación"
        ],
        content: `
### 1. IDS vs IPS: Diferencias Arquitectónicas

Los sistemas de detección y prevención de intrusiones analizan el tráfico en tiempo real en busca de actividades maliciosas o violaciones de políticas:

\`\`\`mermaid
flowchart TD
    subgraph Modo_IDS_Pasivo
    R1[Router] --> SW1[Switch con SPAN Port]
    SW1 --> HostA[Servidor]
    SW1 -.-> |Copia de Trafico SPAN| IDS[Sensor IDS Pasivo]
    IDS -.-> |Alerta / Syslog| SIEM[SIEM / SOC]
    end

    subgraph Modo_IPS_En_Linea
    R2[Router] --> IPS_Inline[Sensor IPS Inline]
    IPS_Inline --> SW2[Switch]
    SW2 --> HostB[Servidor]
    IPS_Inline --x |Descarta Paquete Malicioso en Vuelo| Drop[Drop / TCP Reset]
    end
\`\`\`

- **NIDS (Network IDS - Modo Pasivo):** Conectado a un puerto espejo (**SPAN**) o Network TAP. No afecta la latencia de la red, pero solo puede alertar de forma reactiva una vez que el paquete ya llegó a la víctima.
- **NIPS (Network IPS - Modo Inline):** Intercalado físicamente en la ruta del tráfico de red. Analiza cada paquete en tránsito y puede descartarlo (*Drop*), terminar la sesión TCP (*TCP Reset*) o reconfigurar dinámicamente el firewall perimetral antes de que el ataque alcance al objetivo.

---

### 2. Sintaxis y Creación de Reglas en Snort / Suricata

Una regla de Snort se compone de una **Cabecera** (Acción, Protocolo, IP Origen, Puerto Origen, Dirección, IP Destino, Puerto Destino) y **Opciones** (Mensaje, Contenido, Referencias, Clasificación, SID):

\`\`\`snort
# Regla 1: Deteccion de escaneo Nmap NULL Scan
alert tcp any any -> $HOME_NET any (msg:"SCAN Nmap NULL Scan Detectado"; flags:0; classtype:attempted-recon; sid:1000001; rev:1;)

# Regla 2: Deteccion de intento de explotacion EternalBlue (SMB MS17-010)
drop tcp any any -> $HOME_NET 445 (msg:"EXPLOIT-KIT Microsoft Windows SMBv1 EternalBlue Attempt"; flow:to_server,established; content:"|ff|SMB|32|"; offset:4; depth:5; content:"|00 00 00 00|"; distance:29; sid:1000002; rev:3;)

# Regla 3: Deteccion de comando malicioso de inyeccion SQL en peticion HTTP GET
drop http any any -> $HOME_NET any (msg:"WEB-ATTACKS SQL Injection UNION SELECT"; http_uri; content:"UNION"; nocase; content:"SELECT"; nocase; distance:1; sid:1000003; rev:1;)
\`\`\`

---

### 3. Técnicas de Evasión de NIDS/NIPS y Contramedidas

1. **Fragmentación IP:** El atacante divide el payload malicioso en microfragmentos IP diminutos. Si el sensor no reensambla los paquetes en memoria exactamente igual que el sistema operativo destino, el ataque pasa desapercibido.
   - *Contramedida:* Motor de preprocesador de desfragmentación IP con coincidencia de política de SO (**Frag3 en Snort**).
2. **Evasión de Superposición TCP (TCP Overlapping):** Envío de segmentos TCP con números de secuencia superpuestos y datos contradictorios, aprovechando que Linux y Windows resuelven las colisiones de paquetes de forma distinta.
   - *Contramedida:* Normalización de flujos TCP mediante el preprocesador **Stream5 / Stream6**.
3. **Ofuscación de Cadenas URL:** Codificación múltiple en Hexadecimal, Unicode o URL encoding (\`%252e%252e%252f\`).
   - *Contramedida:* Preprocesador de normalización HTTP (**HttpInspect**).

---

### 4. Implementación y Pruebas con Snort en Linux

\`\`\`bash
# 1. Validacion de la sintaxis del archivo de configuracion
snort -c /etc/snort/snort.conf -T

# 2. Ejecucion en modo NIDS en la interfaz eth0 con registro en consola
snort -A console -q -u snort -g snort -c /etc/snort/snort.conf -i eth0
\`\`\`

---

### 5. Precauciones y Trampas Operativas

- **Sobrecarga de Falsos Positivos:** Un sensor IPS con firmas mal calibradas puede bloquear tráfico comercial legítimo, causando denegaciones de servicio autoinducidas. Las reglas deben probarse primero en modo alerta (*Alert-Only*) antes de pasar a modo bloqueo (*Drop*).
- **Agotamiento de Recursos de CPU y Memoria:** Motores de inspección con expresiones regulares (**PCRE**) complejas sin anclas de longitud pueden sufrir ataques de ReDoS (Denegación de Servicio por Expresiones Regulares), congelando el tráfico en el sensor.
`
      },
      {
        id: "u3-s3",
        title: "Sesión 3.3: Redes Privadas Virtuales (VPN) y Protocolo IPSec",
        topics: [
          "Arquitectura del Framework IPSec (RFC 4301): Protocolos AH (RFC 4302) y ESP (RFC 4303)",
          "Modos de Operación IPSec: Modo Transporte vs Modo Túnel",
          "Intercambio de Claves IKE (Internet Key Exchange): Comparativa IKEv1 vs IKEv2",
          "Fases de Negociación: Fase 1 (IKE SA / ISAKMP) y Fase 2 (IPSec SA / Quick Mode)",
          "Configuración Práctica de Túnel IPsec Site-to-Site en Cisco IOS CLI"
        ],
        content: `
### 1. Framework IPSec (RFC 4301) y Protocolos de Seguridad

**IPSec (Internet Protocol Security)** es un conjunto de estándares de la IETF que opera en la **Capa 3 (Capa de Red)** para proporcionar autenticación, integridad y confidencialidad en comunicaciones a través de redes IP no confiables:

\`\`\`mermaid
flowchart TD
    subgraph Modos_IPSec
    direction TB
    M1[Modo Transporte: Cifra solo el Payload / Cabecera IP original visible]
    M2[Modo Tunel: Cifra todo el paquete original / Agrega Nueva Cabecera IP externa]
    end

    subgraph Protocolos_Base
    P1[AH - Authentication Header: Autenticacion e Integridad / SIN Cifrado]
    P2[ESP - Encapsulating Security Payload: Autenticacion + Integridad + CIFRADO]
    end
\`\`\`

1. **Protocolo AH (Authentication Header - RFC 4302 / IP Protocol 51):**
   - Garantiza autenticidad e integridad mediante HMAC. **NO PROPORCIONA CONFIDENCIALIDAD (No cifra los datos)**.
   - *Incompatibilidad:* Rompe las traducciones **NAT (Network Address Translation)** porque incluye la cabecera IP externa en el cálculo del hash.
2. **Protocolo ESP (Encapsulating Security Payload - RFC 4303 / IP Protocol 50):**
   - Proporciona **Confidencialidad (Cifrado AES), Autenticidad, Integridad y Protección Anti-Replay**. Es el protocolo estándar en la industria.

---

### 2. Negociación IKEv1 vs IKEv2 y Fases del Túnel

| Fase de Negociación | IKEv1 (RFC 2409) | IKEv2 (RFC 7296) | Propósito Criptográfico |
| :--- | :--- | :--- | :--- |
| **Fase 1 (IKE SA)** | 6 paquetes (Main Mode) o 3 paquetes (Aggressive Mode) | 4 paquetes (IKE_SA_INIT / IKE_AUTH) | Autenticación mutua de los peers y creación de un canal seguro protegido por Diffie-Hellman |
| **Fase 2 (IPSec SA)** | 3 paquetes (Quick Mode) | 2 paquetes (CREATE_CHILD_SA) | Negociación del Transform-Set (algoritmo de cifrado y hash), lifetimes y selectores de tráfico |
| **Soporte NAT-T** | Requiere extensión RFC 3947 (UDP 4500) | Integrado de forma nativa en el estándar | Encapsula paquetes ESP en UDP 4500 para atravesar routers NAT |
| **Movilidad (MOBIKE)** | No soportado | Soportado nativamente | Permite a clientes VPN cambiar de IP (ej. Wi-Fi a 4G) sin renegociar el túnel |

---

### 3. Configuración de Túnel IPsec Site-to-Site en Cisco IOS CLI

\`\`\`cisco
! =========================================================================
! PASO 1: Configuracion IKE Fase 1 (ISAKMP Policy)
! =========================================================================
crypto isakmp policy 10
 encr aes 256
 hash sha256
 authentication pre-share
 group 14
 lifetime 86400

crypto isakmp key Cl@veUltr@Segur@VPN2026! address 200.100.50.2

! =========================================================================
! PASO 2: Configuracion IKE Fase 2 (Transform-Set)
! =========================================================================
crypto ipsec transform-set TSET_AES256_SHA256 esp-aes 256 esp-sha256-hmac
 mode tunnel

! =========================================================================
! PASO 3: Definicion de Trafico Interesante (Access-List)
! =========================================================================
ip access-list extended ACL_VPN_TRAFFIC
 permit ip 192.168.10.0 0.0.0.255 192.168.20.0 0.0.0.255

! =========================================================================
! PASO 4: Creacion y Aplicacion del Crypto Map
! =========================================================================
crypto map CMAP_SITEDEFAULT 10 ipsec-isakmp
 set peer 200.100.50.2
 set transform-set TSET_AES256_SHA256
 match address ACL_VPN_TRAFFIC

interface GigabitEthernet0/0
 description WAN_OUTSIDE_INTERFACE
 crypto map CMAP_SITEDEFAULT
\`\`\`

---

### 4. Precauciones y Trampas Operativas

- **Diffie-Hellman Groups Débiles:** Grupos DH 1 (768-bit), DH 2 (1024-bit) y DH 5 (1536-bit) son computacionalmente vulnerables y están obsoletos. Se debe configurar como mínimo **DH Group 14 (2048-bit), DH Group 19 (ECDH 256-bit) o DH Group 20 (ECDH 384-bit)**.
- **Riesgo de MTU / Fragmentación:** El encapsulamiento ESP y las cabeceras IPsec añaden entre 50 y 73 bytes a cada paquete. Si no se ajusta el **TCP MSS Clamping** (\`ip tcp adjust-mss 1360\`), los paquetes de 1500 bytes se fragmentarán, degradando severamente el rendimiento de la VPN.
`
      }
    ]
  },

  {
    id: "unit-4",
    unitNumber: 4,
    title: "Unidad 4: Marcos Normativos, Auditoría, Criptoanálisis y Hardening Empresarial",
    weeks: "Semanas 9 y 10",
    summary: "Criptoanálisis formal, entropía de claves, gestión de certificados PKI, hardening de infraestructura de red y servidores (CIS Benchmarks), marcos de cumplimiento (ISO 27001, PCI-DSS, NIST CSF), auditoría técnica, respuesta ante incidentes (CSIRT/SOC), y threat hunting con MITRE ATT&CK.",
    sessions: [
      {
        id: "u4-s1",
        title: "Sesión 4.1: Criptoanálisis, Gestión de Claves y Modelos de Entropía",
        topics: [
          "Fundamentos de Criptoanálisis (Ataques de Texto Claro Conocido, Cumpleaños, Canal Lateral)",
          "Modelos Matemáticos de Entropía de Shannon en Generadores de Números Pseudoaleatorios (CSPRNG)",
          "Infraestructura de Clave Pública (PKI): Jerarquía de CAs, CRLs, OCSP y OCSP Stapling",
          "Gestión del Ciclo de Vida de Claves Criptográficas (NIST SP 800-57)",
          "Criptografía Post-Cuántica (PQC): Algoritmos Estandarizados por el NIST (ML-KEM, ML-DSA)"
        ],
        content: `
### 1. Modelos de Entropía y Fundamentos de Criptoanálisis

La fortaleza de cualquier algoritmo criptográfico moderno reside en la aleatoriedad y entropía de sus claves.

#### Entropía de la Información (Shannon):
$$H(X) = -\\sum_{i=1}^{n} P(x_i) \\log_2 P(x_i)$$

- Una fuente criptográficamente segura debe aproximarse a una **entropía de 1 bit por bit**, lo que significa que cada valor tiene una probabilidad uniforme e impredecible.
- Los sistemas operativos modernos obtienen entropía de fuentes físicas de hardware (interrupciones de disco, fluctuaciones térmicas, temporizadores de CPU) mediante **CSPRNGs** (\`/dev/urandom\`, Windows CNG \`BCryptGenRandom\`).

---

### 2. Tipos Fundamentales de Ataques Criptoanalíticos

1. **Ataque de Texto Cifrado Únicamente (Ciphertext-Only):** El atacante solo tiene acceso a mensajes cifrados e intenta deducir la clave mediante análisis estadístico de frecuencias.
2. **Ataque de Texto Claro Conocido (Known-Plaintext):** El atacante posee muestras de texto claro y sus correspondientes textos cifrados.
3. **Ataques de Canal Lateral (Side-Channel Attacks):** Explotación de emanaciones físicas del hardware durante el descifrado: variaciones en el consumo de energía (DPA), radiación electromagnética o tiempos de ejecución de instrucciones (**Timing Attacks**).
4. **Paradoja del Cumpleaños (Birthday Attack):** Explota la probabilidad de colisión en funciones hash. Para un hash de $n$ bits, se requieren solo $2^{n/2}$ operaciones para encontrar una colisión (ej. MD5 con 128 bits se rompe con $2^{64}$ operaciones).

---

### 3. Infraestructura de Clave Pública (PKI) y Validación de Certificados

\`\`\`mermaid
flowchart TD
    RootCA[Root CA Offline - Certificado Raiz Autofirmado] --> SubCA1[Intermediate CA de Emision]
    SubCA1 --> EndCert1[Certificado de Servidor Web TLS]
    SubCA1 --> EndCert2[Certificado VPN IPsec / 802.1X]
    SubCA1 --> EndCert3[Certificado de Firma de Codigo]
\`\`\`

- **Validación de Revocación:**
  - **CRLs (Certificate Revocation Lists):** Listas estáticas firmadas periódicamente por la CA con números de serie revocados. Son lentas y consumen ancho de banda.
  - **OCSP (Online Certificate Status Protocol - RFC 6960):** Consulta en tiempo real al servidor de la CA sobre el estado de un certificado específico.
  - **OCSP Stapling (RFC 6066):** El propio servidor web obtiene la respuesta firmada del OCSP periódicamente y la adjunta al handshake TLS, eliminando la latencia y protegiendo la privacidad del cliente.

---

### 4. Criptografía Post-Cuántica (PQC)

Con el advenimiento de las computadoras cuánticas a gran escala, el **Algoritmo de Shor** romperá la criptografía asimétrica actual basada en factorización de enteros y logaritmos discretos (**RSA, ECC, Diffie-Hellman**). El NIST ha estandarizado los algoritmos resistentes a ataques cuánticos:

- **ML-KEM (FIPS 203 / Kyber):** Algoritmo de encapsulamiento de claves basado en retículos (*Module Lattice*).
- **ML-DSA (FIPS 204 / Dilithium):** Algoritmo de firma digital post-cuántica.
- **SLH-DSA (FIPS 205 / SPHINCS+):** Firmas basadas en árboles de Merkle sin estructura de retículos.

---

### 5. Precauciones y Trampas Operativas

- **Uso de Generadores de Números Aleatorios no Seguros:** Utilizar funciones estándar como \`Math.random()\` en JavaScript o \`rand()\` en C para generar tokens de sesión, nonces o claves criptográficas permite predecir los valores y comprometer la seguridad. Debe utilizarse siempre \`crypto.getRandomValues()\`.
- **Ignorar el Anclaje de Certificados Raíz (Root CA):** Mantener la CA Raíz de la empresa conectada a la red en lugar de conservarla **offline** en una bóveda segura expone a toda la organización a que un atacante emita certificados válidos para cualquier dominio.
`
      },
      {
        id: "u4-s2",
        title: "Sesión 4.2: Hardening Empresarial de Infraestructura de Red y Servidores",
        topics: [
          "Metodología de Hardening basada en Guías CIS Benchmarks y DISA STIGs",
          "Hardening de Plano de Control, Gestión y Datos en Equipos de Red (CoPP, SSHv2, AAA)",
          "Hardening de Servidores Linux y Windows (Kernel Sysctl, SELinux, Directivas GPO)",
          "Gestión de Vulnerabilidades y Ciclos de Parcheo Automatizado",
          "Auditoría Automatizada de Seguridad con Lynis y OpenSCAP"
        ],
        content: `
### 1. Metodología de Hardening de Infraestructura

El **Hardening (Endurecimiento)** es el proceso sistemático de reducción de la superficie de ataque de un dispositivo o sistema operativo, deshabilitando servicios innecesarios, aplicando configuraciones seguras por defecto y restringiendo privilegios según los estándares **CIS Benchmarks** y **DISA STIGs**.

---

### 2. Hardening en Dispositivos de Red: Los Tres Planos

\`\`\`mermaid
flowchart TD
    subgraph Planos_de_Seguridad_Cisco
    CP[Plano de Control: Protocolos de Enrutamiento BGP/OSPF, ARP, ICMP]
    MP[Plano de Gestion: SSHv2, SNMPv3, Syslog, HTTPS, TACACS+]
    DP[Plano de Datos: Conmutacion y Enrutamiento de Paquetes de Usuario]
    end
\`\`\`

1. **Plano de Gestión (Management Plane):**
   - Deshabilitar Telnet y HTTP no seguro; exigir **SSHv2 con cifrado AES-GCM y clave RSA-4096 o Ed25519**.
   - Restringir el acceso a la interfaz de gestión exclusivamente a subredes autorizadas mediante ACLs.
   - Configurar timeouts de sesión de consola inactiva (máximo 5 minutos).
2. **Plano de Control (Control Plane Protection - CoPP):**
   - Limitar la tasa de paquetes procesados por la CPU del router mediante **CoPP (Control Plane Policing)** para evitar ataques DoS contra OSPF, BGP o ICMP.
3. **Plano de Datos (Data Plane):**
   - Habilitar **uRPF (Unicast Reverse Path Forwarding)** para mitigar ataques de suplantación de IP (IP Spoofing).
   - Bloquear fragmentos IP anómalos y paquetes con opciones IP (*IP Source Routing*).

---

### 3. Hardening Práctico en Servidores Linux (Kernel y Red)

\`\`\`ini
# Configuraciones de Hardening en /etc/sysctl.d/99-security.conf

# 1. Deshabilitar el reenvio de paquetes si el servidor no es un router
net.ipv4.ip_forward = 0

# 2. Proteccion contra ataques de suplantacion de IP (uRPF)
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1

# 3. Mitigacion de ataques de Denegacion de Servicio TCP SYN Flood
net.ipv4.tcp_syncookies = 1

# 4. Ignorar paquetes de broadcast ICMP (Mitigacion de ataques Smurf)
net.ipv4.icmp_echo_ignore_broadcasts = 1

# 5. Deshabilitar aceptacion de paquetes con enrutamiento en origen (Source Routing)
net.ipv4.conf.all.accept_source_route = 0
net.ipv6.conf.all.accept_source_route = 0

# 6. Restriccion de acceso a punteros del kernel (KASLR)
kernel.kptr_restrict = 2
kernel.dmesg_restrict = 1
\`\`\`

---

### 4. Herramientas de Auditoría Automatizada de Hardening

- **Lynis:** Herramienta de auditoría de seguridad para sistemas Linux y Unix.
\`\`\`bash
# Ejecucion de auditoria completa del sistema y generacion de indice de hardening
lynis audit system --quick
\`\`\`

- **OpenSCAP:** Verificación automatizada de conformidad contra perfiles oficiales de seguridad del NIST y DISA STIGs.
\`\`\`bash
# Evaluacion de conformidad del sistema frente al perfil CIS Benchmark
oscap xccdf eval --profile xccdf_org.ssgproject.content_profile_cis --report informe_hardening.html /usr/share/xml/scap/ssg/content/ssg-ubuntu2204-ds.xml
\`\`\`

---

### 5. Precauciones y Trampas Operativas

- **Falta de Pruebas en Entornos de Staging:** Aplicar directivas de hardening restrictivas (como deshabilitar módulos del kernel o bloquear puertos) directamente en servidores de producción puede provocar la caída inesperada de aplicaciones empresariales.
- **Ignorar las Cuentas de Servicio en Directivas de Contraseñas:** Imponer políticas de expiración automática de contraseñas a cuentas de servicio de bases de datos sin mecanismos de rotación PAM provocará la detención abrupta de sistemas de producción.
`
      },
      {
        id: "u4-s3",
        title: "Sesión 4.3: Respuesta ante Incidentes, Análisis Forense y Ciberinteligencia (CTI)",
        topics: [
          "Fases del Ciclo de Vida de Respuesta ante Incidentes (NIST SP 800-61 Rev. 2 e ISO/IEC 27035)",
          "Framework MITRE ATT&CK: Tácticas, Técnicas y Procedimientos (TTPs)",
          "Ciberinteligencia de Amenazas (CTI) y Modelos de Compartición (STIX/TAXII, MISP)",
          "Cadena de Custodia y Preservación de Evidencia Digital Forense",
          "Caso de Estudio: El Ciberataque a SolarWinds Orion (2020) y Respuesta CSIRT"
        ],
        content: `
### 1. Ciclo de Vida de Respuesta ante Incidentes (NIST SP 800-61 Rev. 2)

El estándar del NIST define un proceso cíclico estructurado para gestionar brechas de seguridad y contener amenazas en redes corporativas:

\`\`\`mermaid
flowchart LR
    P[1. Preparación] --> D[2. Detección y Análisis]
    D --> C[3. Contención, Erradicación y Recuperación]
    C --> L[4. Actividad Post-Incidente / Lecciones Aprendidas]
    L --> P
\`\`\`

1. **Preparación:** Creación de playbooks de respuesta, inventario de activos, políticas de respaldo inmutable y conformación del equipo **CSIRT / SOC**.
2. **Detección y Análisis:** Correlación de alertas en el SIEM, validación de falsos positivos y determinación del alcance, severidad y vector de entrada del incidente.
3. **Contención, Erradicación y Recuperación:**
   - *Contención a Corto Plazo:* Aislamiento de la VLAN infectada o bloqueo de IPs en el firewall perimetral.
   - *Erradicación:* Eliminación de artefactos de malware, persistencias en el registro y revocación de cuentas comprometidas.
   - *Recuperación:* Restauración de sistemas desde copias de seguridad verificadas e incremento del monitoreo de red.
4. **Actividad Post-Incidente (Lecciones Aprendidas):** Documentación formal de la causa raíz (*Root Cause Analysis*), revisión de brechas de control y actualización de políticas defensivas.

---

### 2. Marco MITRE ATT&CK para Ciberinteligencia y Threat Hunting

El marco **MITRE ATT&CK** categoriza el comportamiento de los adversarios en una matriz de **Tácticas** (el objetivo del atacante) y **Técnicas** (cómo lo logra):

| Táctica MITRE ATT&CK | Objetivo del Atacante | Técnicas Comunes en Redes |
| :--- | :--- | :--- |
| **Initial Access (Acceso Inicial)** | Obtener un punto de entrada en la red | Phishing (T1566), Explotación de Aplicaciones Expuestas (T1190) |
| **Execution (Ejecución)** | Ejecutar código malicioso | PowerShell (T1059.001), Windows Command Shell (T1059.003) |
| **Persistence (Persistencia)** | Mantener el acceso ante reinicios | Tareas Programadas (T1053), Modificación de Registro (T1547) |
| **Privilege Escalation** | Elevar privilegios a SYSTEM/root | Abuso de Privilegios de Token (T1134), Kerberoasting (T1558) |
| **Lateral Movement** | Moverse a otros equipos de la red | Protocolo RDP (T1021.001), SMB / PsExec (T1021.002) |
| **Exfiltration (Exfiltración)** | Extraer datos confidenciales | Exfiltración sobre Protocolo C2 (T1041), Cloud Storage (T1567) |

---

### 3. Caso de Estudio: El Ataque a la Cadena de Suministro de SolarWinds (2020)

- **Vector de Ataque:** Inserción de un backdoor sofisticado (**SUNBURST**) en las actualizaciones de software legítimas de la plataforma de monitoreo SolarWinds Orion.
- **Evasión Avanzada:** El malware permanecía en reposo durante dos semanas antes de contactar a su C2 mediante dominios que simulaban ser tráfico legítimo de Amazon Web Services.
- **Impacto:** Compromiso de múltiples agencias gubernamentales de EE.UU., empresas de ciberseguridad y corporaciones multinacionales.
- **Respuesta de la Industria:** Revisión integral de la seguridad en la cadena de suministro de software (**SBOM - Software Bill of Materials**) y adopción acelerada del modelo Zero Trust.

---

### 4. Preservación de Evidencia Digital Forense y Cadena de Custodia

Para que la evidencia digital sea admisible en procesos judiciales, se debe garantizar el principio de **Orden de Volatilidad (RFC 3227)**:

1. **Registros y Caché de CPU, Registros de Memoria.**
2. **Memoria Principal (RAM):** Volcado de memoria en vivo con herramientas forenses (**LiME en Linux, WinPmem en Windows**) antes de apagar o reiniciar el host.
3. **Estado de Conexiones de Red y Procesos en Ejecución.**
4. **Almacenamiento Secundario (Discos Duros, SSDs):** Creación de una imagen forense bit a bit (*E01 o RAW/DD*) con verificación de hash SHA-256 antes y después de la copia.
5. **Medios de Respaldo y Registros de Auditoría Remotos (SIEM).**

---

### 5. Herramientas Prácticas de Análisis Forense

- **Volatility 3:** Framework de análisis forense de volcados de memoria RAM.
\`\`\`bash
# Extraccion del listado de procesos ocultos en el volcado de memoria
vol -f memoria_infectada.raw windows.pslist
vol -f memoria_infectada.raw windows.malfind
\`\`\`

- **Autopsy / The Sleuth Kit:** Plataforma forense de análisis de imágenes de disco y recuperación de artefactos eliminados.
`
      }
    ]
  }
];
