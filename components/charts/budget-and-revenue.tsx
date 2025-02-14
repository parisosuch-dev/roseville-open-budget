"use client";

import { useState, useEffect } from "react";
import { LineChart } from "@tremor/react";

export default function BudgetRevenueLineChart() {
  const [data, setData] = useState<{ year: number; income: number }[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/revenue/by-year"); // Create an API route
      const json: { fiscalYear: number; totalIncome: string }[] =
        await res.json();

      const set = json.map((value) => ({
        year: value.fiscalYear,
        income: Number(value.totalIncome),
      }));
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
      categories={["income"]}
      colors={["green"]}
      showLegend={true}
      className="px-1 sm:px-8 font-mono"
      valueFormatter={valueFormatter}
    />
  );
}
