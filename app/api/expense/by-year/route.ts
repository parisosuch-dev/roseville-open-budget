import { NextResponse } from "next/server";
import { expenseByYear } from "@/lib/neon/expense";

export async function GET() {
  const data = await expenseByYear();

  return NextResponse.json(data);
}
