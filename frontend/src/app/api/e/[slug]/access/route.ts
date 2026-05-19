import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";
import { mockPublicInvitations } from "@/app/api/_mock/store";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const invitation = mockPublicInvitations[slug];
  if (!invitation) {
    return NextResponse.json({ message: "Convite não encontrado." }, { status: 404 });
  }

  const { email } = await req.json();
  const found = invitation.guestEmails.some(
    (e) => e.toLowerCase() === String(email).trim().toLowerCase()
  );
  if (!found) {
    return NextResponse.json(
      { message: "Este e-mail não está na lista de convidados." },
      { status: 403 }
    );
  }

  return NextResponse.json({ blocks: invitation.blocks });
}
