import { NextResponse } from "next/server";
import { expenseByYear } from "@/lib/neon/expense";

export async function GET() {
  try {
    const data = await expenseByYear();

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
