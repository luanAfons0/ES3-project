import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  AUTH_COOKIE_NAME,
  AUTH_TOKEN_TTL_MS,
  encodeAuthToken,
} from "@/lib/auth-token";

// Mock user for testing without a real backend.
// Remove this file when the real backend is connected.
const MOCK_USER = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Usuário de teste",
  email: "test@example.com",
  password: "password123",
};

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (email !== MOCK_USER.email || password !== MOCK_USER.password) {
    return NextResponse.json(
      { message: "E-mail ou senha inválidos." },
      { status: 401 },
    );
  }

  const token = encodeAuthToken({
    sub: MOCK_USER.id,
    name: MOCK_USER.name,
    email: MOCK_USER.email,
  });

  const res = NextResponse.json({
    user: {
      id: MOCK_USER.id,
      name: MOCK_USER.name,
      email: MOCK_USER.email,
    },
  });
  res.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_TOKEN_TTL_MS / 1000,
  });
  return res;
}
