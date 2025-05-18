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
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AgregarProductosPage() {
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");
  const router = useRouter();
  const t = useTranslations("ProductManufacturerQueryPage");
  const tf = useTranslations("ProductManufacturerQueryPage.form");
  const tb = useTranslations("Button");
  const tp = useTranslations("Page");
  const { data: manufacturers, isLoading } =
    api.manufacturer.getAllManufacturers.useQuery();

  const handleManufacturerSelection = (value: string) => {
    setSelectedManufacturer(value);
  };

  const handleContinuar = () => {
    if (selectedManufacturer) {
      router.push(`/products/${selectedManufacturer}`);
    }
  };

  const handleVolver = () => {
    router.back();
  };

  if (isLoading || !manufacturers) {
    return <div>{tp("loading")}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <div className="w-full max-w-md">
        <h1 className="mb-12 font-normal text-3xl">{t("title")}</h1>

        <Select onValueChange={handleManufacturerSelection}>
          <SelectTrigger className="h-14 w-full rounded-full border-gray-300">
            <SelectValue placeholder={tf("manufacturerDropdown")} />
          </SelectTrigger>
          <SelectContent>
            {manufacturers.map((manufacturer) => (
              <SelectItem key={manufacturer.id} value={manufacturer.id}>
                {manufacturer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedManufacturer && (
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
}
