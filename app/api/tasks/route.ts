import { getTasksService } from "@/lib/services/get-tasks";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries());

  const result = await getTasksService(searchParams);

  return NextResponse.json(result);
}
