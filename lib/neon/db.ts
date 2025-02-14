import { drizzle } from "drizzle-orm/neon-serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable required for Neon DB.");
}

const db = drizzle(process.env.DATABASE_URL!);

export default db;
