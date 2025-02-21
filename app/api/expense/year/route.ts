import { NextResponse } from "next/server";
import { getExpenseYears } from "@/lib/neon/meta";

export async function GET() {
  try {
    const years = await getExpenseYears();

    return NextResponse.json(years);
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
