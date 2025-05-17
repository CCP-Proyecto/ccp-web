import messages from "./src/locales/es.json";

const locales = ["en", "es"] as const;

declare module "next-intl" {
  interface AppConfig {
    Messages: typeof messages;
    Locale: (typeof locales)[number];
  }
}
