import { NextRequest, NextResponse } from "next/server";
import { mockPublicInvitations } from "@/app/api/_mock/store";
import type { RsvpStatus } from "@/lib/types";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const invitation = mockPublicInvitations[slug];
  if (!invitation) {
    return NextResponse.json({ message: "Invitation not found." }, { status: 404 });
  }

  const { email, status }: { email: string; status: RsvpStatus } = await req.json();
  const found = invitation.guestEmails.some(
    (e) => e.toLowerCase() === email.trim().toLowerCase()
  );
  if (!found) {
    return NextResponse.json({ message: "Guest not found." }, { status: 404 });
  }

  // TODO: persist RSVP status in DB
  return NextResponse.json({ status });
}
