import { NextRequest, NextResponse } from "next/server";

// Mock user for testing without a real backend.
// Remove this file when the real backend is connected.
const MOCK_USER = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Test User",
  email: "test@example.com",
  password: "password123",
};

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (email !== MOCK_USER.email || password !== MOCK_USER.password) {
    return NextResponse.json(
      { message: "Invalid email or password." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    token: `mock-jwt-${Date.now()}`,
    user: {
      id: MOCK_USER.id,
      name: MOCK_USER.name,
      email: MOCK_USER.email,
    },
  });
}
