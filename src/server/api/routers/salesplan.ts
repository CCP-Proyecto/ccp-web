import { env } from "@/env";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const salesplanRouter = createTRPCRouter({
  createSalesplan: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        period: z.enum(["monthly", "quarterly", "yearly"]),
        salesmanId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const headers = new Headers();
      ctx.cookie && headers.set("Cookie", ctx.cookie);

      const formData = {
        ...input,
        salespersonId: input.salesmanId,
      };

      const res = await fetch(`${env.API_MS}/api/salesplan`, {
        headers,
        method: "POST",
        body: JSON.stringify(formData),
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
