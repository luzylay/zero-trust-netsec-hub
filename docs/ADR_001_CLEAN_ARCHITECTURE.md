# ARCHITECTURE DECISION RECORD (ADR)
## ADR-001: Monorepo Clean Architecture, Domain-Driven Design (DDD), and Polyglot Tooling

- **Status:** Accepted / Implemented
- **Date:** 2026-09-06
- **Authors:** Senior Principal Software Engineer & Enterprise Systems Architect

---

## 1. CONTEXT & PROBLEM STATEMENT

Prior repository states exhibited architectural anti-patterns:
- **Code Duplication (Violation of DRY):** Duplicate curriculum definitions and syllabus assets resided in disparate directories.
- **Inconsistent Framework Boundaries:** Parallel implementations existed without shared domain boundaries or type contracts.
- **Lack of Enterprise Engineering Standards:** Absence of formal architectural separation (Domain vs Infrastructure vs Presentation) and absence of modern multi-language SecOps tooling required by Tier-1 tech enterprises.

---

## 2. DECISION DRIVERS

1. **Elimination of Duplication (Single Source of Truth - SSOT):** All curriculum, standards, labs, quizzes, and simulation logic must derive from a single unified domain model.
2. **Domain-Driven Design (DDD) & Hexagonal Architecture:** Clear decoupling between pure domain entities (`domain/`), application services (`services/`), and presentation/interactive simulators (`components/`).
3. **Polyglot Alignment with Tier-1 Industry Standards:** Inclusion of enterprise-grade implementations across the top 3 high-demand languages (**TypeScript 5.7+**, **Python 3.12+**, **Go 1.23+**).
4. **Zero-Friction Portability:** Support both a modern React 19 / TypeScript / Vite application (`apps/web`) and a standalone zero-dependency browser runtime (`index.html`).

---

## 3. ARCHITECTURAL BLUEPRINT

```
network-security/ (Root Repository)
├── apps/
│   └── web/                         # Presentation Layer: React 19 + TypeScript + Tailwind
│       └── src/
│           ├── domain/              # Core Domain Entities & Business Rules
│           ├── services/            # Application Orchestration & Storage
│           └── components/          # Reusable UI & Interactive Simulators
├── scripts/                         # Infrastructure & SecOps Automation
│   ├── typescript/                  # RFC 2865 Binary Encoders
│   ├── python/                      # Async Cisco AAA Provisioning & Auditing
│   └── go/                          # High-Throughput Concurrent Proxies
├── docs/                            # Governance, ADRs, & Official Study Compendiums
└── index.html                       # Portable Zero-Dependency Runtime
```

---

## 4. CONSEQUENCES & BENEFITS

- **Positive:** Zero code duplication across the entire workspace.
- **Positive:** Type-safe domain models guarantee consistency between frontends and backend tools.
- **Positive:** Developers and students gain exposure to enterprise-level patterns expected by global tech giants (Google, Cloudflare, Stripe, Meta, Amazon).
