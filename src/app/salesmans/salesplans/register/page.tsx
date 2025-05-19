"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/trpc/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchProductsPage() {
  const [selectedSalesman, setSelectedSalesman] = useState<string>("");
  const router = useRouter();
  const { data: salesmans, isLoading } =
    api.salesman.getAllSalesmans.useQuery();
  const t = useTranslations("SalesmanSalesPlanSelectPage");
  const tp = useTranslations("Page");
  const tb = useTranslations("Button");

  const handleSalesmanSelection = (value: string) => {
    setSelectedSalesman(value);
  };

  const handleContinuar = () => {
    if (selectedSalesman) {
      router.push(`/salesmans/salesplans/register/${selectedSalesman}`);
    }
  };

  const handleVolver = () => {
    router.back();
  };

  if (isLoading || !salesmans) {
    return <div>{tp("loading")}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <div className="w-full max-w-md">
        <h1 className="mb-12 font-normal text-3xl">{t("title")}</h1>

        <Select onValueChange={handleSalesmanSelection}>
          <SelectTrigger className="h-14 w-full rounded-full border-gray-300">
            <SelectValue placeholder={t("form.salesmanDropdown")} />
          </SelectTrigger>
          <SelectContent>
            {salesmans.map((salesman) => (
              <SelectItem key={salesman.id} value={salesman.id}>
                {salesman.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedSalesman && (
          <div className="mt-8 flex justify-center">
            <Button onClick={handleContinuar} variant="primaryCCP">
              {tb("continue")}
            </Button>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Button onClick={handleVolver} variant="primaryCCP">
            {tb("back")}
          </Button>
        </div>
      </div>
    </div>
  );
}
