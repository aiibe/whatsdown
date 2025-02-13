"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";

import {
  websiteFormSchema,
  ZWebsiteFormData,
} from "@/app/features/websites/websiteForm/websiteForm.schema";

interface Props {
  onSubmit: (data: ZWebsiteFormData) => void;
  submitButton?: "dialog" | "normal";
}

export function WebsiteForm(props: Props) {
  const { onSubmit, submitButton = "normal" } = props;

  const form = useForm<ZWebsiteFormData>({
    resolver: zodResolver(websiteFormSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  const { handleSubmit, formState, register } = form;
  const { isSubmitting, errors } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          {...register("name", { required: true })}
          placeholder="My Website"
        />
        {errors?.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          {...register("url", { required: true })}
          placeholder="https://example.com"
        />
        {errors?.url && (
          <p className="text-sm text-red-500">{errors.url.message}</p>
        )}
      </div>

      {submitButton === "dialog" && (
        <DialogFooter className="sm:justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      )}

      {submitButton === "normal" && (
        <div className="flex sm:justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      )}
    </form>
  );
}
