import { NextResponse } from "next/server";
import db from "@/lib/neon/db";
import { revenue } from "@/lib/neon/schema";

export async function GET() {
  const data = await db.select().from(revenue);
  return NextResponse.json(data);
}
