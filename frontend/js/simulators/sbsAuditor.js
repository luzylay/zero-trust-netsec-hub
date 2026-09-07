/**
 * SBS Res. N° 504-2021 Compliance & Maturity Assessment Engine
 * Interactive evaluation of cybersecurity controls for financial institutions and enterprise networks
 */

class SBSAuditor {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.controls = [
      {
        id: "c1",
        pillar: "Gobernanza",
        title: "Comité de Seguridad y CISO Independiente (Art. 4-7)",
        desc: "Existe un CISO designado formalmente con reporte directo al Directorio, con autonomía e independencia total de TI y Operaciones.",
        status: 2 // 0: No implementado, 1: Parcial, 2: Cumplimiento Total
      },
      {
        id: "c2",
        pillar: "Gestión de Riesgos",
        title: "Inventario de Activos y Modelado de Amenazas (Art. 8-10)",
        desc: "Se mantiene un inventario exhaustivo y actualizado de activos de información clasificados según la tríada CIA y análisis periódico de riesgos.",
        status: 2
      },
      {
        id: "c3",
        pillar: "Seguridad de Redes",
        title: "Segmentación de Red y Firewall Perimetral NGFW (Art. 11-12)",
        desc: "Redes segmentadas por zonas (Trust, Untrust, DMZ) con NGFW, inspección profunda DPI, y cifrado obligatorio en tránsito (TLS 1.3 / IPSec).",
        status: 1
      },
      {
        id: "c4",
        pillar: "Control de Accesos",
        title: "Gestión de Accesos Privilegiados - PAM y MFA (Art. 13)",
        desc: "MFA obligatorio para todos los administradores, bóveda de contraseñas rotativas (PAM) y auditoría granular de sesiones de comandos.",
        status: 1
      },
      {
        id: "c5",
        pillar: "Canales Digitales",
        title: "Autenticación Reforzada de Clientes y Antifraude (Art. 15-17)",
        desc: "Doble factor dinámico para transacciones monetarias y sistemas de monitoreo transaccional en tiempo real para detección de fraudes.",
        status: 2
      },
      {
        id: "c6",
        pillar: "Monitoreo y SOC",
        title: "SOC 24/7 y Gestión de Incidentes de Ciberseguridad (Art. 18-22)",
        desc: "Centro de Operaciones de Seguridad activo con SIEM/SOAR, plan probado de respuesta a incidentes y reporte formal a la SBS en los plazos normados.",
        status: 1
      },
      {
        id: "c7",
        pillar: "Vulnerabilidades",
        title: "Ethical Hacking y Gestión de Parches Anual (Art. 14)",
        desc: "Ejecución anual de pruebas de penetración (Red Team / Pentesting) y ciclo formal de remediación de vulnerabilidades críticas.",
        status: 2
      }
    ];
    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
  }

  calculateMaturity() {
    let totalMax = this.controls.length * 2;
    let currentScore = this.controls.reduce((sum, c) => sum + c.status, 0);
    let percentage = Math.round((currentScore / totalMax) * 100);

    let level = "Nivel Inicial";
    let badgeClass = "badge-danger";
    if (percentage >= 85) {
      level = "Nivel Optimizado (Cumplimiento Regulatorio Excelente)";
      badgeClass = "badge-success";
    } else if (percentage >= 65) {
      level = "Nivel Gestionado (Cumplimiento Aceptable con Brechas Menores)";
      badgeClass = "badge-warning";
    } else {
      level = "Nivel No Conforme (Alto Riesgo Sancionatorio SBS)";
    }

    return { percentage, level, badgeClass, currentScore, totalMax };
  }

  render() {
    const stats = this.calculateMaturity();

    this.container.innerHTML = `
      <div class="sbs-wrapper">
        <div class="sbs-header">
          <div class="sbs-title-block">
            <h3><i class="fas fa-balance-scale"></i> Matriz de Auditoría SBS Res. N° 504-2021</h3>
            <p>Evalúa el nivel de cumplimiento normativo y madurez de ciberseguridad exigido por la Superintendencia de Banca, Seguros y AFP.</p>
          </div>
          <div class="sbs-score-card">
            <div class="sbs-score-number">${stats.percentage}%</div>
            <div class="sbs-score-label ${stats.badgeClass}">${stats.level}</div>
            <div class="sbs-score-sub">${stats.currentScore} de ${stats.totalMax} puntos de control</div>
          </div>
        </div>

        <div class="sbs-controls-table-container">
          <table class="sbs-table">
            <thead>
              <tr>
                <th>Pilar / Artículo</th>
                <th>Requisito Normativo Obligatorio</th>
                <th>Descripción del Control Técnico</th>
                <th>Estado de Cumplimiento</th>
              </tr>
            </thead>
            <tbody>
              ${this.controls.map((c, idx) => `
                <tr class="sbs-row ${c.status === 2 ? "row-ok" : c.status === 1 ? "row-warn" : "row-fail"}">
                  <td><span class="pillar-tag">${c.pillar}</span></td>
                  <td><strong>${c.title}</strong></td>
                  <td><p class="sbs-desc-text">${c.desc}</p></td>
                  <td>
                    <div class="sbs-status-selector">
                      <button class="sbs-btn-stat ${c.status === 2 ? "active-ok" : ""}" data-idx="${idx}" data-val="2" title="Cumple 100%">
                        <i class="fas fa-check-circle"></i> Cumple
                      </button>
                      <button class="sbs-btn-stat ${c.status === 1 ? "active-warn" : ""}" data-idx="${idx}" data-val="1" title="Parcial">
                        <i class="fas fa-adjust"></i> Parcial
                      </button>
                      <button class="sbs-btn-stat ${c.status === 0 ? "active-fail" : ""}" data-idx="${idx}" data-val="0" title="No implementado">
                        <i class="fas fa-times-circle"></i> No Cumple
                      </button>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <div class="sbs-recommendations">
          <h4><i class="fas fa-lightbulb"></i> Diagnóstico y Recomendaciones de Adecuación:</h4>
          <ul>
            ${stats.percentage < 100 ? `
              <li><strong>Prioridad 1:</strong> Reforzar los controles en estado Parcial o No Cumple para mitigar hallazgos de auditoría externa de la SBS.</li>
              <li><strong>Prioridad 2:</strong> Asegurar que todos los registros de auditoría (logs) y grabaciones PAM se almacenen en repositorios WORM (Write Once, Read Many) inmutables.</li>
              <li><strong>Prioridad 3:</strong> Actualizar el simulacro anual del Plan de Respuesta a Incidentes de Ciberseguridad con participación activa de la Alta Dirección.</li>
            ` : `
              <li><i class="fas fa-check text-success"></i> La infraestructura cumple plenamente con los lineamientos técnicos de la Resolución SBS N° 504-2021. Mantener auditorías periódicas continuas.</li>
            `}
          </ul>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    this.container.querySelectorAll(".sbs-btn-stat").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-idx"));
        const val = parseInt(btn.getAttribute("data-val"));
        this.controls[idx].status = val;
        this.render();
      });
    });
  }
}

window.SBSAuditor = SBSAuditor;
