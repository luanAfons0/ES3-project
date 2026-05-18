import { NextRequest, NextResponse } from "next/server";
import { mockGuests } from "@/app/api/_mock/store";
import type { Guest } from "@/lib/types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.json(mockGuests[id] ?? []);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const list = mockGuests[id] ?? [];

  if (list.some((g) => g.email.toLowerCase() === body.email.toLowerCase())) {
    return NextResponse.json(
      { message: "Este e-mail já está na lista de convidados." },
      { status: 409 }
    );
  }

  const newGuest: Guest = {
    id: crypto.randomUUID(),
    name: body.name,
    email: body.email,
    rsvp: "pending",
  };
  mockGuests[id] = [...list, newGuest];
  return NextResponse.json(newGuest, { status: 201 });
}
