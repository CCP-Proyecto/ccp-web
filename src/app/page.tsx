"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { authClient } from "@/lib/auth-client";
import { AdminDashboard } from "./_components/AdminDashboard";

export default function Page() {
  const { error, data: session, isPending } = authClient.useSession();

  const router = useRouter();

  useEffect(() => {
    if (isPending) return;

    if (!session || error) {
      router.push("/login");
    }
  }, [error, isPending, router.push, session]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <AdminDashboard />
    </div>
  );
}
