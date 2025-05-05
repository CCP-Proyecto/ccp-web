import { SelectWarehouse } from "@/app/_components/SelectWarehouse";

export default async function AgregarProductosPage({
  params,
}: {
  params: Promise<{ manufacturerId: string }>;
}) {
  const { manufacturerId } = await params;

  return (
    <SelectWarehouse
      continuePath={`/products/${manufacturerId}`}
      title="Seleccione la bodega a la cual quiere agregar uno o varios productos"
    />
  );
}
