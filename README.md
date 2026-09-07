# ZERO-TRUST NETWORK SECURITY & DIGITAL IDENTITY RESEARCH HUB

[![Research](https://img.shields.io/badge/Research-IEEE%20%7C%20Scopus%20%7C%20ACM%20%7C%20NIST-blue?style=for-the-badge)](docs/IEEE_SCOPUS_RESEARCH_COMPENDIUM.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](backend/typescript/)
[![Python](https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python&logoColor=white)](backend/python/)
[![Go](https://img.shields.io/badge/Go-1.23+-00ADD8?style=for-the-badge&logo=go&logoColor=white)](backend/go/)
[![Compliance](https://img.shields.io/badge/Compliance-NIST%20SP%20800--63--3%20%7C%20SBS%20504--2021-emerald?style=for-the-badge)](docs/EXECUTIVE_SUMMARY_MBA.md)

---

## Vision y Fundamentacion Cientifica

Esta plataforma es un **Hub de Investigacion Abierta y Laboratorio de Ciberseguridad de Redes** fundamentado exclusivamente en literatura cientifica de alto impacto (**IEEE Xplore, Scopus, ACM Digital Library**) y marcos normativos internacionales oficiales (**IETF RFCs, NIST SP 800-63-3 Suite, NIST SP 800-207 Zero Trust, y SBS Res. N 504-2021**).

Todos los materiales son **100% abiertos, publicos e independientes**, asegurando maxima proteccion de datos, libre estudio e integridad academica.

```
network-security/
├── frontend/                            # [FRONTEND] SPA Interactiva, Simuladores y Vistas
│   ├── index.html                       # Entry point de la aplicacion web
│   ├── css/
│   │   └── styles.css                   # Sistema de diseno Slate Dark Mode
│   └── js/
│       ├── app.js                       # Enrutador, buscador universal (Ctrl+K) y controlador
│       ├── data/                        # Datos de dominio y compendio cientifico (SSOT)
│       │   ├── academicResearch.js      # Base de datos cientifica IEEE, Scopus y ACM
│       │   ├── curriculum.js            # Temario avanzado de 4 Unidades
│       │   ├── enterpriseCode.js        # Snippets polyglot (TypeScript, Python, Go)
│       │   ├── flashcards.js            # Repeticion espaciada 3D
│       │   ├── labs.js                  # Guias de laboratorio paso a paso
│       │   ├── quizzes.js               # Banco de autoevaluacion con feedback
│       │   └── standards.js             # Desglose oficial NIST SP 800-63 y SBS 504-2021
│       ├── audioBot.js                  # Motor accesible de sintesis de voz (Text-to-Speech Web API)
│       └── simulators/                  # 5 Motores de simulacion interactiva
│           ├── attackSimulator.js       # Simulador de ataques LAN y contramedidas
│           ├── cliTerminal.js           # Emulador Cisco IOS CLI AAA
│           ├── nistCalculator.js        # Evaluador de riesgo y calculo de niveles IAL/AAL/FAL
│           ├── packetVisualizer.js      # Analisis interactivo de datagramas UDP/TCP
│           └── sbsAuditor.js            # Matriz de madurez regulatoria SBS Res. 504-2021
│
├── backend/                             # [BACKEND] Automatizacion, Protocolos y SecOps
│   ├── python/                          # Python 3.12+ (Automatizacion de Red y Auditoria AAA)
│   │   ├── cisco_aaa_automation.py      # Provisionamiento idempotente y scoring asincrono
│   │   └── run_all_tests.py             # Orquestador maestro de Quality Gates
│   ├── typescript/                      # TypeScript 5.7+ (Encoders de Protocolo RADIUS RFC 2865)
│   │   └── radius_client.ts             # Encoders binarios y cifrado XOR de contrasenas
│   └── go/                              # Go 1.23+ (Proxy Concurrente UDP de Alto Rendimiento)
│       └── radius_proxy.go              # Servidor proxy UDP con Worker Pools y Goroutines
│
├── tests/                               # [TESTING] Suites de Pruebas Automatizadas
│   ├── frontend/
│   │   └── test_cross_browser.mjs       # Pruebas de compatibilidad cross-browser y renderizado DOM
│   ├── python/
│   │   └── test_cisco_aaa.py            # 5 tests unitarios de configuracion y auditoria AAA
│   ├── typescript/
│   │   └── test_radius_client.mjs       # 2 tests de calculo de cabecera y cifrado RADIUS
│   └── integration/
│       └── test_data_integrity.py       # 5 tests de integridad, categorizacion y sanitizacion
│
├── docs/                                # [DOCUMENTACION CIENTIFICA & MBA]
│   ├── IEEE_SCOPUS_RESEARCH_COMPENDIUM.md # Compendio de literatura indexada (IEEE / Scopus / ACM)
│   ├── EXECUTIVE_SUMMARY_MBA.md         # Marco estrategico de riesgo, ROI y cumplimiento SBS
│   ├── GOVERNANCE_FRAMEWORK.md          # Matriz RACI, SLAs de respuesta y DevSecOps Gates
│   ├── ADR_001_CLEAN_ARCHITECTURE.md    # Architecture Decision Record
│   ├── CROSS_BROWSER_COMPATIBILITY_REPORT.md # Auditoria de compatibilidad multi-navegador (Chromium/Gecko/WebKit)
│   ├── DEPLOYMENT_GUIDE.md              # Guia paso a paso para GitHub y GitHub Pages
│   ├── TROUBLESHOOTING_CI_CD.md         # Diagnostico y resolucion de errores de despliegue
│   └── GUIA_DE_ESTUDIO_OFICIAL.md       # Compendio maestro teorico y practico
│
├── references/                          # [ESTANDARES OFICIALES PUBLICOS]
│   └── pdf/                             # Documentos normativos oficiales de dominio publico
│       ├── 504-2021_R.pdf               # Resolucion SBS N 504-2021 (Reglamento Oficial)
│       ├── NIST_SP_800-63-3.pdf         # NIST SP 800-63-3 (Digital Identity Guidelines)
│       ├── NIST_SP_800-63a.pdf          # NIST SP 800-63A (Enrollment & Identity Proofing)
│       └── NIST_SP_800-63b.pdf          # NIST SP 800-63B (Authentication & Lifecycle)
│
├── index.html                           # Acceso directo / Lanzador al Frontend
└── README.md                            # Guia maestra y mapa arquitectonico del proyecto
```

---

## Demo en Vivo y Acceso Web

La plataforma web interactiva se encuentra desplegada y disponible para la comunidad academica y profesional:

> **Acceso en vivo**: [https://luzylay.github.io/zero-trust-netsec-hub/](https://luzylay.github.io/zero-trust-netsec-hub/)

*(No requiere instalacion previa ni dependencias pesadas: funciona directamente en cualquier navegador moderno Chrome, Firefox, Safari o Edge con soporte JavaScript ES6+).*

---

## Inicio Rapido (Quickstart Local)

Si deseas clonar y ejecutar el laboratorio en tu entorno local:

### 1. Clonar el Repositorio
```bash
git clone https://github.com/luzylay/zero-trust-netsec-hub.git
cd zero-trust-netsec-hub
```

### 2. Abrir la Plataforma Interactiva
Abre directamente el archivo `index.html` en tu navegador favorito o inicia un servidor HTTP liviano:
```bash
# Opcion A: Abrir directamente el lanzador
start index.html       # En Windows
open index.html        # En macOS
xdg-open index.html    # En Linux

# Opcion B: Servidor local ligero (opcional)
python -m http.server 8080
```

### 3. Ejecutar los Quality Gates Automatizados
Para validar la suite completa de 5 pruebas unitarias, integracion polyglot y auditoria cross-browser:
```bash
python backend/python/run_all_tests.py
```

---

## Capacidades Principales del Laboratorio

| Componente | Descripcion | Estandar / Tecnologia |
| :--- | :--- | :--- |
| **5 Simuladores Interactivos** | Laboratorios de ataques LAN, emulador Cisco CLI, visor de paquetes UDP y auditorias normativas | JavaScript ES6+ / Slate Dark Mode |
| **Calculadora NIST Digital ID** | Determinacion determinista de niveles IAL, AAL y FAL | NIST SP 800-63-3 / 800-63A / 800-63B |
| **Matriz SBS Res. 504-2021** | Evaluacion de madurez y cumplimiento de autenticacion reforzada | SBS Peru / Res. SBS N 504-2021 |
| **SecOps Polyglot AAA** | Scripts de automatizacion y proxy de alta concurrencia | Python 3.12+, TypeScript 5.7+, Go 1.23+ |
| **AudioBot TTS de Accesibilidad** | Lector de voz nativo en tiempo real con control de velocidad y selector de voces | W3C Web Speech API (Client-Side TTS) |
| **Compendio Cientifico** | Estado del arte con papers indexados | IEEE Xplore, Scopus, ACM Digital Library |
| **Cross-Browser Certified** | Compatibilidad probada en Blink, Gecko y WebKit con fallbacks | Chrome, Edge, Safari, Firefox |

---

## Documentacion y Guias

- [Compendio de Investigacion IEEE & Scopus](docs/IEEE_SCOPUS_RESEARCH_COMPENDIUM.md)
- [Informe Tecnico de Compatibilidad Multi-Navegador](docs/CROSS_BROWSER_COMPATIBILITY_REPORT.md)
- [Resumen Ejecutivo de Gestion y Riesgos MBA](docs/EXECUTIVE_SUMMARY_MBA.md)
- [Marco de Gobernanza DevSecOps](docs/GOVERNANCE_FRAMEWORK.md)
- [Registro de Decisiones Arquitectonicas (ADR-001)](docs/ADR_001_CLEAN_ARCHITECTURE.md)
- [Guia de Estudio Teorico-Practica](docs/GUIA_DE_ESTUDIO_OFICIAL.md)

---

## Licencia y Seguridad

- **Licencia**: Distribuido bajo la Licencia [MIT](LICENSE).
- **Seguridad**: Para reportar vulnerabilidades o sugerir mejoras de seguridad, consulta [SECURITY.md](SECURITY.md).
- **Contribuciones**: Lee [CONTRIBUTING.md](CONTRIBUTING.md) para pautas de colaboracion comunitaria.
