import { NextResponse } from "next/server";
import { expenseByFundCategory } from "@/lib/neon/expense";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ year: string }> }
) {
  const { year } = await params;
  try {
    const data = await expenseByFundCategory(Number(year));

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
