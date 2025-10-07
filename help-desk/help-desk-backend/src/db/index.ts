import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { schema } from "./schema";
import { eq } from "drizzle-orm";

export const db = drizzle(process.env.DATABASE_URL!, { schema });
