// Cross-Browser In-Memory Storage Fallback (Safari Private Browsing & Restricted Contexts)
const _memoryStorage = {};
const safeStorage = {
  getItem(key) {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {}
    return _memoryStorage[key] || null;
  },
  setItem(key, value) {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch (e) {}
    _memoryStorage[key] = String(value);
  }
};

// Cross-Browser Clipboard Helper with legacy execCommand fallback
async function copyTextToClipboard(text) {
  if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {}
  }
  try {
    if (typeof document !== "undefined") {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {}
  return false;
}

class StudySpaceApp {
  constructor() {
    this.currentView = "dashboard";
    this.currentUnitId = "unit-1";
    this.currentLessonId = "u1-s1";
    this.currentLabId = "lab-aaa-cisco";
    this.currentQuizIdx = 0;
    this.quizScore = 0;
    this.currentFcIdx = 0;
    
    this.completedLessons = JSON.parse(safeStorage.getItem("netsec_completed_lessons") || "[]");
    this.audioBot = typeof window !== "undefined" && typeof window.AudioBot !== "undefined" ? new window.AudioBot() : null;
    
    this.init();
  }

  init() {
    this.bindGlobalEvents();
    this.renderCurrentView();
    this.updateProgressWidget();
  }

  bindGlobalEvents() {
    // Mobile Sidebar Drawer Toggle & Backdrop
    const sidebar = document.getElementById("main-sidebar");
    const sidebarToggleBtn = document.getElementById("btn-sidebar-toggle");
    const sidebarBackdrop = document.getElementById("sidebar-backdrop");

    const toggleSidebar = (forceState) => {
      if (!sidebar) return;
      const shouldOpen = typeof forceState === "boolean" ? forceState : !sidebar.classList.contains("open");
      if (shouldOpen) {
        sidebar.classList.add("open");
        if (sidebarBackdrop) sidebarBackdrop.classList.add("active");
        document.body.classList.add("sidebar-locked");
      } else {
        sidebar.classList.remove("open");
        if (sidebarBackdrop) sidebarBackdrop.classList.remove("active");
        document.body.classList.remove("sidebar-locked");
      }
    };

    if (sidebarToggleBtn) {
      sidebarToggleBtn.addEventListener("click", () => toggleSidebar());
    }

    if (sidebarBackdrop) {
      sidebarBackdrop.addEventListener("click", () => toggleSidebar(false));
    }

    // Sidebar nav items
    document.querySelectorAll(".nav-item").forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const view = item.getAttribute("data-view");
        if (view) {
          this.navigateTo(view);
          if (window.innerWidth <= 1024) {
            toggleSidebar(false);
          }
        }
      });
    });

    // Search Trigger and Modal
    const searchTrigger = document.getElementById("search-trigger-btn");
    const searchModal = document.getElementById("search-modal-overlay");
    const modalInput = document.getElementById("modal-search-input");
    const closeSearchBtn = document.getElementById("btn-close-search");

    const openSearch = () => {
      searchModal.classList.add("open");
      modalInput.focus();
    };

    const closeSearch = () => {
      searchModal.classList.remove("open");
      modalInput.value = "";
      document.getElementById("search-results-box").innerHTML = "";
    };

    if (searchTrigger) searchTrigger.addEventListener("click", openSearch);
    if (closeSearchBtn) closeSearchBtn.addEventListener("click", closeSearch);
    
    if (searchModal) {
      searchModal.addEventListener("click", (e) => {
        if (e.target === searchModal) closeSearch();
      });
    }

    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      } else if (e.key === "Escape" && searchModal.classList.contains("open")) {
        closeSearch();
      }
    });

    if (modalInput) {
      modalInput.addEventListener("input", (e) => {
        this.handleSearch(e.target.value);
      });
    }

    // Export study guide button
    const exportBtn = document.getElementById("btn-export-notes");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        this.exportStudyGuide();
      });
    }

    // Global Topbar Audio Button
    const topbarAudioBtn = document.getElementById("btn-topbar-audio");
    const topbarAudioText = document.getElementById("topbar-audio-text");
    if (topbarAudioBtn && this.audioBot) {
      topbarAudioBtn.addEventListener("click", () => {
        if (!this.audioBot.isPlaying) {
          const textToSpeak = this.getCurrentReadableContent();
          this.audioBot.speak(textToSpeak);
        } else if (this.audioBot.isPaused) {
          this.audioBot.resume();
        } else {
          this.audioBot.pause();
        }
      });

      this.audioBot.onStateChange((state) => {
        const icon = topbarAudioBtn.querySelector("i");
        if (state.isPlaying && !state.isPaused) {
          topbarAudioBtn.classList.add("playing");
          if (icon) icon.className = "fas fa-pause";
          if (topbarAudioText) topbarAudioText.textContent = "Pausar";
        } else if (state.isPaused) {
          topbarAudioBtn.classList.add("playing");
          if (icon) icon.className = "fas fa-play";
          if (topbarAudioText) topbarAudioText.textContent = "Reanudar";
        } else {
          topbarAudioBtn.classList.remove("playing");
          if (icon) icon.className = "fas fa-volume-high";
          if (topbarAudioText) topbarAudioText.textContent = "Escuchar";
        }
      });
    }

    // Accessible Alt + P shortcut to toggle AudioBot reading
    document.addEventListener("keydown", (e) => {
      if (e.altKey && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        const playBtn = document.getElementById("btn-audiobot-toggle") || document.getElementById("btn-topbar-audio");
        if (playBtn) playBtn.click();
      }
    });
  }

  getCurrentReadableContent() {
    if (this.currentView === "curriculum") {
      const unit = window.CURRICULUM_DATA.find(u => u.id === this.currentUnitId) || window.CURRICULUM_DATA[0];
      const lesson = unit.sessions.find(s => s.id === this.currentLessonId) || unit.sessions[0];
      return `Unidad ${unit.unitNumber}. ${lesson.title}. ${lesson.content}`;
    }
    if (this.currentView === "standards") {
      const std = window.STANDARDS_DATA;
      return `Estándares Internacionales NIST SP 800-63-3 y Marco SBS 504-2021. ${std.nist.overview}. Marco normativo SBS: ${std.sbs504.title}.`;
    }
    if (this.currentView === "academic-research") {
      const data = window.ACADEMIC_RESEARCH_DATA || [];
      const topics = data.map(d => `${d.category}: ${d.publications.map(p => p.title + '. ' + p.keyTakeaway).join('. ')}`).join('. ');
      return `Compendio de Investigación Académica en Seguridad de Redes. ${topics}`;
    }
    if (this.currentView === "labs") {
      const lab = window.LABS_DATA.find(l => l.id === this.currentLabId) || window.LABS_DATA[0];
      const steps = lab.steps.map(s => `Paso ${s.stepNumber}: ${s.title}. ${s.instructions}`).join('. ');
      return `Laboratorio: ${lab.title}. Topología: ${lab.topology}. Objetivos: ${lab.objectives.join(', ')}. ${steps}`;
    }
    if (this.currentView === "polyglot-code") {
      const data = window.ENTERPRISE_CODE_DATA || [];
      const topic = data.find(t => t.id === this.currentCodeTopicId) || data[0];
      return `Patrones Empresariales de Código Polyglot. ${topic.title}. ${topic.description}.`;
    }
    if (this.currentView === "flashcards") {
      const card = window.FLASHCARDS_DATA[this.currentFcIdx];
      return `Tarjeta de Estudio: Categoría ${card.category}. Pregunta: ${card.front}. Respuesta: ${card.back}`;
    }
    if (this.currentView === "quiz") {
      const quiz = window.QUIZZES_DATA[this.currentQuizIdx];
      const options = quiz.options.map((o, i) => `Opción ${i + 1}: ${o}`).join('. ');
      return `Evaluación: Pregunta ${this.currentQuizIdx + 1}. ${quiz.question}. Opciones: ${options}`;
    }
    if (this.currentView === "dashboard") {
      return "Network Security and Digital Identity Hub. Espacio integral de aprendizaje de seguridad en redes, protocolos AAA, NIST SP 800-63-3, resolución SBS 504-2021 y laboratorios prácticos.";
    }
    const contentArea = document.getElementById("main-view-container");
    return contentArea ? contentArea.innerText : "Contenido de seguridad en redes.";
  }

  navigateTo(viewId, params = {}) {
    if (this.audioBot) {
      this.audioBot.stop();
    }
    this.currentView = viewId;
    if (params.unitId) this.currentUnitId = params.unitId;
    if (params.lessonId) this.currentLessonId = params.lessonId;
    if (params.labId) this.currentLabId = params.labId;

    // Update active nav-item
    document.querySelectorAll(".nav-item").forEach(el => {
      if (el.getAttribute("data-view") === viewId) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });

    this.renderCurrentView();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  updateProgressWidget() {
    const totalLessons = 13;
    const completedCount = this.completedLessons.length;
    const pct = Math.min(100, Math.round((completedCount / totalLessons) * 100));

    const fill = document.getElementById("sidebar-progress-fill");
    const label = document.getElementById("sidebar-progress-pct");
    if (fill) fill.style.width = `${pct}%`;
    if (label) label.textContent = `${pct}%`;
  }

  markLessonComplete(lessonId) {
    if (!this.completedLessons.includes(lessonId)) {
      this.completedLessons.push(lessonId);
      safeStorage.setItem("netsec_completed_lessons", JSON.stringify(this.completedLessons));
      this.updateProgressWidget();
    }
  }

  renderCurrentView() {
    const mainContainer = document.getElementById("main-view-container");
    if (!mainContainer) return;

    switch (this.currentView) {
      case "dashboard":
        this.renderDashboard(mainContainer);
        break;
      case "curriculum":
        this.renderCurriculum(mainContainer);
        break;
      case "standards":
        this.renderStandards(mainContainer);
        break;
      case "academic-research":
        this.renderAcademicResearch(mainContainer);
        break;
      case "simulator-cli":
        this.renderCliSimulator(mainContainer);
        break;
      case "simulator-packet":
        this.renderPacketSimulator(mainContainer);
        break;
      case "simulator-nist":
        this.renderNistSimulator(mainContainer);
        break;
      case "simulator-sbs":
        this.renderSbsSimulator(mainContainer);
        break;
      case "simulator-attack":
        this.renderAttackSimulator(mainContainer);
        break;
      case "code-hub":
        this.renderCodeHub(mainContainer);
        break;
      case "labs":
        this.renderLabs(mainContainer);
        break;
      case "flashcards":
        this.renderFlashcards(mainContainer);
        break;
      case "quizzes":
        this.renderQuizzes(mainContainer);
        break;
      default:
        this.renderDashboard(mainContainer);
    }

    if (window.renderMermaidDiagrams) {
      window.renderMermaidDiagrams();
    }
  }

  /* ---------------- VIEW RENDERERS ---------------- */

  renderDashboard(container) {
    container.innerHTML = `
      <div class="hero-banner">
        <span class="hero-badge"><i class="fas fa-shield-alt"></i> Espacio Oficial de Aprendizaje y Práctica</span>
        <h1 class="hero-title">Network Security & Digital Identity Hub</h1>
        <p class="hero-subtitle">
          Entorno interactivo integral para el dominio teórico y práctico de la seguridad en redes de datos, gestión moderna de identidad (NIST SP 800-63), protocolos AAA (RADIUS, TACACS+, DIAMETER, Kerberos), seguridad perimetral, túneles VPN IPSec y cumplimiento normativo de ciberseguridad (SBS Res. 504-2021).
        </p>
      </div>

      <div class="units-grid">
        ${window.CURRICULUM_DATA.map(u => `
          <div class="unit-card" data-unit="${u.id}">
            <div>
              <div class="unit-card-header">
                <div class="unit-number-badge">${u.unitNumber}</div>
                <span class="unit-weeks-tag">${u.weeks}</span>
              </div>
              <h3 class="unit-card-title">${u.title.split(": ")[1] || u.title}</h3>
              <p class="unit-card-desc">${u.summary}</p>
            </div>
            <div class="unit-card-footer">
              <span>Explorar Sesiones (${u.sessions.length})</span>
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        `).join("")}
      </div>

      <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 20px; color: #fff;">
        <i class="fas fa-flask text-cyan"></i> Laboratorios y Simuladores Interactivos
      </h2>

      <div class="units-grid">
        <div class="unit-card" onclick="app.navigateTo('simulator-cli')">
          <div>
            <div class="unit-card-header">
              <div class="unit-number-badge"><i class="fas fa-terminal"></i></div>
              <span class="unit-weeks-tag">Consola IOS</span>
            </div>
            <h3 class="unit-card-title">Simulador Terminal Cisco IOS AAA</h3>
            <p class="unit-card-desc">Emulador interactivo de línea de comandos de Cisco para configurar 'aaa new-model', servidores RADIUS y TACACS+, listas de métodos y pruebas de acceso.</p>
          </div>
          <div class="unit-card-footer">
            <span>Iniciar Terminal CLI</span>
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>

        <div class="unit-card" onclick="app.navigateTo('simulator-packet')">
          <div>
            <div class="unit-card-header">
              <div class="unit-number-badge"><i class="fas fa-network-wired"></i></div>
              <span class="unit-weeks-tag">Análisis L7</span>
            </div>
            <h3 class="unit-card-title">Visualizador de Flujos RADIUS / TACACS+ / Kerberos</h3>
            <p class="unit-card-desc">Inspección animada paso a paso de datagramas UDP 1812, conexiones TCP 49 y tickets TGT/Service Tickets con desglose de AVPs y cifrado.</p>
          </div>
          <div class="unit-card-footer">
            <span>Ver Animación de Flujos</span>
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>

        <div class="unit-card" onclick="app.navigateTo('simulator-nist')">
          <div>
            <div class="unit-card-header">
              <div class="unit-number-badge"><i class="fas fa-id-card"></i></div>
              <span class="unit-weeks-tag">NIST Suite</span>
            </div>
            <h3 class="unit-card-title">Calculadora de Niveles NIST SP 800-63-3</h3>
            <p class="unit-card-desc">Herramienta de toma de decisiones para determinar niveles IAL1-3, AAL1-3 y FAL1-3 según impacto de riesgo y arquitectura MFA FIDO2.</p>
          </div>
          <div class="unit-card-footer">
            <span>Calcular Niveles</span>
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>

        <div class="unit-card" onclick="app.navigateTo('simulator-sbs')">
          <div>
            <div class="unit-card-header">
              <div class="unit-number-badge"><i class="fas fa-balance-scale"></i></div>
              <span class="unit-weeks-tag">SBS 504-2021</span>
            </div>
            <h3 class="unit-card-title">Auditor Normativo SBS Res. N° 504-2021</h3>
            <p class="unit-card-desc">Evaluación interactiva de cumplimiento de ciberseguridad financiera: CISO, SOC 24/7, PAM, segmentación perimetral y canales digitales.</p>
          </div>
          <div class="unit-card-footer">
            <span>Auditar Cumplimiento</span>
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll(".unit-card[data-unit]").forEach(card => {
      card.addEventListener("click", () => {
        const uId = card.getAttribute("data-unit");
        const u = window.CURRICULUM_DATA.find(x => x.id === uId);
        this.navigateTo("curriculum", { unitId: uId, lessonId: u.sessions[0].id });
      });
    });
  }

  renderCurriculum(container) {
    const unit = window.CURRICULUM_DATA.find(u => u.id === this.currentUnitId) || window.CURRICULUM_DATA[0];
    const lesson = unit.sessions.find(s => s.id === this.currentLessonId) || unit.sessions[0];

    const currentSessionIdx = unit.sessions.findIndex(s => s.id === lesson.id);
    const prevLesson = currentSessionIdx > 0 ? unit.sessions[currentSessionIdx - 1] : null;
    const nextLesson = currentSessionIdx < unit.sessions.length - 1 ? unit.sessions[currentSessionIdx + 1] : null;

    const currentUnitIdx = window.CURRICULUM_DATA.findIndex(u => u.id === unit.id);
    const nextUnit = !nextLesson && currentUnitIdx < window.CURRICULUM_DATA.length - 1 ? window.CURRICULUM_DATA[currentUnitIdx + 1] : null;
    const prevUnit = !prevLesson && currentUnitIdx > 0 ? window.CURRICULUM_DATA[currentUnitIdx - 1] : null;

    container.innerHTML = `
      <div class="section-nav-tabs">
        ${window.CURRICULUM_DATA.map(u => `
          <button class="sec-tab ${u.id === unit.id ? "active" : ""}" data-unit-tab="${u.id}">
            <i class="fas fa-layer-group"></i> Unidad ${u.unitNumber}
          </button>
        `).join("")}
      </div>

      <div class="curriculum-layout">
        <!-- Sidebar de sesiones de la unidad -->
        <div class="curriculum-sidebar-wrap">
          <div class="curriculum-sidebar-card">
            <div class="curriculum-sidebar-header">
              <h4 class="curriculum-sidebar-title">
                <i class="fas fa-list-check text-cyan"></i> Sesiones Unidad ${unit.unitNumber}
              </h4>
              <span class="curriculum-sidebar-badge">${unit.sessions.length} Temas</span>
            </div>
            <div class="curriculum-session-list">
              ${unit.sessions.map((s, idx) => {
                const isCompleted = this.completedLessons.includes(s.id);
                const isActive = s.id === lesson.id;
                return `
                  <button class="curriculum-session-btn ${isActive ? "active" : ""}" data-lesson-btn="${s.id}">
                    <div class="session-btn-icon">
                      <i class="fas ${isCompleted ? "fa-check-circle text-emerald" : (isActive ? "fa-play text-cyan" : "fa-book-open")}"></i>
                    </div>
                    <div class="session-btn-text">
                      <span class="session-btn-num">Sesión ${unit.unitNumber}.${idx + 1}</span>
                      <span class="session-btn-label">${s.title.split(": ")[1] || s.title}</span>
                    </div>
                  </button>
                `;
              }).join("")}
            </div>
          </div>
        </div>

        <!-- Contenido de la lección -->
        <div class="curriculum-main-content">
          <article class="lesson-article">
            <!-- Header con metadatos de sesión -->
            <div class="session-header-block">
              <div class="session-header-top">
                <div class="session-breadcrumbs">
                  <span>Temario</span>
                  <i class="fas fa-chevron-right"></i>
                  <span>Unidad ${unit.unitNumber} (${unit.weeks})</span>
                  <i class="fas fa-chevron-right"></i>
                  <span class="breadcrumb-active">${lesson.title.split(": ")[0]}</span>
                </div>
                <button class="btn-cyber-primary btn-mark-done" id="btn-mark-lesson-done">
                  <i class="fas ${this.completedLessons.includes(lesson.id) ? "fa-check-circle text-emerald" : "fa-check"}"></i>
                  <span>${this.completedLessons.includes(lesson.id) ? "Sesión Completada" : "Marcar como Aprendida"}</span>
                </button>
              </div>

              <h1 class="session-main-heading">${lesson.title}</h1>

              ${lesson.topics && lesson.topics.length > 0 ? `
                <div class="session-topics-wrap">
                  ${lesson.topics.map(t => `
                    <span class="session-topic-tag"><i class="fas fa-tag"></i> ${t}</span>
                  `).join("")}
                </div>
              ` : ""}
            </div>

            <!-- AudioBot Voice Reader Toolbar Mount -->
            <div id="audiobot-mount-slot"></div>

            <!-- Cuerpo formateado de la lección -->
            <div class="lesson-markdown-body">
              ${this.parseMarkdown(lesson.content)}
            </div>

            <!-- Footer con navegación secuencial -->
            <div class="session-footer-nav">
              ${prevLesson ? `
                <button class="btn-session-nav prev" onclick="app.navigateTo('curriculum', { unitId: '${unit.id}', lessonId: '${prevLesson.id}' })">
                  <i class="fas fa-arrow-left"></i>
                  <div class="nav-btn-text">
                    <span class="nav-sub">Sesión Anterior</span>
                    <span class="nav-title">${prevLesson.title.split(":")[0]}</span>
                  </div>
                </button>
              ` : (prevUnit ? `
                <button class="btn-session-nav prev" onclick="app.navigateTo('curriculum', { unitId: '${prevUnit.id}', lessonId: '${prevUnit.sessions[prevUnit.sessions.length - 1].id}' })">
                  <i class="fas fa-arrow-left"></i>
                  <div class="nav-btn-text">
                    <span class="nav-sub">Unidad Anterior</span>
                    <span class="nav-title">Unidad ${prevUnit.unitNumber}</span>
                  </div>
                </button>
              ` : `<div></div>`)}

              ${nextLesson ? `
                <button class="btn-session-nav next" onclick="app.navigateTo('curriculum', { unitId: '${unit.id}', lessonId: '${nextLesson.id}' })">
                  <div class="nav-btn-text text-right">
                    <span class="nav-sub">Siguiente Sesión</span>
                    <span class="nav-title">${nextLesson.title.split(":")[0]}</span>
                  </div>
                  <i class="fas fa-arrow-right"></i>
                </button>
              ` : (nextUnit ? `
                <button class="btn-session-nav next" onclick="app.navigateTo('curriculum', { unitId: '${nextUnit.id}', lessonId: '${nextUnit.sessions[0].id}' })">
                  <div class="nav-btn-text text-right">
                    <span class="nav-sub">Siguiente Unidad</span>
                    <span class="nav-title">Unidad ${nextUnit.unitNumber}</span>
                  </div>
                  <i class="fas fa-arrow-right"></i>
                </button>
              ` : `<div></div>`)}
            </div>
          </article>
        </div>
      </div>
    `;

    if (this.audioBot) {
      this.audioBot.renderControlBar("audiobot-mount-slot", () => {
        return `${lesson.title}. ${lesson.content}`;
      });
    }

    container.querySelectorAll("[data-unit-tab]").forEach(tab => {
      tab.addEventListener("click", () => {
        const uId = tab.getAttribute("data-unit-tab");
        const u = window.CURRICULUM_DATA.find(x => x.id === uId);
        this.navigateTo("curriculum", { unitId: uId, lessonId: u.sessions[0].id });
      });
    });

    container.querySelectorAll("[data-lesson-btn]").forEach(btn => {
      btn.addEventListener("click", () => {
        const lId = btn.getAttribute("data-lesson-btn");
        this.navigateTo("curriculum", { unitId: unit.id, lessonId: lId });
      });
    });

    const markBtn = container.querySelector("#btn-mark-lesson-done");
    if (markBtn) {
      markBtn.addEventListener("click", () => {
        this.markLessonComplete(lesson.id);
        markBtn.innerHTML = "<i class='fas fa-check-circle text-emerald'></i> <span>Sesión Completada</span>";
      });
    }
  }

  renderStandards(container) {
    const std = window.STANDARDS_DATA;

    container.innerHTML = `
      <div class="hero-banner">
        <span class="hero-badge"><i class="fas fa-award"></i> Repositorio de Normativas Oficiales</span>
        <h1 class="hero-title">Estándares Internacionales y Marco Regulatorio</h1>
        <p class="hero-subtitle">
          Indagación exhaustiva y desglose técnico oficial de la suite <strong>NIST SP 800-63-3</strong>, la <strong>Resolución SBS N° 504-2021</strong>, y los <strong>RFCs fundamentales de la IETF</strong> (RFC 2865, 2866, 8907, 6733, 4120, 4301).
        </p>
      </div>

      <div class="lesson-article">
        <!-- AudioBot Toolbar -->
        <div id="audiobot-mount-standards"></div>

        <h2><i class="fas fa-fingerprint text-cyan"></i> NIST SP 800-63-3: Digital Identity Guidelines</h2>
        <p>${std.nist.overview}</p>

        <h3 style="margin-top: 24px;">Adendas y Niveles de Aseguramiento (xAL)</h3>
        <div class="units-grid" style="margin-top: 16px;">
          ${std.nist.components.map(c => `
            <div class="unit-card" style="cursor: default;">
              <div>
                <div class="hero-badge">${c.code}</div>
                <h4 style="font-size: 16px; margin: 8px 0; color: #fff;">${c.name}</h4>
                <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">${c.focus}</p>
                ${c.levels ? `
                  <ul style="font-size: 12px; color: #cbd5e1; padding-left: 18px;">
                    ${c.levels.map(l => `<li><strong>${l.level}:</strong> ${l.description}</li>`).join("")}
                  </ul>
                ` : ""}
                ${c.keyConcepts ? `
                  <ul style="font-size: 12px; color: #cbd5e1; padding-left: 18px;">
                    ${c.keyConcepts.map(k => `<li>${k}</li>`).join("")}
                  </ul>
                ` : ""}
              </div>
            </div>
          `).join("")}
        </div>

        <h3 style="margin-top: 32px;">Directrices Modernas de Contraseñas (NIST SP 800-63B)</h3>
        <table>
          <thead>
            <tr>
              <th>Parámetro / Regla</th>
              <th>Postura Oficial del NIST</th>
              <th>Justificación Criptográfica y de Usabilidad</th>
            </tr>
          </thead>
          <tbody>
            ${std.nist.components[2].passwordGuidelines.map(p => `
              <tr>
                <td><strong>${p.rule}</strong></td>
                <td><span style="color: var(--accent-cyan);">${p.nistStance}</span></td>
                <td>${p.reason}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <div class="lesson-article">
        <h2><i class="fas fa-balance-scale text-violet"></i> ${std.sbs504.title}</h2>
        <p><strong>Autoridad Emisora:</strong> ${std.sbs504.authority} | <strong>Alcance:</strong> ${std.sbs504.scope}</p>

        <div style="display: flex; flex-direction: column; gap: 20px; margin-top: 20px;">
          ${std.sbs504.pillars.map(p => `
            <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <h4 style="color: var(--accent-cyan); font-size: 16px;">${p.pillar}</h4>
                <span class="pillar-tag">${p.articles}</span>
              </div>
              <ul style="margin-left: 20px; font-size: 13px; color: #cbd5e1;">
                ${p.details.map(d => `<li>${d}</li>`).join("")}
              </ul>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="lesson-article">
        <h2><i class="fas fa-file-contract text-emerald"></i> Registro Oficial de RFCs de Protocolos</h2>
        <table>
          <thead>
            <tr>
              <th>RFC</th>
              <th>Título y Estado</th>
              <th>Capa de Transporte y Puertos</th>
              <th>Características Clave</th>
            </tr>
          </thead>
          <tbody>
            ${std.rfcs.map(r => `
              <tr>
                <td><code>${r.rfc}</code></td>
                <td><strong>${r.title}</strong><br><span style="font-size: 11px; color: var(--text-dim);">${r.status}</span></td>
                <td><span style="color: var(--accent-amber); font-family: var(--font-mono); font-size: 12px;">${r.transport}</span></td>
                <td>${r.characteristics}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;

    if (this.audioBot) {
      this.audioBot.renderControlBar("audiobot-mount-standards", () => {
        return "Estandares Internacionales NIST SP 800-63-3 y Resolucion SBS 504-2021. " + std.nist.overview;
      });
    }
  }

  renderAcademicResearch(container) {
    const data = window.ACADEMIC_RESEARCH_DATA || [];

    container.innerHTML = `
      <div class="hero-banner">
        <span class="hero-badge"><i class="fas fa-microscope"></i> Indexación Científica & Peer-Reviewed</span>
        <h1 class="hero-title">Compendio de Investigación Académica (IEEE, Scopus, ACM)</h1>
        <p class="hero-subtitle">
          Revisión formal de literatura científica de alto impacto, criptoanálisis de protocolos, modelos matemáticos de entropía y estado del arte en Zero Trust Architecture (NIST SP 800-207).
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 28px;">
        ${data.map(cat => `
          <div class="lesson-article">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <h2 style="margin-bottom: 0; padding-bottom: 0; border-bottom: none;"><i class="fas fa-book text-cyan"></i> ${cat.category}</h2>
              <span class="pillar-tag">${cat.badge}</span>
            </div>

            <div class="units-grid" style="grid-template-columns: 1fr; gap: 16px;">
              ${cat.publications.map(p => `
                <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 20px;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
                    <h4 style="font-size: 16px; color: #fff; margin: 0;">${p.title}</h4>
                    <span style="font-size: 11px; background: rgba(0, 245, 255, 0.1); color: var(--accent-cyan); padding: 2px 8px; border-radius: 4px; font-family: var(--font-mono);">
                      DOI: ${p.doi}
                    </span>
                  </div>
                  <p style="font-size: 12px; color: var(--text-dim); margin-bottom: 10px;">
                    <strong>Autores:</strong> ${p.authors} | <strong>Publicación:</strong> ${p.journal} (${p.year}) | <strong>Impacto:</strong> ${p.citations}
                  </p>
                  <p style="font-size: 13px; color: #cbd5e1; background: rgba(0, 0, 0, 0.3); padding: 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--accent-cyan); margin-bottom: 0;">
                    <strong>Aporte Científico / Tesis:</strong> ${p.keyTakeaway}
                  </p>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `;

    if (this.audioBot) {
      this.audioBot.renderControlBar("audiobot-mount-research", () => {
        return this.getCurrentReadableContent();
      });
    }
  }

  renderCliSimulator(container) {
    container.innerHTML = `
      <div class="hero-banner" style="margin-bottom: 24px;">
        <span class="hero-badge"><i class="fas fa-terminal"></i> Laboratorio Práctico en Línea</span>
        <h1 class="hero-title">Cisco IOS AAA Terminal Simulator</h1>
        <p class="hero-subtitle">
          Practica en tiempo real la configuración completa de seguridad AAA en un Router Cisco 2911. Escribe comandos reales con autocompletado y validación de sintaxis.
        </p>
      </div>
      <div id="cli-simulator-mount"></div>
    `;

    setTimeout(() => {
      new window.CiscoCLISimulator("cli-simulator-mount");
    }, 50);
  }

  renderPacketSimulator(container) {
    container.innerHTML = `
      <div class="hero-banner" style="margin-bottom: 24px;">
        <span class="hero-badge"><i class="fas fa-microscope"></i> Análisis de Protocolos</span>
        <h1 class="hero-title">Visualizador de Flujos e Inspección de Paquetes</h1>
        <p class="hero-subtitle">
          Examina paso a paso el intercambio de mensajes entre el Cliente, NAS y Servidores de Autenticación para RADIUS, TACACS+ y Kerberos v5.
        </p>
      </div>
      <div id="packet-simulator-mount"></div>
    `;

    setTimeout(() => {
      new window.PacketFlowVisualizer("packet-simulator-mount");
    }, 50);
  }

  renderNistSimulator(container) {
    container.innerHTML = `
      <div class="hero-banner" style="margin-bottom: 24px;">
        <span class="hero-badge"><i class="fas fa-calculator"></i> Arquitectura de Identidad</span>
        <h1 class="hero-title">Calculadora de Niveles NIST SP 800-63-3</h1>
        <p class="hero-subtitle">
          Evalúa el impacto de riesgo y descubre los requisitos mandatorios de IAL, AAL y FAL según el marco normativo del NIST.
        </p>
      </div>
      <div id="nist-calculator-mount"></div>
    `;

    setTimeout(() => {
      new window.NISTCalculator("nist-calculator-mount");
    }, 50);
  }

  renderSbsSimulator(container) {
    container.innerHTML = `
      <div class="hero-banner" style="margin-bottom: 24px;">
        <span class="hero-badge"><i class="fas fa-balance-scale"></i> Auditoría Regulatoria</span>
        <h1 class="hero-title">Auditor de Ciberseguridad SBS Res. N° 504-2021</h1>
        <p class="hero-subtitle">
          Evalúa la conformidad normativa y brechas de seguridad exigidas a entidades financieras y redes corporativas.
        </p>
      </div>
      <div id="sbs-auditor-mount"></div>
    `;

    setTimeout(() => {
      new window.SBSAuditor("sbs-auditor-mount");
    }, 50);
  }

  renderAttackSimulator(container) {
    container.innerHTML = `
      <div class="hero-banner" style="margin-bottom: 24px;">
        <span class="hero-badge"><i class="fas fa-skull-crossbones"></i> Cyber Range Interactivo</span>
        <h1 class="hero-title">Simulador de Ataques y Defensas de Red</h1>
        <p class="hero-subtitle">
          Ejecuta simulaciones de ataques en Capa 2, 4 y 7 y activa contramedidas (DAI, DHCP Snooping, SYN Cookies, Sinkholing) para observar la mitigación en vivo.
        </p>
      </div>
      <div id="attack-simulator-mount"></div>
    `;

    setTimeout(() => {
      new window.AttackSimulator("attack-simulator-mount");
    }, 50);
  }

  renderCodeHub(container) {
    const data = window.ENTERPRISE_CODE_DATA || [];
    if (!this.currentCodeTopicId) this.currentCodeTopicId = data[0]?.id || "sec-radius";
    if (!this.currentLangKey) this.currentLangKey = "typescript";

    const topic = data.find(t => t.id === this.currentCodeTopicId) || data[0];
    const snippet = topic.snippets[this.currentLangKey] || "";

    container.innerHTML = `
      <div class="hero-banner" style="margin-bottom: 24px;">
        <span class="hero-badge"><i class="fas fa-code-branch"></i> Modern Enterprise Engineering</span>
        <h1 class="hero-title">Enterprise Polyglot Code Hub</h1>
        <p class="hero-subtitle">
          Patrones de código de nivel de producción utilizados por las empresas tecnológicas líderes (Tier-1 Tech, Fintech y Cloud Security) en los lenguajes de mayor demanda: <strong>TypeScript 5.7+</strong>, <strong>Python 3.12+</strong> y <strong>Go 1.23+</strong>.
        </p>
      </div>

      <div class="section-nav-tabs">
        ${data.map(t => `
          <button class="sec-tab ${t.id === topic.id ? "active" : ""}" data-topic-tab="${t.id}">
            ${t.title.split("(")[0]}
          </button>
        `).join("")}
      </div>

      <div class="lesson-article">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
          <div>
            <h2 style="margin-bottom: 4px; border-bottom: none; padding-bottom: 0;">${topic.title}</h2>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 0;">${topic.description}</p>
          </div>

          <div style="display: flex; gap: 8px; background: #090d16; padding: 4px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <button class="pv-tab ${this.currentLangKey === "typescript" ? "active" : ""}" data-lang="typescript">
              <i class="fab fa-js-square"></i> TypeScript
            </button>
            <button class="pv-tab ${this.currentLangKey === "python" ? "active" : ""}" data-lang="python">
              <i class="fab fa-python"></i> Python 3.12
            </button>
            <button class="pv-tab ${this.currentLangKey === "go" ? "active" : ""}" data-lang="go">
              <i class="fab fa-golang"></i> Go (Golang)
            </button>
          </div>
        </div>

        <div style="position: relative;">
          <pre style="background: #090d16; border: 1px solid var(--border-glow); font-size: 13px;"><code class="language-${this.currentLangKey}">${this.escapeHtml(snippet)}</code></pre>
          <button class="cli-btn btn-copy-polyglot" data-code="${encodeURIComponent(snippet)}" style="position: absolute; top: 12px; right: 12px;">
            <i class="fas fa-copy"></i> Copiar Código
          </button>
        </div>

        <div style="margin-top: 24px; background: rgba(0, 245, 255, 0.05); border: 1px solid rgba(0, 245, 255, 0.2); border-radius: var(--radius-md); padding: 18px;">
          <h4 style="color: var(--accent-cyan); margin-bottom: 8px;"><i class="fas fa-lightbulb"></i> ¿Por qué las empresas top eligen este patrón?</h4>
          <ul style="font-size: 13px; color: #cbd5e1; margin-left: 20px;">
            <li><strong>TypeScript:</strong> Tipado estricto, inmutabilidad y contratos de interfaz claros para microservicios y SDKs empresariales.</li>
            <li><strong>Python:</strong> Legibilidad, desarrollo ágil de SecOps, integración nativa con Netmiko, Scapy y frameworks de automatización.</li>
            <li><strong>Go:</strong> Concurrencia ultra eficiente con goroutines, baja latencia, cero recolección pesada de basura y empaquetado binario nativo para Kubernetes.</li>
          </ul>
        </div>
      </div>
    `;

    container.querySelectorAll("[data-topic-tab]").forEach(tab => {
      tab.addEventListener("click", () => {
        this.currentCodeTopicId = tab.getAttribute("data-topic-tab");
        this.renderCodeHub(container);
      });
    });

    container.querySelectorAll("[data-lang]").forEach(btn => {
      btn.addEventListener("click", () => {
        this.currentLangKey = btn.getAttribute("data-lang");
        this.renderCodeHub(container);
      });
    });

    const copyBtn = container.querySelector(".btn-copy-polyglot");
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const code = decodeURIComponent(copyBtn.getAttribute("data-code"));
        await copyTextToClipboard(code);
        copyBtn.innerHTML = "<i class='fas fa-check text-emerald'></i> ¡Copiado!";
        setTimeout(() => {
          copyBtn.innerHTML = "<i class='fas fa-copy'></i> Copiar Código";
        }, 2000);
      });
    }

    if (this.audioBot) {
      this.audioBot.renderControlBar("audiobot-mount-code", () => {
        return `${topic.title}. ${topic.description}. Beneficios del patrón de arquitectura en TypeScript, Python y Go.`;
      });
    }
  }

  renderLabs(container) {
    const lab = window.LABS_DATA.find(l => l.id === this.currentLabId) || window.LABS_DATA[0];

    container.innerHTML = `
      <div class="hero-banner" style="margin-bottom: 24px;">
        <span class="hero-badge"><i class="fas fa-laptop-code"></i> Guías Prácticas de Laboratorio</span>
        <h1 class="hero-title">Hands-On Labs & Configuración Paso a Paso</h1>
        <p class="hero-subtitle">
          Procedimientos detallados con topologías, instrucciones de Packet Tracer, capturas Wireshark y scripts de configuración listos para producción.
        </p>
      </div>

      <div class="section-nav-tabs">
        ${window.LABS_DATA.map(l => `
          <button class="sec-tab ${l.id === lab.id ? "active" : ""}" data-lab-tab="${l.id}">
            ${l.title.split(":")[0]}
          </button>
        `).join("")}
      </div>

      <div class="lesson-article">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <span class="hero-badge">${lab.unit} | ${lab.difficulty} | <i class="fas fa-clock"></i> ${lab.duration}</span>
            <h2>${lab.title}</h2>
          </div>
        </div>

        <!-- AudioBot Toolbar for Labs -->
        <div id="audiobot-mount-labs"></div>

        <div style="background: #090d16; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; margin-bottom: 24px;">
          <h4 style="color: var(--accent-cyan); margin-bottom: 6px;"><i class="fas fa-project-diagram"></i> Topología de Red:</h4>
          <p style="font-family: var(--font-mono); font-size: 13px; color: #cbd5e1; margin-bottom: 12px;">${lab.topology}</p>
          <h4 style="color: var(--accent-emerald); margin-bottom: 6px;"><i class="fas fa-bullseye"></i> Objetivos del Laboratorio:</h4>
          <ul style="margin-left: 20px; font-size: 13px; color: #cbd5e1;">
            ${lab.objectives.map(o => `<li>${o}</li>`).join("")}
          </ul>
        </div>

        <h3 style="margin-bottom: 20px;">Guía de Implementación Paso a Paso</h3>

        ${lab.steps.map(s => `
          <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 20px; margin-bottom: 20px;">
            <h4 style="color: #fff; font-size: 16px; margin-bottom: 10px;">
              <span style="color: var(--accent-cyan); font-weight: 800;">Paso ${s.stepNumber}:</span> ${s.title}
            </h4>
            <p style="font-size: 14px; color: #cbd5e1; white-space: pre-line; margin-bottom: 12px;">${s.instructions}</p>
            ${s.codeSnippet ? `
              <div style="position: relative;">
                <pre><code>${s.codeSnippet}</code></pre>
                <button class="cli-btn btn-copy-code" data-code="${encodeURIComponent(s.codeSnippet)}" style="position: absolute; top: 8px; right: 8px;">
                  <i class="fas fa-copy"></i> Copiar
                </button>
              </div>
            ` : ""}
          </div>
        `).join("")}
      </div>
    `;

    container.querySelectorAll("[data-lab-tab]").forEach(tab => {
      tab.addEventListener("click", () => {
        this.currentLabId = tab.getAttribute("data-lab-tab");
        this.renderLabs(container);
      });
    });

    if (this.audioBot) {
      this.audioBot.renderControlBar("audiobot-mount-labs", () => {
        return `${lab.title}. Topologia: ${lab.topology}. Objetivos: ${lab.objectives.join(". ")}`;
      });
    }

    container.querySelectorAll(".btn-copy-code").forEach(btn => {
      btn.addEventListener("click", async () => {
        const code = decodeURIComponent(btn.getAttribute("data-code"));
        await copyTextToClipboard(code);
        btn.innerHTML = "<i class='fas fa-check text-emerald'></i> ¡Copiado!";
        setTimeout(() => {
          btn.innerHTML = "<i class='fas fa-copy'></i> Copiar";
        }, 2000);
      });
    });
  }

  renderFlashcards(container) {
    const total = window.FLASHCARDS_DATA.length;
    const card = window.FLASHCARDS_DATA[this.currentFcIdx];

    container.innerHTML = `
      <div class="hero-banner" style="margin-bottom: 24px;">
        <span class="hero-badge"><i class="fas fa-layer-group"></i> Repetición Espaciada</span>
        <h1 class="hero-title">Tarjetas de Estudio Interactivas (Flashcards)</h1>
        <p class="hero-subtitle">
          Memoriza y afianza conceptos clave, puertos oficiales, estándares y fórmulas de seguridad. Haz clic sobre la tarjeta para voltearla.
        </p>
      </div>

      <div class="fc-container">
        <div class="fc-card-3d" id="fc-interactive-card">
          <div class="fc-inner">
            <div class="fc-face fc-front">
              <span class="fc-category-badge">${card.category}</span>
              <p class="fc-text">${card.front}</p>
              <span class="fc-hint"><i class="fas fa-sync-alt"></i> Haz clic para ver la respuesta</span>
            </div>
            <div class="fc-face fc-back">
              <span class="fc-category-badge">${card.category} - Respuesta</span>
              <p class="fc-text">${card.back}</p>
              <span class="fc-hint"><i class="fas fa-sync-alt"></i> Haz clic para voltear</span>
            </div>
          </div>
        </div>

        <div class="fc-controls">
          <button class="pv-nav-btn" id="fc-prev-btn" ${this.currentFcIdx === 0 ? "disabled" : ""}>
            <i class="fas fa-arrow-left"></i> Anterior
          </button>
          <span style="font-size: 14px; font-weight: 700; color: #fff;">${this.currentFcIdx + 1} / ${total}</span>
          <button class="pv-nav-btn pv-nav-primary" id="fc-next-btn" ${this.currentFcIdx === total - 1 ? "disabled" : ""}>
            Siguiente <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;

    const cardEl = container.querySelector("#fc-interactive-card");
    if (cardEl) {
      cardEl.addEventListener("click", () => {
        cardEl.classList.toggle("flipped");
      });
    }

    const prevBtn = container.querySelector("#fc-prev-btn");
    const nextBtn = container.querySelector("#fc-next-btn");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (this.currentFcIdx > 0) {
          if (this.audioBot) this.audioBot.stop();
          this.currentFcIdx--;
          this.renderFlashcards(container);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (this.currentFcIdx < total - 1) {
          if (this.audioBot) this.audioBot.stop();
          this.currentFcIdx++;
          this.renderFlashcards(container);
        }
      });
    }

    if (this.audioBot) {
      this.audioBot.renderControlBar("audiobot-mount-flashcards", () => {
        return `Tarjeta de Estudio ${this.currentFcIdx + 1}. Categoría: ${card.category}. Pregunta: ${card.front}. Respuesta: ${card.back}`;
      });
    }
  }

  renderQuizzes(container) {
    const total = window.QUIZZES_DATA.length;
    const q = window.QUIZZES_DATA[this.currentQuizIdx];

    container.innerHTML = `
      <div class="hero-banner" style="margin-bottom: 24px;">
        <span class="hero-badge"><i class="fas fa-clipboard-check"></i> Evaluación de Conocimientos</span>
        <h1 class="hero-title">Zona de Quizzes y Certificación</h1>
        <p class="hero-subtitle">
          Preguntas desafiantes de nivel profesional sobre ciberseguridad, protocolos de autenticación y normativas oficiales con explicaciones pedagógicas inmediatas.
        </p>
      </div>

      <div class="quiz-wrapper">
        <div class="quiz-progress-row">
          <span>Pregunta ${this.currentQuizIdx + 1} de ${total} (${q.unit})</span>
          <span>Puntaje Acumulado: ${this.quizScore} / ${this.currentQuizIdx}</span>
        </div>

        <h3 class="quiz-question-title">${q.question}</h3>

        <div class="quiz-options-list" id="quiz-options-box">
          ${q.options.map((opt, idx) => `
            <button class="quiz-opt-btn" data-opt-idx="${idx}">
              <span style="font-family: var(--font-mono); font-weight: 700; width: 24px;">${String.fromCharCode(65 + idx)}.</span>
              <span>${opt}</span>
            </button>
          `).join("")}
        </div>

        <div id="quiz-feedback-container" style="display: none;"></div>

        <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
          <button class="btn-cyber-primary" id="btn-quiz-next" style="display: none;">
            ${this.currentQuizIdx < total - 1 ? "Siguiente Pregunta <i class='fas fa-arrow-right'></i>" : "Finalizar Evaluación"}
          </button>
        </div>
      </div>
    `;

    const optButtons = container.querySelectorAll(".quiz-opt-btn");
    const feedbackBox = container.querySelector("#quiz-feedback-container");
    const nextBtn = container.querySelector("#btn-quiz-next");

    optButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const chosen = parseInt(btn.getAttribute("data-opt-idx"));
        optButtons.forEach(b => b.disabled = true);

        if (chosen === q.answer) {
          btn.classList.add("correct");
          this.quizScore++;
          feedbackBox.innerHTML = `
            <div class="quiz-feedback-box">
              <div class="quiz-feedback-title text-emerald"><i class="fas fa-check-circle"></i> ¡Correcto!</div>
              <p style="font-size: 13px; color: #cbd5e1;">${q.explanation}</p>
            </div>
          `;
        } else {
          btn.classList.add("wrong");
          optButtons[q.answer].classList.add("correct");
          feedbackBox.innerHTML = `
            <div class="quiz-feedback-box">
              <div class="quiz-feedback-title text-rose"><i class="fas fa-times-circle"></i> Incorrecto</div>
              <p style="font-size: 13px; color: #cbd5e1;">${q.explanation}</p>
            </div>
          `;
        }

        feedbackBox.style.display = "block";
        nextBtn.style.display = "flex";
      });
    });

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (this.audioBot) this.audioBot.stop();
        if (this.currentQuizIdx < total - 1) {
          this.currentQuizIdx++;
          this.renderQuizzes(container);
        } else {
          container.innerHTML = `
            <div class="quiz-wrapper" style="text-align: center; padding: 48px 24px;">
              <div style="font-size: 54px; color: var(--accent-primary); margin-bottom: 16px;"><i class="fas fa-award"></i></div>
              <h2 style="font-size: 26px; margin-bottom: 12px; color: #fff;">Evaluacion Finalizada</h2>
              <p style="font-size: 16px; color: var(--text-muted); margin-bottom: 24px;">
                Has obtenido un puntaje de <strong style="color: var(--accent-cyan); font-size: 22px;">${this.quizScore}</strong> de <strong>${total}</strong> posibles (${Math.round((this.quizScore / total) * 100)}%).
              </p>
              <button class="btn-cyber-primary" onclick="app.currentQuizIdx = 0; app.quizScore = 0; app.renderQuizzes(document.getElementById('main-view-container'));" style="margin: 0 auto;">
                <i class="fas fa-redo"></i> Reiniciar Evaluación
              </button>
            </div>
          `;
        }
      });
    }

    if (this.audioBot) {
      this.audioBot.renderControlBar("audiobot-mount-quiz", () => {
        const opts = q.options.map((opt, idx) => `Opción ${String.fromCharCode(65 + idx)}: ${opt}`).join('. ');
        return `Evaluación de Redes. Pregunta ${this.currentQuizIdx + 1}: ${q.question}. ${opts}`;
      });
    }
  }

  handleSearch(query) {
    const resultsBox = document.getElementById("search-results-box");
    if (!resultsBox) return;

    if (!query || query.trim().length < 2) {
      resultsBox.innerHTML = "<div style='color: var(--text-dim); padding: 12px; font-size: 13px;'>Escribe al menos 2 caracteres para buscar en todo el temario y normativas...</div>";
      return;
    }

    const qLower = query.toLowerCase();
    const matches = [];

    // Search in Curriculum
    window.CURRICULUM_DATA.forEach(u => {
      u.sessions.forEach(s => {
        if (s.title.toLowerCase().includes(qLower) || s.content.toLowerCase().includes(qLower)) {
          matches.push({
            title: s.title,
            sub: `${u.title.split(":")[0]} - Lección Teórica`,
            action: () => this.navigateTo("curriculum", { unitId: u.id, lessonId: s.id })
          });
        }
      });
    });

    // Search in Standards
    if ("nist sp 800-63".includes(qLower) || "ial".includes(qLower) || "aal".includes(qLower) || "fal".includes(qLower)) {
      matches.push({
        title: "NIST SP 800-63-3 Suite (IAL, AAL, FAL)",
        sub: "Estándares y Normativa Oficial",
        action: () => this.navigateTo("standards")
      });
    }

    if ("sbs".includes(qLower) || "504-2021".includes(qLower) || "ciso".includes(qLower)) {
      matches.push({
        title: "Resolución SBS N° 504-2021 de Ciberseguridad",
        sub: "Estándares y Normativa Oficial",
        action: () => this.navigateTo("standards")
      });
    }

    // Search in Labs
    window.LABS_DATA.forEach(l => {
      if (l.title.toLowerCase().includes(qLower) || l.topology.toLowerCase().includes(qLower)) {
        matches.push({
          title: l.title,
          sub: "Laboratorio Práctico",
          action: () => this.navigateTo("labs", { labId: l.id })
        });
      }
    });

    if (matches.length === 0) {
      resultsBox.innerHTML = `<div style='color: var(--text-dim); padding: 12px; font-size: 13px;'>No se encontraron resultados para "${this.escapeHtml(query)}".</div>`;
      return;
    }

    resultsBox.innerHTML = matches.slice(0, 8).map((m, idx) => `
      <div class="search-result-item" data-search-res="${idx}">
        <span class="sr-title">${m.title}</span>
        <span class="sr-sub">${m.sub}</span>
      </div>
    `).join("");

    resultsBox.querySelectorAll("[data-search-res]").forEach(item => {
      item.addEventListener("click", () => {
        const idx = parseInt(item.getAttribute("data-search-res"));
        matches[idx].action();
        document.getElementById("search-modal-overlay").classList.remove("open");
      });
    });
  }

  exportStudyGuide() {
    let guideContent = `# NETWORK SECURITY & DIGITAL IDENTITY - GUÍA DE ESTUDIO OFICIAL COMPLETA\n\n`;
    guideContent += `Generado automáticamente desde el Espacio de Estudio Interactivo.\n\n`;

    window.CURRICULUM_DATA.forEach(u => {
      guideContent += `\n# ${u.title} (${u.weeks})\n\n`;
      u.sessions.forEach(s => {
        guideContent += `## ${s.title}\n\n${s.content}\n\n---\n\n`;
      });
    });

    guideContent += `\n# NORMATIVAS Y ESTÁNDARES OFICIALES\n\n`;
    guideContent += `## NIST SP 800-63-3 Suite\n\n${window.STANDARDS_DATA.nist.overview}\n\n`;
    guideContent += `## SBS Res. 504-2021\n\n${window.STANDARDS_DATA.sbs504.title} - ${window.STANDARDS_DATA.sbs504.scope}\n\n`;

    const blob = new Blob([guideContent], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Network_Security_Study_Guide_Official.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  cleanLatexFormula(raw) {
    if (!raw) return "";
    return raw
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\times/g, '×')
      .replace(/\\cdot/g, '·')
      .replace(/\\approx/g, '≈')
      .replace(/\\ge/g, '≥')
      .replace(/\\le/g, '≤')
      .replace(/\\neq/g, '≠')
      .replace(/\\pm/g, '±')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)')
      .replace(/\\quad/g, '   ')
      .replace(/\\,/g, ' ')
      .replace(/\\\\/g, '\n')
      .replace(/\\/g, '')
      .trim();
  }

  parseMarkdown(markdown) {
    if (!markdown) return "";

    let text = markdown.trim();

    // 0. Extract and format visual vector diagrams [DIAGRAM:type:title]
    const codeBlocks = [];
    text = text.replace(/\[DIAGRAM:([a-zA-Z0-9_-]+)(?::([^\]]+))?\]/g, (match, type, title) => {
      const idx = codeBlocks.length;
      if (typeof VisualDiagramsEngine !== "undefined" && VisualDiagramsEngine.getDiagramSvg(type)) {
        codeBlocks.push(VisualDiagramsEngine.renderVisualDiagramBlock(type, title));
      } else {
        codeBlocks.push(`
          <div class="visual-diagram-wrapper">
            <div class="visual-diagram-header">
              <div class="v-diag-badge"><i class="fas fa-project-diagram"></i> <span>${title || 'Diagrama'}</span></div>
            </div>
          </div>
        `);
      }
      return `\n\n__CODE_BLOCK_${idx}__\n\n`;
    });

    // 1. Extract and protect code blocks & mermaid blocks
    text = text.replace(/```([a-zA-Z0-9_-]*)\n?([\s\S]*?)```/g, (match, lang, code) => {
      const idx = codeBlocks.length;
      if (lang === "mermaid") {
        // Attempt automatic mapping to high-resolution vector SVG if matching architecture keywords
        let matchedType = null;
        let diagramTitle = "Diagrama de Arquitectura y Flujo de Red";
        const cTrim = code.toLowerCase();
        if (cTrim.includes("botmaster") || cTrim.includes("c2server") || cTrim.includes("botnet")) {
          matchedType = "botnet_topologies";
          diagramTitle = "Topologías de Redes Botnet y Servidores C2";
        } else if (cTrim.includes("arp") || cTrim.includes("envenenamiento") || cTrim.includes("mitm")) {
          matchedType = "arp_poisoning_flow";
          diagramTitle = "Flujo de Ataque ARP Poisoning y Detección DAI";
        } else if (cTrim.includes("kerberos") || cTrim.includes("as-req") || cTrim.includes("tgt")) {
          matchedType = "kerberos_flow";
          diagramTitle = "Flujo de Autenticación Kerberos v5";
        } else if (cTrim.includes("radius") || cTrim.includes("eapol") || cTrim.includes("802.1x")) {
          matchedType = "radius_flow";
          diagramTitle = "Arquitectura de Control de Acceso 802.1X y RADIUS";
        } else if (cTrim.includes("dmz") || cTrim.includes("perimetral") || cTrim.includes("firewall")) {
          matchedType = "dmz_architecture";
          diagramTitle = "Topología de Segmentación Perimetral y DMZ";
        } else if (cTrim.includes("nids") || cTrim.includes("nips") || cTrim.includes("span")) {
          matchedType = "ids_vs_ips";
          diagramTitle = "Comparativa Arquitectónica: NIDS Pasivo vs NIPS Inline";
        } else if (cTrim.includes("ipsec") || cTrim.includes("esp") || cTrim.includes("transporte")) {
          matchedType = "ipsec_architecture";
          diagramTitle = "Encapsulamiento IPsec (Modo Transporte vs Túnel)";
        } else if (cTrim.includes("pki") || cTrim.includes("rootca") || cTrim.includes("ca_raiz")) {
          matchedType = "pki_hierarchy";
          diagramTitle = "Jerarquía de Infraestructura de Clave Pública (PKI)";
        } else if (cTrim.includes("copp") || cTrim.includes("plano") || cTrim.includes("cisco")) {
          matchedType = "cisco_planes";
          diagramTitle = "Seguridad en los Tres Planos de Infraestructura Cisco";
        } else if (cTrim.includes("nist") || cTrim.includes("preparacion") || cTrim.includes("incidentes")) {
          matchedType = "incident_response";
          diagramTitle = "Ciclo de Vida de Respuesta ante Incidentes (NIST SP 800-61)";
        }

        if (matchedType && typeof VisualDiagramsEngine !== "undefined") {
          codeBlocks.push(VisualDiagramsEngine.renderVisualDiagramBlock(matchedType, diagramTitle));
        } else {
          codeBlocks.push(`
            <div class="visual-diagram-wrapper">
              <div class="visual-diagram-header">
                <div class="v-diag-badge"><i class="fas fa-project-diagram"></i> Diagrama de Arquitectura / Flujo</div>
                <span class="v-diag-format"><i class="fas fa-code"></i> Código Estructurado</span>
              </div>
              <pre class="mermaid-code"><code>${this.escapeHtml(code.trim())}</code></pre>
            </div>
          `);
        }
      } else {
        const langLabel = lang ? lang.toUpperCase() : "SHELL";
        codeBlocks.push(`
          <div class="code-block-container">
            <div class="code-block-header">
              <span class="code-lang-tag"><i class="fas fa-terminal"></i> ${langLabel}</span>
              <button class="btn-copy-snippet" onclick="copySnippetFromBlock(this)" title="Copiar bloque al portapapeles">
                <i class="fas fa-copy"></i> Copiar
              </button>
            </div>
            <pre class="code-pre"><code class="language-${lang || 'text'}">${this.escapeHtml(code.trim())}</code></pre>
          </div>
        `);
      }
      return `\n\n__CODE_BLOCK_${idx}__\n\n`;
    });

    // 2. Extract and format LaTeX / Math blocks ($$...$$)
    text = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
      const idx = codeBlocks.length;
      const cleanFormula = this.cleanLatexFormula(formula);
      codeBlocks.push(`
        <div class="formula-box">
          <div class="formula-header"><i class="fas fa-square-root-variable text-cyan"></i> Modelo Matemático / Fórmula Formal:</div>
          <div class="formula-content">${this.escapeHtml(cleanFormula)}</div>
        </div>
      `);
      return `\n\n__CODE_BLOCK_${idx}__\n\n`;
    });

    // 3. Horizontal rules
    text = text.replace(/^---$/gm, '<hr class="lesson-divider">');

    // 4. Headers with visual styling
    text = text.replace(/^#### (.*$)/gm, '<h4 class="lesson-h4"><i class="fas fa-angle-right text-cyan"></i> $1</h4>');
    text = text.replace(/^### (.*$)/gm, '<h3 class="lesson-h3">$1</h3>');
    text = text.replace(/^## (.*$)/gm, '<h2 class="lesson-h2">$1</h2>');

    // 5. Blockquotes / Alerts (> ...)
    text = text.replace(/^\s*>\s+(.*$)/gm, '<div class="lesson-callout"><i class="fas fa-info-circle text-cyan"></i> <div>$1</div></div>');

    // 6. Tables formatting (convert markdown tables to responsive tables)
    text = this.formatMarkdownTables(text);

    // 7. Lists formatting (Ordered and Unordered with nesting)
    text = this.formatMarkdownLists(text);

    // 8. Key-Term Highlighting: **Term (Category):** or **Term:**
    text = text.replace(/\*\*([^*]+?):\*\*/g, '<strong class="concept-term">$1:</strong>');
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    text = text.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

    // 9. Links: [text](url)
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="lesson-link">$1 <i class="fas fa-external-link-alt" style="font-size: 10px;"></i></a>');

    // 10. Paragraphs: split by double newlines and wrap loose text
    const paragraphs = text.split(/\n\s*\n/);
    text = paragraphs.map(p => {
      const trimmed = p.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<h2') || trimmed.startsWith('<h3') || trimmed.startsWith('<h4') ||
          trimmed.startsWith('<div') || trimmed.startsWith('<hr') || trimmed.startsWith('<ul') ||
          trimmed.startsWith('<ol') || trimmed.startsWith('<table') || trimmed.startsWith('__CODE_BLOCK_')) {
        return trimmed;
      }
      return `<p class="lesson-p">${trimmed.replace(/\n/g, '<br>')}</p>`;
    }).join('\n\n');

    // 11. Restore protected code blocks
    text = text.replace(/__CODE_BLOCK_(\d+)__/g, (match, idx) => {
      return codeBlocks[parseInt(idx)] || '';
    });

    return text;
  }

  formatMarkdownTables(str) {
    const lines = str.split('\n');
    let inTable = false;
    let tableLines = [];
    let result = [];

    const flushTable = () => {
      if (tableLines.length === 0) return;
      let html = '<div class="table-responsive"><table class="lesson-table">';
      let isFirst = true;

      for (let line of tableLines) {
        if (line.includes('---')) continue;
        const rawCells = line.split('|');
        const cells = rawCells.slice(1, rawCells.length - 1).map(c => c.trim());
        if (cells.length === 0) continue;

        if (isFirst) {
          html += '<thead><tr>' + cells.map(c => `<th>${c}</th>`).join('') + '</tr></thead><tbody>';
          isFirst = false;
        } else {
          html += '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>';
        }
      }

      html += '</tbody></table></div>';
      result.push(html);
      tableLines = [];
      inTable = false;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('|') && line.endsWith('|')) {
        inTable = true;
        tableLines.push(line);
      } else {
        if (inTable) {
          flushTable();
        }
        result.push(lines[i]);
      }
    }
    if (inTable) {
      flushTable();
    }
    return result.join('\n');
  }

  formatMarkdownLists(text) {
    const lines = text.split('\n');
    let output = [];
    let inList = false;
    let listType = null;
    let inSubList = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      const olMatch = line.match(/^(\d+)\.\s+(.*)$/);
      const ulMatch = line.match(/^(\s*)[-*+]\s+(.*)$/);

      if (olMatch) {
        if (inSubList) {
          output.push('</ul>');
          inSubList = false;
        }
        if (inList && listType !== 'ol') {
          output.push('</ul>');
          inList = false;
        }
        if (!inList) {
          output.push('<ol class="lesson-ordered-list">');
          inList = true;
          listType = 'ol';
        }
        output.push(`<li>${olMatch[2]}</li>`);
      } else if (ulMatch) {
        const indent = ulMatch[1].length;
        if (inList && listType === 'ol' && indent >= 2) {
          if (!inSubList) {
            output.push('<ul class="lesson-sub-list">');
            inSubList = true;
          }
          output.push(`<li>${ulMatch[2]}</li>`);
        } else {
          if (inSubList) {
            output.push('</ul>');
            inSubList = false;
          }
          if (inList && listType !== 'ul') {
            output.push('</ol>');
            inList = false;
          }
          if (!inList) {
            output.push('<ul class="lesson-list">');
            inList = true;
            listType = 'ul';
          }
          output.push(`<li>${ulMatch[2]}</li>`);
        }
      } else {
        if (inSubList) {
          output.push('</ul>');
          inSubList = false;
        }
        if (inList) {
          output.push(listType === 'ol' ? '</ol>' : '</ul>');
          inList = false;
          listType = null;
        }
        output.push(line);
      }
    }

    if (inSubList) output.push('</ul>');
    if (inList) output.push(listType === 'ol' ? '</ol>' : '</ul>');

    return output.join('\n');
  }

  escapeHtml(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}

// Global helper for code block copying
window.copySnippetFromBlock = async function(btn) {
  const container = btn.closest('.code-block-container');
  if (!container) return;
  const codeEl = container.querySelector('code');
  if (!codeEl) return;
  const text = codeEl.innerText;
  await copyTextToClipboard(text);
  const originalHtml = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check text-emerald"></i> Copiado';
  setTimeout(() => {
    btn.innerHTML = originalHtml;
  }, 2000);
};

// Global initialization on DOM load
document.addEventListener("DOMContentLoaded", () => {
  window.app = new StudySpaceApp();
});

