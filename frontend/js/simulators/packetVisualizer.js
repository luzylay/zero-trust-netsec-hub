/**
 * Interactive Protocol Packet Flow Visualizer
 * Step-by-step interactive inspection of RADIUS, TACACS+, Kerberos v5, and IPSec IKEv2
 */

class PacketFlowVisualizer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.protocols = {
      radius: {
        name: "RADIUS (RFC 2865/2866)",
        transport: "UDP 1812 (Auth) / UDP 1813 (Acct)",
        encryption: "Solo cifra la contraseña (MD5 Shared Secret); los demás atributos y usuario van en texto plano.",
        steps: [
          {
            title: "Paso 1: Inicio de Sesión de Usuario en el NAS",
            from: "Usuario / PC Cliente",
            to: "NAS (Router / Switch / AP)",
            summary: "El usuario introduce credenciales (usuario 'admin' y contraseña 'P@ssw0rd2026!') en la terminal o portal.",
            packetInfo: {
              protocol: "SSH / 802.1X / Telnet",
              src: "192.168.1.50",
              dst: "192.168.1.1 (NAS)",
              payload: "Credenciales ingresadas por el operador de red."
            }
          },
          {
            title: "Paso 2: Solicitud de Acceso RADIUS (Access-Request)",
            from: "NAS (Network Access Server)",
            to: "Servidor RADIUS (FreeRADIUS / Cisco ISE)",
            summary: "El NAS encapsula la solicitud en un datagrama UDP 1812. Genera un Request Authenticator pseudoaleatorio de 16 bytes y cifra la contraseña con MD5(Shared Secret + Request Authenticator).",
            packetInfo: {
              protocol: "RADIUS (UDP)",
              src: "192.168.1.1:49152",
              dst: "192.168.2.100:1812",
              headers: "Code: 1 (Access-Request), Identifier: 0x01, Length: 56, Authenticator: 16 bytes hex",
              avps: [
                "User-Name (Type 1): 'admin' [TEXTO PLANO]",
                "User-Password (Type 2): 0x9f4a8b... [CIFRADO MD5 con Clave Compartida]",
                "NAS-IP-Address (Type 4): 192.168.1.1",
                "NAS-Port (Type 5): 1"
              ]
            }
          },
          {
            title: "Paso 3: Validación y Respuesta de Acceso (Access-Accept)",
            from: "Servidor RADIUS",
            to: "NAS (Router / Switch)",
            summary: "El servidor valida la contraseña contra su base de datos. Como es correcta, responde con un Access-Accept combinando la autorización (atributos de privilegios y VLAN).",
            packetInfo: {
              protocol: "RADIUS (UDP)",
              src: "192.168.2.100:1812",
              dst: "192.168.1.1:49152",
              headers: "Code: 2 (Access-Accept), Identifier: 0x01, Length: 48, Response Authenticator validado",
              avps: [
                "Service-Type (Type 6): Administrative (6)",
                "Cisco-AVPair (Type 26 - VSA): 'shell:priv-lvl=15'",
                "Session-Timeout (Type 27): 3600 segundos"
              ]
            }
          },
          {
            title: "Paso 4: Registro de Contabilidad (Accounting-Request Start)",
            from: "NAS (Router / Switch)",
            to: "Servidor RADIUS Accounting",
            summary: "Una vez concedido el acceso, el NAS envía un paquete Accounting-Request hacia el puerto UDP 1813 notificando el inicio de sesión.",
            packetInfo: {
              protocol: "RADIUS Accounting (UDP)",
              src: "192.168.1.1:49153",
              dst: "192.168.2.100:1813",
              headers: "Code: 4 (Accounting-Request), Identifier: 0x02, Length: 64",
              avps: [
                "Acct-Status-Type (Type 40): Start (1)",
                "Acct-Session-Id (Type 44): '000000A1'",
                "User-Name (Type 1): 'admin'",
                "Event-Timestamp (Type 55): Epoch actual"
              ]
            }
          }
        ]
      },

