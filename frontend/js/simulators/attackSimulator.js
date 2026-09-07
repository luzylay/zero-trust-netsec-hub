/**
 * Interactive Network Attack & Defense Lab Simulator
 * Real-time animated visualization of Layer 2/3 attacks and defense activations
 */

class AttackSimulator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.scenarios = {
      arp: {
        id: "arp",
        name: "ARP Spoofing / Man-in-the-Middle",
        layer: "Capa 2 (Enlace de Datos)",
        description: "El atacante inunda la red con respuestas Gratuitous ARP falsas afirmando que la IP del Gateway (192.168.1.1) tiene la dirección MAC del atacante. El tráfico de la víctima es interceptado.",
        defenseName: "Dynamic ARP Inspection (DAI) + DHCP Snooping",
        defenseEffect: "El switch intercepta cada paquete ARP, consulta la tabla de DHCP Snooping y descarta de inmediato los paquetes ARP con binding IP-MAC inválido.",
        state: { attackActive: false, defenseActive: false, packetCount: 0 }
      },
      dhcp: {
        id: "dhcp",
        name: "DHCP Starvation & Rogue DHCP Server",
        layer: "Capa 7 / Capa 2",
        description: "El atacante envía miles de solicitudes DHCP Request con MACs falsificadas para agotar el pool de IPs del servidor legítimo y levantar un Rogue DHCP con DNS malicioso.",
        defenseName: "DHCP Snooping + Port Security",
        defenseEffect: "Los puertos de acceso son marcados como 'Untrusted'. Las ofertas DHCP de servidores no autorizados son bloqueadas y el límite de MACs por puerto mitiga la inundación.",
        state: { attackActive: false, defenseActive: false, packetCount: 0 }
      },
      syn: {
        id: "syn",
        name: "TCP SYN Flood (Denegación de Servicio)",
        layer: "Capa 4 (Transporte)",
        description: "El atacante envía una ráfaga masiva de paquetes TCP SYN con IPs de origen falsas sin responder con el ACK final, saturando la cola de conexiones semiabiertas (Backlog Queue) del servidor.",
        defenseName: "TCP SYN Cookies & Firewall Rate Limiting",
        defenseEffect: "El servidor no reserva memoria en la cola de backlog hasta recibir el ACK legítimo; codifica el estado de la conexión en el Número de Secuencia Inicial (ISN).",
        state: { attackActive: false, defenseActive: false, packetCount: 0 }
      },
      botnet: {
        id: "botnet",
        name: "Botnet C2 Beaconing & DGA",
        layer: "Capa 7 (Aplicación)",
        description: "Hosts infectados emiten balizas periódicas (Beacons) hacia dominios generados por algoritmos matemáticos DGA para recibir instrucciones del Botmaster.",
        defenseName: "DNS Sinkholing & NGFW Domain Filtering",
        defenseEffect: "Las consultas DNS a dominios DGA maliciosos son redirigidas a un Sinkhole de seguridad controlado, neutralizando la recepción de órdenes y censando hosts infectados.",
        state: { attackActive: false, defenseActive: false, packetCount: 0 }
      }
    };
    this.currentScenarioId = "arp";
    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
  }

  render() {
    const sc = this.scenarios[this.currentScenarioId];

    this.container.innerHTML = `
      <div class="atk-sim-wrapper">
        <div class="atk-sim-header">
          <div class="atk-selector-tabs">
            ${Object.values(this.scenarios).map(s => `
              <button class="atk-tab ${s.id === this.currentScenarioId ? "active" : ""}" data-sc="${s.id}">
                ${s.name}
              </button>
            `).join("")}
          </div>
        </div>

        <div class="atk-sim-main">
          <div class="atk-info-banner">
            <div>
              <h4><i class="fas fa-shield-virus"></i> ${sc.name} <span class="atk-layer-tag">${sc.layer}</span></h4>
              <p>${sc.description}</p>
            </div>
            <div class="atk-controls-box">
              <button class="atk-btn ${sc.state.attackActive ? "btn-danger pulse" : "btn-outline-danger"}" id="btn-toggle-attack">
                <i class="fas ${sc.state.attackActive ? "fa-stop" : "fa-skull"}"></i> ${sc.state.attackActive ? "Detener Ataque" : "Lanzar Ataque"}
              </button>
              <button class="atk-btn ${sc.state.defenseActive ? "btn-success" : "btn-outline-success"}" id="btn-toggle-defense">
                <i class="fas ${sc.state.defenseActive ? "fa-shield-alt" : "fa-shield-virus"}"></i> ${sc.state.defenseActive ? "Defensa ACTIVA" : "Activar Defensa (" + sc.defenseName.split("+")[0] + ")"}
              </button>
            </div>
          </div>

          <div class="atk-topology-canvas">
            <div class="topo-grid">
              <div class="topo-node topo-victim">
                <div class="node-icon"><i class="fas fa-desktop"></i></div>
                <div class="node-name">PC Víctima</div>
                <div class="node-ip">192.168.1.50</div>
                <div class="node-status ${sc.state.attackActive && !sc.state.defenseActive ? "status-compromised" : "status-safe"}">
                  ${sc.state.attackActive && !sc.state.defenseActive ? "⚠️ Tráfico Interceptado" : "✔️ Seguro"}
                </div>
              </div>

              <div class="topo-switch-node">
                <div class="node-icon"><i class="fas fa-server"></i></div>
                <div class="node-name">Switch Central / Firewall</div>
                <div class="node-defense-status ${sc.state.defenseActive ? "def-enabled" : "def-disabled"}">
                  <i class="fas ${sc.state.defenseActive ? "fa-lock" : "fa-lock-open"}"></i>
                  ${sc.state.defenseActive ? sc.defenseName : "Sin Contramedidas"}
                </div>
              </div>

              <div class="topo-node topo-gateway">
                <div class="node-icon"><i class="fas fa-globe"></i></div>
                <div class="node-name">Gateway / Destino</div>
                <div class="node-ip">192.168.1.1</div>
                <div class="node-status status-safe">Operativo</div>
              </div>
            </div>

            <div class="topo-attacker-row">
              <div class="topo-node topo-attacker ${sc.state.attackActive ? "attacker-firing" : ""}">
                <div class="node-icon"><i class="fas fa-user-secret"></i></div>
                <div class="node-name">Host Atacante</div>
                <div class="node-ip">192.168.1.100</div>
                <div class="node-status ${sc.state.attackActive ? "status-attacking" : "status-idle"}">
                  ${sc.state.attackActive ? (sc.state.defenseActive ? "🛡️ Ataque Bloqueado por Switch" : "🔥 Transmitiendo Payloads Maliciosos") : "En espera"}
                </div>
              </div>
            </div>

            <div class="atk-live-logs" id="atk-live-logs">
              <div class="log-entry log-info">[SISTEMA] Laboratorio de ciberseguridad inicializado. Selecciona 'Lanzar Ataque' para observar el vector de explotación.</div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    this.container.querySelectorAll(".atk-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        this.currentScenarioId = tab.getAttribute("data-sc");
        this.render();
      });
    });

    const atkBtn = this.container.querySelector("#btn-toggle-attack");
    const defBtn = this.container.querySelector("#btn-toggle-defense");

    if (atkBtn) {
      atkBtn.addEventListener("click", () => {
        const sc = this.scenarios[this.currentScenarioId];
        sc.state.attackActive = !sc.state.attackActive;
        this.render();
        this.logState();
      });
    }

    if (defBtn) {
      defBtn.addEventListener("click", () => {
        const sc = this.scenarios[this.currentScenarioId];
        sc.state.defenseActive = !sc.state.defenseActive;
        this.render();
        this.logState();
      });
    }
  }

  logState() {
    const sc = this.scenarios[this.currentScenarioId];
    const logBox = this.container.querySelector("#atk-live-logs");
    if (!logBox) return;

    let msg = "";
    if (sc.state.attackActive && !sc.state.defenseActive) {
      msg = `<div class='log-entry log-danger'>[ATAQUE DETECTADO] Explotación activa: ${sc.name}. El atacante ha subvertido el tráfico sin oposición de seguridad.</div>`;
    } else if (sc.state.attackActive && sc.state.defenseActive) {
      msg = `<div class='log-entry log-success'>[DEFENSA ACTIVA] ${sc.defenseName} interceptó y descartó los paquetes maliciosos. ${sc.defenseEffect}</div>`;
    } else if (!sc.state.attackActive && sc.state.defenseActive) {
      msg = `<div class='log-entry log-info'>[DEFENSA EN GUARDIA] ${sc.defenseName} se encuentra vigilando la interfaz. Red protegida.</div>`;
    } else {
      msg = `<div class='log-entry log-info'>[REPOSO] Tráfico normal de red. No hay ataques en ejecución.</div>`;
    }

    logBox.innerHTML = msg + logBox.innerHTML;
  }
}

window.AttackSimulator = AttackSimulator;
