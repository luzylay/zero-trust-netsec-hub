/**
 * Visual Vector Architecture & Flow Diagrams Engine
 * Renders rich, high-resolution, responsive, zero-cost SVG diagrams
 * instantaneously without runtime compilation delays or external dependencies.
 * Strictly zero emojis, 100% pure client-side.
 */

class VisualDiagramsEngine {
  static getDiagramSvg(type) {
    const diagrams = {
      'botnet_topologies': `
        <svg viewBox="0 0 900 360" class="diagram-vector-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00f5ff" stop-opacity="0.9"/>
              <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.9"/>
            </linearGradient>
            <linearGradient id="grad-rose" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.9"/>
              <stop offset="100%" stop-color="#e11d48" stop-opacity="0.9"/>
            </linearGradient>
            <linearGradient id="grad-violet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.9"/>
              <stop offset="100%" stop-color="#6366f1" stop-opacity="0.9"/>
            </linearGradient>
            <linearGradient id="grad-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#10b981" stop-opacity="0.9"/>
              <stop offset="100%" stop-color="#059669" stop-opacity="0.9"/>
            </linearGradient>
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#00f5ff"/>
            </marker>
            <marker id="arrow-rose" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#f43f5e"/>
            </marker>
            <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981"/>
            </marker>
          </defs>

          <!-- Background Canvas -->
          <rect width="900" height="360" rx="12" fill="#090d16" stroke="rgba(0, 245, 255, 0.25)" stroke-width="1.5"/>

          <!-- Grid Lines Blueprint -->
          <path d="M 450 20 L 450 340" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" stroke-dasharray="4 4"/>

          <!-- LEFT COLUMN: ARQUITECTURA CENTRALIZADA -->
          <text x="225" y="38" fill="#38bdf8" font-size="14" font-weight="700" text-anchor="middle" letter-spacing="1">1. ARQUITECTURA CENTRALIZADA (HTTP/C2)</text>
          <rect x="50" y="55" width="350" height="280" rx="8" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(56, 189, 248, 0.3)" stroke-width="1"/>

          <!-- Botmaster Node -->
          <rect x="150" y="75" width="150" height="40" rx="6" fill="url(#grad-rose)" filter="url(#glow-cyan)"/>
          <text x="225" y="100" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Botmaster (Atacante)</text>

          <!-- Central C2 Server -->
          <rect x="140" y="150" width="170" height="45" rx="6" fill="url(#grad-violet)"/>
          <text x="225" y="172" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Servidor C2 Central</text>
          <text x="225" y="188" fill="#e2e8f0" font-size="10" text-anchor="middle">Puerto TCP 443 / TLS</text>

          <!-- Bots Nodes -->
          <rect x="70" y="245" width="80" height="35" rx="5" fill="rgba(255,255,255,0.06)" stroke="#f43f5e" stroke-width="1"/>
          <text x="110" y="267" fill="#cbd5e1" font-size="11" font-weight="600" text-anchor="middle">Bot 1</text>

          <rect x="185" y="245" width="80" height="35" rx="5" fill="rgba(255,255,255,0.06)" stroke="#f43f5e" stroke-width="1"/>
          <text x="225" y="267" fill="#cbd5e1" font-size="11" font-weight="600" text-anchor="middle">Bot 2</text>

          <rect x="300" y="245" width="80" height="35" rx="5" fill="rgba(255,255,255,0.06)" stroke="#f43f5e" stroke-width="1"/>
          <text x="340" y="267" fill="#cbd5e1" font-size="11" font-weight="600" text-anchor="middle">Bot 3</text>

          <!-- Flow Connectors Left -->
          <line x1="225" y1="115" x2="225" y2="148" stroke="#f43f5e" stroke-width="2" marker-end="url(#arrow-rose)"/>
          <line x1="200" y1="195" x2="120" y2="243" stroke="#8b5cf6" stroke-width="1.5" marker-end="url(#arrow)"/>
          <line x1="225" y1="195" x2="225" y2="243" stroke="#8b5cf6" stroke-width="1.5" marker-end="url(#arrow)"/>
          <line x1="250" y1="195" x2="330" y2="243" stroke="#8b5cf6" stroke-width="1.5" marker-end="url(#arrow)"/>

          <rect x="100" y="298" width="250" height="22" rx="4" fill="rgba(244, 63, 94, 0.15)" stroke="rgba(244, 63, 94, 0.3)"/>
          <text x="225" y="313" fill="#f43f5e" font-size="10" font-weight="600" text-anchor="middle">Vulnerable a DNS Sinkholing (Punto Unico de Fallo)</text>

          <!-- RIGHT COLUMN: ARQUITECTURA P2P DESCENTRALIZADA -->
          <text x="675" y="38" fill="#10b981" font-size="14" font-weight="700" text-anchor="middle" letter-spacing="1">2. ARQUITECTURA P2P (PEER-TO-PEER)</text>
          <rect x="500" y="55" width="350" height="280" rx="8" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(16, 185, 129, 0.3)" stroke-width="1"/>

          <!-- Botmaster Left -->
          <rect x="600" y="75" width="150" height="40" rx="6" fill="url(#grad-rose)"/>
          <text x="675" y="100" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Botmaster (Firma RSA)</text>

          <!-- Mesh Nodes -->
          <circle cx="580" cy="170" r="30" fill="url(#grad-emerald)"/>
          <text x="580" y="174" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle">Nodo A</text>

          <circle cx="770" cy="170" r="30" fill="url(#grad-emerald)"/>
          <text x="770" y="174" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle">Nodo B</text>

          <circle cx="600" cy="260" r="30" fill="url(#grad-emerald)"/>
          <text x="600" y="264" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle">Nodo C</text>

          <circle cx="750" cy="260" r="30" fill="url(#grad-emerald)"/>
          <text x="750" y="264" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle">Nodo D</text>

          <!-- Mesh Links -->
          <line x1="675" y1="115" x2="600" y2="148" stroke="#f43f5e" stroke-width="2" marker-end="url(#arrow-rose)"/>
          <line x1="610" y1="170" x2="740" y2="170" stroke="#10b981" stroke-width="2"/>
          <line x1="580" y1="200" x2="595" y2="230" stroke="#10b981" stroke-width="2"/>
          <line x1="770" y1="200" x2="755" y2="230" stroke="#10b981" stroke-width="2"/>
          <line x1="630" y1="260" x2="720" y2="260" stroke="#10b981" stroke-width="2"/>
          <line x1="600" y1="190" x2="730" y2="245" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 3"/>

          <rect x="550" y="302" width="250" height="22" rx="4" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.3)"/>
          <text x="675" y="317" fill="#10b981" font-size="10" font-weight="600" text-anchor="middle">Alta Resiliencia: Sin Servidor Central</text>
        </svg>
      `,

      'arp_poisoning_flow': `
        <svg viewBox="0 0 900 380" class="diagram-vector-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad-card-bg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0f172a"/>
              <stop offset="100%" stop-color="#090d16"/>
            </linearGradient>
            <marker id="arrow-cyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#00f5ff"/>
            </marker>
            <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#ef4444"/>
            </marker>
          </defs>

          <rect width="900" height="380" rx="12" fill="#090d16" stroke="rgba(0, 245, 255, 0.25)" stroke-width="1.5"/>

          <text x="450" y="34" fill="#00f5ff" font-size="14" font-weight="700" text-anchor="middle" letter-spacing="1">SECUENCIA DE ATAQUE MAN-IN-THE-MIDDLE POR ENVENENAMIENTO ARP (SPOOFING)</text>

          <!-- 3 ACTOR COLUMNS -->
          <!-- Victim -->
          <rect x="80" y="60" width="180" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="170" y="85" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">PC Víctima</text>
          <text x="170" y="105" fill="#38bdf8" font-size="11" font-family="monospace" text-anchor="middle">IP: 192.168.1.50 | MAC: AA:AA</text>
          <line x1="170" y1="120" x2="170" y2="350" stroke="#334155" stroke-width="2" stroke-dasharray="4 4"/>

          <!-- Attacker -->
          <rect x="360" y="60" width="180" height="60" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
          <text x="450" y="85" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Atacante MITM</text>
          <text x="450" y="105" fill="#ef4444" font-size="11" font-family="monospace" text-anchor="middle">IP: 192.168.1.100 | MAC: BB:BB</text>
          <line x1="450" y1="120" x2="450" y2="350" stroke="#334155" stroke-width="2" stroke-dasharray="4 4"/>

          <!-- Gateway -->
          <rect x="640" y="60" width="180" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
          <text x="730" y="85" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Router Gateway</text>
          <text x="730" y="105" fill="#10b981" font-size="11" font-family="monospace" text-anchor="middle">IP: 192.168.1.1 | MAC: CC:CC</text>
          <line x1="730" y1="120" x2="730" y2="350" stroke="#334155" stroke-width="2" stroke-dasharray="4 4"/>

          <!-- STEP 1: Fake ARP to Victim -->
          <line x1="450" y1="160" x2="178" y2="160" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow-red)"/>
          <rect x="200" y="142" width="220" height="22" rx="4" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444"/>
          <text x="310" y="157" fill="#fca5a5" font-size="10" font-weight="600" text-anchor="middle">1. Gratuitous ARP: 192.168.1.1 es MAC BB:BB</text>

          <!-- STEP 2: Fake ARP to Gateway -->
          <line x1="450" y1="205" x2="722" y2="205" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow-red)"/>
          <rect x="480" y="187" width="225" height="22" rx="4" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444"/>
          <text x="592" y="202" fill="#fca5a5" font-size="10" font-weight="600" text-anchor="middle">2. Gratuitous ARP: 192.168.1.50 es MAC BB:BB</text>

          <!-- STEP 3: Intercepted Outbound Traffic -->
          <line x1="170" y1="255" x2="442" y2="255" stroke="#00f5ff" stroke-width="2" marker-end="url(#arrow-cyan)"/>
          <rect x="200" y="238" width="220" height="22" rx="4" fill="rgba(0, 245, 255, 0.15)" stroke="#00f5ff"/>
          <text x="310" y="253" fill="#ffffff" font-size="10" font-weight="600" text-anchor="middle">3. Tráfico Víctima hacia Internet (Interceptado)</text>

          <!-- STEP 4: Relayed Traffic to Gateway -->
          <line x1="450" y1="295" x2="722" y2="295" stroke="#00f5ff" stroke-width="2" marker-end="url(#arrow-cyan)"/>
          <rect x="480" y="278" width="225" height="22" rx="4" fill="rgba(0, 245, 255, 0.15)" stroke="#00f5ff"/>
          <text x="592" y="293" fill="#ffffff" font-size="10" font-weight="600" text-anchor="middle">4. Reenvío Silencioso (Man-in-the-Middle)</text>

          <!-- Bottom Defense Badge -->
          <rect x="250" y="335" width="400" height="26" rx="5" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981"/>
          <text x="450" y="352" fill="#10b981" font-size="11" font-weight="700" text-anchor="middle">Mitigación Obligatoria: Dynamic ARP Inspection (DAI) + DHCP Snooping</text>
        </svg>
      `,

      'kerberos_flow': `
        <svg viewBox="0 0 900 400" class="diagram-vector-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-v" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#6366f1"/>
            </marker>
            <marker id="arrow-emerald-k" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981"/>
            </marker>
          </defs>

          <rect width="900" height="400" rx="12" fill="#090d16" stroke="rgba(99, 102, 241, 0.35)" stroke-width="1.5"/>
          <text x="450" y="32" fill="#a5b4fc" font-size="14" font-weight="700" text-anchor="middle" letter-spacing="1">FLUJO DE AUTENTICACION KERBEROS V5 (RFC 4120)</text>

          <!-- 4 COLUMNS -->
          <!-- Client -->
          <rect x="50" y="55" width="160" height="45" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="130" y="82" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Cliente (Usuario)</text>
          <line x1="130" y1="100" x2="130" y2="380" stroke="#334155" stroke-width="1.5" stroke-dasharray="3 3"/>

          <!-- KDC AS -->
          <rect x="270" y="55" width="160" height="45" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/>
          <text x="350" y="75" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">KDC: AS</text>
          <text x="350" y="90" fill="#a5b4fc" font-size="10" text-anchor="middle">(Authentication Server)</text>
          <line x1="350" y1="100" x2="350" y2="380" stroke="#334155" stroke-width="1.5" stroke-dasharray="3 3"/>

          <!-- KDC TGS -->
          <rect x="490" y="55" width="160" height="45" rx="6" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/>
          <text x="570" y="75" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">KDC: TGS</text>
          <text x="570" y="90" fill="#c4b5fd" font-size="10" text-anchor="middle">(Ticket Granting Server)</text>
          <line x1="570" y1="100" x2="570" y2="380" stroke="#334155" stroke-width="1.5" stroke-dasharray="3 3"/>

          <!-- Service Server -->
          <rect x="710" y="55" width="150" height="45" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
          <text x="785" y="75" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Servidor de Servicio</text>
          <text x="785" y="90" fill="#6ee7b7" font-size="10" text-anchor="middle">(SQL / File Server / HTTP)</text>
          <line x1="785" y1="100" x2="785" y2="380" stroke="#334155" stroke-width="1.5" stroke-dasharray="3 3"/>

          <!-- STEP 1: AS-REQ -->
          <line x1="130" y1="135" x2="342" y2="135" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow-cyan)"/>
          <text x="240" y="128" fill="#38bdf8" font-size="10" font-weight="600" text-anchor="middle">1. AS-REQ (Username + Timestamp)</text>

          <!-- STEP 2: AS-REP -->
          <line x1="350" y1="175" x2="138" y2="175" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow-v)"/>
          <text x="240" y="168" fill="#a5b4fc" font-size="10" font-weight="600" text-anchor="middle">2. AS-REP (Ticket TGT + Session Key)</text>

          <!-- STEP 3: TGS-REQ -->
          <line x1="130" y1="220" x2="562" y2="220" stroke="#8b5cf6" stroke-width="2" marker-end="url(#arrow-v)"/>
          <text x="350" y="213" fill="#c4b5fd" font-size="10" font-weight="600" text-anchor="middle">3. TGS-REQ (TGT + Authenticator + SPN)</text>

          <!-- STEP 4: TGS-REP -->
          <line x1="570" y1="260" x2="138" y2="260" stroke="#8b5cf6" stroke-width="2" marker-end="url(#arrow-v)"/>
          <text x="350" y="253" fill="#c4b5fd" font-size="10" font-weight="600" text-anchor="middle">4. TGS-REP (Service Ticket cifrado con clave de servicio)</text>

          <!-- STEP 5: AP-REQ -->
          <line x1="130" y1="305" x2="777" y2="305" stroke="#10b981" stroke-width="2" marker-end="url(#arrow-emerald-k)"/>
          <text x="450" y="298" fill="#6ee7b7" font-size="10" font-weight="600" text-anchor="middle">5. AP-REQ (Service Ticket presentado al Servidor)</text>

          <!-- STEP 6: AP-REP -->
          <line x1="785" y1="345" x2="138" y2="345" stroke="#10b981" stroke-width="2" marker-end="url(#arrow-emerald-k)"/>
          <text x="450" y="338" fill="#10b981" font-size="10" font-weight="600" text-anchor="middle">6. Acceso Concedido / Sesión Mutuamente Autenticada</text>
        </svg>
      `,

      'radius_flow': `
        <svg viewBox="0 0 900 320" class="diagram-vector-svg" xmlns="http://www.w3.org/2000/svg">
          <rect width="900" height="320" rx="12" fill="#090d16" stroke="rgba(0, 245, 255, 0.25)" stroke-width="1.5"/>
          <text x="450" y="32" fill="#00f5ff" font-size="14" font-weight="700" text-anchor="middle" letter-spacing="1">ARQUITECTURA DE CONTROL DE ACCESO 802.1X Y RADIUS (RFC 2865)</text>

          <!-- 4 COMPONENTS -->
          <!-- Supplicant -->
          <rect x="50" y="80" width="160" height="100" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="130" y="115" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Suplicante (Client)</text>
          <text x="130" y="135" fill="#94a3b8" font-size="10" text-anchor="middle">Laptop / Teléfono</text>
          <text x="130" y="155" fill="#38bdf8" font-size="10" font-family="monospace" text-anchor="middle">Software 802.1X</text>

          <!-- NAS -->
          <rect x="290" y="80" width="160" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/>
          <text x="370" y="115" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">NAS / Authenticator</text>
          <text x="370" y="135" fill="#94a3b8" font-size="10" text-anchor="middle">Switch Catalyst / AP Wi-Fi</text>
          <text x="370" y="155" fill="#a5b4fc" font-size="10" font-family="monospace" text-anchor="middle">Puerto Bloqueado</text>

          <!-- RADIUS Server -->
          <rect x="530" y="80" width="160" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
          <text x="610" y="115" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Servidor RADIUS</text>
          <text x="610" y="135" fill="#94a3b8" font-size="10" text-anchor="middle">FreeRADIUS / Cisco ISE</text>
          <text x="610" y="155" fill="#6ee7b7" font-size="10" font-family="monospace" text-anchor="middle">UDP 1812 / 1813</text>

          <!-- Directory -->
          <rect x="750" y="80" width="120" height="100" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="810" y="115" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Directorio</text>
          <text x="810" y="135" fill="#94a3b8" font-size="10" text-anchor="middle">LDAP / AD</text>
          <text x="810" y="155" fill="#fcd34d" font-size="10" font-family="monospace" text-anchor="middle">Base de Datos</text>

          <!-- ARROWS & PROTOCOL TAGS -->
          <line x1="210" y1="130" x2="285" y2="130" stroke="#38bdf8" stroke-width="2"/>
          <text x="250" y="120" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle">EAPoL</text>
          <text x="250" y="145" fill="#64748b" font-size="9" text-anchor="middle">(Capa 2 LAN)</text>

          <line x1="450" y1="130" x2="525" y2="130" stroke="#10b981" stroke-width="2"/>
          <text x="488" y="120" fill="#10b981" font-size="11" font-weight="700" text-anchor="middle">RADIUS</text>
          <text x="488" y="145" fill="#64748b" font-size="9" text-anchor="middle">(UDP / AVPs)</text>

          <line x1="690" y1="130" x2="745" y2="130" stroke="#f59e0b" stroke-width="2"/>
          <text x="718" y="120" fill="#f59e0b" font-size="10" font-weight="700" text-anchor="middle">LDAPS</text>

          <!-- Bottom Flow Details Box -->
          <rect x="50" y="220" width="820" height="75" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155"/>
          <text x="70" y="245" fill="#38bdf8" font-size="11" font-weight="700">1. Suplicante inicia conexión enviando identidad EAP-Response/Identity.</text>
          <text x="70" y="265" fill="#a5b4fc" font-size="11">2. NAS encapsula los datos en Access-Request RADIUS (UDP 1812) con atributos AVP.</text>
          <text x="70" y="285" fill="#10b981" font-size="11">3. RADIUS responde Access-Accept con VLAN asignada y ACL descargable (dACL), abriendo el puerto del switch.</text>
        </svg>
      `,

      'dmz_architecture': `
        <svg viewBox="0 0 900 340" class="diagram-vector-svg" xmlns="http://www.w3.org/2000/svg">
          <rect width="900" height="340" rx="12" fill="#090d16" stroke="rgba(0, 245, 255, 0.25)" stroke-width="1.5"/>
          <text x="450" y="32" fill="#00f5ff" font-size="14" font-weight="700" text-anchor="middle" letter-spacing="1">ARQUITECTURA DE SEGURIDAD PERIMETRAL Y ZONA DMZ</text>

          <!-- INTERNET -->
          <rect x="40" y="90" width="130" height="150" rx="8" fill="rgba(244, 63, 94, 0.1)" stroke="#f43f5e" stroke-width="1.5"/>
          <text x="105" y="135" fill="#f43f5e" font-size="13" font-weight="700" text-anchor="middle">Internet</text>
          <text x="105" y="155" fill="#fca5a5" font-size="10" text-anchor="middle">Zona No Confiable</text>
          <text x="105" y="175" fill="#94a3b8" font-size="9" text-anchor="middle">(Untrusted)</text>

          <!-- FIREWALL PERIMETRAL -->
          <rect x="230" y="70" width="120" height="190" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
          <text x="290" y="135" fill="#f59e0b" font-size="12" font-weight="800" text-anchor="middle">FIREWALL</text>
          <text x="290" y="155" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">PERIMETRAL</text>
          <text x="290" y="175" fill="#94a3b8" font-size="10" text-anchor="middle">NGFW Capa 7</text>
          <text x="290" y="195" fill="#a5b4fc" font-size="9" text-anchor="middle">Stateful + IPS</text>

          <!-- DMZ -->
          <rect x="410" y="55" width="180" height="100" rx="8" fill="rgba(0, 245, 255, 0.08)" stroke="#00f5ff" stroke-width="1.5"/>
          <text x="500" y="80" fill="#00f5ff" font-size="12" font-weight="800" text-anchor="middle">ZONA DMZ</text>
          <text x="500" y="105" fill="#ffffff" font-size="10" text-anchor="middle">Servidor Web (TCP 443)</text>
          <text x="500" y="125" fill="#ffffff" font-size="10" text-anchor="middle">Servidor Correo SMTP (TCP 25)</text>
          <text x="500" y="143" fill="#ffffff" font-size="10" text-anchor="middle">Servidor DNS Externo (UDP 53)</text>

          <!-- LAN INTERNA -->
          <rect x="650" y="90" width="210" height="150" rx="8" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="1.5"/>
          <text x="755" y="125" fill="#10b981" font-size="13" font-weight="700" text-anchor="middle">LAN Corporativa</text>
          <text x="755" y="145" fill="#6ee7b7" font-size="10" text-anchor="middle">Zona Confiable (Trusted)</text>
          <text x="755" y="170" fill="#cbd5e1" font-size="10" text-anchor="middle">- Active Directory / LDAP</text>
          <text x="755" y="190" fill="#cbd5e1" font-size="10" text-anchor="middle">- Bases de Datos SQL</text>
          <text x="755" y="210" fill="#cbd5e1" font-size="10" text-anchor="middle">- Estaciones de Trabajo</text>

          <!-- CONNECTORS & TRAFFIC RULES -->
          <line x1="170" y1="165" x2="225" y2="165" stroke="#f43f5e" stroke-width="2"/>
          <line x1="350" y1="105" x2="405" y2="105" stroke="#00f5ff" stroke-width="2"/>
          <line x1="350" y1="165" x2="645" y2="165" stroke="#10b981" stroke-width="2"/>

          <!-- DMZ to LAN BLOCKED LINE -->
          <path d="M 500 155 L 500 240 L 645 240" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 4"/>
          <circle cx="575" cy="240" r="10" fill="#ef4444"/>
          <text x="575" y="244" fill="#ffffff" font-size="12" font-weight="900" text-anchor="middle">X</text>
          <text x="575" y="265" fill="#fca5a5" font-size="10" font-weight="700" text-anchor="middle">Tráfico DMZ hacia LAN: BLOQUEADO POR DEFECTO</text>
        </svg>
      `,

      'ids_vs_ips': `
        <svg viewBox="0 0 900 350" class="diagram-vector-svg" xmlns="http://www.w3.org/2000/svg">
          <rect width="900" height="350" rx="12" fill="#090d16" stroke="rgba(0, 245, 255, 0.25)" stroke-width="1.5"/>
          <text x="450" y="32" fill="#00f5ff" font-size="14" font-weight="700" text-anchor="middle" letter-spacing="1">COMPARATIVA ARQUITECTONICA: NIDS PASIVO VS NIPS EN LINEA (INLINE)</text>

          <!-- TOP ROW: IDS PASIVO -->
          <rect x="40" y="55" width="820" height="125" rx="8" fill="rgba(15, 23, 42, 0.6)" stroke="#38bdf8" stroke-width="1"/>
          <text x="60" y="80" fill="#38bdf8" font-size="12" font-weight="800">MODO NIDS PASIVO (DETECCION FUERA DE BANDA)</text>

          <rect x="80" y="100" width="100" height="40" rx="5" fill="#1e293b" stroke="#64748b"/>
          <text x="130" y="125" fill="#fff" font-size="11" text-anchor="middle">Router / WAN</text>

          <rect x="260" y="100" width="130" height="40" rx="5" fill="#1e293b" stroke="#38bdf8"/>
          <text x="325" y="125" fill="#fff" font-size="11" text-anchor="middle">Switch con SPAN</text>

          <rect x="470" y="100" width="120" height="40" rx="5" fill="#1e293b" stroke="#10b981"/>
          <text x="530" y="125" fill="#fff" font-size="11" text-anchor="middle">Servidor Destino</text>

          <rect x="670" y="100" width="160" height="50" rx="5" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="750" y="123" fill="#38bdf8" font-size="12" font-weight="700" text-anchor="middle">Sensor NIDS (Snort)</text>
          <text x="750" y="139" fill="#94a3b8" font-size="9" text-anchor="middle">Modo Promiscuo (Pasivo)</text>

          <line x1="180" y1="120" x2="255" y2="120" stroke="#64748b" stroke-width="2"/>
          <line x1="390" y1="120" x2="465" y2="120" stroke="#10b981" stroke-width="2"/>
          <path d="M 325 140 L 325 160 L 750 160 L 750 152" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="3 3"/>
          <text x="530" y="155" fill="#38bdf8" font-size="9" text-anchor="middle">Copia bit a bit de tráfico (SPAN / TAP) - Cero impacto en latencia</text>

          <!-- BOTTOM ROW: IPS INLINE -->
          <rect x="40" y="200" width="820" height="125" rx="8" fill="rgba(15, 23, 42, 0.6)" stroke="#f43f5e" stroke-width="1"/>
          <text x="60" y="225" fill="#f43f5e" font-size="12" font-weight="800">MODO NIPS ACTIVO EN LINEA (PREVENCION DIRECTA)</text>

          <rect x="80" y="245" width="100" height="40" rx="5" fill="#1e293b" stroke="#64748b"/>
          <text x="130" y="270" fill="#fff" font-size="11" text-anchor="middle">Router / WAN</text>

          <rect x="270" y="240" width="170" height="50" rx="5" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" stroke-width="2"/>
          <text x="355" y="263" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle">Sensor NIPS Inline</text>
          <text x="355" y="279" fill="#fca5a5" font-size="9" text-anchor="middle">Inspección y Bloqueo en Vuelo</text>

          <rect x="530" y="245" width="130" height="40" rx="5" fill="#1e293b" stroke="#38bdf8"/>
          <text x="595" y="270" fill="#fff" font-size="11" text-anchor="middle">Switch LAN</text>

          <rect x="730" y="245" width="110" height="40" rx="5" fill="#1e293b" stroke="#10b981"/>
          <text x="785" y="270" fill="#fff" font-size="11" text-anchor="middle">Servidor Destino</text>

          <line x1="180" y1="265" x2="265" y2="265" stroke="#ef4444" stroke-width="2"/>
          <line x1="440" y1="265" x2="525" y2="265" stroke="#10b981" stroke-width="2"/>
          <line x1="660" y1="265" x2="725" y2="265" stroke="#10b981" stroke-width="2"/>
          <text x="450" y="308" fill="#fca5a5" font-size="10" font-weight="600" text-anchor="middle">Paquete malicioso detectado -> Descarte Inmediato (Drop / TCP Reset)</text>
        </svg>
      `,

      'ipsec_architecture': `
        <svg viewBox="0 0 900 360" class="diagram-vector-svg" xmlns="http://www.w3.org/2000/svg">
          <rect width="900" height="360" rx="12" fill="#090d16" stroke="rgba(0, 245, 255, 0.25)" stroke-width="1.5"/>
          <text x="450" y="32" fill="#00f5ff" font-size="14" font-weight="700" text-anchor="middle" letter-spacing="1">FRAMEWORK IPSEC (RFC 4301): MODOS DE OPERACION Y PROTOCOLOS</text>

          <!-- MODO TRANSPORTE -->
          <rect x="40" y="55" width="820" height="130" rx="8" fill="rgba(15, 23, 42, 0.7)" stroke="#6366f1" stroke-width="1"/>
          <text x="60" y="80" fill="#a5b4fc" font-size="12" font-weight="800">1. MODO TRANSPORTE (Host-to-Host / Protege solo el Payload)</text>

          <!-- Original packet strip -->
          <rect x="60" y="100" width="130" height="35" rx="4" fill="#334155"/>
          <text x="125" y="122" fill="#fff" font-size="11" text-anchor="middle">Cabecera IP Original</text>

          <rect x="195" y="100" width="100" height="35" rx="4" fill="#6366f1"/>
          <text x="245" y="122" fill="#fff" font-size="11" font-weight="700" text-anchor="middle">ESP Header</text>

          <rect x="300" y="100" width="140" height="35" rx="4" fill="rgba(0, 245, 255, 0.2)" stroke="#00f5ff"/>
          <text x="370" y="122" fill="#00f5ff" font-size="11" font-weight="700" text-anchor="middle">TCP Header (Cifrado)</text>

          <rect x="445" y="100" width="220" height="35" rx="4" fill="rgba(0, 245, 255, 0.2)" stroke="#00f5ff"/>
          <text x="555" y="122" fill="#00f5ff" font-size="11" font-weight="700" text-anchor="middle">Datos de Aplicación (Cifrado)</text>

          <rect x="670" y="100" width="85" height="35" rx="4" fill="#6366f1"/>
          <text x="712" y="122" fill="#fff" font-size="10" text-anchor="middle">ESP Trailer</text>

          <rect x="760" y="100" width="85" height="35" rx="4" fill="#10b981"/>
          <text x="802" y="122" fill="#fff" font-size="10" text-anchor="middle">ESP Auth</text>

          <text x="450" y="165" fill="#94a3b8" font-size="10" text-anchor="middle">Uso típico: Comunicación cifrada entre dos servidores dentro de la misma red local.</text>

          <!-- MODO TUNEL -->
          <rect x="40" y="200" width="820" height="140" rx="8" fill="rgba(15, 23, 42, 0.7)" stroke="#10b981" stroke-width="1"/>
          <text x="60" y="225" fill="#6ee7b7" font-size="12" font-weight="800">2. MODO TUNEL (Site-to-Site / Agrega Nueva Cabecera IP y Cifra Todo el Paquete Original)</text>

          <!-- Tunnel Packet strip -->
          <rect x="60" y="245" width="130" height="35" rx="4" fill="#10b981"/>
          <text x="125" y="267" fill="#fff" font-size="10" font-weight="700" text-anchor="middle">Nueva Cabecera IP</text>

          <rect x="195" y="245" width="90" height="35" rx="4" fill="#6366f1"/>
          <text x="240" y="267" fill="#fff" font-size="11" font-weight="700" text-anchor="middle">ESP Header</text>

          <rect x="290" y="245" width="140" height="35" rx="4" fill="rgba(0, 245, 255, 0.2)" stroke="#00f5ff"/>
          <text x="360" y="267" fill="#00f5ff" font-size="10" font-weight="700" text-anchor="middle">IP Original (Cifrada)</text>

          <rect x="435" y="245" width="110" height="35" rx="4" fill="rgba(0, 245, 255, 0.2)" stroke="#00f5ff"/>
          <text x="490" y="267" fill="#00f5ff" font-size="10" font-weight="700" text-anchor="middle">TCP (Cifrado)</text>

          <rect x="550" y="245" width="140" height="35" rx="4" fill="rgba(0, 245, 255, 0.2)" stroke="#00f5ff"/>
          <text x="620" y="267" fill="#00f5ff" font-size="10" font-weight="700" text-anchor="middle">Datos (Cifrados)</text>

          <rect x="695" y="245" width="75" height="35" rx="4" fill="#6366f1"/>
          <text x="732" y="267" fill="#fff" font-size="9" text-anchor="middle">ESP Trailer</text>

          <rect x="775" y="245" width="75" height="35" rx="4" fill="#10b981"/>
          <text x="812" y="267" fill="#fff" font-size="9" text-anchor="middle">ESP Auth</text>

          <text x="450" y="315" fill="#6ee7b7" font-size="10" text-anchor="middle">Uso estándar: Túneles VPN entre sedes corporativas (Gateways / Routers) a través de Internet.</text>
        </svg>
      `,

      'pki_hierarchy': `
        <svg viewBox="0 0 900 340" class="diagram-vector-svg" xmlns="http://www.w3.org/2000/svg">
          <rect width="900" height="340" rx="12" fill="#090d16" stroke="rgba(0, 245, 255, 0.25)" stroke-width="1.5"/>
          <text x="450" y="32" fill="#00f5ff" font-size="14" font-weight="700" text-anchor="middle" letter-spacing="1">JERARQUIA DE INFRAESTRUCTURA DE CLAVE PUBLICA (PKI) Y CADENA DE CONFIANZA</text>

          <!-- ROOT CA -->
          <rect x="340" y="55" width="220" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
          <text x="450" y="80" fill="#f59e0b" font-size="13" font-weight="800" text-anchor="middle">ROOT CA (RAIZ)</text>
          <text x="450" y="100" fill="#e2e8f0" font-size="10" text-anchor="middle">Autofirmada | Conservada OFFLINE</text>

          <!-- INTERMEDIATE CAS -->
          <rect x="180" y="150" width="220" height="55" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/>
          <text x="290" y="175" fill="#a5b4fc" font-size="12" font-weight="700" text-anchor="middle">Intermediate CA 1</text>
          <text x="290" y="193" fill="#94a3b8" font-size="10" text-anchor="middle">Emisión de Certificados TLS</text>

          <rect x="500" y="150" width="220" height="55" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/>
          <text x="610" y="175" fill="#a5b4fc" font-size="12" font-weight="700" text-anchor="middle">Intermediate CA 2</text>
          <text x="610" y="193" fill="#94a3b8" font-size="10" text-anchor="middle">Certificados VPN / 802.1X</text>

          <!-- END CERTIFICATES -->
          <rect x="70" y="245" width="200" height="50" rx="5" fill="rgba(0, 245, 255, 0.1)" stroke="#00f5ff"/>
          <text x="170" y="268" fill="#00f5ff" font-size="11" font-weight="700" text-anchor="middle">Certificado Web TLS</text>
          <text x="170" y="284" fill="#94a3b8" font-size="9" text-anchor="middle">secure.banco.com (RSA/ECC)</text>

          <rect x="290" y="245" width="200" height="50" rx="5" fill="rgba(0, 245, 255, 0.1)" stroke="#00f5ff"/>
          <text x="390" y="268" fill="#00f5ff" font-size="11" font-weight="700" text-anchor="middle">Firma de Código</text>
          <text x="390" y="284" fill="#94a3b8" font-size="9" text-anchor="middle">Binarios .EXE / App Store</text>

          <rect x="510" y="245" width="180" height="50" rx="5" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981"/>
          <text x="600" y="268" fill="#10b981" font-size="11" font-weight="700" text-anchor="middle">Certificado VPN IPsec</text>
          <text x="600" y="284" fill="#94a3b8" font-size="9" text-anchor="middle">Router Gateway Peer</text>

          <rect x="710" y="245" width="150" height="50" rx="5" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981"/>
          <text x="785" y="268" fill="#10b981" font-size="11" font-weight="700" text-anchor="middle">Smart Card (PIV)</text>
          <text x="785" y="284" fill="#94a3b8" font-size="9" text-anchor="middle">Autenticación AAL3</text>

          <!-- HIERARCHY LINES -->
          <line x1="410" y1="115" x2="290" y2="150" stroke="#f59e0b" stroke-width="2"/>
          <line x1="490" y1="115" x2="610" y2="150" stroke="#f59e0b" stroke-width="2"/>
          <line x1="240" y1="205" x2="170" y2="245" stroke="#6366f1" stroke-width="1.5"/>
          <line x1="340" y1="205" x2="390" y2="245" stroke="#6366f1" stroke-width="1.5"/>
          <line x1="560" y1="205" x2="600" y2="245" stroke="#6366f1" stroke-width="1.5"/>
          <line x1="660" y1="205" x2="785" y2="245" stroke="#6366f1" stroke-width="1.5"/>

          <text x="450" y="320" fill="#94a3b8" font-size="10" text-anchor="middle">Validación de Estado: Consultas OCSP en tiempo real con OCSP Stapling (RFC 6066).</text>
        </svg>
      `,

      'cisco_planes': `
        <svg viewBox="0 0 900 320" class="diagram-vector-svg" xmlns="http://www.w3.org/2000/svg">
          <rect width="900" height="320" rx="12" fill="#090d16" stroke="rgba(0, 245, 255, 0.25)" stroke-width="1.5"/>
          <text x="450" y="32" fill="#00f5ff" font-size="14" font-weight="700" text-anchor="middle" letter-spacing="1">HARDENING DE EQUIPOS DE RED CISCO: LOS 3 PLANOS DE SEGURIDAD</text>

          <!-- 3 PLANES -->
          <!-- Control Plane -->
          <rect x="50" y="60" width="245" height="230" rx="8" fill="rgba(244, 63, 94, 0.08)" stroke="#f43f5e" stroke-width="1.5"/>
          <text x="172" y="90" fill="#f43f5e" font-size="13" font-weight="800" text-anchor="middle">1. PLANO DE CONTROL</text>
          <text x="172" y="108" fill="#fca5a5" font-size="10" text-anchor="middle">(CPU del Router / Enrutamiento)</text>
          <line x1="70" y1="120" x2="275" y2="120" stroke="#334155"/>
          <text x="70" y="145" fill="#e2e8f0" font-size="11">- Protocolos BGP, OSPF, EIGRP</text>
          <text x="70" y="170" fill="#e2e8f0" font-size="11">- Mensajes ARP, ICMP, STP</text>
          <text x="70" y="200" fill="#f43f5e" font-size="11" font-weight="700">Protección Clave:</text>
          <text x="70" y="225" fill="#fca5a5" font-size="11">- CoPP (Control Plane Policing)</text>
          <text x="70" y="250" fill="#fca5a5" font-size="11">- Autenticación MD5/SHA en OSPF/BGP</text>
          <text x="70" y="275" fill="#fca5a5" font-size="11">- Límites de tasa ICMP</text>

          <!-- Management Plane -->
          <rect x="325" y="60" width="250" height="230" rx="8" fill="rgba(99, 102, 241, 0.08)" stroke="#6366f1" stroke-width="1.5"/>
          <text x="450" y="90" fill="#a5b4fc" font-size="13" font-weight="800" text-anchor="middle">2. PLANO DE GESTION</text>
          <text x="450" y="108" fill="#c4b5fd" font-size="10" text-anchor="middle">(Acceso Administrativo)</text>
          <line x1="345" y1="120" x2="555" y2="120" stroke="#334155"/>
          <text x="345" y="145" fill="#e2e8f0" font-size="11">- SSHv2 (Deshabilitar Telnet/HTTP)</text>
          <text x="345" y="170" fill="#e2e8f0" font-size="11">- SNMPv3 authPriv (AES/SHA)</text>
          <text x="345" y="200" fill="#a5b4fc" font-size="11" font-weight="700">Protección Clave:</text>
          <text x="345" y="225" fill="#c4b5fd" font-size="11">- AAA con TACACS+ centralizado</text>
          <text x="345" y="250" fill="#c4b5fd" font-size="11">- ACLs de gestión en lineas VTY</text>
          <text x="345" y="275" fill="#c4b5fd" font-size="11">- Syslog remoto con TLS (RFC 5424)</text>

          <!-- Data Plane -->
          <rect x="605" y="60" width="245" height="230" rx="8" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="1.5"/>
          <text x="727" y="90" fill="#6ee7b7" font-size="13" font-weight="800" text-anchor="middle">3. PLANO DE DATOS</text>
          <text x="727" y="108" fill="#a7f3d0" font-size="10" text-anchor="middle">(Tráfico de Paquetes de Usuario)</text>
          <line x1="625" y1="120" x2="830" y2="120" stroke="#334155"/>
          <text x="625" y="145" fill="#e2e8f0" font-size="11">- Conmutación ASIC / Hardware</text>
          <text x="625" y="170" fill="#e2e8f0" font-size="11">- Enrutamiento de paquetes IP</text>
          <text x="625" y="200" fill="#10b981" font-size="11" font-weight="700">Protección Clave:</text>
          <text x="625" y="225" fill="#6ee7b7" font-size="11">- uRPF (Mitigación de IP Spoofing)</text>
          <text x="625" y="250" fill="#6ee7b7" font-size="11">- DHCP Snooping + DAI</text>
          <text x="625" y="275" fill="#6ee7b7" font-size="11">- Port Security + Storm Control</text>
        </svg>
      `,

      'incident_response': `
        <svg viewBox="0 0 900 340" class="diagram-vector-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-circ" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#00f5ff"/>
            </marker>
          </defs>

          <rect width="900" height="340" rx="12" fill="#090d16" stroke="rgba(0, 245, 255, 0.25)" stroke-width="1.5"/>
          <text x="450" y="32" fill="#00f5ff" font-size="14" font-weight="700" text-anchor="middle" letter-spacing="1">CICLO DE VIDA DE RESPUESTA ANTE INCIDENTES (NIST SP 800-61 REV. 2)</text>

          <!-- 4 PHASES CARDS IN CIRCLE -->
          <!-- 1. Preparacion -->
          <rect x="50" y="65" width="370" height="110" rx="8" fill="rgba(99, 102, 241, 0.12)" stroke="#6366f1" stroke-width="1.5"/>
          <text x="70" y="92" fill="#a5b4fc" font-size="13" font-weight="800">1. PREPARACION</text>
          <text x="70" y="115" fill="#cbd5e1" font-size="11">- Creación de Playbooks y procedimientos del CSIRT</text>
          <text x="70" y="135" fill="#cbd5e1" font-size="11">- Inventario automatizado de activos y credenciales PAM</text>
          <text x="70" y="155" fill="#cbd5e1" font-size="11">- Simulacros de ataque (Tabletop Exercises) y respaldos inmutables</text>

          <!-- 2. Deteccion y Analisis -->
          <rect x="480" y="65" width="370" height="110" rx="8" fill="rgba(244, 63, 94, 0.12)" stroke="#f43f5e" stroke-width="1.5"/>
          <text x="500" y="92" fill="#fca5a5" font-size="13" font-weight="800">2. DETECCION Y ANALISIS</text>
          <text x="500" y="115" fill="#cbd5e1" font-size="11">- Correlación de alertas en SIEM y telemetría EDR/XDR</text>
          <text x="500" y="135" fill="#cbd5e1" font-size="11">- Análisis de vector de entrada y mapeo MITRE ATT&CK</text>
          <text x="500" y="155" fill="#cbd5e1" font-size="11">- Determinación del alcance y clasificación de severidad</text>

          <!-- 3. Contencion, Erradicacion -->
          <rect x="480" y="200" width="370" height="110" rx="8" fill="rgba(245, 158, 11, 0.12)" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="500" y="227" fill="#fcd34d" font-size="13" font-weight="800">3. CONTENCION, ERRADICACION Y RECUPERACION</text>
          <text x="500" y="250" fill="#cbd5e1" font-size="11">- Aislamiento de VLAN infectada y preservación de RAM</text>
          <text x="500" y="270" fill="#cbd5e1" font-size="11">- Erradicación de persistencias y claves comprometidas</text>
          <text x="500" y="290" fill="#cbd5e1" font-size="11">- Restauración limpia y verificación de integridad</text>

          <!-- 4. Lecciones Aprendidas -->
          <rect x="50" y="200" width="370" height="110" rx="8" fill="rgba(16, 185, 129, 0.12)" stroke="#10b981" stroke-width="1.5"/>
          <text x="70" y="227" fill="#6ee7b7" font-size="13" font-weight="800">4. ACTIVIDAD POST-INCIDENTE (LECCIONES)</text>
          <text x="70" y="250" fill="#cbd5e1" font-size="11">- Informe de Causa Raíz (Root Cause Analysis - RCA)</text>
          <text x="70" y="270" fill="#cbd5e1" font-size="11">- Métricas de tiempo de detección y contención (MTTD / MTTR)</text>
          <text x="70" y="290" fill="#cbd5e1" font-size="11">- Actualización de controles defensivos y políticas</text>

          <!-- CONNECTING ARROWS -->
          <line x1="420" y1="120" x2="472" y2="120" stroke="#00f5ff" stroke-width="2" marker-end="url(#arrow-circ)"/>
          <line x1="665" y1="175" x2="665" y2="192" stroke="#00f5ff" stroke-width="2" marker-end="url(#arrow-circ)"/>
          <line x1="480" y1="255" x2="428" y2="255" stroke="#00f5ff" stroke-width="2" marker-end="url(#arrow-circ)"/>
          <line x1="235" y1="200" x2="235" y2="182" stroke="#00f5ff" stroke-width="2" marker-end="url(#arrow-circ)"/>
        </svg>
      `
    };

    return diagrams[type] || null;
  }

  static renderVisualDiagramBlock(diagramType, title) {
    const svg = this.getDiagramSvg(diagramType);
    if (!svg) return '';

    return `
      <div class="visual-diagram-wrapper">
        <div class="visual-diagram-header">
          <div class="v-diag-badge">
            <i class="fas fa-project-diagram"></i>
            <span>${title || 'Diagrama Visual de Arquitectura'}</span>
          </div>
          <span class="v-diag-format"><i class="fas fa-vector-square"></i> Vector SVG Nativo</span>
        </div>
        <div class="visual-diagram-body">
          ${svg}
        </div>
      </div>
    `;
  }
}

window.VisualDiagramsEngine = VisualDiagramsEngine;
