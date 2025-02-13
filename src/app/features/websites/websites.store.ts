import { create } from "zustand";

export type Website = {
  id: number;
  url: string;
  name: string;
};

export type WebsiteRecord = Record<number, Website>;

interface WebsitesStore {
  records: WebsiteRecord;
  appendRecord: (website: Website) => void;
  setRecords: (websites: Website[]) => void;
  deleteRecord: (id: Website["id"]) => void;
}

export const useWebsitesStore = create<WebsitesStore>((set) => ({
  records: {},
  setRecords: (websites) =>
    set({
      records: websites.reduce((acc: WebsiteRecord, website) => {
        acc[website.id] = website;
        return acc;
      }, {}),
    }),
  appendRecord: (website) => {
    set((prev) => ({
      records: { records: { ...prev.records, [website.id]: website } },
    }));
  },
  deleteRecord: (id) => {
    set((prev) => {
      const newRecords = { ...prev.records };
      delete newRecords[id];
      return { records: newRecords };
    });
  },
}));

export const useWebsites = () => {
  const records = useWebsitesStore((state) => state.records);
  return Object.values(records);
};
