import { NextRequest, NextResponse } from "next/server";
import { mockPublicInvitations } from "@/app/api/_mock/store";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const invitation = mockPublicInvitations[slug];
  if (!invitation) {
    return NextResponse.json({ message: "Invitation not found." }, { status: 404 });
  }

  const { email } = await req.json();
  const found = invitation.guestEmails.some(
    (e) => e.toLowerCase() === String(email).trim().toLowerCase()
  );
  if (!found) {
    return NextResponse.json(
      { message: "This email is not on the guest list." },
      { status: 403 }
    );
  }

  return NextResponse.json({ blocks: invitation.blocks });
}
