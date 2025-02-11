import { Website, WebsiteItem } from "./websiteItem";

const WEBSITES: Record<string, Website> = {};

export function WebsiteList() {
  return (
    <div>
      <h1 className="text-2xl mb-2">Dashboard</h1>

      <div className="flex flex-col align-start">
        {Object.values(WEBSITES).map((props, index) => (
          <WebsiteItem key={index} {...props} />
        ))}
      </div>
    </div>
  );
}
