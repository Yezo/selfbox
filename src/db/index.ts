import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as dotenv from "dotenv";
dotenv.config();
// neonConfig.fetchConnectionCache = true;

// const sql = neon(process.env.DATABASE_URL!);
const sql = neon(
  "postgresql://kvo.codes:O2GZhLjoyen1@ep-calm-heart-a5dsyumr.us-east-2.aws.neon.tech/template-db?sslmode=require",
);

//@ts-ignore
export const db = drizzle(sql, { logger: true });

export * from "drizzle-orm";
