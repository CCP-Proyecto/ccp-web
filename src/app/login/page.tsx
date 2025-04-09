"use client";

import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Page() {
  const { error, data: session } = authClient.useSession();

  const handleSignOut = async () => {
    const { data, error } = await authClient.signOut();

    if (error) {
      console.log(error);
    }

    console.log({ data });
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />

        {error && <div>{JSON.stringify(error)}</div>}

        <pre>
          <code>{JSON.stringify(session?.user, null, 2)}</code>
        </pre>

        {session?.user && (
          <Button variant="default" onClick={handleSignOut}>
            Sign out
          </Button>
        )}
      </div>
    </div>
  );
}
