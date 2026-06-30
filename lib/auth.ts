// ============================================================
// Mobiz Car Rental — admin authentication (TEMPORARY DEMO)
// ------------------------------------------------------------
// Credentials are read from environment variables and compared on the
// SERVER ONLY (Node runtime), so the password is never shipped in the
// client bundle. For production, replace with a database + hashed passwords.
// ============================================================

import crypto from "crypto";

// Re-export edge-safe constants for convenience in Node routes.
export { ADMIN_COOKIE, ADMIN_SESSION_VALUE } from "./auth-constants";

// Demo defaults — overridable via env. NOT prefixed with NEXT_PUBLIC_,
// so these never reach the browser bundle.
const DEFAULT_EMAIL = "test.mobiz.mu@gmail.com";
const DEFAULT_PASSWORD = "MobizTest1";

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

/** Validate submitted credentials against the configured admin account. */
export function verifyAdminCredentials(email: string, password: string): boolean {
  const expectedEmail = (process.env.ADMIN_EMAIL || DEFAULT_EMAIL).trim();
  const expectedPassword = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
  const emailOk = safeEqual(
    email.trim().toLowerCase(),
    expectedEmail.toLowerCase()
  );
  const passOk = safeEqual(password, expectedPassword);
  return emailOk && passOk;
}
