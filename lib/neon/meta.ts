import db from "./db";
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

    const data = {
      years: years,
    };

    return data;
  } catch (error) {
    console.error("Error fetching expense years:", error);
    throw error;
  }
};
