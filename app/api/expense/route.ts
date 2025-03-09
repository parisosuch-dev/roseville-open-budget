import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/neon/db";
import { expense } from "@/lib/neon/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    // get query params
    const params = req.nextUrl.searchParams;

    const year = params.get("year") as number | null;
    const department = params.get("department");

    const query = db.select().from(expense);

    if (year) {
      query.where(eq(expense.fiscal_year, year));
    }
    if (department) {
      query.where(eq(expense.department_cost_center_level, department));
    }

    const data = await query;

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
