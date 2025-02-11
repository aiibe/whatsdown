"use client";
import { Website, WebsiteItem } from "./websiteItem";

const WEBSITES: Record<string, Website> = {};

export function WebsiteList() {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl mb-2">Services</h1>
      </div>

      <div className="flex flex-col align-start">
        {Object.values(WEBSITES).map((props, index) => (
          <WebsiteItem key={index} {...props} />
        ))}
      </div>
    </div>
  );
}
