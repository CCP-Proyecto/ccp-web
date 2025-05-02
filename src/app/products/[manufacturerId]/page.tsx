"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/trpc/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function AgregarProductosPage() {
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>("");
  const params = useParams<{ manufacturerId: string }>();
  const router = useRouter();
  const { data: warehouses, isLoading } =
    api.warehouse.getAllWarehouses.useQuery();

  const handleWarehouseSelection = (value: string) => {
    setSelectedWarehouse(value);
  };

  const handleContinuar = () => {
    if (selectedWarehouse) {
      router.push(`/products/${params.manufacturerId}/${selectedWarehouse}`);
    }
  };

  const handleVolver = () => {
    router.back();
  };

  if (isLoading || !warehouses) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <div className="w-full max-w-md">
        <h1 className="mb-12 font-normal text-3xl">
          Seleccione la bodega a la cual quiere agregar uno o varios productos
        </h1>

        <Select onValueChange={handleWarehouseSelection}>
          <SelectTrigger className="h-14 w-full rounded-full border-gray-300">
            <SelectValue placeholder="Selecciona un fabricante" />
          </SelectTrigger>
          <SelectContent>
            {warehouses.map((warehouse) => (
              <SelectItem key={warehouse.id} value={warehouse.id}>
                {warehouse.address}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedWarehouse && (
          <div className="mt-8 flex justify-center">
            <Button onClick={handleContinuar} variant="primaryCCP">
              Continuar
            </Button>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Button onClick={handleVolver} variant="primaryCCP">
            Volver
          </Button>
        </div>
      </div>
    </div>
  );
}