      tacacs: {
        name: "TACACS+ (RFC 8907)",
        transport: "TCP Puerto 49",
        encryption: "Cifra el PAYLOAD COMPLETO del paquete (Payload Encryption). Solo la cabecera fija de 12 bytes va sin cifrar.",
        steps: [
          {
            title: "Paso 1: Establecimiento de Conexión TCP Confiable",
            from: "NAS (Router Cisco)",
            to: "Servidor TACACS+",
            summary: "El NAS inicia un Three-Way Handshake de TCP (SYN, SYN-ACK, ACK) hacia el puerto TCP 49 del servidor TACACS+.",
            packetInfo: {
              protocol: "TCP Handshake",
              src: "192.168.1.1:50123",
              dst: "192.168.2.100:49",
              flags: "[SYN], [SYN-ACK], [ACK] - Conexión establecida"
            }
          },
          {
            title: "Paso 2: Solicitud de Autenticación (TACACS+ START)",
            from: "NAS (Router)",
            to: "Servidor TACACS+",
            summary: "El router envía el mensaje de autenticación inicial. El cuerpo del paquete (usuario y credenciales) está 100% cifrado con la clave precompartida mediante derivación XOR-MD5.",
            packetInfo: {
              protocol: "TACACS+ (TCP 49)",
              headers: "Major/Minor Version: 0xc0, Type: 0x01 (AUTHENTICATION), Flags: 0x01 (ENCRYPTED), Session ID: 0x7a3f81",
              encryptedPayload: "[PAYLOAD COMPLETAMENTE CIFRADO]: Usuario 'admin', Tipo de autenticación ASCII login"
            }
          },
          {
            title: "Paso 3: Consulta y Autorización Granular de Comandos",
            from: "NAS (Router)",
            to: "Servidor TACACS+",
            summary: "Cuando el administrador escribe el comando 'configure terminal', el router envía una solicitud de autorización separada al servidor TACACS+ para validar si ese comando está permitido.",
            packetInfo: {
              protocol: "TACACS+ Authorization (TCP 49)",
              headers: "Type: 0x02 (AUTHORIZATION), Flags: 0x01 (ENCRYPTED)",
              encryptedPayload: "[CIFRADO]: Argumentos 'cmd=configure' 'cmd-arg=terminal' 'priv-lvl=15'",
              serverReply: "Status: TAC_PLUS_AUTHOR_STATUS_PASS_ADD (Comando Aprobado)"
            }
          },
          {
            title: "Paso 4: Contabilidad por Comando (Accounting Record)",
            from: "NAS (Router)",
            to: "Servidor TACACS+",
            summary: "El router registra en el log del servidor TACACS+ la ejecución exitosa del comando con marca de tiempo exacta.",
            packetInfo: {
              protocol: "TACACS+ Accounting (TCP 49)",
              headers: "Type: 0x03 (ACCOUNTING), Flags: 0x01 (ENCRYPTED)",
              encryptedPayload: "[CIFRADO]: flags=start-stop, task_id=45, cmd=configure terminal"
            }
          }
        ]
      },

