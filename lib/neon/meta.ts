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

    const years = [];

    for (const r of result) {
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

export const getDepartments = async () => {
  try {
    const result = await db
      .select({
        department: expense.department_cost_center_level,
      })
      .from(expense)
      .groupBy(expense.department_cost_center_level)
      .orderBy(expense.department_cost_center_level);

    const departments = [];
    for (const res of result) {
      departments.push(res.department);
    }

    return departments;
  } catch (error) {
    console.error("Error fetching expense years:", error);
    throw error;
  }
};
