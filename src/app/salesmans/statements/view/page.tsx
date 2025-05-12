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

export default function SearchProductsPage() {
  const [selectedSalesman, setSelectedSalesman] = useState<string>("");
  const router = useRouter();
  const { data: salesmans, isLoading } =
    api.salesman.getAllSalesmans.useQuery();

  const handleSalesmanSelection = (value: string) => {
    setSelectedSalesman(value);
  };

  const handleContinuar = () => {
    if (selectedSalesman) {
      router.push(`/salesmans/statements/view/${selectedSalesman}`);
    }
  };

  const handleVolver = () => {
    router.back();
  };

  if (isLoading || !salesmans) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <div className="w-full max-w-md">
        <h1 className="mb-12 font-normal text-3xl">
          Seleccione el vendedor que quiere consultar
        </h1>

        <Select onValueChange={handleSalesmanSelection}>
          <SelectTrigger className="h-14 w-full rounded-full border-gray-300">
            <SelectValue placeholder="Selecciona un vendedor" />
          </SelectTrigger>
          <SelectContent>
            {salesmans.map((salesman) => (
              <SelectItem key={salesman.id} value={salesman.id}>
                {salesman.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedSalesman && (
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
