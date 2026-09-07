# 🛡️ NETWORK SECURITY & DIGITAL IDENTITY - ENTERPRISE ENGINEERING HUB

[![Architecture](https://img.shields.io/badge/Architecture-Frontend%20%7C%20Backend%20%7C%20Tests%20%7C%20Docs-blue?style=for-the-badge)](docs/ADR_001_CLEAN_ARCHITECTURE.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](backend/typescript/)
[![Python](https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python&logoColor=white)](backend/python/)
[![Go](https://img.shields.io/badge/Go-1.23+-00ADD8?style=for-the-badge&logo=go&logoColor=white)](backend/go/)
[![Compliance](https://img.shields.io/badge/Compliance-NIST%20SP%20800--63--3%20%7C%20SBS%20504--2021-emerald?style=for-the-badge)](docs/EXECUTIVE_SUMMARY_MBA.md)

---

## 🏛️ Estructura y Organización del Repositorio

El repositorio ha sido reorganizado y separado de manera limpia por **Capas de Responsabilidad (Frontend, Backend, Tests, Docs y References)**:

```
network-security/
├── frontend/                            # 🌐 [FRONTEND] Interfaz de Usuario, Simuladores y Componentes Visuales
│   ├── index.html                       # Entry point de la aplicación web SPA interactiva
│   ├── css/
│   │   └── styles.css                   # Sistema de diseño Cyber Glassmorphism
│   └── js/
│       ├── app.js                       # Enrutador, buscador universal (Ctrl+K) y controlador
│       ├── data/                        # Datos de dominio (Curriculum, Standards, Labs...)
│       │   ├── curriculum.js
│       │   ├── enterpriseCode.js
│       │   ├── flashcards.js
│       │   ├── labs.js
│       │   ├── quizzes.js
│       │   └── standards.js
│       └── simulators/                  # 5 Motores de simulación interactiva
│           ├── attackSimulator.js
│           ├── cliTerminal.js
│           ├── nistCalculator.js
│           ├── packetVisualizer.js
│           └── sbsAuditor.js
│
├── backend/                             # ⚙️ [BACKEND] Servicios, Protocolos, Microservicios y SecOps
│   ├── python/                          # Python 3.12+ (Automatización de Red y Auditoría AAA)
│   │   ├── cisco_aaa_automation.py
│   │   └── run_all_tests.py             # Orquestador maestro de Quality Gates
│   ├── typescript/                      # TypeScript 5.7+ (Encoders de Protocolo RADIUS RFC 2865)
│   │   └── radius_client.ts
│   └── go/                              # Go 1.23+ (Proxy Concurrente UDP de Alto Rendimiento)
│       └── radius_proxy.go
│
├── tests/                               # 🧪 [TESTING] Suites de Pruebas Automatizadas
│   ├── python/
│   │   └── test_cisco_aaa.py            # Pruebas unitarias de automatización Cisco AAA
│   ├── typescript/
│   │   └── test_radius_client.mjs       # Pruebas de encoder binario RADIUS
│   └── integration/
│       └── test_data_integrity.py       # Auditoría de integridad de datos y categorización
│
├── docs/                                # 📑 [DOCUMENTACIÓN & GOBERNANZA MBA]
│   ├── EXECUTIVE_SUMMARY_MBA.md         # Marco estratégico y ROI (Nivel Directivo/MBA)
│   ├── GOVERNANCE_FRAMEWORK.md          # Matriz RACI, SLAs y Políticas DevSecOps
│   ├── ADR_001_CLEAN_ARCHITECTURE.md    # Architecture Decision Record
│   └── GUIA_DE_ESTUDIO_OFICIAL.md       # Compendio oficial de estudio técnico
│
├── references/                          # 📚 [FUENTES & ESTÁNDARES OFICIALES]
│   └── pdf/                             # Documentos normativos oficiales (NIST, SBS 504-2021, Sílabo)
│       ├── 100000S75F_NetworkSecurity.pdf
│       ├── 504-2021_R.pdf
│       ├── NIST_SP_800-63-3.pdf
│       ├── NIST_SP_800-63a.pdf
│       ├── NIST_SP_800-63b.pdf
│       ├── S01_s1 -Material.pdf
│       ├── S01_s2 - Material.pdf
│       ├── S02_s1 -Material.pdf
│       ├── S02_s2-Material.pdf
│       ├── S03_s1 - Material.pdf
│       ├── S04_s1 - Material.pdf
│       └── S05_s1 - Material.pdf
│
├── index.html                           # 🚀 Acceso directo / Lanzador al Frontend
└── README.md                            # Guía maestra y mapa arquitectónico
```

---

## 🚀 Ejecución Rápida

### 1. Iniciar la Plataforma Web Interactiva
Abre el archivo [frontend/index.html](file:///c:/Users/Loayza/Downloads/network-security/frontend/index.html) o el lanzador [index.html](file:///c:/Users/Loayza/Downloads/network-security/index.html) en tu navegador.

### 2. Ejecutar la Suite Completa de Tests y Quality Gates
```bash
python backend/python/run_all_tests.py
```

### 3. Ejecutar Herramientas Backend Individuales
```bash
# SecOps & Automatización Cisco AAA (Python)
python backend/python/cisco_aaa_automation.py

# RADIUS Packet Encoder (TypeScript / Node.js)
node backend/typescript/radius_client.ts

# Proxy Concurrente de Red (Go 1.23+)
go run backend/go/radius_proxy.go
```
