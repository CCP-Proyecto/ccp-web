import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import {
  manufacturerRouter,
  orderRouter,
  productRouter,
  salesmanRouter,
  salesplanRouter,
  warehouseRouter,
} from "./routers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  product: productRouter,
  manufacturer: manufacturerRouter,
  warehouse: warehouseRouter,
  salesman: salesmanRouter,
  salesplan: salesplanRouter,
  order: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
