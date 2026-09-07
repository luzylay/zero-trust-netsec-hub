/**
 * Enterprise RADIUS Client & Protocol Encoder (TypeScript 5.7+)
 * Standard: RFC 2865 (RADIUS Authentication) & RFC 2866 (RADIUS Accounting)
 * Target: Node.js 22+ / Modern Full-Stack Cloud Security Runtimes
 */

import { createHash, randomBytes } from 'node:crypto';

export enum RadiusCode {
  ACCESS_REQUEST = 1,
  ACCESS_ACCEPT = 2,
  ACCESS_REJECT = 3,
  ACCOUNTING_REQUEST = 4,
  ACCOUNTING_RESPONSE = 5,
  ACCESS_CHALLENGE = 11
}

export enum RadiusAttributeType {
  USER_NAME = 1,
  USER_PASSWORD = 2,
  NAS_IP_ADDRESS = 4,
  NAS_PORT = 5,
  SERVICE_TYPE = 6,
  FRAMED_IP_ADDRESS = 8,
  REPLY_MESSAGE = 18,
  VENDOR_SPECIFIC = 26,
  SESSION_TIMEOUT = 27
}

export interface RadiusAVP {
  readonly type: RadiusAttributeType;
  readonly value: string | number | Buffer;
}

export interface RadiusPacketOptions {
  readonly code: RadiusCode;
  readonly identifier?: number;
  readonly authenticator?: Buffer;
  readonly attributes: readonly RadiusAVP[];
  readonly secret: string;
}

export class RadiusPacket {
  public readonly code: RadiusCode;
  public readonly identifier: number;
  public readonly authenticator: Buffer;
  public readonly attributes: readonly RadiusAVP[];
  private readonly secret: string;

  constructor(options: RadiusPacketOptions) {
    this.code = options.code;
    this.identifier = options.identifier ?? Math.floor(Math.random() * 255);
    this.authenticator = options.authenticator ?? randomBytes(16);
    this.attributes = Object.freeze([...options.attributes]);
    this.secret = options.secret;
  }

  /**
   * Encrypts user password using RFC 2865 MD5 XOR stream method:
   * c(i) = p(i) XOR MD5(Secret + Request_Authenticator)
   */
  public encryptPassword(password: string): Buffer {
    const passBuffer = Buffer.from(password, 'utf-8');
    const paddedLength = Math.max(16, Math.ceil(passBuffer.length / 16) * 16);
    const paddedPass = Buffer.alloc(paddedLength, 0);
    passBuffer.copy(paddedPass);

    const hash = createHash('md5')
      .update(this.secret)
      .update(this.authenticator)
      .digest();

    const encrypted = Buffer.alloc(16);
    for (let i = 0; i < 16; i++) {
      encrypted[i] = paddedPass[i] ^ hash[i];
    }
    return encrypted;
  }

  /**
   * Encodes the full packet into a raw network binary buffer ready for UDP transport.
   */
  public encode(): Buffer {
    const encodedAttributes: Buffer[] = [];

    for (const attr of this.attributes) {
      let valBuf: Buffer;
      if (typeof attr.value === 'string') {
        valBuf = Buffer.from(attr.value, 'utf-8');
      } else if (typeof attr.value === 'number') {
        valBuf = Buffer.alloc(4);
        valBuf.writeUInt32BE(attr.value, 0);
      } else {
        valBuf = attr.value;
      }

      const attrBuf = Buffer.alloc(2 + valBuf.length);
      attrBuf.writeUInt8(attr.type, 0);
      attrBuf.writeUInt8(2 + valBuf.length, 1);
      valBuf.copy(attrBuf, 2);
      encodedAttributes.push(attrBuf);
    }

    const payload = Buffer.concat(encodedAttributes);
    const totalLength = 20 + payload.length;

    const packetHeader = Buffer.alloc(20);
    packetHeader.writeUInt8(this.code, 0);
    packetHeader.writeUInt8(this.identifier, 1);
    packetHeader.writeUInt16BE(totalLength, 2);
    this.authenticator.copy(packetHeader, 4);

    return Buffer.concat([packetHeader, payload]);
  }

  public toJSON(): Record<string, unknown> {
    return {
      code: RadiusCode[this.code],
      identifier: this.identifier,
      authenticator: this.authenticator.toString('hex'),
      attributeCount: this.attributes.length,
      attributes: this.attributes.map(a => ({
        type: RadiusAttributeType[a.type] ?? a.type,
        value: typeof a.value === 'object' && Buffer.isBuffer(a.value) ? `[Buffer 0x${a.value.toString('hex')}]` : a.value
      }))
    };
  }
}

// Example usage
if (import.meta.url.endsWith(process.argv[1] || '')) {
  console.log('[*] Testing Enterprise TypeScript RADIUS Encoder...');
  const packet = new RadiusPacket({
    code: RadiusCode.ACCESS_REQUEST,
    secret: 'EnterpriseRadiusSecretKey2026!',
    attributes: [
      { type: RadiusAttributeType.USER_NAME, value: 'devops_admin' },
      { type: RadiusAttributeType.NAS_PORT, value: 49152 }
    ]
  });

  const rawBytes = packet.encode();
  console.log(`[+] Encoded packet length: ${rawBytes.length} bytes`);
  console.log('[+] Packet Structure:', JSON.stringify(packet.toJSON(), null, 2));
}
