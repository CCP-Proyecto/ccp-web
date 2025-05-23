import { useTranslations } from "next-intl";
import type { Warehouse } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  warehouses?: Warehouse[];
  setSelectedWarehouse: (value: string) => void;
}

export const SelectWarehouseAddress: React.FC<Props> = ({
  warehouses,
  setSelectedWarehouse,
}) => {
  const tp = useTranslations("Page");
  const tf = useTranslations("WarehouseQueryPage.form");

  const handleWarehouseSelection = (value: string) => {
    setSelectedWarehouse(value);
  };

  if (!warehouses) {
    return <div>{tp("loading")}</div>;
  }

  return (
    <Select onValueChange={handleWarehouseSelection}>
      <SelectTrigger className="h-14 w-full rounded-full border-gray-300">
        <SelectValue placeholder={tf("warehouseDropdown")} />
      </SelectTrigger>
      <SelectContent>
        {warehouses.map((warehouse) => (
          <SelectItem key={warehouse.id} value={warehouse.address}>
            {warehouse.name} - {warehouse.address}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
