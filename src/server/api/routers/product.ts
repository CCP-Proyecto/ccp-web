import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { env } from "@/env";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import type { Inventory, Product, Warehouse } from "@/types";

const createInventories = async ({
  headers,
  inventories,
}: {
  headers: Headers;
  inventories: Inventory[];
}) => {
  const resInventory = await fetch(`${env.API_MS}/api/inventory`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      inventories,
    }),
  });

  if (!resInventory.ok) {
    const res = await resInventory.json();
    const { error } = res;
    if (resInventory.status === 401) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: error });
    }
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error });
  }
  const data: {
    id: number;
    quantity: number;
  }[] = await resInventory.json();

  return data;
};

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
          productId: Number(productId),
          warehouseId: input.warehouseId,
        };
      });

      await createInventories({
        headers,
        inventories,
      });

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
        if (res.status === 404) {
          throw new TRPCError({ code: "NOT_FOUND", message: error });
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error });
      }

      const data: {
        product: Product;
        quantity: number;
        warehouse: Warehouse;
      } = await res.json();

      return data;
    }),
  getManufacturerProducts: protectedProcedure
    .input(
      z.object({
        manufacturerId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const headers = new Headers();
      ctx.cookie && headers.set("Cookie", ctx.cookie);

      const res = await fetch(
        `${env.API_MS}/api/product/manufacturer/${input.manufacturerId}`,
        {
          headers,
        },
      );

      if (!res.ok) {
        const { error } = await res.json();
        if (res.status === 401) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: error });
        }
        if (res.status === 404) {
          throw new TRPCError({ code: "NOT_FOUND", message: error });
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error });
      }

      const data: Product[] = await res.json();

      return data;
    }),
  addProductToWarehouse: protectedProcedure
    .input(
      z.object({
        productId: z.number(),
        warehouseId: z.number(),
        amount: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const headers = new Headers();
      ctx.cookie && headers.set("Cookie", ctx.cookie);

      const inventory: Inventory = {
        productId: input.productId,
        quantity: input.amount,
        warehouseId: input.warehouseId,
      };

      return createInventories({
        headers,
        inventories: [inventory],
      });
    }),
});
