"use client";

import { SelectionMenu } from "@/components/SelectionMenu";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function VentasPage() {
  const router = useRouter();
  const t = useTranslations("SalesMenuPage");
  const to = useTranslations("SalesMenuPage.options");
  const tb = useTranslations("Button");

  const menuItems = [
    {
      title: to("salesPersonRegistration"),
      path: "/salesmans/register",
    },
    {
      title: to("salesPlans"),
      path: "/salesmans/salesplans",
    },
    {
      title: to("salesPersonReport"),
      path: "/salesmans/reports",
    },
    {
      title: to("salesPersonInfo"),
      path: "/salesmans/statements",
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
