"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { setLocaleCookie } from "./setLocaleCookie";

interface Locale {
  name: string;
  value: string;
}

const locales: Locale[] = [
  { name: "English", value: "en" },
  { name: "Español", value: "es" },
];

interface Props {
  defaultLocale: string;
}

export const LocaleSelector: React.FC<Props> = ({ defaultLocale }) => {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState<string>(defaultLocale);

  const handleLocaleChange = async (locale: string) => {
    await setLocaleCookie(locale);
    setCurrentLocale(locale);

    // Refresh the page to apply the new locale
    router.refresh();
  };

  const currentLocaleName =
    locales.find((locale) => locale.value === currentLocale)?.name || "English";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 w-22 gap-1 bg-transparent dark:bg-transparent"
        >
          <span>{currentLocaleName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.value}
            onClick={() => handleLocaleChange(locale.value)}
            className="flex cursor-pointer items-center gap-2"
          >
            {locale.name}
            {currentLocale === locale.value && (
              <Check className="ml-auto h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
