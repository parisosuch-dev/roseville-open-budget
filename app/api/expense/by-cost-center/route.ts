import { NextRequest, NextResponse } from "next/server";
import { expenseByCostCenter } from "@/lib/neon/expense";

export async function GET(req: NextRequest) {
  try {
    // get query params if present
    const params = req.nextUrl.searchParams;
    const year = params.get("year") as number | null;
    const department = params.get("department");

    const data = await expenseByCostCenter(year, department);

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred." },
      { status: 500 }
    );
  }
}
