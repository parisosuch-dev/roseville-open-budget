import { expense } from "./schema";
import db from "./db";
import { sql, eq, and } from "drizzle-orm";

export interface Expense {
  account_category_account: string;
  account_description: string;
  account_type_account_level: string;
  account_value: string;
  adopted_budget: string;
  amended_budget: string;
  center_value: string;
  cost_center_cost_center_level: string;
  department_cost_center_level: string;
  fiscal_year: number;
  fund_category_fund_level: string;
  fund_fund_level_1: string;
  fund_group_fund_level_2: string;
  fund_type_fund_level_3: string;
  fund_value: string;
  id: number;
}

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

export const expenseByFundCategory = async (year?: number) => {
  try {
    if (year) {
      const result = await db
        .select({
          fundCategory: expense.fund_category_fund_level,
          fiscalYear: expense.fiscal_year,
          totalExpenses: sql<number>`SUM(${expense.adopted_budget})`,
        })
        .from(expense)
        .where(eq(expense.fiscal_year, year))
        .groupBy(expense.fund_category_fund_level, expense.fiscal_year)
        .orderBy(expense.fiscal_year);

      return result;
    }
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

export const expenseByDepartment = async (
  year?: number | null,
  department?: string | null
) => {
  try {
    if (year && department) {
      const result = await db
        .select({
          department: expense.department_cost_center_level,
          fiscalYear: expense.fiscal_year,
          totalExpenses: sql<number>`SUM(${expense.adopted_budget})`,
        })
        .from(expense)
        .where(
          and(
            eq(expense.fiscal_year, year),
            eq(expense.department_cost_center_level, department)
          )
        )
        .groupBy(expense.department_cost_center_level, expense.fiscal_year)
        .orderBy(expense.fiscal_year);

      return result;
    } else if (year && !department) {
      const result = await db
        .select({
          department: expense.department_cost_center_level,
          fiscalYear: expense.fiscal_year,
          totalExpenses: sql<number>`SUM(${expense.adopted_budget})`,
        })
        .from(expense)
        .where(eq(expense.fiscal_year, year))
        .groupBy(expense.department_cost_center_level, expense.fiscal_year)
        .orderBy(expense.fiscal_year);

      return result;
    } else if (!year && department) {
      const result = await db
        .select({
          department: expense.department_cost_center_level,
          fiscalYear: expense.fiscal_year,
          totalExpenses: sql<number>`SUM(${expense.adopted_budget})`,
        })
        .from(expense)
        .where(eq(expense.department_cost_center_level, department))
        .groupBy(expense.department_cost_center_level, expense.fiscal_year)
        .orderBy(expense.fiscal_year);

      return result;
    }
    const result = await db
      .select({
        department: expense.department_cost_center_level,
        fiscalYear: expense.fiscal_year,
        totalExpenses: sql<number>`SUM(${expense.adopted_budget})`,
      })
      .from(expense)
      .groupBy(expense.department_cost_center_level, expense.fiscal_year)
      .orderBy(expense.fiscal_year);
    return result;
  } catch (error) {
    console.error("Error fetching department expense by year:", error);
    throw error;
  }
};