      kerberos: {
        name: "Kerberos v5 (RFC 4120)",
        transport: "UDP / TCP Puerto 88",
        encryption: "Cifrado de tickets con claves simétricas maestras del KDC. Replay attack protection con Timestamps NTP.",
        steps: [
          {
            title: "Paso 1: Solicitud de Autenticación Inicial (AS-REQ)",
            from: "Cliente (Usuario)",
            to: "Authentication Server (AS)",
            summary: "El usuario solicita identificarse. Envía su ID de usuario y una marca de tiempo cifrada con el hash de su contraseña secreta (Pre-Authentication).",
            packetInfo: {
              protocol: "Kerberos v5 (UDP 88)",
              src: "192.168.1.50",
              dst: "192.168.2.10 (KDC AS)",
              messageType: "KRB_AS_REQ (Message Type 10)",
              content: "Principal: 'alice@CORP.LOCAL', Realm: 'CORP.LOCAL', Pre-Auth Timestamp cifrado"
            }
          },
          {
            title: "Paso 2: Emisión del Ticket Granting Ticket (AS-REP)",
            from: "Authentication Server (AS)",
            to: "Cliente",
            summary: "El AS valida el hash. Devuelve el TGT (cifrado con la clave secreta del TGS que solo el KDC conoce) y la Clave de Sesión Cliente-TGS cifrada con la clave del usuario.",
            packetInfo: {
              protocol: "Kerberos v5 (UDP 88)",
              messageType: "KRB_AS_REP (Message Type 11)",
              ticket: "TGT [Cifrado con K_TGS]: Contiene ID de Alice, Clave de Sesión, Validez (8h)",
              sessionKey: "Clave de Sesión Cliente-TGS [Cifrada con K_Alice]"
            }
          },
          {
            title: "Paso 3: Solicitud de Ticket de Servicio (TGS-REQ)",
            from: "Cliente",
            to: "Ticket Granting Server (TGS)",
            summary: "Para acceder a un servidor de archivos o base de datos, el cliente presenta su TGT intacto junto con un Autenticador firmado con su Clave de Sesión Cliente-TGS.",
            packetInfo: {
              protocol: "Kerberos v5 (UDP 88)",
              messageType: "KRB_TGS_REQ (Message Type 12)",
              content: "TGT intacto + Autenticador (Timestamp cifrado) + SPN: 'cifs/fileserver.corp.local'"
            }
          },
          {
            title: "Paso 4: Emisión de Ticket de Servicio (TGS-REP)",
            from: "Ticket Granting Server (TGS)",
            to: "Cliente",
            summary: "El TGS descifra el TGT, verifica el timestamp del autenticador y genera un Service Ticket cifrado con la clave secreta del servidor de destino.",
            packetInfo: {
              protocol: "Kerberos v5 (UDP 88)",
              messageType: "KRB_TGS_REP (Message Type 13)",
              ticket: "Service Ticket [Cifrado con K_FileServer]",
              sessionKey: "Clave de Sesión Cliente-Servidor [Cifrada con Clave Cliente-TGS]"
            }
          },
          {
            title: "Paso 5: Acceso al Servicio Final (AP-REQ / AP-REP)",
            from: "Cliente",
            to: "Servidor de Destino (FileServer)",
            summary: "El cliente presenta el Service Ticket directamente al servidor de destino. El servidor lo descifra con su clave propia y concede el acceso sin consultar contraseñas.",
            packetInfo: {
              protocol: "Kerberos v5 / SMB",
              messageType: "KRB_AP_REQ (Message Type 14) -> KRB_AP_REP (Message Type 15)",
              result: "Sesión autenticada mutuamente. Cero contraseñas viajaron por la red."
            }
          }
        ]
      }
    };

    this.currentProtoKey = "radius";
    this.currentStepIdx = 0;
    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
  }

  render() {
    const proto = this.protocols[this.currentProtoKey];
    const step = proto.steps[this.currentStepIdx];
    const totalSteps = proto.steps.length;

    this.container.innerHTML = `
      <div class="pv-wrapper">
        <div class="pv-header">
          <div class="pv-proto-selector">
            <button class="pv-tab ${this.currentProtoKey === "radius" ? "active" : ""}" data-proto="radius">RADIUS (RFC 2865)</button>
            <button class="pv-tab ${this.currentProtoKey === "tacacs" ? "active" : ""}" data-proto="tacacs">TACACS+ (RFC 8907)</button>
            <button class="pv-tab ${this.currentProtoKey === "kerberos" ? "active" : ""}" data-proto="kerberos">Kerberos v5 (RFC 4120)</button>
          </div>
          <div class="pv-proto-meta">
            <span class="pv-badge"><i class="fas fa-network-wired"></i> ${proto.transport}</span>
            <span class="pv-badge pv-badge-enc"><i class="fas fa-shield-alt"></i> ${proto.encryption}</span>
          </div>
        </div>

        <div class="pv-stepper-progress">
          <div class="pv-progress-bar-bg">
            <div class="pv-progress-bar-fill" style="width: ${((this.currentStepIdx + 1) / totalSteps) * 100}%"></div>
          </div>
          <div class="pv-steps-indicators">
            ${proto.steps.map((s, idx) => `
              <button class="pv-step-dot ${idx === this.currentStepIdx ? "active" : idx < this.currentStepIdx ? "completed" : ""}" data-step="${idx}">
                ${idx + 1}
              </button>
            `).join("")}
          </div>
        </div>

        <div class="pv-flow-display">
          <div class="pv-node pv-node-src">
            <div class="pv-node-icon"><i class="fas fa-laptop-code"></i></div>
            <div class="pv-node-label">${step.from}</div>
          </div>

          <div class="pv-wire-container">
            <div class="pv-wire-line"></div>
            <div class="pv-packet-bubble animate-flow">
              <span class="pv-packet-icon"><i class="fas fa-cube"></i></span>
              <span class="pv-packet-name">${step.title}</span>
            </div>
            <div class="pv-wire-arrow"><i class="fas fa-chevron-right"></i></div>
          </div>

          <div class="pv-node pv-node-dst">
            <div class="pv-node-icon"><i class="fas fa-server"></i></div>
            <div class="pv-node-label">${step.to}</div>
          </div>
        </div>

        <div class="pv-details-grid">
          <div class="pv-card pv-summary-card">
            <h4><i class="fas fa-info-circle"></i> Descripción del Intercambio (Paso ${this.currentStepIdx + 1} de ${totalSteps})</h4>
            <p>${step.summary}</p>
          </div>

          <div class="pv-card pv-packet-card">
            <h4><i class="fas fa-microscope"></i> Estructura del Datagrama / Paquete Capturado</h4>
            <div class="pv-packet-inspector">
              <div class="pv-field-row"><span class="pv-label">Protocolo:</span> <span class="pv-val">${step.packetInfo.protocol || "N/A"}</span></div>
              ${step.packetInfo.src ? `<div class="pv-field-row"><span class="pv-label">Origen / Destino:</span> <span class="pv-val">${step.packetInfo.src} -> ${step.packetInfo.dst}</span></div>` : ""}
              ${step.packetInfo.headers ? `<div class="pv-field-row"><span class="pv-label">Cabeceras:</span> <span class="pv-val">${step.packetInfo.headers}</span></div>` : ""}
              ${step.packetInfo.encryptedPayload ? `<div class="pv-field-row"><span class="pv-label">Carga Cifrada:</span> <span class="pv-val text-cyan">${step.packetInfo.encryptedPayload}</span></div>` : ""}
              ${step.packetInfo.ticket ? `<div class="pv-field-row"><span class="pv-label">Ticket Criptográfico:</span> <span class="pv-val text-amber">${step.packetInfo.ticket}</span></div>` : ""}
              ${step.packetInfo.avps ? `
                <div class="pv-avp-list">
                  <span class="pv-label">Pares Atributo-Valor (AVPs):</span>
                  <ul>
                    ${step.packetInfo.avps.map(a => `<li><code>${a}</code></li>`).join("")}
                  </ul>
                </div>
              ` : ""}
            </div>
          </div>
        </div>

        <div class="pv-controls">
          <button class="pv-nav-btn" id="pv-prev-btn" ${this.currentStepIdx === 0 ? "disabled" : ""}>
            <i class="fas fa-arrow-left"></i> Paso Anterior
          </button>
          <span class="pv-step-counter">Paso ${this.currentStepIdx + 1} / ${totalSteps}</span>
          <button class="pv-nav-btn pv-nav-primary" id="pv-next-btn" ${this.currentStepIdx === totalSteps - 1 ? "disabled" : ""}>
            Siguiente Paso <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    this.container.querySelectorAll(".pv-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        this.currentProtoKey = tab.getAttribute("data-proto");
        this.currentStepIdx = 0;
        this.render();
      });
    });

    this.container.querySelectorAll(".pv-step-dot").forEach(dot => {
      dot.addEventListener("click", () => {
        this.currentStepIdx = parseInt(dot.getAttribute("data-step"));
        this.render();
      });
    });

    const prevBtn = this.container.querySelector("#pv-prev-btn");
    const nextBtn = this.container.querySelector("#pv-next-btn");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (this.currentStepIdx > 0) {
          this.currentStepIdx--;
          this.render();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (this.currentStepIdx < this.protocols[this.currentProtoKey].steps.length - 1) {
          this.currentStepIdx++;
          this.render();
        }
      });
    }
  }
}

window.PacketFlowVisualizer = PacketFlowVisualizer;
