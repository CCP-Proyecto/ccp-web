// import { z } from "zod";

import { env } from "@/env";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

interface Product {
  id: string;
  name: string;
}

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

    const data: Product[] = await res.json();

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
        warehouseId: z.number(),
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
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error });
      }

      const productsData: {
        id: string;
        name: string;
        description: string;
        storageCondition: string;
        price: number;
      }[] = await res.json();

      const inventories = productsData.map((product) => {
        const resProduct = input.products.find((p) => p.name === product.name);

        const quantity = resProduct?.amount || 0;
        const productId = product.id;

        return {
          quantity,
          productId,
          warehouseId: input.warehouseId,
        };
      });

      const resInventory = await fetch(`${env.API_MS}/api/inventory`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          inventories,
        }),
      });

      if (!resInventory.ok) {
        const { error } = await resInventory.json();
        if (resInventory.status === 401) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: error });
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error });
      }

      return productsData;
    }),
  getProductByWarehouse: protectedProcedure
    .input(
      z.object({
        warehouseId: z.number(),
        productId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const headers = new Headers();
      ctx.cookie && headers.set("Cookie", ctx.cookie);

      const res = await fetch(
        `${env.API_MS}/api/inventory/product/${input.productId}/warehouse/${input.warehouseId}`,
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

      const data: {
        product: {
          id: number;
          name: string;
        };
        quantity: number;
        warehouse: {
          id: number;
          address: string;
        };
      } = await res.json();

      return data;
    }),
});
