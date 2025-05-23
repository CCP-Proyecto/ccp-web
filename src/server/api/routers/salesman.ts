import { z } from "zod";

import { env } from "@/env";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import type { Report, Salesman, Statement } from "@/types";
import { TRPCError } from "@trpc/server";

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
  getReport: protectedProcedure
    .input(
      z.object({
        salespersonId: z.string(),
        period: z.enum(["monthly", "quarterly", "annually"]),
        date: z.string().date(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const headers = new Headers();
      ctx.cookie && headers.set("Cookie", ctx.cookie);

      const res = await fetch(
        `${env.API_MS}/api/report?salespersonId=${input.salespersonId}&periodType=${input.period}&periodStart=${input.date}`,
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

      const data: Report = await res.json();

      const productQuantities = new Map();

      for (const order of data.orders) {
        for (const orderProduct of order.orderProducts) {
          const productName = orderProduct.product.name;
          const quantity = orderProduct.quantity;

          if (productQuantities.has(productName)) {
            productQuantities.set(
              productName,
              productQuantities.get(productName) + quantity,
            );
          } else {
            productQuantities.set(productName, quantity);
          }
        }
      }

      // Convert the Map to an array of objects for easier display/manipulation
      const soldProducts = Array.from(productQuantities).map(
        ([name, quantity]) => {
          return { name, totalQuantity: quantity };
        },
      );

      return { ...data, soldProducts };
    }),
});
