"use client";

import { QuantityInput } from "@/app/_components/QuantityInput";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/trpc/react";
import type { Product } from "@/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface SelectProductProps {
  products: Product[];
  warehouseId: string;
}

export const SelectProduct: React.FC<SelectProductProps> = ({
  products,
  warehouseId,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [amount, setAmount] = useState("1");
  const router = useRouter();
  const t = useTranslations("AddProductAmountPage");
  const tf = useTranslations("AddProductAmountPage.form");
  const tb = useTranslations("Button");
  const { mutate: addProductToWarehouse } =
    api.product.addProductToWarehouse.useMutation({
      onError: (error) => {
        toast.error(`Error al agregar producto a la bodega: ${error}`, {
          classNames: {
            toast: "!bg-red-500/90",
          },
        });
      },
      onSuccess: () => {
        toast.success("Producto agregado a la bodega");
        router.push("/");
      },
    });

  const handleProductSelection = (value: string) => {
    setSelectedProduct(value);
  };

  const handleAdd = () => {
    addProductToWarehouse({
      amount: Number(amount),
      productId: Number(selectedProduct),
      warehouseId: Number(warehouseId),
    });
  };

  const handleVolver = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <div className="w-full max-w-md">
        <h1 className="mb-12 font-normal text-3xl">{t("title")}</h1>

        <div className="flex flex-col gap-4">
          <Select onValueChange={handleProductSelection}>
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

          <QuantityInput
            onValueChange={setAmount}
            defaultValue={amount}
            insideForm={false}
            label={tf("quantity")}
          />
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleAdd}
            variant="primaryCCP"
            disabled={!selectedProduct}
            className="w-min text-nowrap"
          >
            {tf("submitButton")}
          </Button>
        </div>

        <div className="mt-8 flex justify-center">
          <Button onClick={handleVolver} variant="ghostCCP">
            {tb("back")}
          </Button>
        </div>
      </div>
    </div>
  );
};
