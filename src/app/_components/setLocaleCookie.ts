"use server";

import { cookies } from "next/headers";

export const setLocaleCookie = async (locale: string) => {
  // Set the cookie with a long expiration (1 year)
  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", locale);
};
