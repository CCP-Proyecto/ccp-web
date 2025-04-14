"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function VentasPage() {
  const router = useRouter();

  const menuItems = [
    {
      title: "Registro de vendedores",
      path: "/salesmans/register",
    },
    {
      title: "Planes de venta",
      path: "#",
    },
    {
      title: "Reporte de vendedores",
      path: "#",
    },
    {
      title: "Informe de vendedores",
      path: "#",
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

      <div className="w-full max-w-md space-y-6">
        {menuItems.map((item) => (
          <Card
            key={item.title}
            className="cursor-pointer p-6 shadow-md transition-shadow hover:shadow-lg"
            onClick={() => handleNavigate(item.path)}
          >
            <h2 className="font-normal text-xl">{item.title}</h2>
          </Card>
        ))}
      </div>

      <div className="mt-auto pt-16">
        <Button
          onClick={handleGoBack}
          variant="primaryCCP"
          // className="h-12 w-40 rounded-full bg-slate-500 text-white shadow-md hover:bg-slate-600"
        >
          Volver
        </Button>
      </div>
    </div>
  );
}
