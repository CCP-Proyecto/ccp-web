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

export default function SearchProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const router = useRouter();
  const { data: products, isLoading } = api.product.getAllProducts.useQuery();
  const t = useTranslations("WarehouseQueryProductPage");
  const tf = useTranslations("WarehouseQueryProductPage.form");
  const tb = useTranslations("Button");
  const tp = useTranslations("Page");

  const handleManufacturerSelection = (value: string) => {
    setSelectedProduct(value);
  };

  const handleContinuar = () => {
    if (selectedProduct) {
      router.push(`/warehouses/products/${selectedProduct}`);
    }
  };

  const handleVolver = () => {
    router.back();
  };

  if (isLoading || !products) {
    return <div>{tp("loading")}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <div className="w-full max-w-md">
        <h1 className="mb-12 font-normal text-3xl">{t("title")}</h1>

        <Select onValueChange={handleManufacturerSelection}>
          <SelectTrigger className="h-14 w-full rounded-full border-gray-300">
            <SelectValue placeholder={tf("productDropdown")} />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedProduct && (
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
