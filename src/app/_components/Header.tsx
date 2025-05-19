import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import Link from "next/link";

import { LocaleSelector } from "./LocaleSelector";
import { LogoutButton } from "./LogoutButton";

export const Header = async () => {
  const t = await getTranslations("Header");
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "es";

  return (
    <header className="sticky top-0 z-10 flex h-20 items-center justify-between bg-secondary-ccp p-4 text-white">
      <Link href="/">
        <div className="font-bold text-4xl text-foreground-ccp">CCP</div>
      </Link>
      <div className="text-foreground-ccp text-lg">{t("slogan")}</div>
      <div className="flex items-center gap-4">
        <LocaleSelector defaultLocale={locale} />
        <LogoutButton />
      </div>
    </header>
  );
};
