import { Client, createClient, Row } from "@libsql/client/http";

export function db(): Client {
  const url = process.env.TURSO_DATABASE_URL?.trim();
  if (url === undefined) {
    throw new Error("TURSO_DATABASE_URL is not defined");
  }

  const authToken = process.env.TURSO_AUTH_TOKEN?.trim();
  if (authToken === undefined) {
    if (!url.includes("file:")) {
      throw new Error("TURSO_AUTH_TOKEN is not defined");
    }
  }

  return createClient({
    url: process.env.TURSO_DATABASE_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN as string,
  });
}

export function inferRows<T>(rows: Row[]): T[] {
  const result = rows.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key.toLowerCase(), value])
    )
  );
  return result as T[];
}
