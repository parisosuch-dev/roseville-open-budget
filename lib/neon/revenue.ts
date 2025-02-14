import { revenue } from "./schema";
import db from "./db";
import { sql } from "drizzle-orm";

export const revenueByYear = async () => {
  try {
    const result = await db
      .select({
        fiscalYear: revenue.fiscal_year,
        totalIncome: sql<number>`SUM(${revenue.adopted_budget})`, // Use `sql` helper
      })
      .from(revenue)
      .groupBy(revenue.fiscal_year)
      .orderBy(revenue.fiscal_year);

    return result;
  } catch (error) {
    console.error("Error fetching revenue by year:", error);
    throw error;
  }
};
