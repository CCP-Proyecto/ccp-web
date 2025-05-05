import { SelectWarehouse } from "@/app/_components/SelectWarehouse";

export default async function SelectWarehousePage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  return (
    <SelectWarehouse
      continuePath={`/warehouses/products/${productId}`}
      title="Seleccione la bodega a la cual quiere encontrar la cantidad del producto disponibles"
    />
  );
}
