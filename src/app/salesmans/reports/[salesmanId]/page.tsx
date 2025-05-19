"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchProductsPage() {
  const { salesmanId } = useParams<{ salesmanId: string }>();
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const router = useRouter();
  const t = useTranslations("SalesmanReportSelectPeriodPage");
  const tf = useTranslations("SalesmanReportSelectPeriodPage.form");
  const tb = useTranslations("Button");

  const handlePeriodSelection = (value: string) => {
    setSelectedPeriod(value);
  };

  const handleContinuar = () => {
    if (selectedPeriod) {
      router.push(`/salesmans/reports/${salesmanId}/${selectedPeriod}`);
    }
  };

  const handleVolver = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <div className="w-full max-w-md">
        <h1 className="mb-12 font-normal text-3xl">{t("title")}</h1>

        <Select onValueChange={handlePeriodSelection}>
          <SelectTrigger className="h-14 w-full rounded-full border-gray-300">
            <SelectValue placeholder={tf("periodDropdown")} />
          </SelectTrigger>
          <SelectContent className="border-input bg-white">
            <SelectItem value="monthly">
              {tf("periodOptions.monthly")}
            </SelectItem>
            <SelectItem value="quarterly">
              {tf("periodOptions.quarterly")}
            </SelectItem>
            <SelectItem value="annually">{tf("periodOptions.yearly")}</SelectItem>
          </SelectContent>
        </Select>

        {selectedPeriod && (
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
