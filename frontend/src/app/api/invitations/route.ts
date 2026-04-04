import { NextResponse } from "next/server";
import { mockInvitations } from "@/app/api/_mock/store";

export async function GET() {
  return NextResponse.json(mockInvitations);
}
