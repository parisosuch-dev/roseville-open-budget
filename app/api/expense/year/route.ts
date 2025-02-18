import { NextResponse } from "next/server";
import { getExpenseYears } from "@/lib/neon/meta";

export async function GET() {
  const years = await getExpenseYears();

  return NextResponse.json(years);
}
