import db from "@/lib/db";
import { expense, revenue } from "@/lib/schema";
import { formatNumber } from "@/lib/utils";

export default async function Home() {
  const data = await db.select().from(expense).limit(10);

  const revenueData = await db.select().from(revenue).limit(10);

  return (
    <div>
      <h1 className="text-6xl font-mono">Budget Data</h1>
      <ul>
        {data.map((row) => (
          <li key={row.id}>
            {row.account_description}: ${row.adopted_budget}
          </li>
        ))}
      </ul>

      <h1>Revenue Data</h1>
      <ul>
        {revenueData.map((row) => (
          <li key={row.id}>
            {row.account_description}: $
            {formatNumber(Number(row.adopted_budget!))}
          </li>
        ))}
      </ul>
    </div>
  );
}
