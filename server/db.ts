import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

let pool: pg.Pool | null = null;
let db: ReturnType<typeof drizzle> | null = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool, { schema });
} else if (process.env.NODE_ENV === "production") {
  throw new Error(
    "DATABASE_URL must be set in production. Did you forget to provision a database?",
  );
} else {
  console.warn("⚠️  DATABASE_URL not set. Contact form will not work in development.");
}

export { pool, db };
