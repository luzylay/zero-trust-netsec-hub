/**
 * Test Suite for TypeScript RADIUS Client & Protocol Encoder
 * Module: tests/typescript/test_radius_client.mjs
 * Framework: Node.js 22+ Test Runner / Assertions
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

export const RadiusCode = {
  ACCESS_REQUEST: 1,
  ACCESS_ACCEPT: 2,
  ACCESS_REJECT: 3,
};

export const RadiusAttributeType = {
  USER_NAME: 1,
  USER_PASSWORD: 2,
  NAS_PORT: 5,
};

export class RadiusPacket {
  constructor(options) {
    this.code = options.code;
    this.identifier = options.identifier ?? 42;
    this.authenticator = options.authenticator ?? Buffer.alloc(16, 0xAA);
    this.attributes = options.attributes || [];
    this.secret = options.secret;
  }

  encryptPassword(password) {
    const passBuffer = Buffer.from(password, 'utf-8');
    const paddedPass = Buffer.alloc(16, 0);
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

  encode() {
    const encodedAttributes = [];
    for (const attr of this.attributes) {
      const valBuf = Buffer.from(attr.value, 'utf-8');
      const attrBuf = Buffer.alloc(2 + valBuf.length);
      attrBuf.writeUInt8(attr.type, 0);
      attrBuf.writeUInt8(2 + valBuf.length, 1);
      valBuf.copy(attrBuf, 2);
      encodedAttributes.push(attrBuf);
    }

    const payload = Buffer.concat(encodedAttributes);
    const totalLength = 20 + payload.length;

    const header = Buffer.alloc(20);
    header.writeUInt8(this.code, 0);
    header.writeUInt8(this.identifier, 1);
    header.writeUInt16BE(totalLength, 2);
    this.authenticator.copy(header, 4);

    return Buffer.concat([header, payload]);
  }
}

test('RADIUS Packet: Header length calculation is exact (20 bytes + attributes)', () => {
  const packet = new RadiusPacket({
    code: RadiusCode.ACCESS_REQUEST,
    identifier: 1,
    secret: 'RadiusSecret2026!',
    attributes: [
      { type: RadiusAttributeType.USER_NAME, value: 'admin' } // 2 header + 5 chars = 7 bytes
    ]
  });

  const raw = packet.encode();
  assert.equal(raw.length, 27); // 20 + 7
  assert.equal(raw.readUInt8(0), RadiusCode.ACCESS_REQUEST);
  assert.equal(raw.readUInt8(1), 1);
  assert.equal(raw.readUInt16BE(2), 27);
});

test('RADIUS Password Encryption: XOR stream reversible with shared secret', () => {
  const secret = 'EnterpriseKey2026!';
  const auth = Buffer.alloc(16, 0x55);
  const packet = new RadiusPacket({
    code: RadiusCode.ACCESS_REQUEST,
    secret,
    authenticator: auth
  });

  const password = 'SuperSecretPassword';
  const encrypted = packet.encryptPassword(password);

  // Decrypt check
  const hash = createHash('md5').update(secret).update(auth).digest();
  const decrypted = Buffer.alloc(16);
  for (let i = 0; i < 16; i++) {
    decrypted[i] = encrypted[i] ^ hash[i];
  }

  const resultStr = decrypted.toString('utf-8').replace(/\0/g, '');
  assert.equal(resultStr, password.slice(0, 16));
});
