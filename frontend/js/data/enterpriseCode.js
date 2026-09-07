/**
 * Enterprise Multi-Language Code Hub & Modern Engineering Matrix
 * Covers production implementations in TypeScript, Python 3.12+, and Go 1.23+
 */

window.ENTERPRISE_CODE_DATA = [
  {
    id: "sec-radius",
    title: "Implementación del Protocolo RADIUS (RFC 2865)",
    description: "Construcción y procesamiento de paquetes Access-Request, cifrado MD5 de credenciales y extracción de atributos AVP.",
    snippets: {
      typescript: `// TypeScript 5.7+ (Node.js 22+ / WebCrypto)
import { createHash, randomBytes } from 'node:crypto';

export interface RadiusAVP {
  readonly type: number;
  readonly value: string | number | Buffer;
}

export class RadiusAccessRequest {
  constructor(
    public readonly identifier: number,
    public readonly secret: string,
    public readonly authenticator: Buffer = randomBytes(16)
  ) {}

  public encryptPassword(password: string): Buffer {
    const passBuf = Buffer.alloc(16, 0);
    Buffer.from(password).copy(passBuf);

    const streamKey = createHash('md5')
      .update(this.secret)
      .update(this.authenticator)
      .digest();

    const encrypted = Buffer.alloc(16);
    for (let i = 0; i < 16; i++) {
      encrypted[i] = passBuf[i] ^ streamKey[i];
    }
    return encrypted;
  }
}`,
      python: `# Python 3.12+ (Type Hints & Dataclasses)
from dataclasses import dataclass
import hashlib
import secrets

@dataclass(frozen=True, slots=True)
class RadiusAccessRequest:
    identifier: int
    secret: bytes
    authenticator: bytes = secrets.token_bytes(16)

    def encrypt_password(self, password: str) -> bytes:
        pass_bytes = password.encode('utf-8').ljust(16, b'\\x00')[:16]
        stream_key = hashlib.md5(self.secret + self.authenticator).digest()
        
        # XOR stream cipher
        return bytes(p ^ k for p, k in zip(pass_bytes, stream_key))`,
      go: `// Go 1.23+ (High-Performance Zero-Allocation Engine)
package radius

import (
	"crypto/md5"
	"crypto/rand"
)

type AccessRequest struct {
	Identifier    uint8
	Secret        []byte
	Authenticator [16]byte
}

func NewAccessRequest(id uint8, secret []byte) *AccessRequest {
	req := &AccessRequest{Identifier: id, Secret: secret}
	rand.Read(req.Authenticator[:])
	return req
}

func (r *AccessRequest) EncryptPassword(pass string) [16]byte {
	var paddedPass [16]byte
	copy(paddedPass[:], []byte(pass))

	h := md5.New()
	h.Write(r.Secret)
	h.Write(r.Authenticator[:])
	streamKey := h.Sum(nil)

	var encrypted [16]byte
	for i := 0; i < 16; i++ {
		encrypted[i] = paddedPass[i] ^ streamKey[i]
	}
	return encrypted
}`
    }
  },

  {
    id: "sec-nist",
    title: "Motor de Validación de Niveles NIST SP 800-63-3 (IAL/AAL/FAL)",
    description: "Evaluador de riesgos con tipado estricto y asignación de controles MFA resistentes a phishing (FIDO2 / WebAuthn).",
    snippets: {
      typescript: `// TypeScript 5.7+ (Zod & Discriminated Unions)
export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH';
export type AALLevel = 'AAL1' | 'AAL2' | 'AAL3';

export interface IdentityRiskAssessment {
  financialImpact: RiskLevel;
  privacyRelease: RiskLevel;
  personalSafety: RiskLevel;
}

export function evaluateAAL(assessment: IdentityRiskAssessment): AALLevel {
  const isHigh = Object.values(assessment).some(v => v === 'HIGH');
  if (isHigh) return 'AAL3'; // Hardware-backed FIDO2 required

  const isMod = Object.values(assessment).some(v => v === 'MODERATE');
  if (isMod) return 'AAL2'; // Multi-Factor (MFA) required

  return 'AAL1'; // Memorized secret permitted
}`,
      python: `# Python 3.12+ (Pydantic / Enum Pattern)
from enum import StrEnum
from pydantic import BaseModel

class RiskLevel(StrEnum):
    LOW = "LOW"
    MODERATE = "MODERATE"
    HIGH = "HIGH"

class IdentityRiskProfile(BaseModel):
    financial_impact: RiskLevel
    privacy_release: RiskLevel
    personal_safety: RiskLevel

    @property
    def dictated_aal(self) -> str:
        risks = {self.financial_impact, self.privacy_release, self.personal_safety}
        if RiskLevel.HIGH in risks:
            return "AAL3 (Hardware FIDO2 / Phishing Resistant)"
        if RiskLevel.MODERATE in risks:
            return "AAL2 (Standard MFA / OTP)"
        return "AAL1 (1FA Password)"`,
      go: `// Go 1.23+ (Enums with Stringer & Struct Methods)
package nist

type RiskLevel int

const (
	RiskLow RiskLevel = iota
	RiskModerate
	RiskHigh
)

type RiskProfile struct {
	FinancialRisk RiskLevel
	PrivacyRisk   RiskLevel
	SafetyRisk    RiskLevel
}

func (r *RiskProfile) EvaluateAAL() string {
	if r.FinancialRisk == RiskHigh || r.PrivacyRisk == RiskHigh || r.SafetyRisk == RiskHigh {
		return "AAL3" // Cryptographic Hardware Key
	}
	if r.FinancialRisk == RiskModerate || r.PrivacyRisk == RiskModerate || r.SafetyRisk == RiskModerate {
		return "AAL2" // Standard MFA
	}
	return "AAL1"
}`
    }
  },

  {
    id: "sec-arp",
    title: "Detección de Ataques en Capa 2 (ARP Poisoning / Spoofing)",
    description: "Inspección continua de paquetes ARP y detección de discrepancias en la tabla de enlaces IP-MAC.",
    snippets: {
      typescript: `// TypeScript 5.7+ (Event-Driven Packet Observer)
export interface ARPPacket {
  srcIP: string;
  srcMAC: string;
  opCode: 'REQUEST' | 'REPLY';
}

export class DynamicARPInspector {
  private dhcpBindings = new Map<string, string>(); // IP -> MAC

  public inspect(pkt: ARPPacket): { allowed: boolean; reason?: string } {
    const validMAC = this.dhcpBindings.get(pkt.srcIP);
    if (validMAC && validMAC !== pkt.srcMAC) {
      return { allowed: false, reason: \`[ALERT] ARP Spoofing Detected for IP \${pkt.srcIP}!\` };
    }
    return { allowed: true };
  }
}`,
      python: `# Python 3.12+ (Scapy Async Network Sniffer)
from scapy.all import ARP, sniff

def check_arp_spoofing(packet) -> None:
    if packet.haslayer(ARP) and packet[ARP].op == 2: # ARP is-at (Reply)
        real_mac = get_mac(packet[ARP].psrc)
        response_mac = packet[ARP].hwsrc
        
        if real_mac != response_mac:
            print(f"[CRITICAL] MITM ARP Poisoning Detected! Real: {real_mac}, Claimed: {response_mac}")

# sniff(filter="arp", store=0, prn=check_arp_spoofing)`,
      go: `// Go 1.23+ (Concurrent gopacket L2 Sniffer)
package main

import (
	"fmt"
	"sync"
)

type ARPWatcher struct {
	mu       sync.RWMutex
	bindings map[string]string // IP -> Expected MAC
}

func (w *ARPWatcher) ProcessARPReply(ip, mac string) bool {
	w.mu.RLock()
	expectedMAC, exists := w.bindings[ip]
	w.mu.RUnlock()

	if exists && expectedMAC != mac {
		fmt.Printf("[ALERT] ARP Poisoning: IP %s claimed by unauthorized MAC %s (expected %s)\\n", ip, mac, expectedMAC)
		return false
	}
	return true
}`
    }
  }
];
