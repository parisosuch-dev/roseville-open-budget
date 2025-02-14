import BudgetRevenueLineChart from "@/components/charts/budget-and-revenue";
import { Card } from "@tremor/react";

export default async function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Card className="w-1/3">
        <h2 className="text-2xl font-medium font-mono">
          Budget vs Revenue By Year (in millions)
        </h2>
        <BudgetRevenueLineChart />
      </Card>
    </div>
  );
}
