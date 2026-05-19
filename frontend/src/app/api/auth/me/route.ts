import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, decodeAuthToken } from "@/lib/auth-token";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const payload = token ? decodeAuthToken(token) : null;

  if (!payload) {
    const res = NextResponse.json(
      { message: "Sessão expirada ou inválida." },
      { status: 401 },
    );
    // Clean up expired cookie so the client doesn't keep re-sending it.
    if (token) res.cookies.delete(AUTH_COOKIE_NAME);
    return res;
  }

  return NextResponse.json({
    user: { id: payload.sub, name: payload.name, email: payload.email },
  });
}
