import { getAllEpicsService } from "@/lib/services/get-epics";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries());

  const result = await getAllEpicsService({ id, ...searchParams });

  return NextResponse.json(result);
}
