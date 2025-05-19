import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

const availableLocales = ["en", "es"] as const;

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const requestCookies = await cookies();
  const localeCookie = requestCookies.get("NEXT_LOCALE");
  if (!localeCookie) {
    return {
      locale: "es",
      messages: (await import("../locales/es.json")).default,
    };
  }
  if (!availableLocales.includes(localeCookie.value as any)) {
    return {
      locale: "es",
      messages: (await import("../locales/es.json")).default,
    };
  }

  const locale: "en" | "es" = localeCookie?.value as "en" | "es";

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
