import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  AUTH_COOKIE_NAME,
  AUTH_TOKEN_TTL_MS,
  encodeAuthToken,
} from "@/lib/auth-token";

// Mock register handler for testing without a real backend.
// Remove this file when the real backend is connected.
const TAKEN_EMAILS = ["test@example.com"];

export async function POST(request: NextRequest) {
  const { name, email, password: _password } = await request.json();

  if (TAKEN_EMAILS.includes(email)) {
    return NextResponse.json(
      { message: "Este e-mail já está cadastrado." },
      { status: 409 },
    );
  }

  const userId = crypto.randomUUID();
  const token = encodeAuthToken({ sub: userId, name, email });

  const res = NextResponse.json(
    {
      user: { id: userId, name, email },
    },
    { status: 201 },
  );
  res.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_TOKEN_TTL_MS / 1000,
  });
  return res;
}
