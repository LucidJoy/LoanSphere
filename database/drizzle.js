import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env" }); // or .env.local
const connectionString =
  "postgresql://gage_db_owner:npg_UAObRK74nkcF@ep-young-snowflake-a6l78f12-pooler.us-west-2.aws.neon.tech/gage_db?sslmode=require";

const sql = neon(connectionString && connectionString);
export const db = drizzle({ client: sql });
