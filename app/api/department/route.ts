import { getDepartments } from "@/lib/neon/meta";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const departments = await getDepartments();

    return NextResponse.json(departments);
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
