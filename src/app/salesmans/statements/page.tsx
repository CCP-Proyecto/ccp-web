"use client";

import { SelectionMenu } from "@/components/SelectionMenu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function StatementsMenuPage() {
  const router = useRouter();

  const menuItems = [
    {
      title: "Registro de informes",
      // path: "/salesmans/statements/register",
      path: "#",
    },
    {
      title: "Ver informes de un vendedor",
      path: "/salesmans/statements/view",
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
      <h1 className="mb-16 font-normal text-4xl">Ventas</h1>

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
