import { NextRequest, NextResponse } from "next/server";
import { mockPublicInvitations } from "@/app/api/_mock/store";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const invitation = mockPublicInvitations[slug];
  if (!invitation) {
    return NextResponse.json({ message: "Convite não encontrado." }, { status: 404 });
  }
  // Return only metadata — blocks are withheld until email is validated.
  const { blocks: _blocks, guestEmails: _guestEmails, ...meta } = invitation;
  return NextResponse.json(meta);
}
