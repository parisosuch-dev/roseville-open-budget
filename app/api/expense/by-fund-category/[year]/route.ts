import { NextResponse } from "next/server";
import { expenseByFundCategory } from "@/lib/neon/expense";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ year: string }> }
) {
  const { year } = await params;

  const data = await expenseByFundCategory(Number(year));

  return NextResponse.json(data);
}
