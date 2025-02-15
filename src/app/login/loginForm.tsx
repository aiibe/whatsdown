"use client";

import { useActionState } from "react";

import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <Card className="w-80">
      <CardContent className="mt-6">
        <form action={formAction} className="space-y-4">
          {state?.error && (
            <p className="text-sm text-red-500">{state.error}</p>
          )}

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              name="username"
              placeholder="username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>

          <Button className="w-full" type="submit" disabled={pending}>
            {pending ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
