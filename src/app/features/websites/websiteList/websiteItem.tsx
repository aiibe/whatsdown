import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { STATE, WebsiteStatus } from "./websiteStatus";
import { removeWebsite } from "./removeWebsite.action";
import { useWebsitesStore } from "../websites.store";
import { toast } from "@/hooks/use-toast";
import { WebsiteRemoveDialogButton } from "./websiteRemoveDialogButton";
import { useState } from "react";

export interface Website {
  url: string;
  id: number;
  name: string;
  state?: STATE;
  uptime?: number;
  responseTime?: number;
  lastChecked?: string;
}

export function WebsiteItem(props: Website) {
  const { id, url, name, state, uptime, responseTime, lastChecked } = props;
  const deleteRecord = useWebsitesStore((state) => state.deleteRecord);

  const [open, setOpen] = useState(false);

  async function handleConfirm() {
    const { errors, message } = await removeWebsite(id);
    if (!errors) {
      deleteRecord(id);
      toast({
        description: message,
        variant: "success",
      });
    }
    setOpen(false);
  }

  return (
    <>
      <Card className="w-full max-w-80">
        <CardHeader>
          <div className="flex">
            <div className="flex flex-col w-52">
              <h3 className="font-bold">{name}</h3>
              <p className="text-gray-600 text-xs truncate">{url}</p>
            </div>

            <div className="flex justify-end items-start w-16">
              <WebsiteStatus state={state} />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Uptime</span>
            <span className="text-sm font-medium">
              {uptime ? `${uptime}%` : "-"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm">Response Time</span>
            <span className="text-sm font-medium">
              {responseTime ? `${responseTime}ms` : "-"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm">Last Checked</span>
            <span className="text-sm font-medium">{lastChecked || "-"}</span>
          </div>
        </CardContent>

        <CardFooter className="justify-end">
          <WebsiteRemoveDialogButton
            open={open}
            onChange={setOpen}
            onConfirm={handleConfirm}
          />
        </CardFooter>
      </Card>
    </>
  );
}
