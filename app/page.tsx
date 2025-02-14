import BudgetRevenueLineChart from "@/components/charts/budget-and-revenue";
import { Card } from "@tremor/react";

export default async function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Card className="w-1/2 h-64">
        <h2>Budget vs Revenue By Year</h2>
        <BudgetRevenueLineChart />
      </Card>
    </div>
  );
}
