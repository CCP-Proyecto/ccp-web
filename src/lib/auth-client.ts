import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const { signIn, signOut, signUp, useSession } = createAuthClient({
  plugins: [
    inferAdditionalFields({
      user: {
        userId: {
          type: "string",
          required: true,
        },
        roles: {
          type: "string[]",
        },
      },
    }),
  ],
});
