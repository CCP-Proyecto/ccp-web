import { z } from "zod";

import { env } from "@/env";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const salesmanRouter = createTRPCRouter({
  createSalesman: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        idType: z.string(),
        name: z.string(),
        phone: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const headers = new Headers();
      ctx.cookie && headers.set("Cookie", ctx.cookie);

      const res = await fetch(`${env.API_MS}/api/salesperson`, {
        headers,
        method: "POST",
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const { error } = await res.json();
        if (res.status === 401) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: error });
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error });
      }

      return res.json();
    }),
});
