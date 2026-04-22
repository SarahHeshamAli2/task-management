import { getProjectDetail } from "@/lib/services/get-project-detail";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") ?? "";

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const result = await getProjectDetail(id);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "UNKNOWN ERROR";

    if (message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
