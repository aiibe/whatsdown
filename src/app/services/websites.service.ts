"use server";

import { db, inferRows } from "@/lib/db";
import type { LibsqlError } from "@libsql/client/http";

export type Website = {
  id: number;
  url: string;
  name: string;
};

export async function selectWebsites(extraSQL: string = ""): Promise<{
  data: Website[] | null;
  error: LibsqlError["message"] | null;
}> {
  try {
    const resp = await db().execute(`
      SELECT * FROM websites ${extraSQL};
    `);
    return {
      data: inferRows<Website>(resp.rows),
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: (error as LibsqlError).message,
    };
  }
}

export async function insertWebsite(website: Omit<Website, "id">): Promise<{
  data: Website | null;
  error: LibsqlError["message"] | null;
}> {
  const { name, url } = website;

  try {
    const resp = await db().execute(`
      INSERT INTO websites (name, url)
      VALUES ('${name}', '${url}')
      RETURNING *;
    `);
    return {
      data: inferRows<Website>(resp.rows)?.[0] || null,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: (error as LibsqlError).message,
    };
  }
}

export async function deleteWebsite(id: number): Promise<{
  data: Website[] | null;
  error: LibsqlError["message"] | null;
}> {
  try {
    const resp = await db().execute(`
      DELETE FROM websites
      WHERE rowid = ${id};
    `);
    return {
      data: inferRows<Website>(resp.rows),
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: (error as LibsqlError).message,
    };
  }
}
