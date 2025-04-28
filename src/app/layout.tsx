import "@/styles/globals.css";

import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/react";
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
      <body>
        <header className="flex items-center justify-between bg-secondary-ccp p-4 text-white">
          <div className="font-bold text-4xl text-foreground-ccp">CCP</div>
          <div className="mx-auto text-center text-lg">
            <span className="px-4 py-1 text-foreground-ccp">
              COMPRAS FÁCILES, ENVÍOS RÁPIDOS
            </span>
          </div>
          <LogoutButton />
        </header>

        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
