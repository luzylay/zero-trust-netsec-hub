# 🛡️ ZERO-TRUST NETWORK SECURITY & DIGITAL IDENTITY RESEARCH HUB

[![Research](https://img.shields.io/badge/Research-IEEE%20%7C%20Scopus%20%7C%20ACM%20%7C%20NIST-blue?style=for-the-badge)](docs/IEEE_SCOPUS_RESEARCH_COMPENDIUM.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](backend/typescript/)
[![Python](https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python&logoColor=white)](backend/python/)
[![Go](https://img.shields.io/badge/Go-1.23+-00ADD8?style=for-the-badge&logo=go&logoColor=white)](backend/go/)
[![Compliance](https://img.shields.io/badge/Compliance-NIST%20SP%20800--63--3%20%7C%20SBS%20504--2021-emerald?style=for-the-badge)](docs/EXECUTIVE_SUMMARY_MBA.md)

---

## 🏛️ Visión y Fundamentación Científica

Esta plataforma es un **Hub de Investigación Abierta y Laboratorio de Ciberseguridad de Redes** fundamentado exclusivamente en literatura científica de alto impacto (**IEEE Xplore, Scopus, ACM Digital Library**) y marcos normativos internacionales oficiales (**IETF RFCs, NIST SP 800-63-3 Suite, NIST SP 800-207 Zero Trust, y SBS Res. N° 504-2021**).

Todos los materiales son **100% abiertos, públicos e independientes**, asegurando máxima protección de datos, libre estudio e integridad académica.

```
network-security/
├── frontend/                            # 🌐 [FRONTEND] SPA Interactiva, Simuladores y Vistas
│   ├── index.html                       # Entry point de la aplicación web
│   ├── css/
│   │   └── styles.css                   # Sistema de diseño Cyber Glassmorphism
│   └── js/
│       ├── app.js                       # Enrutador, buscador universal (Ctrl+K) y controlador
│       ├── data/                        # Datos de dominio y compendio científico (SSOT)
│       │   ├── academicResearch.js      # Base de datos científica IEEE, Scopus y ACM
│       │   ├── curriculum.js            # Temario avanzado de 4 Unidades
│       │   ├── enterpriseCode.js        # Snippets polyglot (TypeScript, Python, Go)
│       │   ├── flashcards.js            # Repetición espaciada 3D
│       │   ├── labs.js                  # Guías de laboratorio paso a paso
│       │   ├── quizzes.js               # Banco de autoevaluación con feedback
│       │   └── standards.js             # Desglose oficial NIST SP 800-63 y SBS 504-2021
│       └── simulators/                  # 5 Motores de simulación interactiva
│           ├── attackSimulator.js       # Simulador de ataques LAN y contramedidas
│           ├── cliTerminal.js           # Emulador Cisco IOS CLI AAA
│           ├── nistCalculator.js        # Evaluador de riesgo y cálculo de niveles IAL/AAL/FAL
│           ├── packetVisualizer.js      # Análisis interactivo de datagramas UDP/TCP
│           └── sbsAuditor.js            # Matriz de madurez regulatoria SBS Res. 504-2021
│
├── backend/                             # ⚙️ [BACKEND] Automatización, Protocolos y SecOps
│   ├── python/                          # Python 3.12+ (Automatización de Red y Auditoría AAA)
│   │   ├── cisco_aaa_automation.py      # Provisionamiento idempotente y scoring asíncrono
│   │   └── run_all_tests.py             # Orquestador maestro de Quality Gates
│   ├── typescript/                      # TypeScript 5.7+ (Encoders de Protocolo RADIUS RFC 2865)
│   │   └── radius_client.ts             # Encoders binarios y cifrado XOR de contraseñas
│   └── go/                              # Go 1.23+ (Proxy Concurrente UDP de Alto Rendimiento)
│       └── radius_proxy.go              # Servidor proxy UDP con Worker Pools y Goroutines
│
├── tests/                               # 🧪 [TESTING] Suites de Pruebas Automatizadas
│   ├── python/
│   │   └── test_cisco_aaa.py            # 5 tests unitarios de configuración y auditoría AAA
│   ├── typescript/
│   │   └── test_radius_client.mjs       # 2 tests de cálculo de cabecera y cifrado RADIUS
│   └── integration/
│       └── test_data_integrity.py       # 5 tests de integridad, categorización y sanitización
│
├── docs/                                # 📑 [DOCUMENTACIÓN CIENTÍFICA & MBA]
│   ├── IEEE_SCOPUS_RESEARCH_COMPENDIUM.md # Compendio de literatura indexada (IEEE / Scopus / ACM)
│   ├── EXECUTIVE_SUMMARY_MBA.md         # Marco estratégico de riesgo, ROI y cumplimiento SBS
│   ├── GOVERNANCE_FRAMEWORK.md          # Matriz RACI, SLAs de respuesta y DevSecOps Gates
│   ├── ADR_001_CLEAN_ARCHITECTURE.md    # Architecture Decision Record
│   ├── CROSS_BROWSER_COMPATIBILITY_REPORT.md # Auditoría de compatibilidad multi-navegador (Chromium/Gecko/WebKit)
│   ├── DEPLOYMENT_GUIDE.md              # Guía paso a paso para GitHub y GitHub Pages
│   ├── TROUBLESHOOTING_CI_CD.md         # Diagnóstico y resolución de errores de despliegue
│   └── GUIA_DE_ESTUDIO_OFICIAL.md       # Compendio maestro teórico y práctico
│
├── references/                          # 📚 [ESTÁNDARES OFICIALES PÚBLICOS]
│   └── pdf/                             # Documentos normativos oficiales de dominio público
│       ├── 504-2021_R.pdf               # Resolución SBS N° 504-2021 (Reglamento Oficial)
│       ├── NIST_SP_800-63-3.pdf         # NIST SP 800-63-3 (Digital Identity Guidelines)
│       ├── NIST_SP_800-63a.pdf          # NIST SP 800-63A (Enrollment & Identity Proofing)
│       └── NIST_SP_800-63b.pdf          # NIST SP 800-63B (Authentication & Lifecycle)
│
├── index.html                           # 🚀 Acceso directo / Lanzador al Frontend
└── README.md                            # Guía maestra y mapa arquitectónico del proyecto
```

---

## 🌐 Demo en Vivo & Acceso Web

La plataforma web interactiva se encuentra desplegada y disponible para la comunidad académica y profesional:

> 🔗 **Acceso en vivo**: [https://luzylay.github.io/zero-trust-netsec-hub/](https://luzylay.github.io/zero-trust-netsec-hub/)

*(No requiere instalación previa ni dependencias pesadas: funciona directamente en cualquier navegador moderno Chrome, Firefox, Safari o Edge con soporte JavaScript ES6+).*

---

## ⚡ Inicio Rápido (Quickstart Local)

Si deseas clonar y ejecutar el laboratorio en tu entorno local:

### 1. Clonar el Repositorio
```bash
git clone https://github.com/luzylay/zero-trust-netsec-hub.git
cd zero-trust-netsec-hub
```

### 2. Abrir la Plataforma Interactiva
Abre directamente el archivo `index.html` en tu navegador favorito o inicia un servidor HTTP liviano:
```bash
# Opción A: Abrir directamente el lanzador
start index.html       # En Windows
open index.html        # En macOS
xdg-open index.html    # En Linux

# Opción B: Servidor local ligero (opcional)
python -m http.server 8080
```

### 3. Ejecutar los Quality Gates Automatizados
Para validar la suite completa de 5 pruebas unitarias, integración polyglot y auditoría cross-browser:
```bash
python backend/python/run_all_tests.py
```

---

## 🛠️ Capacidades Principales del Laboratorio

| Componente | Descripción | Estándar / Tecnología |
| :--- | :--- | :--- |
| **5 Simuladores Interactivos** | Laboratorios de ataques LAN, emulador Cisco CLI, visor de paquetes UDP y auditorías normativas | JavaScript ES6+ / Cyber Glassmorphism |
| **Calculadora NIST Digital ID** | Determinación determinista de niveles IAL, AAL y FAL | NIST SP 800-63-3 / 800-63A / 800-63B |
| **Matriz SBS Res. 504-2021** | Evaluación de madurez y cumplimiento de autenticación reforzada | SBS Perú / Res. SBS N° 504-2021 |
| **SecOps Polyglot AAA** | Scripts de automatización y proxy de alta concurrencia | Python 3.12+, TypeScript 5.7+, Go 1.23+ |
| **Compendio Científico** | Estado del arte con papers indexados | IEEE Xplore, Scopus, ACM Digital Library |
| **Cross-Browser Certified** | Compatibilidad probada en Blink, Gecko y WebKit con fallbacks | Chrome, Edge, Safari, Firefox |

---

## 📖 Documentación y Guías

- 📑 [Compendio de Investigación IEEE & Scopus](docs/IEEE_SCOPUS_RESEARCH_COMPENDIUM.md)
- 🌐 [Informe Técnico de Compatibilidad Multi-Navegador](docs/CROSS_BROWSER_COMPATIBILITY_REPORT.md)
- 📊 [Resumen Ejecutivo de Gestión y Riesgos MBA](docs/EXECUTIVE_SUMMARY_MBA.md)
- ⚖️ [Marco de Gobernanza DevSecOps](docs/GOVERNANCE_FRAMEWORK.md)
- 🏛️ [Registro de Decisiones Arquitectónicas (ADR-001)](docs/ADR_001_CLEAN_ARCHITECTURE.md)
- 📘 [Guía de Estudio Teórico-Práctica](docs/GUIA_DE_ESTUDIO_OFICIAL.md)

---

## 📜 Licencia y Seguridad

- **Licencia**: Distribuido bajo la Licencia [MIT](LICENSE).
- **Seguridad**: Para reportar vulnerabilidades o sugerir mejoras de seguridad, consulta [SECURITY.md](SECURITY.md).
- **Contribuciones**: Lee [CONTRIBUTING.md](CONTRIBUTING.md) para pautas de colaboración comunitaria.
