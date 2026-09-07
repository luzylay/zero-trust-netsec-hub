/**
 * NIST SP 800-63-3 Assurance Level Calculator & Architecture Advisor
 * Evaluates Identity Assurance Level (IAL), Authenticator Assurance Level (AAL),
 * and Federation Assurance Level (FAL) based on official risk impact categories.
 */

class NISTCalculator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.state = {
      financialLoss: "low",
      unauthorizedRelease: "low",
      personalSafety: "none",
      civilOrCriminal: "low",
      reputationDamage: "low",
      federatedService: "yes"
    };
    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
  }

  calculateLevels() {
    const scores = {
      financialLoss: this.state.financialLoss === "high" ? 3 : this.state.financialLoss === "mod" ? 2 : 1,
      unauthorizedRelease: this.state.unauthorizedRelease === "high" ? 3 : this.state.unauthorizedRelease === "mod" ? 2 : 1,
      personalSafety: this.state.personalSafety === "high" ? 3 : this.state.personalSafety === "mod" ? 2 : 1,
      civilOrCriminal: this.state.civilOrCriminal === "high" ? 3 : this.state.civilOrCriminal === "mod" ? 2 : 1,
      reputationDamage: this.state.reputationDamage === "high" ? 3 : this.state.reputationDamage === "mod" ? 2 : 1
    };

    const maxScore = Math.max(...Object.values(scores));

    let ial = "IAL1";
    let aal = "AAL1";
    let fal = "FAL1";

    if (maxScore === 3) {
      ial = "IAL3";
      aal = "AAL3";
      fal = "FAL3";
    } else if (maxScore === 2) {
      ial = "IAL2";
      aal = "AAL2";
      fal = "FAL2";
    }

    return { ial, aal, fal, maxScore };
  }

  render() {
    const results = this.calculateLevels();

    this.container.innerHTML = `
      <div class="nist-calc-wrapper">
        <div class="nist-calc-intro">
          <h3><i class="fas fa-calculator"></i> Calculadora Oficial de Niveles NIST SP 800-63-3</h3>
          <p>Selecciona los impactos de riesgo potencial ante un fallo o suplantación de identidad para determinar los niveles mínimos requeridos según las directrices oficiales del NIST.</p>
        </div>

        <div class="nist-calc-grid">
          <div class="nist-questions-panel">
            <h4>1. Evaluación de Impacto de Riesgo</h4>

            <div class="nist-q-group">
              <label>Pérdida Financiera Potencial:</label>
              <select class="nist-select" data-field="financialLoss">
                <option value="low" ${this.state.financialLoss === "low" ? "selected" : ""}>Baja (Pérdidas insignificantes o de fácil restitución)</option>
                <option value="mod" ${this.state.financialLoss === "mod" ? "selected" : ""}>Moderada (Pérdidas económicas sustanciales)</option>
                <option value="high" ${this.state.financialLoss === "high" ? "selected" : ""}>Alta (Quiebra, impacto financiero catastrófico)</option>
              </select>
            </div>

            <div class="nist-q-group">
              <label>Divulgación no autorizada de Datos Sensibles / Privacidad:</label>
              <select class="nist-select" data-field="unauthorizedRelease">
                <option value="low" ${this.state.unauthorizedRelease === "low" ? "selected" : ""}>Baja (Información pública o de bajo impacto)</option>
                <option value="mod" ${this.state.unauthorizedRelease === "mod" ? "selected" : ""}>Moderada (Datos personales identificables - PII)</option>
                <option value="high" ${this.state.unauthorizedRelease === "high" ? "selected" : ""}>Alta (Historias clínicas, secretos de estado, credenciales maestras)</option>
              </select>
            </div>

            <div class="nist-q-group">
              <label>Riesgo para la Seguridad Física o Salud Personal:</label>
              <select class="nist-select" data-field="personalSafety">
                <option value="none" ${this.state.personalSafety === "none" ? "selected" : ""}>Nulo / Mínimo</option>
                <option value="mod" ${this.state.personalSafety === "mod" ? "selected" : ""}>Moderado (Lesiones leves o peligro potencial)</option>
                <option value="high" ${this.state.personalSafety === "high" ? "selected" : ""}>Alto (Amenaza a la vida, infraestructuras críticas SCADA)</option>
              </select>
            </div>

            <div class="nist-q-group">
              <label>Riesgo de Responsabilidad Legal o Penal:</label>
              <select class="nist-select" data-field="civilOrCriminal">
                <option value="low" ${this.state.civilOrCriminal === "low" ? "selected" : ""}>Bajo (Sanciones menores)</option>
                <option value="mod" ${this.state.civilOrCriminal === "mod" ? "selected" : ""}>Moderado (Demandas civiles o multas regulatorias)</option>
                <option value="high" ${this.state.civilOrCriminal === "high" ? "selected" : ""}>Alto (Enjuiciamiento penal o revocación de licencia bancaria)</option>
              </select>
            </div>

            <div class="nist-q-group">
              <label>Impacto en la Reputación u Operatividad del Negocio:</label>
              <select class="nist-select" data-field="reputationDamage">
                <option value="low" ${this.state.reputationDamage === "low" ? "selected" : ""}>Bajo (Incomodidad temporal)</option>
                <option value="mod" ${this.state.reputationDamage === "mod" ? "selected" : ""}>Moderado (Pérdida de confianza pública y clientes)</option>
                <option value="high" ${this.state.reputationDamage === "high" ? "selected" : ""}>Alto (Cese definitivo de operaciones)</option>
              </select>
            </div>
          </div>

          <div class="nist-results-panel">
            <h4>2. Niveles de Aseguramiento Dictaminados</h4>

            <div class="nist-level-cards">
              <div class="nist-level-card card-${results.ial.toLowerCase()}">
                <div class="nl-badge">${results.ial}</div>
                <div class="nl-title">Identity Assurance Level (SP 800-63A)</div>
                <div class="nl-desc">${this.getIalDescription(results.ial)}</div>
              </div>

              <div class="nist-level-card card-${results.aal.toLowerCase()}">
                <div class="nl-badge">${results.aal}</div>
                <div class="nl-title">Authenticator Assurance Level (SP 800-63B)</div>
                <div class="nl-desc">${this.getAalDescription(results.aal)}</div>
              </div>

              <div class="nist-level-card card-${results.fal.toLowerCase()}">
                <div class="nl-badge">${results.fal}</div>
                <div class="nl-title">Federation Assurance Level (SP 800-63C)</div>
                <div class="nl-desc">${this.getFalDescription(results.fal)}</div>
              </div>
            </div>

            <div class="nist-recs-box">
              <h5><i class="fas fa-clipboard-check"></i> Requisitos Técnicos Obligatorios:</h5>
              <ul>
                ${this.getTechnicalRequirements(results.aal, results.ial)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  getIalDescription(level) {
    if (level === "IAL1") return "Identidad no verificada. Se acepta auto-declaración de atributos sin soporte documental oficial.";
    if (level === "IAL2") return "Prueba remota o presencial con verificación de documentos oficiales (DNIe / Pasaporte) con validación biométrica o postal.";
    return "Presencia física obligatoria o supervisada en tiempo real con 2 documentos de identidad de alta seguridad y biometría forense.";
  }

  getAalDescription(level) {
    if (level === "AAL1") return "Autenticación de 1 factor (Contraseña memorizada o token de software básico).";
    if (level === "AAL2") return "Autenticación Multifactor (MFA) obligatoria con 2 factores independientes (ej. Contraseña + Push OTP / App Authenticator).";
    return "MFA basado en Hardware Criptográfico Resistente a Phishing (FIDO2 / WebAuthn Hardware Key o Smart Card) con Channel Binding.";
  }

  getFalDescription(level) {
    if (level === "FAL1") return "Aserción SAML/OIDC firmada por el Identity Provider sobre canal TLS seguro.";
    if (level === "FAL2") return "Aserción firmada por el IdP y cifrada para la Relying Party.";
    return "Aserción firmada, cifrada y con clave vinculada al sujeto (Holder-of-Key).";
  }

  getTechnicalRequirements(aal, ial) {
    let list = "";
    if (aal === "AAL1") {
      list += "<li>Contraseña de longitud mínima de 8 caracteres.</li>";
      list += "<li>Cotejo obligatorio contra listas negras de contraseñas vulneradas.</li>";
      list += "<li>Cifrado en tránsito mediante TLS 1.3.</li>";
    } else if (aal === "AAL2") {
      list += "<li>Autenticación Multifactor (MFA) obligatoria en cada inicio de sesión.</li>";
      list += "<li>Prohibición de SMS como segundo factor exclusivo para transacciones críticas.</li>";
      list += "<li>Tokens TOTP/HOTP o notificaciones Push firmadas criptográficamente.</li>";
      list += "<li>Límites de reintentos y bloqueo de fuerza bruta mediante CAPTCHA o rate limiting.</li>";
    } else {
      list += "<li><strong>Token FIDO2 / WebAuthn Level 3 o PIV/CAC Hardware Security Key obligatorio.</strong></li>";
      list += "<li>Clave privada no exportable protegida en chip resistente a manipulación física (Tamper-Resistant Hardware).</li>";
      list += "<li>Enlace de canal criptográfico (Channel Binding) inmune a ataques Man-in-the-Middle y Reverse Proxies de Phishing (ej. Evilginx).</li>";
    }
    return list;
  }

  bindEvents() {
    this.container.querySelectorAll(".nist-select").forEach(sel => {
      sel.addEventListener("change", (e) => {
        const field = e.target.getAttribute("data-field");
        this.state[field] = e.target.value;
        this.render();
      });
    });
  }
}

window.NISTCalculator = NISTCalculator;
