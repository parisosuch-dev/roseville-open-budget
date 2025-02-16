import BudgetRevenueLineChart from "@/components/charts/budget-and-revenue";
import ExpensesByFundCategoryChart from "@/components/charts/expenses-by-fund-category";
import { Card } from "@tremor/react";

export default async function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-5/6 sm:w-2/3 2xl:w-1/3">
        <h1 className="text-2xl sm:text-4xl text-center font-medium font-mono">
          Roseville Open Budget 🌹
        </h1>
        <Card className="mt-6 sm:mt-12">
          <h2 className="text-lg sm:text-2xl text-center font-medium font-mono">
            Expense vs Revenue By Year (in millions)
          </h2>
          <BudgetRevenueLineChart />
        </Card>
        <Card className="mt-6 sm:mt-12">
          <h2 className="text-lg sm:text-2xl text-center font-medium font-mono">
            Spending by Top Level Funding Category
          </h2>
          <ExpensesByFundCategoryChart />
        </Card>
      </div>
    </div>
  );
}
