import { z } from "zod";

import { env } from "@/env";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

interface Salesman {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface Statement {
  id: number;
  description: string;
}

const getAllSalesmanStatements = async (
  headers: Headers,
  salesmanId: string,
) => {
  const res = await fetch(
    `${env.API_MS}/api/statement?salespersonId=${salesmanId}`,
    {
      headers,
    },
  );

  if (!res.ok) {
    const { error } = await res.json();
    if (res.status === 401) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: error });
    }
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error });
  }

  const data: Statement[] = await res.json();

  return data;
};

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
  getAllSalesmans: protectedProcedure.query(async ({ ctx }) => {
    const headers = new Headers();
    ctx.cookie && headers.set("Cookie", ctx.cookie);

    const res = await fetch(`${env.API_MS}/api/salesperson`, {
      headers,
    });

    if (!res.ok) {
      const { error } = await res.json();
      if (res.status === 401) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: error });
      }
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error });
    }

    const data: Salesman[] = await res.json();

    return data;
  }),
  getSalesmanStatements: protectedProcedure
    .input(
      z.object({
        salesmanId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const headers = new Headers();
      ctx.cookie && headers.set("Cookie", ctx.cookie);

      const salesmanStatements = await getAllSalesmanStatements(
        headers,
        input.salesmanId,
      );

      return salesmanStatements;
    }),
  getSalesmanStatementById: protectedProcedure
    .input(
      z.object({
        salesmanId: z.string(),
        statementId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const headers = new Headers();
      ctx.cookie && headers.set("Cookie", ctx.cookie);

      const salesmanStatements = await getAllSalesmanStatements(
        headers,
        input.salesmanId,
      );

      const statement = salesmanStatements.find(
        (s) => s.id === Number(input.statementId),
      );

      if (!statement) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No se encontró la declaración con ID ${input.statementId}`,
        });
      }

      return statement;
    }),
});
