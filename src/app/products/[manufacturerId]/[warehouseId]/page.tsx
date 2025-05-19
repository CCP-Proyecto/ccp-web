"use client";

import { SelectionMenu } from "@/components/SelectionMenu";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";

export default function ProductsMenuPage() {
  const router = useRouter();
  const { manufacturerId, warehouseId } = useParams<{
    manufacturerId: string;
    warehouseId: string;
  }>();

  const t = useTranslations("ProductMenuPage");
  const tb = useTranslations("Button");

  const menuItems = [
    {
      title: t("options.addNewProducts"),
      path: `/products/${manufacturerId}/${warehouseId}/new`,
    },
    {
      title: t("options.addInventoryToExistingProduct"),
      path: `/products/${manufacturerId}/${warehouseId}/add`,
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
