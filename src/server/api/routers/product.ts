// import { z } from "zod";

import { env } from "@/env";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const productRouter = createTRPCRouter({
  getAllProducts: protectedProcedure.query(async ({ ctx }) => {
    const headers = new Headers();
    ctx.cookie && headers.set("Cookie", ctx.cookie);

    const res = await fetch(`${env.API_MS}/api/product`, {
      headers,
    });

    if (!res.ok) {
      const { error } = await res.json();
      if (res.status === 401) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: error });
      }
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error });
    }

    const data = await res.json();

    return data;
  }),
  addProductsToManufacturer: protectedProcedure
    .input(
      z.object({
        products: z.array(
          z.object({
            name: z.string().min(2, "El nombre es requerido"),
            description: z.string().min(5, "La descripción es requerida"),
            amount: z.number(),
            storageCondition: z
              .string()
              .min(5, "Las condiciones de almacenamiento son requeridas"),
            price: z.number(),
            manufacturerId: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const headers = new Headers();
      ctx.cookie && headers.set("Cookie", ctx.cookie);

      const res = await fetch(`${env.API_MS}/api/product`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          products: input.products,
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        if (res.status === 401) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: error });
        }
        console.log({ error, status: res.status });
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error });
      }

      const data = await res.json();

      return data;
    }),
});
