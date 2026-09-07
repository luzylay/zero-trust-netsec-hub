# CONTRIBUTING GUIDELINES
## Zero-Trust Network Security & Digital Identity Research Hub

Thank you for your interest in contributing to the **Zero-Trust Network Security Research Hub**!

---

## 1. Development Standards & Quality Gates

All contributions must pass the automated enterprise quality gates before merge approval:

1. **Polyglot Code Standards:**
   - **TypeScript:** Strict mode enabled, zero `any` types, immutable interfaces.
   - **Python:** Python 3.12+ type hints, `dataclasses(slots=True)`, PEP 8 compliance.
   - **Go:** Go 1.23+ idiomatic formatting (`gofmt`), zero race conditions.
2. **Quality Gates Verification:**
   Before submitting a Pull Request, run the master test orchestrator locally:
   ```bash
   python backend/python/run_all_tests.py
   ```
   All 4 gates must return `[PASS]` (100% compliant).

---

## 2. Pull Request Workflow

1. Fork the repository and create your branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Commit your changes following conventional commit syntax (`feat:`, `fix:`, `docs:`, `test:`).
3. Ensure no proprietary or unapproved institutional tokens are introduced.
4. Push to your fork and submit a Pull Request targeting `main`.
