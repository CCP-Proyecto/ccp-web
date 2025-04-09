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
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AgregarProductosPage() {
  const [fabricanteSeleccionado, setFabricanteSeleccionado] =
    useState<string>("");
  const router = useRouter();
  const { data: manufacturers, isLoading } =
    api.manufacurer.getAllManufacturers.useQuery();

  const handleSeleccionFabricante = (value: string) => {
    setFabricanteSeleccionado(value);
  };

  const handleContinuar = () => {
    if (fabricanteSeleccionado) {
      router.push(`/products/${fabricanteSeleccionado}`);
    }
  };

  const handleVolver = () => {
    router.back();
  };

  if (isLoading || !manufacturers) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <div className="w-full max-w-md">
        <h1 className="mb-12 font-normal text-3xl">
          Seleccione el fabricante al cual quiere agregar uno o varios productos
        </h1>

        <Select onValueChange={handleSeleccionFabricante}>
          <SelectTrigger className="h-14 w-full rounded-full border-gray-300">
            <SelectValue placeholder="Selecciona un fabricante" />
          </SelectTrigger>
          <SelectContent>
            {manufacturers.map((manufacturer) => (
              <SelectItem key={manufacturer.id} value={manufacturer.id}>
                {manufacturer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {fabricanteSeleccionado && (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleContinuar}
              className="h-12 w-40 rounded-full bg-slate-500 text-white shadow-md hover:bg-slate-600"
            >
              Continuar
            </Button>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleVolver}
            variant="outline"
            className="h-12 w-40 rounded-full border-none bg-slate-500 text-white shadow-md hover:bg-slate-600"
          >
            Volver
          </Button>
        </div>
      </div>
    </div>
  );
}
