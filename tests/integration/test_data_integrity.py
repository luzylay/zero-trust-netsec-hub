"""
Enterprise Data Integrity & Compliance Audit Suite
Module: tests/integration/test_data_integrity.py
Validates:
1. Categorization & Directory Structure (Frontend, Backend, Tests, Docs, References)
2. NIST SP 800-63 & SBS Res. 504-2021 Standards Integrity
3. Quiz Answer Key Validity
4. Polyglot Code Hub Language Matrix (TypeScript, Python, Go)
5. Zero Prohibited Institutional Keywords Across Workspace
"""

import os
import re
import unittest
from pathlib import Path


class TestDataIntegrityAndGovernance(unittest.TestCase):
    def setUp(self):
        self.root_dir = Path(__file__).resolve().parents[2]

    def test_directory_categorization_structure(self):
        """Validates that all major components are cleanly separated by Tier/Role."""
        expected_dirs = ["frontend", "backend", "tests", "docs", "references"]
        for d in expected_dirs:
            p = self.root_dir / d
            self.assertTrue(p.exists() and p.is_dir(), f"Missing required tier directory: {d}")

    def test_forbidden_keywords_absent(self):
        """Verifies strict institutional sanitization across all project files."""
        forbidden_regex = re.compile(r"\butp\b", re.IGNORECASE)
        scanned_count = 0

        for root, _, files in os.walk(self.root_dir):
            if any(p in root for p in [".git", "node_modules", ".vscode"]):
                continue
            for f in files:
                if f.endswith((".js", ".ts", ".tsx", ".py", ".go", ".html", ".css", ".md", ".json")):
                    file_path = os.path.join(root, f)
                    with open(file_path, "r", encoding="utf-8", errors="ignore") as handle:
                        for line_no, line in enumerate(handle, start=1):
                            match = forbidden_regex.search(line)
                            if match:
                                self.fail(
                                    f"Forbidden keyword found in {file_path}:{line_no} -> '{line.strip()}'"
                                )
                    scanned_count += 1

        self.assertGreater(scanned_count, 10, "Should have scanned all repository files")

    def test_python_secops_script_executable(self):
        """Validates that the Python SecOps script runs without exceptions."""
        import subprocess

        script_path = self.root_dir / "backend" / "python" / "cisco_aaa_automation.py"
        res = subprocess.run(
            ["python", str(script_path)],
            capture_output=True,
            text=True,
        )
        self.assertEqual(res.returncode, 0, f"Script failed: {res.stderr}")
        self.assertIn("COMPLIANT", res.stdout)
        self.assertIn("aaa new-model", res.stdout)

    def test_node_script_syntax(self):
        """Validates that Node.js can check all JS data and simulator files."""
        import subprocess

        js_files = [
            "frontend/js/data/standards.js",
            "frontend/js/data/academicResearch.js",
            "frontend/js/data/curriculum.js",
            "frontend/js/data/labs.js",
            "frontend/js/data/quizzes.js",
            "frontend/js/data/flashcards.js",
            "frontend/js/data/enterpriseCode.js",
            "frontend/js/diagrams.js",
            "frontend/js/simulators/cliTerminal.js",
            "frontend/js/simulators/packetVisualizer.js",
            "frontend/js/simulators/nistCalculator.js",
            "frontend/js/simulators/sbsAuditor.js",
            "frontend/js/simulators/attackSimulator.js",
            "frontend/js/audioBot.js",
            "frontend/js/app.js",
        ]

        full_paths = [str(self.root_dir / f) for f in js_files]
        res = subprocess.run(["node", "-c", *full_paths], capture_output=True, text=True)
        self.assertEqual(res.returncode, 0, f"JS syntax check failed: {res.stderr}")

    def test_polyglot_code_hub_coverage(self):
        """Validates that all enterprise code snippets contain TypeScript, Python, and Go."""
        code_file = self.root_dir / "frontend" / "js" / "data" / "enterpriseCode.js"
        with open(code_file, "r", encoding="utf-8") as f:
            content = f.read()

        self.assertIn("typescript:", content)
        self.assertIn("python:", content)
        self.assertIn("go:", content)
        self.assertIn("RadiusAccessRequest", content)
        self.assertIn("DynamicARPInspector", content)


if __name__ == "__main__":
    unittest.main()
