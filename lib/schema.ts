import { pgTable, serial, text, numeric, integer } from "drizzle-orm/pg-core";

export const expense = pgTable("expense", {
  id: serial("id").primaryKey(),
  fund_category_fund_level: text("fund_category_fund_level"),
  fund_type_fund_level_3: text("fund_type_fund_level_3"),
  fund_group_fund_level_2: text("fund_group_fund_level_2"),
  fund_fund_level_1: text("fund_fund_level_1"),
  department_cost_center_level: text("department_cost_center_level"),
  division_cost_center_level: text("division_cost_center_level"),
  cost_center_cost_center_level: text("cost_center_cost_center_level"),
  account_category_account: text("account_category_account"),
  account_type_account_level: text("account_type_account_level"),
  adopted_budget: numeric("adopted_budget"),
  amended_budget: numeric("amended_budget"),
  fiscal_year: integer("fiscal_year"),
  account_description: text("account_description"),
  fund_value: numeric("fund_value"),
  account_value: numeric("account_value"),
  center_value: numeric("center_value"),
});
