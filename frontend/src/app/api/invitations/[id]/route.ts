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
  const previous = mockInvitations[index];
  const body = await req.json();
  const updated = { ...previous, ...body };
  mockInvitations[index] = updated;

  // Keep public version in sync. Reindex if slug changed.
  if (previous.slug !== updated.slug) {
    delete mockPublicInvitations[previous.slug];
  }
  mockPublicInvitations[updated.slug] = {
    title: updated.title,
    eventDate: updated.eventDate,
    eventLocation: updated.eventLocation,
    description: updated.description,
    coverImage: updated.coverImage,
    blocks: mockBlocks[updated.id] ?? [],
    guestEmails: (mockGuests[updated.id] ?? []).map((g) => g.email),
  };

  return NextResponse.json(updated);
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
