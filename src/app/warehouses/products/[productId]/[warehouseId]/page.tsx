"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductResultsPage() {
  const { productId, warehouseId } = useParams<{
    productId: string;
    warehouseId: string;
  }>();

  const { data: product, isLoading } =
    api.product.getProductByWarehouse.useQuery(
      {
        warehouseId: Number(warehouseId),
        productId: Number(productId),
      },
      {
        enabled: !!productId && !!warehouseId,
      },
    );

  if (isLoading || !product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <div className="flex w-full max-w-md flex-col justify-center gap-12">
        <h1 className="font-normal text-3xl">Resultados de la búsqueda</h1>

        <div className="flex flex-col">
          <p>ID producto: {product.product.id}</p>
          <p>Nombre producto: {product.product.name}</p>
          <p>ID Bodega: {product.warehouse.id}</p>
          <p>Dirección bodega: {product.warehouse.address}</p>
          <p>Cantidades disponibles: {product.quantity}</p>
        </div>

        <div className="flex justify-center">
          <Link href="/warehouses">
            <Button className="w-min" variant="primaryCCP">
              Volver al menú de bodegas
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
