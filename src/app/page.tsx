import { Logo } from "./logo";
import { WebsiteList } from "./websiteList";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Logo />

      <WebsiteList />
    </div>
  );
}
