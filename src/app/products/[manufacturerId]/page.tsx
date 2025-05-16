import { SelectWarehouse } from "@/app/_components/SelectWarehouse";
import { api } from "@/trpc/server";

export default async function AgregarProductosPage({
  params,
}: {
  params: Promise<{ manufacturerId: string }>;
}) {
  const { manufacturerId } = await params;
  const warehouses = await api.warehouse.getAllWarehouses();

  return (
    <SelectWarehouse
      continuePath={`/products/${manufacturerId}`}
      title="Seleccione la bodega a la cual quiere agregar uno o varios productos"
      warehouses={warehouses}
    />
  );
}
