import { NextResponse } from "next/server";
import { expenseByFundCategory } from "@/lib/neon/expense";

export async function GET(
  request: Request,
  { params }: { params: { year: number } }
) {
  const { year } = params;

  const data = await expenseByFundCategory(year);

  return NextResponse.json(data);
}
