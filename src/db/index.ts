import { env } from "@/env";
import { drizzle } from "drizzle-orm/node-postgres";
import * as authSchema from "./schema/auth-schema";

export const db = drizzle({
  connection: {
    connectionString: env.DATABASE_URL,
  },
  schema: {
    ...authSchema,
  },
});
