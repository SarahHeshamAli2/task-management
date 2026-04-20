import { getAllProjectsService } from "@/lib/services/get-projects";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit")) || 10;
  const offset = Number(searchParams.get("offset")) || 0;

  const result = await getAllProjectsService({ limit, offset });
  return NextResponse.json(result);
}
