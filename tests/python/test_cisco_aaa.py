"""
Unit & Integration Tests for Cisco AAA Automation Module (Python 3.12+)
Module: tests/python/test_cisco_aaa.py
Test Framework: unittest / pytest
"""

import asyncio
import sys
import unittest
from pathlib import Path

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from backend.python.cisco_aaa_automation import (
    AAAProtocol,
    AAAServerConfig,
    NetworkDevice,
    simulate_device_audit,
)


class TestAAAServerConfig(unittest.TestCase):
    def test_valid_radius_config(self):
        cfg = AAAServerConfig(
            host_ip="192.168.1.100",
            secret_key="EnterpriseSecret2026!",
            protocol=AAAProtocol.RADIUS,
        )
        self.assertTrue(cfg.validate())
        self.assertEqual(cfg.auth_port, 1812)
        self.assertEqual(cfg.acct_port, 1813)

    def test_invalid_ipv4_raises_value_error(self):
        cfg_bad = AAAServerConfig(
            host_ip="invalid_ip_format",
            secret_key="EnterpriseSecret2026!",
            protocol=AAAProtocol.RADIUS,
        )
        with self.assertRaises(ValueError):
            cfg_bad.validate()

    def test_short_secret_key_raises_value_error(self):
        cfg = AAAServerConfig(
            host_ip="192.168.1.1",
            secret_key="short",  # Less than 8 characters
            protocol=AAAProtocol.RADIUS,
        )
        with self.assertRaises(ValueError):
            cfg.validate()


class TestNetworkDeviceConfigGeneration(unittest.TestCase):
    def setUp(self):
        self.radius_server = AAAServerConfig(
            host_ip="10.10.10.1",
            secret_key="SecretRadiusPass2026!",
            protocol=AAAProtocol.RADIUS,
        )
        self.tacacs_server = AAAServerConfig(
            host_ip="10.10.10.2",
            secret_key="SecretTacacsPass2026!",
            protocol=AAAProtocol.TACACS_PLUS,
        )

    def test_generate_cisco_ios_config_contains_mandatory_commands(self):
        device = NetworkDevice(
            hostname="SW-CORE-01",
            management_ip="10.10.10.254",
            model="Cisco Catalyst 9300",
            aaa_servers=[self.radius_server, self.tacacs_server],
            fallback_to_local=True,
        )
        config = device.generate_cisco_ios_config()

        self.assertIn("aaa new-model", config)
        self.assertIn("radius server RADIUS_10_10_10_1", config)
        self.assertIn("tacacs server TACACS_10_10_10_2", config)
        self.assertIn("aaa authentication login default", config)
        self.assertIn("local", config)  # Fallback verified
        self.assertIn("line vty 0 4", config)
        self.assertIn("transport input ssh", config)

    def test_simulate_device_audit_compliant(self):
        device = NetworkDevice(
            hostname="RTR-EDGE-01",
            management_ip="172.16.0.1",
            model="Cisco ISR 4451",
            aaa_servers=[self.radius_server, self.tacacs_server],
            fallback_to_local=True,
        )
        result = asyncio.run(simulate_device_audit(device))

        self.assertEqual(result["status"], "COMPLIANT")
        self.assertEqual(result["compliance_score"], 100)
        self.assertTrue(result["has_redundancy"])


if __name__ == "__main__":
    unittest.main()
