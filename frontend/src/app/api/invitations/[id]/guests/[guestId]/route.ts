import { NextRequest, NextResponse } from "next/server";
import { mockGuests } from "@/app/api/_mock/store";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; guestId: string }> }
) {
  const { id, guestId } = await params;
  const list = mockGuests[id];
  if (!list) {
    return NextResponse.json({ message: "Invitation not found." }, { status: 404 });
  }
  const index = list.findIndex((g) => g.id === guestId);
  if (index === -1) {
    return NextResponse.json({ message: "Guest not found." }, { status: 404 });
  }
  mockGuests[id] = list.filter((g) => g.id !== guestId);
  return new NextResponse(null, { status: 204 });
}
