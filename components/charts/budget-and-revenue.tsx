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

      let set = json.map((value) => ({
        year: value.fiscalYear,
        income: Number(value.totalIncome),
      }));

      console.log(set);
      setData(set);
    }
    fetchData();
  }, []);

  const valueFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <LineChart
      data={data}
      index="year" // Use fiscalYear for the x-axis
      categories={["income"]} // Use totalIncome for the y-axis
      colors={["blue"]} // Set color to blue for the totalIncome line
      showLegend={true} // Show legend to indicate the data series
      className="h-full w-full px-8" // Styling class
      valueFormatter={valueFormatter}
    />
  );
}
