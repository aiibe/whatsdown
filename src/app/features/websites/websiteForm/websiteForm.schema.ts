import { z } from "zod";

export const websiteFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  url: z.string().url({
    message: "Please enter a valid URL.",
  }),
});

export type ZWebsiteFormData = z.infer<typeof websiteFormSchema>;
