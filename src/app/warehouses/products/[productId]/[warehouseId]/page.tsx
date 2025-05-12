"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProductResultsPage() {
  const { productId, warehouseId } = useParams<{
    productId: string;
    warehouseId: string;
  }>();

  const router = useRouter();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = api.product.getProductByWarehouse.useQuery(
    {
      warehouseId: Number(warehouseId),
      productId: Number(productId),
    },
    {
      enabled: !!productId && !!warehouseId,
    },
  );

  if (isError) {
    if (error.data?.code === "NOT_FOUND") {
      toast("Product no encontrado en esta bodega");
      router.back();
    }
    toast.error("Algo sucedió, intenta más tarde", {
      classNames: {
        toast: "!bg-red-500/90",
      },
    });
  }

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
