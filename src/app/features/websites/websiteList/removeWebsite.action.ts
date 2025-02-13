"use server";

import { deleteWebsite, Website } from "@/app/services/websites.service";

export async function removeWebsite(id: number): Promise<{
  data: Website[] | null;
  message: string;
  errors: Record<string, string | string[]> | null;
}> {
  const { data, error } = await deleteWebsite(id);
  if (error) {
    return {
      data: null,
      errors: {
        db: error,
      },
      message: "Failed to remove website",
    };
  }

  return {
    data,
    errors: null,
    message: "Success",
  };
}
