// Mock token utilities. Edge-runtime compatible (uses Web atob/btoa, no Buffer).
// Replace with proper JWT verification when the real backend lands.

export const AUTH_COOKIE_NAME = "wellcard_auth";
export const AUTH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

interface AuthTokenPayload {
  sub: string;
  name: string;
  email: string;
  exp: number;
}

function toBase64Url(value: string): string {
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): string {
  const pad = value.length % 4 === 0 ? "" : "=".repeat(4 - (value.length % 4));
  return atob(value.replace(/-/g, "+").replace(/_/g, "/") + pad);
}

export function encodeAuthToken(
  payload: Omit<AuthTokenPayload, "exp">,
  ttlMs: number = AUTH_TOKEN_TTL_MS,
): string {
  const full: AuthTokenPayload = { ...payload, exp: Date.now() + ttlMs };
  return toBase64Url(JSON.stringify(full));
}

export function decodeAuthToken(token: string): AuthTokenPayload | null {
  try {
    const parsed = JSON.parse(fromBase64Url(token)) as AuthTokenPayload;
    if (typeof parsed.exp !== "number" || parsed.exp < Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}
