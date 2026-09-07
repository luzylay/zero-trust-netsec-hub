#!/usr/bin/env python3
"""
Enterprise Network Security Automation Engine (Python 3.12+)
Module: cisco_aaa_automation.py
Author: Senior Network Security Engineer
Standard: Cisco IOS 15.x+ AAA & RFC 2865 / RFC 8907

Features:
- Type-safe Dataclasses for Network Device & AAA Server parameters
- Asynchronous provisioning simulation
- Strict configuration auditing and compliance scoring
"""

from __future__ import annotations
import asyncio
from dataclasses import dataclass, field
from enum import StrEnum
from typing import Final, Sequence
import re


class AAAProtocol(StrEnum):
    RADIUS = "radius"
    TACACS_PLUS = "tacacs+"
    LOCAL = "local"


@dataclass(frozen=True, slots=True)
class AAAServerConfig:
    host_ip: str
    secret_key: str
    protocol: AAAProtocol
    auth_port: int = 1812
    acct_port: int = 1813
    timeout_seconds: int = 5

    def validate(self) -> bool:
        ip_pattern: Final[str] = r"^(\d{1,3}\.){3}\d{1,3}$"
        if not re.match(ip_pattern, self.host_ip):
            raise ValueError(f"Invalid IPv4 Address format: {self.host_ip}")
        if len(self.secret_key) < 8:
            raise ValueError("Secret key must meet enterprise complexity (>= 8 chars)")
        return True


@dataclass(slots=True)
class NetworkDevice:
    hostname: str
    management_ip: str
    model: str
    aaa_servers: list[AAAServerConfig] = field(default_factory=list)
    fallback_to_local: bool = True

    def generate_cisco_ios_config(self) -> str:
        """Generates declarative, idempotent Cisco IOS AAA configuration commands."""
        config_lines: list[str] = [
            "!",
            f"! Auto-Generated AAA Configuration for {self.hostname}",
            f"! Device Model: {self.model} | IP: {self.management_ip}",
            "!",
            "configure terminal",
            f"hostname {self.hostname}",
            "aaa new-model",
            "!",
        ]

        # Provision AAA servers
        for srv in self.aaa_servers:
            srv.validate()
            if srv.protocol == AAAProtocol.RADIUS:
                config_lines.extend([
                    f"radius server RADIUS_{srv.host_ip.replace('.', '_')}",
                    f" address ipv4 {srv.host_ip} auth-port {srv.auth_port} acct-port {srv.acct_port}",
                    f" key {srv.secret_key}",
                    f" timeout {srv.timeout_seconds}",
                    " exit",
                ])
            elif srv.protocol == AAAProtocol.TACACS_PLUS:
                config_lines.extend([
                    f"tacacs server TACACS_{srv.host_ip.replace('.', '_')}",
                    f" address ipv4 {srv.host_ip}",
                    f" key {srv.secret_key}",
                    f" timeout {srv.timeout_seconds}",
                    " exit",
                ])

        # Authentication & Authorization Lists
        primary_grp = "group radius" if any(s.protocol == AAAProtocol.RADIUS for s in self.aaa_servers) else "group tacacs+"
        fallback = "local" if self.fallback_to_local else ""

        config_lines.extend([
            "!",
            f"aaa authentication login default {primary_grp} {fallback}".strip(),
            f"aaa authorization exec default {primary_grp} {fallback}".strip(),
            "aaa accounting exec default start-stop group tacacs+",
            "!",
            "line vty 0 4",
            " transport input ssh",
            " login authentication default",
            " authorization exec default",
            " exit",
            "end",
            "!",
        ])

        return "\n".join(config_lines)


async def simulate_device_audit(device: NetworkDevice) -> dict[str, str | bool | int]:
    """Asynchronously audits a network device against corporate baseline standards."""
    await asyncio.sleep(0.05)  # Simulate network I/O latency
    has_radius = any(s.protocol == AAAProtocol.RADIUS for s in device.aaa_servers)
    has_tacacs = any(s.protocol == AAAProtocol.TACACS_PLUS for s in device.aaa_servers)
    
    compliance_score = 100 if (has_radius or has_tacacs) and device.fallback_to_local else 50

    return {
        "hostname": device.hostname,
        "management_ip": device.management_ip,
        "aaa_configured": bool(device.aaa_servers),
        "has_redundancy": len(device.aaa_servers) > 1,
        "compliance_score": compliance_score,
        "status": "COMPLIANT" if compliance_score == 100 else "NON_COMPLIANT"
    }


async def main() -> None:
    print("[*] Initializing Enterprise AAA Provisioning & Audit Engine (Python 3.12+)...")
    
    srv_radius = AAAServerConfig(
        host_ip="192.168.10.50",
        secret_key="EnterpriseRadiusSecPass2026!",
        protocol=AAAProtocol.RADIUS
    )
    
    srv_tacacs = AAAServerConfig(
        host_ip="192.168.10.60",
        secret_key="EnterpriseTacacsMasterKey2026!",
        protocol=AAAProtocol.TACACS_PLUS
    )

    core_router = NetworkDevice(
        hostname="R1-CORE-FINTECH",
        management_ip="10.250.1.1",
        model="Cisco Catalyst 8300",
        aaa_servers=[srv_radius, srv_tacacs],
        fallback_to_local=True
    )

    # Generate configuration
    ios_script = core_router.generate_cisco_ios_config()
    print("\n--- GENERATED CISCO IOS CONFIGURATION ---")
    print(ios_script)

    # Run audit
    audit_res = await simulate_device_audit(core_router)
    print("\n--- COMPLIANCE AUDIT RESULT ---")
    for k, v in audit_res.items():
        print(f"  {k}: {v}")


if __name__ == "__main__":
    asyncio.run(main())
