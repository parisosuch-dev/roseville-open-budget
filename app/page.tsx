import db from "@/lib/db";
import { expense } from "@/lib/schema";

export default async function Home() {
  const data = await db.select().from(expense).limit(100);
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
    </div>
  );
}
