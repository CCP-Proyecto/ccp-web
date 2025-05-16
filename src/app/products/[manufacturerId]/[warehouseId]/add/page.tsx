import { api } from "@/trpc/server";
import { SelectProduct } from "./SelectProduct";

interface Props {
  params: Promise<{
    manufacturerId: string;
    warehouseId: string;
  }>;
}

export default async function AddToProductPage({ params }: Props) {
  const { manufacturerId, warehouseId } = await params;
  const products = await api.product.getManufacturerProducts({
    manufacturerId,
  });

  return <SelectProduct products={products} warehouseId={warehouseId} />;
}
