import { env } from "@/env";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_USERS_MS, // the base url of your auth server
  fetchOptions: {},
  plugins: [
    inferAdditionalFields({
      user: {
        roles: {
          type: "string[]",
        },
      },
    }),
  ],
});
