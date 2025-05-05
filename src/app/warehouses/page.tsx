"use client";

import { SelectionMenu } from "@/components/SelectionMenu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function WarehousesPage() {
  const router = useRouter();

  const menuItems = [
    {
      title: "Registro de bodegas",
      path: "/warehouses/register",
    },
    {
      title: "Consulta de productos en bodega",
      path: "/warehouses/products",
    },
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <h1 className="mb-16 font-normal text-4xl">Bodegas</h1>

      <SelectionMenu
        items={menuItems.map((item) => ({
          title: item.title,
          onClick: () => handleNavigate(item.path),
        }))}
      />

      <div className="pt-16">
        <Button onClick={handleGoBack} variant="primaryCCP">
          Volver
        </Button>
      </div>
    </div>
  );
}
