import { NextRequest, NextResponse } from "next/server";
import { mockBlocks } from "@/app/api/_mock/store";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.json(mockBlocks[id] ?? []);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  mockBlocks[id] = body;
  return NextResponse.json(mockBlocks[id]);
}
