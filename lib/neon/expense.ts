import { expense } from "./schema";
import db from "./db";
import { sql } from "drizzle-orm";

export const expenseByYear = async () => {
  try {
    const result = await db
      .select({
        fiscalYear: expense.fiscal_year,
        totalExpenses: sql<number>`SUM(${expense.adopted_budget})`,
      })
      .from(expense)
      .groupBy(expense.fiscal_year)
      .orderBy(expense.fiscal_year);

    return result;
  } catch (error) {
    console.error("Error fetching expense by year:", error);
    throw error;
  }
};

export const expenseByFundCategory = async () => {
  try {
    const result = await db
      .select({
        fundCategory: expense.fund_category_fund_level,
        fiscalYear: expense.fiscal_year,
        totalExpenses: sql<number>`SUM(${expense.adopted_budget})`,
      })
      .from(expense)
      .groupBy(expense.fund_category_fund_level, expense.fiscal_year)
      .orderBy(expense.fiscal_year);

    return result;
  } catch (error) {
    console.error("Error fetching expense by year:", error);
    throw error;
  }
};
