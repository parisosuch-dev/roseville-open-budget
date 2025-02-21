import { NextResponse } from "next/server";
import { revenueByYear } from "@/lib/neon/revenue";

export async function GET() {
  try {
    const data = await revenueByYear();

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
