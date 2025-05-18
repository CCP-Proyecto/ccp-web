"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProductResultsPage() {
  const { productId, warehouseId } = useParams<{
    productId: string;
    warehouseId: string;
  }>();

  const router = useRouter();
  const tp = useTranslations("Page");
  const t = useTranslations("WarehouseQueryResultPage");
  const tr = useTranslations("WarehouseQueryResultPage.results");

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
      retry: (failureCount, error) => {
        if (error.data?.code === "NOT_FOUND") {
          toast.error(t("toast.errorNotFound"), {
            classNames: {
              toast: "!bg-red-500/90",
            },
          });
          router.back();
          return false;
        }

        return failureCount < 3;
      },
    },
  );

  if (isError) {
    if (error.data?.code === "NOT_FOUND") {
      return;
    }
    toast.error(t("toast.error"), {
      classNames: {
        toast: "!bg-red-500/90",
      },
    });
  }

  if (isLoading || !product) {
    return <div>{tp("loading")}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <div className="flex w-full max-w-md flex-col justify-center gap-12">
        <h1 className="font-normal text-3xl">{t("title")}</h1>

        <div className="flex flex-col">
          <p>
            {tr("productId")}: {product.product.id}
          </p>
          <p>
            {tr("productName")}: {product.product.name}
          </p>
          <p>
            {tr("warehouseId")}: {product.warehouse.id}
          </p>
          <p>
            {tr("warehouseAddress")}: {product.warehouse.address}
          </p>
          <p>
            {tr("availableQuantity")}: {product.quantity}
          </p>
        </div>

        <div className="flex justify-center">
          <Link href="/warehouses">
            <Button className="w-min" variant="primaryCCP">
              {t("backButton")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
