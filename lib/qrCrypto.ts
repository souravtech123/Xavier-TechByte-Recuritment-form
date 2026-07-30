/**
 * qrCrypto.ts
 *
 * AES-256-CBC encryption/decryption for QR payloads.
 *
 * - encrypt(token)  → opaque base64url string  (encoded in the QR)
 * - decrypt(payload) → original token UUID | null  (used by verify API)
 *
 * The secret comes from process.env.QR_SECRET.
 * A random 16-byte IV is generated per encryption and prepended to the
 * ciphertext so each QR looks different even for the same token.
 *
 * NOTE: This file runs only on the SERVER (API routes). Never import it
 * from client components.
 */

import crypto from "crypto";

/** Derive a 32-byte key from the QR_SECRET environment variable */
function getKey(): Buffer {
  const secret = process.env.QR_SECRET;
  if (!secret) {
    throw new Error("QR_SECRET is not set in environment variables.");
  }
  // SHA-256 gives us exactly 32 bytes for AES-256
  return crypto.createHash("sha256").update(secret).digest();
}

/**
 * Encrypt a qrToken UUID into an opaque base64url string.
 * Format (binary): [16-byte IV][N-byte ciphertext]
 * Encoded as base64url so it's safe in any context.
 */
export function encryptToken(token: string): string {
  const key = getKey();
  const iv = crypto.randomBytes(16); // fresh IV every call
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  const encrypted = Buffer.concat([
    cipher.update(token, "utf8"),
    cipher.final(),
  ]);

  // Prepend IV so we can extract it during decryption
  const combined = Buffer.concat([iv, encrypted]);
  return combined.toString("base64url"); // URL-safe, no padding issues
}

/**
 * Decrypt a QR payload back to the original qrToken UUID.
 * Returns null if the payload is invalid / tampered / wrong secret.
 */
export function decryptPayload(payload: string): string | null {
  try {
    const key = getKey();
    const combined = Buffer.from(payload, "base64url");

    if (combined.length < 17) return null; // too short to be valid

    const iv = combined.subarray(0, 16);
    const ciphertext = combined.subarray(16);

    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    const decrypted = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]);

    return decrypted.toString("utf8");
  } catch {
    // Any error (bad padding, wrong key, etc.) means invalid payload
    return null;
  }
}
