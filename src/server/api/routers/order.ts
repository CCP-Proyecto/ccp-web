import { env } from "@/env";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import type { Order } from "@/types";
import { TRPCError } from "@trpc/server";

export const orderRouter = createTRPCRouter({
  getAllPendingOrders: protectedProcedure.query(async ({ ctx }) => {
    const headers = new Headers();
    ctx.cookie && headers.set("Cookie", ctx.cookie);

    const res = await fetch(`${env.API_MS}/api/order`, {
      headers,
    });

    if (!res.ok) {
      const { error } = await res.json();
      if (res.status === 401) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: error });
      }
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error });
    }

    const data: Order[] = await res.json();

    const pendingOrders = data.filter((order) => order.status === "pending");

    // Keep the most recent order for each customer
    const customerOrderMap = new Map();

    // Find the most recent order for each customer
    for (const order of pendingOrders) {
      const existing = customerOrderMap.get(order.customer.id);
      if (
        !existing ||
        new Date(order.createdAt) > new Date(existing.createdAt)
      ) {
        customerOrderMap.set(order.customer.id, order);
      }
    }

    const uniquePendingOrders = Array.from(customerOrderMap.values());

    return uniquePendingOrders;
  }),
});
