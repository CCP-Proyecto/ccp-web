"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import { LogOutIcon } from "lucide-react";

export const LogoutButton = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Button variant="ghost" size="defaultIcon">
        <LogOutIcon className="size-8 text-foreground-ccp" />
      </Button>
    );
  }

  return (
    <Button onClick={() => signOut()} variant="ghost" size="defaultIcon">
      <LogOutIcon className="size-8 text-foreground-ccp" />
    </Button>
  );
};
