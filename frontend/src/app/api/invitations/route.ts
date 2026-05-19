import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";
import {
  mockBlocks,
  mockGuests,
  mockInvitations,
  mockPublicInvitations,
} from "@/app/api/_mock/store";
import type { Invitation } from "@/lib/types";

export async function GET() {
  return NextResponse.json(mockInvitations);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Pick<
    Invitation,
    "title" | "slug" | "eventDate" | "eventLocation"
  > &
    Partial<Pick<Invitation, "description" | "coverImage">>;

  if (mockInvitations.some((i) => i.slug === body.slug)) {
    return NextResponse.json(
      { message: "Este slug já está em uso." },
      { status: 409 },
    );
  }

  const newInvitation: Invitation = {
    id: crypto.randomUUID(),
    title: body.title,
    slug: body.slug,
    eventDate: body.eventDate,
    eventLocation: body.eventLocation,
    description: body.description ?? "",
    coverImage: body.coverImage ?? "",
    totalGuests: 0,
    confirmed: 0,
    declined: 0,
    pending: 0,
  };

  mockInvitations.push(newInvitation);
  mockBlocks[newInvitation.id] = [];
  mockGuests[newInvitation.id] = [];
  mockPublicInvitations[newInvitation.slug] = {
    title: newInvitation.title,
    eventDate: newInvitation.eventDate,
    eventLocation: newInvitation.eventLocation,
    description: newInvitation.description,
    coverImage: newInvitation.coverImage,
    blocks: [],
    guestEmails: [],
  };

  return NextResponse.json(newInvitation, { status: 201 });
}
