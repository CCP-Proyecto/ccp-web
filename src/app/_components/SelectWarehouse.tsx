"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Warehouse } from "@/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  continuePath: string;
  title: string;
  warehouses: Warehouse[];
}

export const SelectWarehouse: React.FC<Props> = ({
  continuePath,
  title,
  warehouses,
}) => {
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>("");
  const router = useRouter();
  const tp = useTranslations("Page");
  const tf = useTranslations("WarehouseQueryPage.form");
  const tb = useTranslations("Button");

  const handleWarehouseSelection = (value: string) => {
    setSelectedWarehouse(value);
  };

  const handleContinuar = () => {
    if (selectedWarehouse) {
      router.push(`${continuePath}/${selectedWarehouse}`);
    }
  };

  const handleVolver = () => {
    router.back();
  };

  if (!warehouses) {
    return <div>{tp("loading")}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <div className="w-full max-w-md">
        <h1 className="mb-12 font-normal text-3xl">{title}</h1>

        <Select onValueChange={handleWarehouseSelection}>
          <SelectTrigger className="h-14 w-full rounded-full border-gray-300">
            <SelectValue placeholder={tf("warehouseDropdown")} />
          </SelectTrigger>
          <SelectContent>
            {warehouses.map((warehouse) => (
              <SelectItem key={warehouse.id} value={warehouse.id}>
                {warehouse.name} - {warehouse.address}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedWarehouse && (
          <div className="mt-8 flex justify-center">
            <Button onClick={handleContinuar} variant="primaryCCP">
              {tb("continue")}
            </Button>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Button onClick={handleVolver} variant="primaryCCP">
            {tb("back")}
          </Button>
        </div>
      </div>
    </div>
  );
};
