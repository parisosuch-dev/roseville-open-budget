import { NextResponse } from "next/server";
import { expenseByFundCategory } from "@/lib/neon/expense";

export async function GET() {
  const data = await expenseByFundCategory();

  return NextResponse.json(data);
}
