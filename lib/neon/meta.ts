import db from "./db";
import { sql, eq } from "drizzle-orm";
import { expense } from "./schema";

export const getExpenseYears = async () => {
  try {
    const result = await db
      .select({
        fiscalYear: expense.fiscal_year,
      })
      .from(expense)
      .groupBy(expense.fiscal_year)
      .orderBy(expense.fiscal_year);

    let years = [];

    for (let r of result) {
      years.push(r.fiscalYear);
    }

    return {
      years: years,
    };
  } catch (error) {
    console.error("Error fetching expense by year:", error);
    throw error;
  }
};
