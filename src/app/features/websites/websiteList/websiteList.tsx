"use client";

import { useWebsites, useWebsitesStore } from "../websites.store";
import { getWebsites } from "./getWebsites.action";
import { WebsiteItem } from "./websiteItem";
import { useEffect } from "react";

export function WebsiteList() {
  const websites = useWebsites();
  const setRecords = useWebsitesStore((state) => state.setRecords);

  useEffect(() => {
    getWebsites().then(({ data }) => {
      if (data) setRecords(data);
    });
  }, [setRecords]);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl mb-2">Services</h1>
      </div>

      <div className="flex flex-col align-start">
        {Object.values(websites).map((props, index) => (
          <WebsiteItem key={index} {...props} />
        ))}
      </div>
    </div>
  );
}
