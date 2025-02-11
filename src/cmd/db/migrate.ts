import fs from "fs";
import path from "path";
import pc from "picocolors";
import { loadEnvConfig } from "@next/env";

import { db } from "../../lib/db";
import { cleanSQL } from "../../utils/cleanSQL";
import { splitSqlStatements } from "../../utils/splitSQLStatements";
import { init } from "./init";

import type { LibsqlError } from "@libsql/client/http";

// Load environment variables from .env.local
loadEnvConfig(process.cwd());

/**
 * Get the migrations dir path
 */
const getMigrationsPath = () =>
  path.resolve(process.cwd(), "src/cmd/db/migrations");

/**
 * Get the sorted list of SQL files
 */
function getSortedSQLFiles() {
  return fs
    .readdirSync(getMigrationsPath())
    .filter((file) => file.endsWith(".sql"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

/**
 * Get the last migration order
 */
async function requestLastMigrationOrder(): Promise<number | null> {
  let lastMigrationOrder: number | null = null;
  try {
    const { rows } = await db().execute(
      `SELECT last_order FROM migrations ORDER BY last_order DESC LIMIT 1;`
    );
    if (rows.length) {
      lastMigrationOrder = Number(rows[0].last_order);
    }
  } catch (error) {
    console.log((error as LibsqlError).code);
  }
  return lastMigrationOrder;
}

/**
 * Get the SQL statements from a SQL file
 */
function getStatements(filePath: string): string[] {
  const rawContent = fs.readFileSync(filePath, "utf8");
  const sql = cleanSQL(rawContent);
  return splitSqlStatements(sql);
}

/**
 * Migrate the database
 */
(async () => {
  console.log(`🔧 Migrating database...`);

  await init();
  const sqlFiles = getSortedSQLFiles();
  const lastMigrationOrder = await requestLastMigrationOrder();

  console.log(`Last migration: ${lastMigrationOrder}`);

  for (const file of sqlFiles) {
    const filePath = path.join(getMigrationsPath(), file);
    const fileOrder = Number(file.split("_")[0]);

    const hasBeenExecuted =
      lastMigrationOrder !== null && fileOrder <= lastMigrationOrder;

    if (hasBeenExecuted) {
      console.log(pc.yellow(`Skipping already executed ${fileOrder}`));
      continue;
    }

    const statements = getStatements(filePath);

    // Execute the statements
    try {
      await db().migrate(statements);
      console.log(pc.green(`Executed ${fileOrder}`));

      // Update the migrations table
      try {
        await db().execute({
          sql: `INSERT INTO migrations (last_order) VALUES (?) ON CONFLICT (last_order) DO NOTHING;`,
          args: [fileOrder],
        });
        console.log(pc.green(`Updated last migration to ${fileOrder}`));
      } catch (error) {
        console.log(
          pc.red(`Failed to update last migration: ${error as LibsqlError}`)
        );
      }
    } catch (error) {
      console.log(
        pc.red(`Failed to migrate ${fileOrder}: ${error as LibsqlError}`)
      );
    }
  }
  console.log("✓ Migration complete");
})();
