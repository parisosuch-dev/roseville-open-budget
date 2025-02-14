import BudgetRevenueLineChart from "@/components/charts/budget-and-revenue";
import { Card } from "@tremor/react";

export default async function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-4xl font-medium font-mono">
        Roseville Open Budget 🌹
      </h1>
      <Card className="mt-2 sm:mt-6 w-5/6 sm:w-1/3">
        <h2 className="text-lg sm:text-2xl font-medium font-mono">
          Expense vs Revenue By Year (in millions)
        </h2>
        <BudgetRevenueLineChart />
      </Card>
    </div>
  );
}
