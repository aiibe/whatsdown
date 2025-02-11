import { Client, createClient } from "@libsql/client/http";

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
