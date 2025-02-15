import LoginForm from "./loginForm";
import { getSession } from "../actions/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect("/");
  }

  return (
    <div className="container flex flex-col items-center justify-center p-6">
      <LoginForm />
    </div>
  );
}
