#!/usr/bin/env python3
"""
Enterprise Master Test Runner & Quality Gate Orchestrator
Executes:
- Python Unit & SecOps Tests (backend/python)
- Node.js / TypeScript Protocol Tests (tests/typescript)
- Integration, Domain Integrity & Compliance Audits (tests/integration)
"""

import subprocess
import sys
import time

# Ensure proper Unicode handling in Windows console
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")


def run_command(title: str, cmd: list[str]) -> bool:
    print(f"\n{'='*70}")
    print(f"[*] EXECUTING QUALITY GATE: {title}")
    print(f"[*] Command: {' '.join(cmd)}")
    print(f"{'='*70}")

    start_time = time.perf_counter()
    result = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    duration = time.perf_counter() - start_time

    if result.stdout:
        print(result.stdout.strip())
    if result.stderr:
        print(f"[STDERR]:\n{result.stderr.strip()}")

    if result.returncode == 0:
        print(f"\n[PASS] {title} passed successfully in {duration:.3f}s")
        return True
    else:
        print(f"\n[FAIL] {title} failed with return code {result.returncode}")
        return False


def main() -> None:
    print("NETSEC ENTERPRISE QUALITY GATES & TEST SUITE ORCHESTRATOR")
    print("=" * 70)

    gates = [
        ("Python 3.12+ Unit Tests (Cisco AAA Automation)", ["python", "-m", "unittest", "tests/python/test_cisco_aaa.py"]),
        ("TypeScript / Node.js 22+ RADIUS Protocol Tests", ["node", "--test", "tests/typescript/test_radius_client.mjs"]),
        ("Data Integrity, Standards & Compliance Audit", ["python", "-m", "unittest", "tests/integration/test_data_integrity.py"]),
        ("Frontend JavaScript Syntax & Compilation Check", [
            "node", "-c",
            "frontend/js/data/standards.js", "frontend/js/data/academicResearch.js", "frontend/js/data/curriculum.js", "frontend/js/data/labs.js",
            "frontend/js/data/quizzes.js", "frontend/js/data/flashcards.js", "frontend/js/data/enterpriseCode.js",
            "frontend/js/simulators/cliTerminal.js", "frontend/js/simulators/packetVisualizer.js",
            "frontend/js/simulators/nistCalculator.js", "frontend/js/simulators/sbsAuditor.js",
            "frontend/js/simulators/attackSimulator.js", "frontend/js/audioBot.js", "frontend/js/app.js"
        ]),
        ("Cross-Browser Engine Compatibility & CSS/DOM Audit", ["node", "--test", "tests/frontend/test_cross_browser.mjs"])
    ]

    all_passed = True
    for title, cmd in gates:
        passed = run_command(title, cmd)
        if not passed:
            all_passed = False

    print(f"\n{'='*70}")
    if all_passed:
        print("[SUCCESS] ALL ENTERPRISE QUALITY GATES PASSED (100% COMPLIANT)")
        print(f"{'='*70}\n")
        sys.exit(0)
    else:
        print("[ERROR] ONE OR MORE QUALITY GATES FAILED")
        print(f"{'='*70}\n")
        sys.exit(1)


if __name__ == "__main__":
    main()
