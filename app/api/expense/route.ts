import { NextResponse } from "next/server";
import db from "@/lib/neon/db";
import { expense } from "@/lib/neon/schema";

export async function GET() {
  const data = await db.select().from(expense);
  return NextResponse.json(data);
}
