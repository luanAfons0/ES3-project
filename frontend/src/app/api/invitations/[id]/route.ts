import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";
import {
  mockBlocks,
  mockGuests,
  mockInvitations,
  mockPublicInvitations,
} from "@/app/api/_mock/store";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const invitation = mockInvitations.find((i) => i.id === id);
  if (!invitation) {
    return NextResponse.json({ message: "Convite não encontrado." }, { status: 404 });
  }
  return NextResponse.json(invitation);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const index = mockInvitations.findIndex((i) => i.id === id);
  if (index === -1) {
    return NextResponse.json({ message: "Convite não encontrado." }, { status: 404 });
  }
  const body = await req.json();
  mockInvitations[index] = { ...mockInvitations[index], ...body };
  return NextResponse.json(mockInvitations[index]);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const index = mockInvitations.findIndex((i) => i.id === id);
  if (index === -1) {
    return NextResponse.json({ message: "Convite não encontrado." }, { status: 404 });
  }
  const [removed] = mockInvitations.splice(index, 1);
  delete mockBlocks[removed.id];
  delete mockGuests[removed.id];
  delete mockPublicInvitations[removed.slug];
  return new NextResponse(null, { status: 204 });
}
