import { Logo } from "./logo";
import { WebsiteFormDialogButton } from "./features/websites/websiteForm/websiteFormDialogButton";
import { WebsiteList } from "@/app/features/websites/websiteList/websiteList";
import { getSession, logout } from "./actions/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-2">
        <Logo />

        <div className="flex gap-2">
          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>

          <WebsiteFormDialogButton />
        </div>
      </div>

      <WebsiteList />
    </div>
  );
}
