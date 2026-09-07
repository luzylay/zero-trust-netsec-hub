/**
 * Comprehensive Enterprise Curriculum & Knowledge Base for Network Security & Digital Identity
 * Covers all 4 Units, 18 weeks, theoretical principles, architecture, real-world case studies,
 * beginner-friendly foundational glossaries (TCP/UDP, MAC/IP, Handshakes, etc.),
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
          "Glosario para Principiantes",
          "Casos de Estudio de la Industria (Equifax, Colonial Pipeline)"
        ],
        content: `
### 1. Glosario Técnico y Fundamentos para Principiantes

Si eres nuevo en seguridad de redes, estos son los conceptos clave que necesitas comprender antes de profundizar:

| Término | Definición Sencilla | Analogía / Ejemplo Práctico |
| :--- | :--- | :--- |
| **Activo de Información (Asset)** | Cualquier dato, servidor, router o sistema que tiene valor para una organización. | Las joyas dentro de una caja fuerte o la base de datos de clientes de un banco. |
| **Cifrado Simétrico** | Método de encriptación que utiliza **la misma clave secreta** tanto para cifrar como para descifrar el mensaje. | Un candado físico tradicional: quien tiene una copia exacta de la llave puede abrir y cerrar. |
| **Cifrado Asimétrico** | Método que utiliza **un par de claves matemáticas**: una Clave Pública (que se comparte con todos) y una Clave Privada (secreta y personal). | Un buzón de correos: cualquiera puede depositar una carta por la ranura (clave pública), pero solo el cartero con la llave puede abrir el buzón y leerlas (clave privada). |
| **Función Hash** | Algoritmo matemático unidireccional que convierte cualquier cantidad de texto en un código alfanumérico de longitud fija (ej. SHA-256). Es imposible revertir el hash al texto original. | La huella dactilar de un archivo: si cambias una sola letra en un libro de 500 páginas, el hash resultante cambia por completo. |
| **RBAC (Role-Based Access Control)** | Modelo donde los permisos se asignan a roles de trabajo y no a personas individuales. | En un hospital, cualquier usuario con rol "Médico" puede ver historiales clínicos, pero el rol "Recepcionista" solo puede ver citas. |
| **PKI (Public Key Infrastructure)** | Sistema de certificados digitales y autoridades de confianza que validan que una clave pública realmente pertenece a quien dice ser. | El sistema de pasaportes emitidos por el gobierno para validar la identidad de los ciudadanos en aeropuertos. |
| **DDoS (Denial of Service)** | Ataque masivo donde miles de computadoras inundan un servidor con tráfico falso hasta colapsarlo y dejarlo inaccesible para usuarios reales. | Una multitud de 10,000 personas bloqueando deliberadamente todas las puertas y teléfonos de una tienda para que nadie pueda entrar a comprar. |

---

### 2. Principios Fundamentales de la Seguridad de la Información

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

### 3. Modelo Matemático y Ecuación de Riesgo Cibernético

$$\\text{Riesgo (Risk)} = \\text{Amenaza (Threat)} \\times \\text{Vulnerabilidad (Vulnerability)} \\times \\text{Impacto (Impact)}$$

- **Vulnerabilidad (Debilidad):** Falla en el diseño, implementación o configuración de un sistema o protocolo (ej. software desactualizado, falta de cifrado en telnet, inyección SQL).
- **Amenaza (Vector Potencial):** Evento o actor malicioso (ciberdelincuente, ransomware, malware estado-nación) con la capacidad de explotar una vulnerabilidad.
- **Impacto (Consecuencia):** Daño financiero, operativo, reputacional o legal derivado de la materialización de la amenaza.
- **Riesgo Residual:** Nivel de riesgo que permanece una vez implementados los controles de seguridad (**Controles Administrativos, Técnicos y Físicos**).

---

### 4. Casos Reales de la Industria

1. **Incidente Equifax (2017) - Quiebre de Confidencialidad:**
   - *Vector:* Vulnerabilidad en Apache Struts (CVE-2017-5638) no parcheada durante más de 60 días en un portal de disputas.
   - *Consecuencia:* Exfiltración de datos personales y crediticios de más de 147 millones de personas.
   - *Fallo de Control:* Carencia de inventario de activos, fallas en la inspección TLS interna (el certificado del sensor de red estaba vencido, impidiendo ver la exfiltración).
2. **Incidente Colonial Pipeline (2021) - Quiebre de Disponibilidad:**
   - *Vector:* Acceso a una cuenta heredada de VPN empresarial sin autenticación multifactor (**MFA**), obtenida a través de una fuga de credenciales en la Dark Web.
   - *Consecuencia:* Despliegue de ransomware DarkSide que paralizó el suministro del 45% del combustible de la costa este de EE.UU.
   - *Fallo de Control:* Ausencia de políticas de MFA mandatorias y falta de depuración de accesos legados.

---

### 5. Herramientas de la Industria y Comandos Prácticos

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

---

### 6. Precauciones y Trampas de Implementación

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
          "Glosario Técnico de Amenazas",
          "Técnicas de Evasión (Polimorfismo, Metamorfismo, Sandboxing Bypass)",
          "Detección Basada en Firmas, Heurística y Análisis de Comportamiento (EDR/XDR)",
          "Caso de Estudio: WannaCry (2017) y NotPetya"
        ],
        content: `
### 1. Glosario Técnico y Fundamentos de Malware

| Término | Definición Sencilla | Analogía / Ejemplo Práctico |
| :--- | :--- | :--- |
| **Payload (Carga Útil)** | El fragmento de código del malware que ejecuta la acción perjudicial real (robar datos, cifrar discos o abrir puertos). | La ojiva o explosivo dentro de un misil; el resto del misil es solo el vehículo de transporte. |
| **RAT (Remote Access Trojan)** | Software malicioso que otorga al atacante control remoto gráfico total de la máquina infectada (cámara, teclado, archivos). | Como instalar un TeamViewer o AnyDesk clandestino sin que el usuario lo sepa. |
| **Rootkit** | Herramienta oculta que se instala en el núcleo más profundo del sistema operativo (Kernel) para borrar los rastros del malware. | Un intruso que se vuelve invisible a los ojos de la policía porque altera las cámaras de seguridad del edificio. |
| **Zero-Day (Día Cero)** | Una vulnerabilidad de software recién descubierta para la cual el fabricante aún no ha creado un parche ni existe firma de antivirus. | Una cerradura de banco cuya falla secreta de fábrica solo conocen los ladrones. |
| **Sandbox (Bandeja de Arena)** | Entorno virtual seguro y aislado donde se ejecuta un archivo sospechoso para observar su comportamiento sin peligro. | Una cámara de bioseguridad acristalada donde los científicos analizan un virus peligroso. |
| **EDR / XDR** | Software moderno de seguridad que vigila continuamente la memoria RAM y el comportamiento de los procesos para detectar anomalías en vivo. | Un guardia de seguridad con inteligencia artificial patrullando dentro de la computadora en tiempo real. |

---

### 2. Taxonomía del Malware Moderno

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

### 3. Ciclo de Vida de la Infección y Vectores de Evasión

1. **Desarrollo y Armado (Weaponization):** El actor de amenazas ensambla el payload malicioso, aplicando empaquetadores (**UPX, Themida**), cifrado polimórfico o metamórfico para alterar los hashes MD5/SHA-256 en cada compilación.
2. **Entrega y Explotación (Delivery & Exploitation):** Tráfico malicioso transmitido mediante phishing, descargas desatendidas (Drive-by Download) o explotación de vulnerabilidades en servicios expuestos (ej. SMB, RDP).
3. **Instalación y Persistencia (Installation & Persistence):** Creación de claves en el Registro de Windows (\`HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\`), tareas programadas o servicios de sistema ocultos.
4. **Comando y Control (C2 Beaconing):** El binario infectado establece comunicación cifrada saliente (TLS, DNS tunneling, WebSockets) con la infraestructura del atacante.
5. **Acción sobre Objetivos (Actions on Objectives):** Exfiltración de datos confidenciales, cifrado de volúmenes de almacenamiento o movimiento lateral hacia controladores de dominio.

---

### 4. Técnicas de Detección de Malware

1. **Detección Basada en Firmas:** Compara secuencias de bytes y hashes estáticos contra bases de datos globales de amenazas. Es ineficaz ante ataques Zero-Day o variantes con polimorfismo.
2. **Análisis Heurístico y Desensamblado Estático:** Analiza las llamadas a la API de Windows (\`VirtualAllocEx\`, \`WriteProcessMemory\`, \`CreateRemoteThread\`) en busca de patrones típicos de inyección DLL.
3. **Análisis Dinámico en Sandbox:** Ejecución controlada del archivo en una máquina virtual instrumentada para monitorear modificaciones de archivos, claves de registro y tráfico de red saliente.
4. **Sistemas EDR / XDR con Aprendizaje Automático:** Telemetría en tiempo real que detecta anomalías de comportamiento (ej. el proceso \`word.exe\` intentando invocar \`powershell.exe -enc\` con privilegios elevados).

---

### 5. Caso de Estudio: El Gusano Ransomware WannaCry (2017)

- **Vector de Entrada:** Explotación de la vulnerabilidad en el protocolo SMBv1 de Microsoft (**CVE-2017-0143 / EternalBlue**), filtrada del grupo Equation Group.
- **Mecanismo de Propagación:** Escaneo masivo y autónomo del puerto TCP 445 en subredes locales e Internet. Una vez infectado un equipo, actuaba como gusano para propagarse a todos los hosts accesibles sin interacción de usuario.
- **Carga Útil:** Cifrado de archivos con algoritmo AES-128-CBC + RSA-2048 y solicitud de rescate en Bitcoin.
- **Detención:** Descubrimiento de un dominio no registrado ("Killswitch") al que el malware consultaba antes de ejecutar el cifrado.

---

### 6. Herramientas y Comandos Prácticos

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

### 7. Precauciones y Trampas Operativas

- **Desactivar SMBv1 en toda la red:** SMBv1 es un protocolo obsoleto que carece de autenticación robusta y cifrado; debe ser deshabilitado mediante directivas GPO.
- **No confiar en la extensión del archivo:** Archivos con doble extensión (ej. \`factura.pdf.exe\`) engañan al usuario si el explorador de Windows tiene desmarcada la opción de mostrar extensiones conocidas.
`
      },
      {
        id: "u1-s3",
        title: "Sesión 1.3: Botnets y Servidores de Comando y Control (C2)",
        topics: [
          "Arquitectura y Topologías de Botnets (Centralizada IRC/HTTP, P2P, Híbrida)",
          "Glosario de Redes Botnet y C2",
          "Evasión Avanzada: DGA (Domain Generation Algorithms) y Fast-Flux DNS",
          "Canales Encubiertos (DNS Tunneling, DoH, Cloud APIs)",
          "Estrategias Defensivas: DNS Sinkholing, Análisis de Beaconing y Threat Intelligence",
          "Caso de Estudio: Mirai Botnet (2016) y GameOver Zeus"
        ],
        content: `
### 1. Glosario Técnico y Fundamentos de Botnets

| Término | Definición Sencilla | Analogía / Ejemplo Práctico |
| :--- | :--- | :--- |
| **Bot / Zombie** | Dispositivo informático infectado (computadora, cámara, router) que obedece órdenes remotas de un atacante sin que su dueño lo sepa. | Un soldado hipnotizado en un ejército clandestino. |
| **Botmaster / Herder** | El ciberdelincuente que controla y administra la red de computadoras infectadas. | El general que da órdenes a su ejército de soldados hipnotizados. |
| **Servidor C2 (Command & Control)** | Servidor web o central donde el atacante publica las órdenes y recibe los datos robados de todos los bots. | La estación de radio clandestina que transmite instrucciones a agentes encubiertos. |
| **Beaconing (Balizamiento)** | Señal o mensaje periódico y silencioso que un bot infectado envía a su servidor C2 para preguntar: "¿Tienes órdenes nuevas para mí?". | Un submarino que emite un pulso de radar cada 10 minutos para reportar su posición a la base. |
| **DGA (Domain Generation Algorithm)** | Algoritmo matemático en el malware que genera automáticamente cientos de nombres de dominio nuevos cada día para evitar bloqueos. | Un espía que cambia de número de teléfono cada 24 horas usando una fórmula matemática conocida solo por él y su base. |
| **DNS Sinkholing** | Técnica defensiva donde los defensores toman control de un dominio malicioso y redirigen su tráfico a una IP falsa interna para censar víctimas y anular el ataque. | Desviar una llamada telefónica de un estafador directamente a la central de la policía. |

---

### 2. ¿Qué es una Botnet y cómo opera?

Una **Botnet** es una red distribuida de dispositivos informáticos comprometidos que son controlados de forma remota y coordinada por un atacante (*Botmaster*) a través de un canal de Comando y Control (**C2 / C&C**).

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
          "Glosario Esencial de Redes (TCP vs UDP, IP vs MAC, Handshake)",
          "Ataques de Acceso (Fuerza Bruta, Password Spraying, Pass-the-Hash)",
          "Ataques de Capa 2 (ARP Poisoning, DHCP Starvation, MAC Flooding, VLAN Hopping)",
          "Ingeniería Social (Phishing, Spear Phishing, Whaling, Vishing, Pretexting)",
          "Mecanismos de Monitoreo (SNMPv3, NetFlow/IPFIX, Syslog RFC 5424, SPAN, Network TAPs)",
          "Defensas de Switch: Port Security, DHCP Snooping, Dynamic ARP Inspection (DAI)"
        ],
        content: `
### 1. Glosario Fundamental de Redes: TCP vs UDP, MAC vs IP

Para entender los ataques a redes locales, es indispensable dominar estos conceptos básicos de comunicaciones:

| Concepto de Red | Definición Sencilla | Explicación Práctica / Analogía |
| :--- | :--- | :--- |
| **TCP (Transmission Control Protocol)** | Protocolo de transporte orientado a la conexión, confiable y ordenado. Verifica que cada paquete llegue sin errores mediante confirmaciones (ACKs). | Como enviar una carta certificada con acuse de recibo donde el cartero te entrega un comprobante firmado de entrega. Usado en Web (HTTP/HTTPS), SSH y transferencias de archivos. |
| **UDP (User Datagram Protocol)** | Protocolo de transporte rápido, sin conexión ni confirmación de entrega. No garantiza el orden de llegada. | Como una transmisión de radio en vivo: si hay interferencia por un segundo, la señal continúa y no se detiene a reenviar lo que te perdiste. Usado en Streaming de video, DNS, llamadas VoIP y juegos online. |
| **Three-Way Handshake (TCP)** | Proceso de 3 pasos para iniciar una sesión TCP: 1) SYN (¿Podemos hablar?), 2) SYN-ACK (Sí, hablemos), 3) ACK (Entendido, iniciemos). | Como decir: "Hola", responder: "Hola, te escucho", y confirmar: "Perfecto, te cuento...". |
| **Dirección MAC (Media Access Control)** | Identificador físico único de 48 bits grabado de fábrica en la tarjeta de red de cada dispositivo (Capa 2). | El número de serie o DNI físico imborrable grabado en el motor de un vehículo. |
| **Dirección IP (Internet Protocol)** | Dirección lógica de red (Capa 3) que identifica la ubicación de un dispositivo en una red (ej. 192.168.1.50). | La dirección postal o número de departamento donde vives (puede cambiar si te mudas de red). |
| **Protocolo ARP (Address Resolution Protocol)** | Protocolo que traduce una dirección IP lógica a una dirección MAC física en la red local. | Preguntar en voz alta en un salón: "¿Quién es Juan Pérez (IP) para entregarle esta carta en su mesa (MAC)?". |
| **Protocolo DHCP (Dynamic Host Configuration)** | Servidor que asigna automáticamente direcciones IP, máscaras y DNS a las computadoras cuando se conectan. | El recepcionista del hotel que te entrega la llave y el número de habitación al registrarte. |

---

### 2. Metodologías de Ataque en Redes de Acceso Local (LAN)

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

### 3. Dispositivos y Protocolos de Telemetría y Monitoreo de Red

| Mecanismo de Telemetría | Capa OSI | Datos Recopilados | Uso en Operaciones de Seguridad (SOC) |
| :--- | :--- | :--- | :--- |
| **SNMPv3** | Capa 7 (UDP 161/162) | Métricas de hardware, contadores de interfaz, estado de enlaces cifrados con AES/SHA | Alertas de caídas de interfaces, saturación de ancho de banda |
| **NetFlow / IPFIX** | Capa 3/4 (UDP) | Metadatos de flujo: IP origen/destino, puerto, protocolo, bytes, duración | Detección de anomalías de tráfico masivo, escaneos y exfiltración |
| **Syslog (RFC 5424)** | Capa 7 (UDP/TCP 514, TLS 6514) | Eventos del sistema, intentos de login, cambios de configuración | Auditoría forense y correlación centralizada en SIEM |
| **Port Mirroring (SPAN)** | Capa 2/3 | Copia bit a bit del tráfico físico hacia un sensor NIDS | Inspección profunda de paquetes (**DPI**) con Snort/Suricata |
| **Network TAP** | Capa 1 (Física) | Duplicación pasiva por hardware de señales ópticas/cobre | Captura forense 10G/40G sin impacto en la CPU del switch |

---

### 4. Configuración de Hardening en Cisco IOS CLI

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

### 5. Precauciones y Trampas Operativas

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
          "Glosario Esencial de Gestión de Identidad y AAA",
          "Arquitectura y Componentes del Framework AAA",
          "Protocolo TACACS+ (RFC 8907): Arquitectura TCP 49, Desacoplamiento y Cifrado Total",
          "Protocolo Kerberos v5 (RFC 4120): KDC, AS, TGS, Tickets TGT y Service Tickets",
          "Vulnerabilidades Críticas de Kerberos: Kerberoasting, AS-REP Roasting, Golden/Silver Tickets",
          "Caso de Estudio: Compromiso de Active Directory en Redes Corporativas"
        ],
        content: `
### 1. Glosario Técnico de Identidad y Protocolos AAA

| Término | Definición Sencilla | Analogía / Ejemplo Práctico |
| :--- | :--- | :--- |
| **NAS (Network Access Server)** | El dispositivo intermediario (router, switch o concentrador VPN) que solicita credenciales al usuario y consulta al servidor central de autenticación. | El guardia de la puerta del edificio que te pide tu documento y llama por radio a la administración para ver si puedes entrar. |
| **Shared Secret (Secreto Compartido)** | Contraseña secreta configurada manualmente tanto en el switch/router como en el servidor RADIUS/TACACS+ para cifrar los paquetes entre ambos. | La palabra clave secreta acordada entre dos agentes de inteligencia para verificar que sus mensajes no fueron manipulados. |
| **KDC (Key Distribution Center)** | El servidor central de Kerberos que emite boletos de autenticación cifrados en un dominio Active Directory. | La taquilla central de un parque de atracciones que emite pulseras de acceso. |
| **Ticket TGT (Ticket Granting Ticket)** | Boleto digital temporal emitido por el KDC tras ingresar tu contraseña correctamente, que te permite pedir acceso a servicios sin volver a escribir tu clave. | El pase VIP del parque de diversiones que te permite subirte a los juegos sin volver a pagar en cada juego. |
| **SPN (Service Principal Name)** | Identificador único que asocia un servicio de red (ej. SQL Server, HTTP) con una cuenta de usuario o cuenta de servicio en Active Directory. | La placa identificatoria de un empleado de mantenimiento que le permite operar una máquina específica. |

---

### 2. El Framework AAA (Authentication, Authorization, Accounting)

El modelo **AAA** es el pilar de la gestión centralizada de accesos e identidades en infraestructuras corporativas:

1. **Autenticación (Authentication - ¿Quién es la entidad?):** Proceso de verificación rigurosa de la identidad declarada mediante uno o más factores (**Conocimiento, Posesión, Inherencia**).
2. **Autorización (Authorization - ¿Qué tiene permitido hacer?):** Asignación de privilegios, listas de comandos, atributos de red (VLANs, ACLs descargables) aplicados a la sesión del usuario.
3. **Contabilidad / Registro (Accounting - ¿Qué acciones ejecutó y cuándo?):** Recopilación y registro de métricas operativas (marcas de tiempo de login/logout, comandos ejecutados, paquetes y bytes transmitidos) para auditoría y no repudio.

---

### 3. Protocolo TACACS+ (RFC 8907)

**TACACS+ (Terminal Access Controller Access Control System Plus)** es el estándar de facto para la administración segura de dispositivos de infraestructura (Routers, Switches, Firewalls):

- **Capa de Transporte:** Utiliza **TCP en el puerto 49**, garantizando entrega orientada a la conexión y control de flujo.
- **Desacoplamiento Total:** Separa de forma independiente los tres servicios (**Autenticación, Autorización y Contabilidad**), permitiendo autenticar contra un servidor LDAP/Active Directory pero autorizar comandos específicos en un servidor TACACS+ dedicado.
- **Cifrado del Payload Completo:** A diferencia de RADIUS, TACACS+ cifra la totalidad del cuerpo del paquete (incluyendo comandos de configuración y nombres de usuario). Solo la cabecera fija de 12 bytes viaja en texto claro.
- **Autorización Granular por Comando:** Permite inspeccionar cada comando individual introducido por el administrador en tiempo real antes de permitir su ejecución en la consola.

---

### 4. Protocolo Kerberos v5 (RFC 4120)

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

### 5. Configuración Práctica en Cisco IOS CLI

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

### 6. Precauciones y Trampas Operativas

- **Clave Secreta Compartida Débil:** La seguridad del cifrado de TACACS+ y RADIUS depende críticamente de la entropía de la clave compartida (*Shared Secret*). Claves cortas permiten la recuperación de credenciales mediante ataques de diccionario sobre capturas de red.
- **Configurar Siempre el Fallback Local:** La palabra clave \`local\` al final de la lista de métodos garantiza que, si los servidores TACACS+ no responden por caída de red, el administrador pueda iniciar sesión con la cuenta local de rescate.
`
      },
      {
        id: "u2-s2",
        title: "Sesión 2.2: Protocolos RADIUS, DIAMETER y Modelos de Autorización",
        topics: [
          "Glosario de Protocolos de Acceso y Control de Red",
          "Protocolo RADIUS (RFC 2865 / 2866): UDP 1812/1813, AVPs y Cifrado XOR con MD5",
          "Protocolo DIAMETER (RFC 6733): Evolución sobre TCP/SCTP con TLS y Soporte Móvil",
          "Modelos de Control de Acceso: DAC, MAC, RBAC, ABAC y Zero Trust Architecture (NIST SP 800-207)",
          "Análisis Forense de Paquetes RADIUS en Wireshark",
          "Implementación con FreeRADIUS en Linux"
        ],
        content: `
### 1. Glosario Técnico de RADIUS, DIAMETER y Modelos de Acceso

| Término | Definición Sencilla | Analogía / Ejemplo Práctico |
| :--- | :--- | :--- |
| **802.1X (Port-Based NAC)** | Estándar de seguridad que bloquea físicamente un puerto de red hasta que el usuario se autentique exitosamente. | El torniquete del metro que no gira ni te deja pasar hasta que pones tu tarjeta con saldo válido. |
| **Suplicante (Supplicant)** | El software cliente en la computadora del usuario que envía las credenciales para la autenticación 802.1X. | La aplicación en tu celular que muestra el código QR de embarque en el aeropuerto. |
| **AVP (Attribute-Value Pair)** | Formato estándar de datos en RADIUS/DIAMETER que transporta pares de datos tipo "Nombre = Valor" (ej. \`Framed-IP-Address = 10.0.0.5\`). | Las casillas de un formulario aduanero: [Campo: Nacionalidad] = [Valor: Peruana]. |
| **EAP (Extensible Authentication Protocol)** | Framework universal que permite transportar diferentes métodos de autenticación (certificados, passwords, tokens) sobre redes Wi-Fi o cableadas. | El contenedor estándar de transporte de carga que puede llevar dentro cajas de cualquier fabricante. |
| **RadSec (RFC 6614)** | Protocolo seguro que envuelve el tráfico tradicional RADIUS dentro de un túnel cifrado TLS sobre TCP puerto 2083. | Poner un paquete de correspondencia dentro de un maletín blindado con clave antes de enviarlo por mensajería. |

---

### 2. Protocolo RADIUS (RFC 2865 y RFC 2866)

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

### 3. Comparativa Técnica: RADIUS vs TACACS+ vs DIAMETER

| Criterio Técnico | RADIUS (RFC 2865/2866) | TACACS+ (RFC 8907) | DIAMETER (RFC 6733) |
| :--- | :--- | :--- | :--- |
| **Transporte** | UDP 1812/1813 | TCP 49 | TCP / SCTP puerto 3868 |
| **Servicios AAA** | Combina Autenticación y Autorización | Separa Autenticación, Autorización y Accounting | Desacoplado con arquitectura modular |
| **Cifrado** | Solo el campo User-Password (MD5/XOR) | Cifra el Payload completo del paquete | Cifrado nativo de capa de transporte (TLS / DTLS / IPsec) |
| **Autorización Granular** | No (basado en atributos por sesión) | Sí (comando por comando en tiempo real) | Sí (orientado a políticas complejas y telecomunicaciones) |
| **Casos de Uso** | Redes Wi-Fi 802.1X, VPNs, ISPs | Administración de routers, switches, firewalls | Redes móviles 4G/5G LTE, IMS, Roaming de telecomunicaciones |

---

### 4. Modelos Modernos de Control de Acceso

1. **DAC (Discretionary Access Control):** El propietario del archivo o recurso decide quién tiene acceso. Alto riesgo de fuga de información.
2. **MAC (Mandatory Access Control):** El sistema impone etiquetas de seguridad (Top Secret, Secret, Confidencial). Común en entornos militares (SELinux).
3. **RBAC (Role-Based Access Control):** Los permisos se asignan a roles organizacionales (ej. \`Operador_NOC\`, \`Auditor_Seguridad\`).
4. **ABAC (Attribute-Based Access Control):** Evaluación dinámica de políticas basadas en atributos del sujeto (identidad, rol), recurso (sensibilidad), acción (lectura/escritura) y entorno (**hora, geolocalización, postura del dispositivo**). Base de **Zero Trust (NIST SP 800-207)**.

---

### 5. Implementación y Configuración con FreeRADIUS en Linux

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

### 6. Precauciones y Trampas Operativas

- **Uso de Claves Compartidas Débiles en WPA2-Enterprise:** Si la clave compartida entre el Access Point y el servidor RADIUS es interceptada, un atacante puede descifrar los atributos de autorización y suplantar al servidor de autenticación.
- **Migración hacia RadSec (RFC 6614):** Enlaces RADIUS que atraviesen redes no confiables o Internet deben encapsularse obligatoriamente mediante **TLS sobre TCP puerto 2083 (RadSec)** para proteger la confidencialidad de los nombres de usuario y atributos.
`
      },
      {
        id: "u2-s3",
        title: "Sesión 2.3: Marco Normativo y Directrices Modernas de Identidad",
        topics: [
          "Glosario de Normativas y Estándares de Autenticación",
          "NIST SP 800-63-3: Niveles IAL, AAL y FAL",
          "Directrices Modernas de Contraseñas (NIST SP 800-63B)",
          "Resolución SBS N° 504-2021: Normativa Peruana de Seguridad de la Información y Ciberseguridad",
          "Arquitectura MFA Phishing-Resistant (FIDO2 / WebAuthn)",
          "Auditoría y Listas de Control de Acceso"
        ],
        content: `
### 1. Glosario Técnico de Normativa y Aseguramiento de Identidad

| Término | Definición Sencilla | Analogía / Ejemplo Práctico |
| :--- | :--- | :--- |
| **NIST (National Institute of Standards and Technology)** | Agencia federal estadounidense que crea los estándares globales más respetados de criptografía, identidad y ciberseguridad. | La Real Academia de la Lengua o la FIFA de las normas técnicas mundiales. |
| **MFA (Multi-Factor Authentication)** | Requisito de presentar dos o más pruebas independientes de identidad pertenecientes a categorías distintas: 1) Algo que sabes (clave), 2) Algo que tienes (token FIDO2), 3) Algo que eres (huella). | Para entrar a una bóveda bancaria requieres tu código PIN (saber) más tu llave física (tener) más tu lectura de iris (ser). |
| **FIDO2 / WebAuthn** | Estándar moderno de autenticación basado en hardware criptográfico (llaves USB YubiKey o biometría local) inmune al phishing porque vincula el login al dominio exacto del navegador. | Una llave física digital inteligente que solo gira en la cerradura si la dirección web coincide exactamente con el banco legítimo. |
| **SIM Swapping** | Ataque donde un criminal engaña a la compañía telefónica para duplicar el chip del teléfono de la víctima y recibir sus códigos SMS del banco. | Un ladrón que saca un duplicado falso de la llave de tu casillero en la oficina postal para robarte las cartas. |
| **PAM (Privileged Access Management)** | Bóveda de contraseñas de alta seguridad que custodia las credenciales de administrador de servidores y graba en video todo lo que hacen. | Una caja fuerte con cámara de circuito cerrado que registra cada segundo que alguien manipula las llaves maestras del edificio. |

---

### 2. Suite NIST SP 800-63-3: Digital Identity Guidelines

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

### 3. Directrices Modernas de Contraseñas del NIST (SP 800-63B)

El NIST revolucionó las prácticas de contraseñas eliminando mitos obsoletos que perjudicaban la seguridad real:

| Regla Tradicional (Obsoleta) | Postura Oficial NIST SP 800-63B | Justificación Criptográfica y de Usabilidad |
| :--- | :--- | :--- |
| **Rotación periódica forzada (cada 30-90 días)** | **Prohibida** salvo ante sospecha fundada de compromiso | La rotación frecuente induce a los usuarios a crear patrones predecibles (ej. \`Enero2026!\` -> \`Febrero2026!\`). |
| **Reglas de complejidad arbitrarias (1 mayúscula, 1 número, 1 símbolo)** | **Desaconsejadas**; priorizar longitud (mínimo 8-16 caracteres) | La entropía real radica en la longitud, no en sustituciones previsibles (como cambiar 'a' por '@'). |
| **Bloqueo estricto de caracteres y espacio** | **Permitir todos los caracteres ASCII y espacios** | Facilita el uso de frases de contraseña (*passphrases*) de alta entropía (ej. \`caballo-bateria-grapadora-azul\`). |
| **Preguntas de seguridad (nombre de primera mascota)** | **Prohibidas** | Las respuestas son fácilmente obtenibles mediante ingeniería social o registros públicos. |
| **Verificación contra listas negras de contraseñas** | **Mandatoria** | Comparar contraseñas contra bases de datos de credenciales filtradas (ej. HaveIBeenPwned). |

---

### 4. Resolución SBS N° 504-2021 (Regulación Financiera del Perú)

La **Superintendencia de Banca, Seguros y AFP (SBS)** del Perú establece exigencias mandatorias de ciberseguridad para entidades financieras y empresas de servicios complementarios:

- **Gobierno y Rol del CISO (Art. 5-7):** Obligatoriedad de designar un Oficial de Seguridad de la Información (**CISO**) con independencia funcional respecto a las áreas de Tecnología/Operaciones.
- **Centro de Operaciones de Seguridad (SOC 24/7):** Monitoreo continuo de eventos e incidentes de seguridad con capacidades de contención y respuesta en tiempo real.
- **Gestión de Cuentas Privilegiadas (PAM):** Control estricto, rotación automatizada y grabación de sesiones para todas las credenciales administrativas y de infraestructura crítica.
- **Segmentación y Protección en Canales Digitales:** Implementación de autenticación reforzada de doble factor para transferencias bancarias y operaciones monetarias en banca móvil y web.

---

### 5. Precauciones y Trampas Operativas

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
        id: "u3-s1",
        title: "Sesión 3.1: Seguridad Perimetral, Arquitectura de Firewalls y DMZ",
        topics: [
          "Glosario de Seguridad Perimetral y Firewalls",
          "Evolución de Firewalls (Packet Filtering, Stateful Inspection, Next-Generation Firewalls L7)",
          "Diseño de Arquitecturas de Red Segura (Zonas de Confianza, DMZ, Microsegmentación)",
          "Inspección Profunda de Paquetes (DPI) y Desencriptado TLS/SSL Man-in-the-Middle",
          "Filtrado de Paquetes con iptables / nftables en Linux",
          "Caso de Estudio: Fuga de Datos de Target a través de Proveedor HVAC"
        ],
        content: `
### 1. Glosario Técnico de Seguridad Perimetral y Firewalls

| Término | Definición Sencilla | Analogía / Ejemplo Práctico |
| :--- | :--- | :--- |
| **Firewall (Cortafuegos)** | Dispositivo de hardware o software que filtra y controla el tráfico de red entrante y saliente según un conjunto de reglas de seguridad. | El control de aduanas en una frontera internacional que revisa documentos y no deja pasar a personas o cargas no autorizadas. |
| **DMZ (Zona Desmilitarizada)** | Subred física o lógica aislada donde se colocan los servidores públicos (Web, Correo, DNS) para que, si son hackeados, el atacante no pueda acceder a la red interna corporativa. | El vestíbulo o sala de espera de una embajada donde atienden al público sin darles acceso a las oficinas privadas del embajador. |
| **Stateful (Con Estado)** | Capacidad del firewall de recordar qué conexiones fueron iniciadas desde adentro para permitir automáticamente las respuestas legítimas sin abrir puertos permanentes. | Cuando abres la puerta de tu casa para pedir una pizza: recuerdas que tú pediste la pizza, así que dejas entrar al repartidor cuando llega. |
| **DPI (Deep Packet Inspection)** | Inspección profunda que examina no solo las cabeceras de red sino el contenido real de los datos en Capa de Aplicación (Capa 7). | En lugar de solo revisar el remitente del sobre, abrir la carta y leer el texto para asegurarse de que no contenga amenazas. |
| **NAT (Network Address Translation)** | Tecnología que traduce múltiples direcciones IP privadas internas en una sola dirección IP pública para navegar por Internet. | La centralita telefónica de una empresa donde 500 empleados tienen anexos internos, pero hacia afuera todos llaman desde el mismo número principal. |

---

### 2. Evolución Tecnológica de los Firewalls

\`\`\`mermaid
flowchart LR
    Internet((Internet Pública)) <--> |Untrusted| FW[Firewall Perimetral]
    FW <--> |DMZ: HTTP / SMTP / DNS| DMZ[Servidores Públicos DMZ]
    FW <--> |Trusted: LAN Corporativa| LAN[Estaciones y Servidores Internos]
    DMZ -.-> |Bloqueado por Defecto| LAN
\`\`\`

1. **Firewalls de Filtrado de Paquetes (Stateless - 1ra Generación):**
   - Inspeccionan cada paquete de forma aislada basándose en las cabeceras de Capa 3 y 4 (IP origen/destino, puerto origen/destino, protocolo).
   - *Limitación:* No mantienen estado de conexión; permiten ataques de spoofing y requieren abrir rangos masivos de puertos efímeros para el tráfico de retorno.
2. **Firewalls de Inspección con Estado (Stateful Inspection - 2da Generación):**
   - Mantienen una tabla de estado dinámica de conexiones activas (**State Table**). Si un paquete entrante corresponde a una sesión TCP/UDP previamente iniciada desde el interior (ej. flag TCP ACK tras SYN-ACK), es permitido automáticamente.
3. **Firewalls de Próxima Generación (NGFW - Capa 7):**
   - Integran inspección profunda de aplicaciones (**App-ID**), prevención de intrusiones (**IPS**), antivirus de gateway, filtrado de URLs y descifrado e inspección TLS/SSL activa. Permiten bloquear aplicaciones específicas (ej. BitTorrent, TeamViewer) incluso si operan en el puerto estándar HTTPS 443.

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
          "Glosario de IDS, IPS y Firmas de Red",
          "Diferencias Arquitectónicas entre IDS (Pasivo/Promiscuo) e IPS (En Línea/Inline)",
          "Motores de Inspección: Detección Basada en Firmas vs Análisis de Anomalías de Comportamiento",
          "Reglas de Detección en Snort 3 y Suricata",
          "Análisis de Tráfico y Telemetría con Zeek (Bro)",
          "Evasión de NIDS: Fragmentación IP, Evasión TCP y Ofuscación"
        ],
        content: `
### 1. Glosario Técnico de IDS e IPS

| Término | Definición Sencilla | Analogía / Ejemplo Práctico |
| :--- | :--- | :--- |
| **IDS (Intrusion Detection System)** | Sistema pasivo que escucha una copia del tráfico de red y genera alertas si detecta un patrón de ataque, pero no detiene el paquete. | Un sistema de alarma sonora con cámara que avisa que un ladrón entró a la casa, pero no cierra la puerta. |
| **IPS (Intrusion Prevention System)** | Sistema activo ubicado en medio del flujo de datos que analiza los paquetes y los bloquea o descarta inmediatamente si son maliciosos. | Un guardia de seguridad armado en la entrada que neutraliza y expulsa al atacante antes de que cruce la puerta. |
| **Falso Positivo** | Cuando el sistema de seguridad clasifica erróneamente una actividad comercial legítima como un ataque y la bloquea. | Una alarma de incendios que se activa por el vapor de una tetera o una ducha caliente. |
| **Falso Negativo** | Cuando un ataque real atraviesa las defensas sin ser detectado ni alertado por el sistema de seguridad. | Un ladrón que entra a robar sin que los sensores de movimiento noten su presencia. |
| **Modo Promiscuo** | Configuración de una tarjeta de red para escuchar y capturar TODO el tráfico que pasa por el cable, no solo el dirigido a su propia IP. | Poner la oreja en una sala y escuchar las conversaciones de todas las personas presentes en lugar de solo cuando te hablan a ti. |

---

### 2. IDS vs IPS: Diferencias Arquitectónicas

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

### 3. Sintaxis y Creación de Reglas en Snort / Suricata

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

### 4. Técnicas de Evasión de NIDS/NIPS y Contramedidas

1. **Fragmentación IP:** El atacante divide el payload malicioso en microfragmentos IP diminutos. Si el sensor no reensambla los paquetes en memoria exactamente igual que el sistema operativo destino, el ataque pasa desapercibido.
   - *Contramedida:* Motor de preprocesador de desfragmentación IP con coincidencia de política de SO (**Frag3 en Snort**).
2. **Evasión de Superposición TCP (TCP Overlapping):** Envío de segmentos TCP con números de secuencia superpuestos y datos contradictorios, aprovechando que Linux y Windows resuelven las colisiones de paquetes de forma distinta.
   - *Contramedida:* Normalización de flujos TCP mediante el preprocesador **Stream5 / Stream6**.
3. **Ofuscación de Cadenas URL:** Codificación múltiple en Hexadecimal, Unicode o URL encoding (\`%252e%252e%252f\`).
   - *Contramedida:* Preprocesador de normalización HTTP (**HttpInspect**).

---

### 5. Implementación y Pruebas con Snort en Linux

\`\`\`bash
# 1. Validacion de la sintaxis del archivo de configuracion
snort -c /etc/snort/snort.conf -T

# 2. Ejecucion en modo NIDS en la interfaz eth0 con registro en consola
snort -A console -q -u snort -g snort -c /etc/snort/snort.conf -i eth0
\`\`\`

---

### 6. Precauciones y Trampas Operativas

- **Sobrecarga de Falsos Positivos:** Un sensor IPS con firmas mal calibradas puede bloquear tráfico comercial legítimo, causando denegaciones de servicio autoinducidas. Las reglas deben probarse primero en modo alerta (*Alert-Only*) antes de pasar a modo bloqueo (*Drop*).
- **Agotamiento de Recursos de CPU y Memoria:** Motores de inspección con expresiones regulares (**PCRE**) complejas sin anclas de longitud pueden sufrir ataques de ReDoS (Denegación de Servicio por Expresiones Regulares), congelando el tráfico en el sensor.
`
      },
      {
        id: "u3-s3",
        title: "Sesión 3.3: Redes Privadas Virtuales (VPN) y Protocolo IPSec",
        topics: [
          "Glosario de VPNs y Criptografía de Túnel",
          "Arquitectura del Framework IPSec (RFC 4301): Protocolos AH (RFC 4302) y ESP (RFC 4303)",
          "Modos de Operación IPSec: Modo Transporte vs Modo Túnel",
          "Intercambio de Claves IKE (Internet Key Exchange): Comparativa IKEv1 vs IKEv2",
          "Fases de Negociación: Fase 1 (IKE SA / ISAKMP) y Fase 2 (IPSec SA / Quick Mode)",
          "Configuración Práctica de Túnel IPsec Site-to-Site en Cisco IOS CLI"
        ],
        content: `
### 1. Glosario Técnico de VPNs e IPSec

| Término | Definición Sencilla | Analogía / Ejemplo Práctico |
| :--- | :--- | :--- |
| **VPN (Virtual Private Network)** | Conexión cifrada segura que permite a dos redes o a un usuario remoto comunicarse a través de Internet pública como si estuvieran en la misma oficina local. | Un túnel subterráneo privado blindado construido por debajo de una autopista pública congestionada y llena de mirones. |
| **IKE (Internet Key Exchange)** | Protocolo que negocia de forma automática y segura qué algoritmos de cifrado y claves secretas usarán ambos extremos de la VPN. | Una reunión privada inicial entre dos embajadores para acordar el código secreto que usarán en sus futuras cartas. |
| **Diffie-Hellman (DH)** | Algoritmo matemático revolucionario que permite a dos desconocidos acordar una clave secreta a través de un canal público sin que nadie que espíe la conversación pueda deducir la clave. | Mezclar botes de pintura pública de colores hasta obtener un tono idéntico que solo los dos conocen y nadie puede separar. |
| **ESP vs AH** | ESP es el protocolo que **cifra los datos y los autentica**; AH solo **autentica pero NO cifra** (los datos viajan legibles). | ESP es una caja fuerte blindada y opaca; AH es una caja de cristal transparente sellada con cera notarial irrompible. |
| **MTU y MSS** | MTU (Maximum Transmission Unit) es el tamaño máximo de paquete (usualmente 1500 bytes). Al cifrar con VPN se agregan cabeceras extra, requiriendo ajustar el MSS para evitar fragmentación. | Enviar una encomienda en una caja del tamaño exacto del camión: si le pones cinta de embalaje extra gruesa, ya no entra en la puerta y tienes que partirla en dos paquetes más lentos. |

---

### 2. Framework IPSec (RFC 4301) y Protocolos de Seguridad

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

### 3. Negociación IKEv1 vs IKEv2 y Fases del Túnel

| Fase de Negociación | IKEv1 (RFC 2409) | IKEv2 (RFC 7296) | Propósito Criptográfico |
| :--- | :--- | :--- | :--- |
| **Fase 1 (IKE SA)** | 6 paquetes (Main Mode) o 3 paquetes (Aggressive Mode) | 4 paquetes (IKE_SA_INIT / IKE_AUTH) | Autenticación mutua de los peers y creación de un canal seguro protegido por Diffie-Hellman |
| **Fase 2 (IPSec SA)** | 3 paquetes (Quick Mode) | 2 paquetes (CREATE_CHILD_SA) | Negociación del Transform-Set (algoritmo de cifrado y hash), lifetimes y selectores de tráfico |
| **Soporte NAT-T** | Requiere extensión RFC 3947 (UDP 4500) | Integrado de forma nativa en el estándar | Encapsula paquetes ESP en UDP 4500 para atravesar routers NAT |
| **Movilidad (MOBIKE)** | No soportado | Soportado nativamente | Permite a clientes VPN cambiar de IP (ej. Wi-Fi a 4G) sin renegociar el túnel |

---

### 4. Configuración de Túnel IPsec Site-to-Site en Cisco IOS CLI

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

### 5. Precauciones y Trampas Operativas

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
          "Glosario de Criptografía y Criptoanálisis",
          "Fundamentos de Criptoanálisis (Ataques de Texto Claro Conocido, Cumpleaños, Canal Lateral)",
          "Modelos Matemáticos de Entropía de Shannon en Generadores de Números Pseudoaleatorios (CSPRNG)",
          "Infraestructura de Clave Pública (PKI): Jerarquía de CAs, CRLs, OCSP y OCSP Stapling",
          "Gestión del Ciclo de Vida de Claves Criptográficas (NIST SP 800-57)",
          "Criptografía Post-Cuántica (PQC): Algoritmos Estandarizados por el NIST (ML-KEM, ML-DSA)"
        ],
        content: `
### 1. Glosario Técnico de Criptografía y Criptoanálisis

| Término | Definición Sencilla | Analogía / Ejemplo Práctico |
| :--- | :--- | :--- |
| **Criptoanálisis** | La ciencia y arte de descifrar mensajes secretos o romper algoritmos de cifrado sin conocer la clave secreta original. | El trabajo de los descifradores de códigos como Alan Turing en la Segunda Guerra Mundial rompiendo la máquina Enigma. |
| **Entropía (en Ciberseguridad)** | Medida de la aleatoriedad, desorden e impredecibilidad de una clave o generador de números. A mayor entropía, más difícil es adivinar la clave. | Lanzar una moneda al aire 100 veces al azar vs repetir siempre la misma secuencia predecible "123456". |
| **CSPRNG** | Cryptographically Secure Pseudo-Random Number Generator: generador de números aleatorios seguro alimentado por ruido físico del hardware. | Una tómbola de lotería auditada con pelotas rebotando caóticamente vs un programa de computadora básico que siempre repite los mismos números. |
| **Ataque de Canal Lateral** | Ataque que no ataca la matemática del cifrado sino que mide fenómenos físicos del chip: consumo eléctrico, calor o microsegundos de tiempo de cálculo. | Averiguar la combinación de una caja fuerte escuchando con un estetoscopio el sonido del mecanismo al girar la perilla. |
| **Computación Cuántica y Algoritmo de Shor** | Nuevas computadoras basadas en física cuántica que podrán resolver en minutos los problemas matemáticos que protegen a RSA y ECC. | Una superllave capaz de probar billones de combinaciones simultáneas en un instante. |

---

### 2. Modelos de Entropía y Fundamentos de Criptoanálisis

La fortaleza de cualquier algoritmo criptográfico moderno reside en la aleatoriedad y entropía de sus claves.

#### Entropía de la Información (Shannon):
$$H(X) = -\\sum_{i=1}^{n} P(x_i) \\log_2 P(x_i)$$

- Una fuente criptográficamente segura debe aproximarse a una **entropía de 1 bit por bit**, lo que significa que cada valor tiene una probabilidad uniforme e impredecible.
- Los sistemas operativos modernos obtienen entropía de fuentes físicas de hardware (interrupciones de disco, fluctuaciones térmicas, temporizadores de CPU) mediante **CSPRNGs** (\`/dev/urandom\`, Windows CNG \`BCryptGenRandom\`).

---

### 3. Tipos Fundamentales de Ataques Criptoanalíticos

1. **Ataque de Texto Cifrado Únicamente (Ciphertext-Only):** El atacante solo tiene acceso a mensajes cifrados e intenta deducir la clave mediante análisis estadístico de frecuencias.
2. **Ataque de Texto Claro Conocido (Known-Plaintext):** El atacante posee muestras de texto claro y sus correspondientes textos cifrados.
3. **Ataques de Canal Lateral (Side-Channel Attacks):** Explotación de emanaciones físicas del hardware durante el descifrado: variaciones en el consumo de energía (DPA), radiación electromagnética o tiempos de ejecución de instrucciones (**Timing Attacks**).
4. **Paradoja del Cumpleaños (Birthday Attack):** Explota la probabilidad de colisión en funciones hash. Para un hash de $n$ bits, se requieren solo $2^{n/2}$ operaciones para encontrar una colisión (ej. MD5 con 128 bits se rompe con $2^{64}$ operaciones).

---

### 4. Infraestructura de Clave Pública (PKI) y Validación de Certificados

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

### 5. Criptografía Post-Cuántica (PQC)

Con el advenimiento de las computadoras cuánticas a gran escala, el **Algoritmo de Shor** romperá la criptografía asimétrica actual basada en factorización de enteros y logaritmos discretos (**RSA, ECC, Diffie-Hellman**). El NIST ha estandarizado los algoritmos resistentes a ataques cuánticos:

- **ML-KEM (FIPS 203 / Kyber):** Algoritmo de encapsulamiento de claves basado en retículos (*Module Lattice*).
- **ML-DSA (FIPS 204 / Dilithium):** Algoritmo de firma digital post-cuántica.
- **SLH-DSA (FIPS 205 / SPHINCS+):** Firmas basadas en árboles de Merkle sin estructura de retículos.

---

### 6. Precauciones y Trampas Operativas

- **Uso de Generadores de Números Aleatorios no Seguros:** Utilizar funciones estándar como \`Math.random()\` en JavaScript o \`rand()\` en C para generar tokens de sesión, nonces o claves criptográficas permite predecir los valores y comprometer la seguridad. Debe utilizarse siempre \`crypto.getRandomValues()\`.
- **Ignorar el Anclaje de Certificados Raíz (Root CA):** Mantener la CA Raíz de la empresa conectada a la red en lugar de conservarla **offline** en una bóveda segura expone a toda la organización a que un atacante emita certificados válidos para cualquier dominio.
`
      },
      {
        id: "u4-s2",
        title: "Sesión 4.2: Hardening Empresarial de Infraestructura de Red y Servidores",
        topics: [
          "Glosario de Hardening y Bastionado de Sistemas",
          "Metodología de Hardening basada en Guías CIS Benchmarks y DISA STIGs",
          "Hardening de Plano de Control, Gestión y Datos en Equipos de Red (CoPP, SSHv2, AAA)",
          "Hardening de Servidores Linux y Windows (Kernel Sysctl, SELinux, Directivas GPO)",
          "Gestión de Vulnerabilidades y Ciclos de Parcheo Automatizado",
          "Auditoría Automatizada de Seguridad con Lynis y OpenSCAP"
        ],
        content: `
### 1. Glosario Técnico de Hardening y Bastionado

| Término | Definición Sencilla | Analogía / Ejemplo Práctico |
| :--- | :--- | :--- |
| **Hardening (Endurecimiento)** | Proceso de reforzar la seguridad de un servidor o switch deshabilitando servicios innecesarios, cerrando puertos no usados y aplicando configuraciones seguras. | Instalar cerraduras de alta seguridad, rejas, alarmas y cerrar todas las ventanas no usadas en un edificio. |
| **Superficie de Ataque** | La suma de todos los puntos vulnerables por donde un atacante podría intentar entrar a un sistema (puertos abiertos, servicios activos, usuarios sin clave). | El número de puertas, ventanas y tragaluces que tiene una casa: cuantas menos aberturas tenga, más fácil es vigilarla. |
| **CIS Benchmarks** | Guías y normas técnicas internacionales creadas por expertos globales con listas de verificación exactas para configurar servidores de forma segura. | El manual oficial de inspección técnica vehicular de aviación civil que garantiza que el avión esté 100% seguro para despegar. |
| **Kernel Sysctl** | Archivo de configuración en Linux (\`/etc/sysctl.conf\`) que permite modificar parámetros profundos del núcleo del sistema operativo para bloquear ataques de red. | La perilla de ajuste de la computadora central de un auto para limitar la velocidad o activar el frenado automático de emergencia. |
| **CoPP (Control Plane Policing)** | Función de seguridad en routers que protege el procesador central (CPU) contra ataques de saturación de paquetes de red. | El guardaespaldas que frena a la multitud de fanáticos para que el presidente pueda concentrarse en tomar decisiones importantes. |

---

### 2. Metodología de Hardening de Infraestructura: Los Tres Planos

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
          "Glosario de Respuesta ante Incidentes y Forense Digital",
          "Fases del Ciclo de Vida de Respuesta ante Incidentes (NIST SP 800-61 Rev. 2 e ISO/IEC 27035)",
          "Framework MITRE ATT&CK: Tácticas, Técnicas y Procedimientos (TTPs)",
          "Ciberinteligencia de Amenazas (CTI) y Modelos de Compartición (STIX/TAXII, MISP)",
          "Cadena de Custodia y Preservación de Evidencia Digital Forense",
          "Caso de Estudio: El Ciberataque a SolarWinds Orion (2020) y Respuesta CSIRT"
        ],
        content: `
### 1. Glosario Técnico de Respuesta ante Incidentes y Análisis Forense

| Término | Definición Sencilla | Analogía / Ejemplo Práctico |
| :--- | :--- | :--- |
| **CSIRT / SOC** | CSIRT es el equipo de respuesta a emergencias cibernéticas; SOC es el centro de monitoreo 24/7 que vigila las alertas de seguridad en tiempo real. | El SOC es la central de monitoreo de cámaras de la ciudad; el CSIRT son los bomberos y paramédicos que acuden al rescate cuando ocurre un incendio. |
| **Cadena de Custodia** | Registro legal cronológico y minucioso que documenta quién recolectó, custodió y analizó una prueba digital para garantizar que no fue alterada. | El precinto policial sellado y firmado que asegura que el arma encontrada en la escena del crimen no fue manipulada antes del juicio. |
| **Orden de Volatilidad (RFC 3227)** | Principio forense que establece que se deben recolectar primero las evidencias que desaparecen al apagar la computadora (memoria RAM, conexiones de red) antes que los discos duros. | Fotografiar y preservar el hielo derretido o las huellas en la nieve antes de que salga el sol y se evaporen. |
| **MITRE ATT&CK** | Base de conocimiento global estructurada en una matriz que clasifica exactamente cómo operan los cibercriminales paso a paso (Tácticas y Técnicas). | El manual enciclopédico de modus operandi de todas las bandas criminales conocidas. |
| **CTI (Cyber Threat Intelligence)** | Información procesada y analizada sobre amenazas actuales, actores maliciosos y direcciones IP atacantes para prevenir incidentes. | Los informes de inteligencia militar sobre los movimientos y tácticas del ejército adversario. |

---

### 2. Ciclo de Vida de Respuesta ante Incidentes (NIST SP 800-61 Rev. 2)

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

### 3. Marco MITRE ATT&CK para Ciberinteligencia y Threat Hunting

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

### 4. Caso de Estudio: El Ciberataque a la Cadena de Suministro de SolarWinds (2020)

- **Vector de Ataque:** Inserción de un backdoor sofisticado (**SUNBURST**) en las actualizaciones de software legítimas de la plataforma de monitoreo SolarWinds Orion.
- **Evasión Avanzada:** El malware permanecía en reposo durante dos semanas antes de contactar a su C2 mediante dominios que simulaban ser tráfico legítimo de Amazon Web Services.
- **Impacto:** Compromiso de múltiples agencias gubernamentales de EE.UU., empresas de ciberseguridad y corporaciones multinacionales.
- **Respuesta de la Industria:** Revisión integral de la seguridad en la cadena de suministro de software (**SBOM - Software Bill of Materials**) y adopción acelerada del modelo Zero Trust.

---

### 5. Preservación de Evidencia Digital Forense y Cadena de Custodia

Para que la evidencia digital sea admisible en procesos judiciales, se debe garantizar el principio de **Orden de Volatilidad (RFC 3227)**:

1. **Registros y Caché de CPU, Registros de Memoria.**
2. **Memoria Principal (RAM):** Volcado de memoria en vivo con herramientas forenses (**LiME en Linux, WinPmem en Windows**) antes de apagar o reiniciar el host.
3. **Estado de Conexiones de Red y Procesos en Ejecución.**
4. **Almacenamiento Secundario (Discos Duros, SSDs):** Creación de una imagen forense bit a bit (*E01 o RAW/DD*) con verificación de hash SHA-256 antes y después de la copia.
5. **Medios de Respaldo y Registros de Auditoría Remotos (SIEM).**

---

### 6. Herramientas Prácticas de Análisis Forense

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
