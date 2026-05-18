import { NextRequest, NextResponse } from "next/server";

// Mock register handler for testing without a real backend.
// Remove this file when the real backend is connected.
const TAKEN_EMAILS = ["test@example.com"];

export async function POST(request: NextRequest) {
  const { name, email, password: _password } = await request.json();

  if (TAKEN_EMAILS.includes(email)) {
    return NextResponse.json(
      { message: "Este e-mail já está cadastrado." },
      { status: 409 }
    );
  }

  return NextResponse.json(
    {
      token: `mock-jwt-${Date.now()}`,
      user: {
        id: crypto.randomUUID(),
        name,
        email,
      },
    },
    { status: 201 }
  );
}
