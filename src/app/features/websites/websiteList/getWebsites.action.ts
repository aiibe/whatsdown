"use server";

import { selectWebsites, Website } from "@/app/services/websites.service";

export async function getWebsites(): Promise<{
  data: Website[] | null;
  message: string;
  errors: Record<string, string | string[]> | null;
}> {
  const { data, error } = await selectWebsites();
  if (error) {
    return {
      data: null,
      errors: {
        db: error,
      },
      message: "Failed to get websites",
    };
  }

  return {
    data,
    errors: null,
    message: "Success",
  };
}
