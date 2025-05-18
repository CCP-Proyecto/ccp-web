import { SelectWarehouse } from "@/app/_components/SelectWarehouse";
import { api } from "@/trpc/server";
import { getTranslations } from "next-intl/server";

export default async function AgregarProductosPage({
  params,
}: {
  params: Promise<{ manufacturerId: string }>;
}) {
  const { manufacturerId } = await params;
  const warehouses = await api.warehouse.getAllWarehouses();

  const t = await getTranslations("ProductWarehouseQueryPage");

  return (
    <SelectWarehouse
      continuePath={`/products/${manufacturerId}`}
      title={t("title")}
      warehouses={warehouses}
    />
  );
}
