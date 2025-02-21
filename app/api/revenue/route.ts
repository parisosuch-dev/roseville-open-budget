import { NextResponse } from "next/server";
import db from "@/lib/neon/db";
import { revenue } from "@/lib/neon/schema";

export async function GET() {
  try {
    const data = await db.select().from(revenue);
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
