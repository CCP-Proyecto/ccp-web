import "@/styles/globals.css";

import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Comfortaa } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/react";
import { Header } from "./_components/Header";

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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${comfortaa.variable}`}>
      <body className="grid h-screen grid-rows-[auto_1fr]">
        <NextIntlClientProvider>
          <Header />
          <TRPCReactProvider>
            {children}
            <Toaster />
          </TRPCReactProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
