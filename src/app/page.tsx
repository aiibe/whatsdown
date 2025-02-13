import { Logo } from "./logo";
import { WebsiteFormDialogButton } from "./features/websites/websiteForm/websiteFormDialogButton";
import { WebsiteList } from "@/app/features/websites/websiteList/websiteList";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-2">
        <Logo />

        <WebsiteFormDialogButton />
      </div>

      <WebsiteList />
    </div>
  );
}
