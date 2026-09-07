/**
 * Practical Hands-On Labs Knowledge Base
 * Detailed step-by-step guides for Cisco Packet Tracer, FreeRADIUS, Snort, and Wireshark
 */

window.LABS_DATA = [
  {
    id: "lab-aaa-cisco",
    title: "Lab 1: Implementación de AAA RADIUS & TACACS+ en Cisco IOS / Packet Tracer",
    unit: "Unidad 2",
    duration: "45 mins",
    difficulty: "Intermedio",
    topology: "PC-Admin (192.168.1.10) --- Switch (L2) --- Router Cisco 2911 (192.168.1.1 / 192.168.2.1) --- Servidor AAA (192.168.2.100)",
    objectives: [
      "Configurar el Servidor AAA en Cisco Packet Tracer con servicios RADIUS y TACACS+.",
      "Habilitar 'aaa new-model' en el Router Cisco.",
      "Configurar autenticación de acceso administrativo con respaldo a base de datos local (Fallback).",
      "Validar el proceso de autenticación remota desde la PC del administrador mediante SSH/Telnet."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Configuración del Servidor AAA en Packet Tracer",
        instructions: "1. En Packet Tracer, hacer clic en el 'AAA-Server' > Pestaña 'Services' > 'AAA'.\n2. Activar el servicio (seleccionar 'On').\n3. En la sección 'Client Network Configuration':\n   - Client Name: Router-Core\n   - Client IP: 192.168.2.1\n   - Secret: CiscoRadius2026!\n   - Server Type: RADIUS (o TACACS+)\n   - Clic en 'Add'.\n4. En la sección 'User Setup':\n   - User: netadmin\n   - Password: SuperSecretNetAdmin2026!\n   - Clic en 'Add'."
      },
      {
        stepNumber: 2,
        title: "Configuración de Direccionamiento IP y Enrutamiento en el Router",
        instructions: "Configurar las interfaces de red para garantizar conectividad ICMP bidireccional entre el Router, PC y Servidor AAA.",
        codeSnippet: `Router> enable
Router# configure terminal
Router(config)# hostname R1-CORE

! Interfaz hacia la red de Administración (LAN)
R1-CORE(config)# interface GigabitEthernet0/0
R1-CORE(config-if)# ip address 192.168.1.1 255.255.255.0
R1-CORE(config-if)# no shutdown
R1-CORE(config-if)# exit

! Interfaz hacia el Servidor AAA
R1-CORE(config)# interface GigabitEthernet0/1
R1-CORE(config-if)# ip address 192.168.2.1 255.255.255.0
R1-CORE(config-if)# no shutdown
R1-CORE(config-if)# exit`
      },
      {
        stepNumber: 3,
        title: "Habilitación y Configuración del Framework AAA en Cisco IOS",
        instructions: "Crear el usuario local de emergencia, habilitar AAA y vincular el servidor RADIUS/TACACS+.",
        codeSnippet: `! 1. Crear usuario local de contingencia
R1-CORE(config)# username localbackup privilege 15 secret EmergencyPass911!

! 2. Habilitar el modelo AAA
R1-CORE(config)# aaa new-model

! 3. Configurar el servidor RADIUS
R1-CORE(config)# radius-server host 192.168.2.100 auth-port 1812 acct-port 1813 key CiscoRadius2026!

! 4. Crear la lista de métodos de autenticación de login por defecto
! Regla: Consultar primero RADIUS; si el servidor está caído, usar base local
R1-CORE(config)# aaa authentication login default group radius local

! 5. Habilitar autorización EXEC
R1-CORE(config)# aaa authorization exec default group radius local

! 6. Aplicar la política a las líneas VTY y consola
R1-CORE(config)# line vty 0 4
R1-CORE(config-line)# login authentication default
R1-CORE(config-line)# transport input ssh
R1-CORE(config-line)# exit

R1-CORE(config)# line console 0
R1-CORE(config-line)# login authentication default
R1-CORE(config-line)# exit`
      },
      {
        stepNumber: 4,
        title: "Verificación y Pruebas de Acceso",
        instructions: "Desde la PC del administrador, abrir el Command Prompt y conectarse vía SSH:\n\`ssh -l netadmin 192.168.1.1\`\nIngresar la contraseña 'SuperSecretNetAdmin2026!'. El acceso debe ser concedido y validado contra el servidor RADIUS.",
        codeSnippet: `! En el Router, validar estadísticas AAA:
R1-CORE# show aaa servers
R1-CORE# show running-config | section aaa`
      }
    ]
  },

  {
    id: "lab-wireshark-radius",
    title: "Lab 2: Análisis Forense de Paquetes RADIUS vs TACACS+ en Wireshark",
    unit: "Unidad 2",
    duration: "30 mins",
    difficulty: "Avanzado",
    topology: "Captura de tráfico pcap sobre interfaz eth0 entre NAS (192.168.1.1) y AAA Server (192.168.2.100)",
    objectives: [
      "Identificar la estructura de cabecera de datagramas RADIUS (UDP 1812) y TACACS+ (TCP 49).",
      "Analizar la vulnerabilidad de texto plano en atributos RADIUS y verificar el cifrado MD5 de contraseñas.",
      "Comparar la visibilidad de comandos y respuestas en capturas de TACACS+ cifrado."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Filtros de Captura y Visualización en Wireshark",
        instructions: "Aplicar los siguientes filtros en la barra de visualización de Wireshark:\n- \`radius\` o \`udp.port == 1812 || udp.port == 1813\`\n- \`tacacs\` o \`tcp.port == 49\`",
        codeSnippet: `# Filtro Wireshark para ver solo solicitudes de acceso RADIUS:
radius.code == 1

# Filtro para ver respuestas Access-Accept:
radius.code == 2

# Filtro para ver solicitudes Accounting:
radius.code == 4`
      },
      {
        stepNumber: 2,
        title: "Inspección de Atributos RADIUS (AVPs)",
        instructions: "Al expandir el paquete RADIUS en el árbol de paquetes, observar:\n1. **Code:** 1 (Access-Request)\n2. **Identifier:** Número correlativo de 1 byte.\n3. **Authenticator:** Cadena pseudoaleatoria de 16 bytes (Request Authenticator).\n4. **Attribute: User-Name (Type 1):** Visible en texto claro ('netadmin').\n5. **Attribute: User-Password (Type 2):** Cifrado mediante XOR con Hash MD5 (Shared Secret + Request Authenticator)."
      },
      {
        stepNumber: 3,
        title: "Inspección de TACACS+ Encrypted Body",
        instructions: "Al examinar un paquete TACACS+ (TCP 49):\n1. Cabecera fija de 12 bytes visible: \`Major/Minor Version\`, \`Type\` (Authentication, Authorization, Accounting), \`Flags\` (0x01 = Encrypted).\n2. El campo **Encrypted Data**: Todos los datos (usuario, contraseña y comandos) están completamente ofuscados con la clave compartida TACACS+, impidiendo la lectura a analistas no autorizados."
      }
    ]
  },

  {
    id: "lab-ipsec-s2s",
    title: "Lab 3: Despliegue de Túnel VPN IPSec IKEv2 Sitio a Sitio",
    unit: "Unidad 4",
    duration: "60 mins",
    difficulty: "Avanzado",
    topology: "LAN-SedeA (192.168.10.0/24) --- R1-SedeA (WAN: 200.1.1.1) <== INTERNET ==> (WAN: 200.2.2.2) R2-SedeB --- LAN-SedeB (192.168.20.0/24)",
    objectives: [
      "Configurar la política IKEv2 con cifrado AES-GCM-256 en ambos routers.",
      "Configurar autenticación mutua mediante claves precompartidas (PSK).",
      "Definir el Transform Set y Crypto Map para cifrar el tráfico interesante entre subredes privadas.",
      "Comprobar el túnel mediante 'show crypto ikev2 sa' y 'show crypto ipsec sa'."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Configuración en R1 (Sede A)",
        instructions: "Ejecutar la configuración de IKEv2 y Crypto Map en R1:",
        codeSnippet: `! Fase 1: IKEv2
crypto ikev2 proposal PROP_IKEV2
 encryption aes-gcm-256
 prf sha384
 group 19
exit

crypto ikev2 policy POL_IKEV2
 proposal PROP_IKEV2
exit

crypto ikev2 keyring KR_SEDE_B
 peer R2_SEDE_B
  address 200.2.2.2
  pre-shared-key local CiscoIPSecKey2026!
  pre-shared-key remote CiscoIPSecKey2026!
 exit
exit

crypto ikev2 profile PROF_IKEV2
 match identity remote address 200.2.2.2 255.255.255.255
 identity local address 200.1.1.1
 authentication remote pre-share
 authentication local pre-share
 keyring local KR_SEDE_B
exit

! Fase 2: IPSec Data
crypto ipsec transform-set TS_ESP esp-gcm 256
exit

ip access-list extended ACL_VPN_INTERESTING
 permit ip 192.168.10.0 0.0.0.255 192.168.20.0 0.0.0.255
exit

crypto map CMAP_VPN 10 ipsec-isakmp
 set peer 200.2.2.2
 set transform-set TS_ESP
 set ikev2-profile PROF_IKEV2
 match address ACL_VPN_INTERESTING
exit

interface GigabitEthernet0/0
 crypto map CMAP_VPN
exit`
      },
      {
        stepNumber: 2,
        title: "Verificación del Estado del Túnel IPSec",
        instructions: "Enviar tráfico desde una PC en la LAN A (192.168.10.10) hacia una PC en la LAN B (192.168.20.10) mediante `ping 192.168.20.10` y ejecutar:",
        codeSnippet: `R1# show crypto ikev2 sa
! Debe mostrar el estado de la SA IKEv2 como 'READY' o 'ESTABLISHED'

R1# show crypto ipsec sa
! Verificar los contadores de paquetes cifrados y descifrados:
! #pkts encaps: 100, #pkts encrypt: 100, #pkts digest: 100
! #pkts decaps: 100, #pkts decrypt: 100, #pkts verify: 100`
      }
    ]
  },
  {
    id: "lab-port-security-lan",
    title: "Lab 4: Mitigación de Ataques Capa 2 con Port Security, DHCP Snooping y DAI",
    unit: "Unidad 3",
    duration: "40 mins",
    difficulty: "Avanzado",
    topology: "PC1 (VLAN 10) --- Switch Catalyst 2960 (SW-Access) --- Router Core / DHCP Server (192.168.10.1)",
    objectives: [
      "Configurar Port Security con sticky MAC y acción de violación restrict/shutdown.",
      "Habilitar DHCP Snooping globalmente y en VLAN 10 para mitigar Rogue DHCP Servers.",
      "Configurar Dynamic ARP Inspection (DAI) para neutralizar ataques ARP Cache Poisoning (Man-in-the-Middle)."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Endurecimiento de Puertos de Acceso con Port Security",
        instructions: "Restringir el acceso a un máximo de 2 direcciones MAC por puerto y aplicar persistencia sticky:",
        codeSnippet: `SW-Access(config)# interface range FastEthernet 0/1 - 10
SW-Access(config-if-range)# switchport mode access
SW-Access(config-if-range)# switchport access vlan 10
SW-Access(config-if-range)# switchport port-security
SW-Access(config-if-range)# switchport port-security maximum 2
SW-Access(config-if-range)# switchport port-security mac-address sticky
SW-Access(config-if-range)# switchport port-security violation restrict
SW-Access(config-if-range)# exit`
      },
      {
        stepNumber: 2,
        title: "Configuración de DHCP Snooping e Inspección Dinámica de ARP (DAI)",
        instructions: "Activar DHCP Snooping en el Switch y marcar el puerto troncal hacia el Router como confiable (trust):",
        codeSnippet: `SW-Access(config)# ip dhcp snooping
SW-Access(config)# ip dhcp snooping vlan 10
SW-Access(config)# interface GigabitEthernet 0/1
SW-Access(config-if)# ip dhcp snooping trust
SW-Access(config-if)# exit

! Habilitar Dynamic ARP Inspection (DAI)
SW-Access(config)# ip arp inspection vlan 10
SW-Access(config)# interface GigabitEthernet 0/1
SW-Access(config-if)# ip arp inspection trust
SW-Access(config-if)# exit`
      }
    ]
  }
];

