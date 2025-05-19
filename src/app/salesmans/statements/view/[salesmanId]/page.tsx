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
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchProductsPage() {
  const [selectedStatement, setSelectedStatement] = useState<string>("");
  const params = useParams<{ salesmanId: string }>();

  const router = useRouter();
  const { data: statements, isLoading } =
    api.salesman.getSalesmanStatements.useQuery({
      salesmanId: params.salesmanId,
    });
  const t = useTranslations("SalesmanStatementQueryStatementPage");
  const tf = useTranslations("SalesmanStatementQueryStatementPage.form");
  const tp = useTranslations("Page");
  const tb = useTranslations("Button");

  const handleStatementSelection = (value: string) => {
    setSelectedStatement(value);
  };

  const handleContinuar = () => {
    if (selectedStatement) {
      router.push(
        `/salesmans/statements/view/${params.salesmanId}/${selectedStatement}`,
      );
    }
  };

  const handleVolver = () => {
    router.back();
  };

  if (isLoading || !statements) {
    return <div>{tp("loading")}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <div className="w-full max-w-md">
        <h1 className="mb-12 font-normal text-3xl">{t("title")}</h1>

        <Select onValueChange={handleStatementSelection}>
          <SelectTrigger className="h-14 w-full rounded-full border-gray-300">
            <SelectValue placeholder={tf("statementDropdown")} />
          </SelectTrigger>
          <SelectContent>
            {statements.map((salesman) => (
              <SelectItem key={salesman.id} value={String(salesman.id)}>
                {salesman.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedStatement && (
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
