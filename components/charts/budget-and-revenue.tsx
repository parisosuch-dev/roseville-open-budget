"use client";

import { useState, useEffect } from "react";
import { LineChart } from "@tremor/react";
import { expense } from "@/lib/neon/schema";

export default function BudgetRevenueLineChart() {
  const [expenseData, setExpenseData] = useState<
    { year: number; income: number }[]
  >([]);
  const [revenueData, setRevenueData] = useState<
    { year: number; income: number }[]
  >([]);

  const [data, setData] = useState<
    { income: number; expenses: number; year: number }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      // get revenue data
      const revenueRes = await fetch("/api/revenue/by-year");
      const revenueJson: { fiscalYear: number; totalIncome: string }[] =
        await revenueRes.json();
      const revenueSet = revenueJson.map((value) => ({
        year: value.fiscalYear,
        income: Number(value.totalIncome),
      }));

      // get expense data
      const expenseRes = await fetch("/api/expense/by-year");
      const expenseJson: { fiscalYear: number; totalExpenses: string }[] =
        await expenseRes.json();
      const expenseSet = expenseJson.map((value) => ({
        year: value.fiscalYear,
        income: Number(value.totalExpenses),
      }));

      const set = revenueSet.map((revenue) => {
        // Find the corresponding expense for the same year
        const expense = expenseSet.find(
          (expense) => expense.year === revenue.year
        );

        // Return the merged data with year, revenue, and expense
        return {
          year: revenue.year,
          income: revenue.income,
          expenses: expense?.income || 0,
        };
      });

      setData(set);
    }
    fetchData();
  }, []);

  const valueFormatter = (number: number) =>
    `${(number / 1000000).toString()} M`;

  return (
    <LineChart
      data={data}
      index="year"
      categories={["income", "expenses"]}
      colors={["green", "red"]}
      showLegend={true}
      className="px-1 sm:px-8 font-mono"
      valueFormatter={valueFormatter}
    />
  );
}
