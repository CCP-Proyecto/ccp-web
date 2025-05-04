import { env } from "@/env";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

type Manufacturer = {
  id: string;
  name: string;
};

export const manufacturerRouter = createTRPCRouter({
  createManufacturer: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        idType: z.string(),
        name: z.string(),
        phone: z.string(),
        address: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const headers = new Headers();
      ctx.cookie && headers.set("Cookie", ctx.cookie);

      const res = await fetch(`${env.API_MS}/api/manufacturer`, {
        headers,
        method: "POST",
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const json = await res.json();
        const { error } = json;
        if (res.status === 401) {
          console.error("***************************************************************");
          console.error(JSON.stringify(json));
          console.error("***************************************************************");
          throw new TRPCError({ code: "UNAUTHORIZED", message: error });
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error });
      }

      return res.json();
    }),
  getAllManufacturers: protectedProcedure.query(async ({ ctx }) => {
    const headers = new Headers();
    ctx.cookie && headers.set("Cookie", ctx.cookie);

    const res = await fetch(`${env.API_MS}/api/manufacturer`, {
      headers,
    });

    if (!res.ok) {
      const { error } = await res.json();
      if (res.status === 401) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: error });
      }
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error });
    }

    const data: Manufacturer[] = await res.json();

    return data;
  }),
});
