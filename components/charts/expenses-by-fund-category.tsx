"use client";

import { DonutChart, List, ListItem } from "@tremor/react";
import { useEffect, useState } from "react";

export default function ExpensesByFundCategoryChart() {
  const [data, setData] = useState<
    {
      category: string;
      year: number;
      expenses: number;
      share: string;
    }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/expense/by-fund-category/2024");

      const json: {
        fundCategory: string;
        fiscalYear: number;
        totalExpenses: string;
      }[] = await res.json();

      const set = json.map((value) => ({
        category: value.fundCategory,
        year: value.fiscalYear,
        expenses: Number(value.totalExpenses),
      }));

      const sum = set.reduce((sum, item) => sum + item.expenses, 0);

      const finalSet = set.map((value) => ({
        category: value.category,
        year: value.year,
        expenses: value.expenses,
        share: ((value.expenses / sum) * 100).toFixed(2),
      }));

      setData(finalSet);
    }

    fetchData();
  }, []);

  const currencyFormatter = (number: number) => {
    return "$" + Intl.NumberFormat("us").format(number).toString();
  };

  return (
    <div className="mt-6 flex sm:flex-row flex-col">
      <DonutChart
        className="font-mono"
        data={data}
        category="expenses"
        index="category"
        valueFormatter={currencyFormatter}
      />
      <List className="mt-4 sm:mt-8">
        {data.map((item) => (
          <ListItem key={item.category} className="space-x-6">
            <div className="flex items-center space-x-2.5 truncate">
              <span
                className={"size-2.5 shrink-0 rounded-sm"}
                aria-hidden={true}
              />
              <span className="truncate dark:text-dark-tremor-content-emphasis">
                {item.category}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {currencyFormatter(item.expenses)}
              </span>
              <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
                {item.share}%
              </span>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
