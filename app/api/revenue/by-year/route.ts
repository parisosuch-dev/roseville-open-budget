import { NextResponse } from "next/server";
import { revenueByYear } from "@/lib/neon/revenue";

export async function GET() {
  const data = await revenueByYear();

  return NextResponse.json(data);
}
