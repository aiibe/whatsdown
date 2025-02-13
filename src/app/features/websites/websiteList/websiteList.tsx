"use client";

import { useEffect } from "react";

import { useWebsites, useWebsitesStore } from "../websites.store";
import { getWebsites } from "./getWebsites.action";
import { WebsiteItem } from "./websiteItem";

export function WebsiteList() {
  const websites = useWebsites();
  const setRecords = useWebsitesStore((state) => state.setRecords);

  useEffect(() => {
    async function hydrate() {
      const { data } = await getWebsites();
      if (data) setRecords(data);
    }
    hydrate();
  }, [setRecords]);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl mb-2">Services</h1>
      </div>

      <div className="flex flex-wrap gap-4 align-start">
        {websites.map((props, index) => (
          <WebsiteItem key={index} {...props} />
        ))}
      </div>
    </div>
  );
}
