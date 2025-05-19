"use client";

import { SelectionMenu } from "@/components/SelectionMenu";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function WarehousesPage() {
  const router = useRouter();
  const t = useTranslations("WarehouseHomePage");
  const tb = useTranslations("Button");

  const menuItems = [
    {
      title: t("options.warehouseRegistration"),
      path: "/warehouses/register",
    },
    {
      title: t("options.warehouseProductQuery"),
      path: "/warehouses/products",
    },
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <h1 className="mb-16 font-normal text-4xl">{t("title")}</h1>

      <SelectionMenu
        items={menuItems.map((item) => ({
          title: item.title,
          onClick: () => handleNavigate(item.path),
        }))}
      />

      <div className="pt-16">
        <Button onClick={handleGoBack} variant="primaryCCP">
          {tb("back")}
        </Button>
      </div>
    </div>
  );
}
