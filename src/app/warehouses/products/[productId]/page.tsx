import { SelectWarehouse } from "@/app/_components/SelectWarehouse";
import { api } from "@/trpc/server";
import { getTranslations } from "next-intl/server";

export default async function SelectWarehousePage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  const warehouses = await api.warehouse.getAllWarehousesWithProduct({
    productId,
  });

  const t = await getTranslations("WarehouseQueryPage");

  return (
    <SelectWarehouse
      continuePath={`/warehouses/products/${productId}`}
      title={t("title")}
      warehouses={warehouses}
    />
  );
}
