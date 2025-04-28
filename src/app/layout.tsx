import "@/styles/globals.css";

import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/react";
import Link from "next/link";
import { LogoutButton } from "./_components/LogoutButton";

export const metadata: Metadata = {
  title: "CCP Web",
  description: "CCP Web",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const comfortaa = Comfortaa({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-comfortaa",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${comfortaa.variable}`}>
      <body className="grid h-screen grid-rows-[auto_1fr]">
        <header className="sticky top-0 z-10 flex h-20 items-center justify-between bg-secondary-ccp p-4 text-white">
          <Link href="/">
            <div className="font-bold text-4xl text-foreground-ccp">CCP</div>
          </Link>
          <div className="text-foreground-ccp text-lg">
            COMPRAS FÁCILES, ENVÍOS RÁPIDOS
          </div>
          <LogoutButton />
        </header>
        <TRPCReactProvider>
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
