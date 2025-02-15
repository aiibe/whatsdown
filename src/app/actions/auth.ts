"use server";

import { SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );

  return session;
}

export async function login(
  _prevState: { error: string } | undefined,
  formData: FormData
) {
  const session = await getSession();

  // Get form data
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // Validate credentials against your database
  const user = await validateUser(username, password);

  if (!user) {
    return { error: "Invalid credentials" };
  }

  // Set session data
  session.userId = user.id;
  session.username = user.username;
  session.isLoggedIn = true;

  await session.save();
  return redirect("/");
}

async function validateUser(username: string, password: string) {
  if (username === process.env.USERNAME && password === process.env.PASSWORD) {
    return { id: "1", username };
  }
  return null;
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  return redirect("/login");
}
