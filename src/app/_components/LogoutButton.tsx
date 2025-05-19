"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <Button variant="ghost" size="defaultIcon">
        <LogOutIcon className="size-8 text-foreground-ccp" />
      </Button>
    );
  }

  return (
    <Button
      onClick={() =>
        signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/login");
            },
          },
        })
      }
      variant="ghost"
      size="defaultIcon"
    >
      <LogOutIcon className="size-8 text-foreground-ccp" />
    </Button>
  );
};
