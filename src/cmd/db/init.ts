import { db } from "../../lib/db";
import { LibsqlError } from "@libsql/client/http";

export async function init() {
  // Create migrations table
  try {
    await db().execute(
      `CREATE TABLE IF NOT EXISTS migrations (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                last_order INTEGER UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`
    );
  } catch (error) {
    console.log((error as LibsqlError).code);
  }
}
