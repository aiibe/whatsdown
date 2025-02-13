"use server";

import { websiteFormSchema, ZWebsiteFormData } from "./websiteForm.schema";
import { insertWebsite, Website } from "@/app/services/websites.service";

export async function submitWebsiteForm(formData: ZWebsiteFormData): Promise<{
  data: Website | null;
  message: string;
  errors: Record<string, string | string[]> | null;
}> {
  const validatedFields = websiteFormSchema.safeParse({
    name: formData.name,
    url: formData.url,
  });

  if (!validatedFields.success) {
    return {
      data: null,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }
  const { name, url } = validatedFields.data;
  const { error, data } = await insertWebsite({ name, url });

  if (error) {
    return {
      data: null,
      errors: {
        db: error,
      },
      message: "Failed to submit",
    };
  }

  return {
    data,
    errors: null,
    message: "Submitted successfully",
  };
}
