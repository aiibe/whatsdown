"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { WebsiteForm } from "./websiteForm";
import { submitWebsiteForm } from "./submitWebsiteForm.action";
import { useWebsitesStore } from "../websites.store";
import { devlog } from "@/utils/devlog";

import type { ZWebsiteFormData } from "./websiteForm.schema";

export function WebsiteFormDialogButton() {
  const { toast } = useToast();
  const appendRecord = useWebsitesStore((state) => state.appendRecord);
  const [open, setOpen] = useState(false);

  async function onSubmit(formData: ZWebsiteFormData) {
    const { data, message, errors } = await submitWebsiteForm(formData);
    if (errors) devlog(errors);
    if (data) appendRecord(data);

    toast({
      description: message,
      variant: errors ? "destructive" : "success",
    });

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Add Website</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Website</DialogTitle>
          <DialogDescription>
            GET requests will be periodically sent to the provided URL
          </DialogDescription>
        </DialogHeader>

        <WebsiteForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
