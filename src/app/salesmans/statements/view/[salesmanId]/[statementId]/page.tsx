"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function StatementResultsPage() {
  const { statementId, salesmanId } = useParams<{
    statementId: string;
    salesmanId: string;
  }>();
  const t = useTranslations("SalesmanStatementResultPage");
  const td = useTranslations("SalesmanStatementResultPage.details");
  const tp = useTranslations("Page");

  const { data: statement, isLoading } =
    api.salesman.getSalesmanStatementById.useQuery(
      {
        statementId,
        salesmanId,
      },
      {
        enabled: !!statementId && !!salesmanId,
      },
    );

  if (isLoading || !statement) {
    return <div>{tp("loading")}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <div className="flex w-full max-w-md flex-col justify-center gap-12">
        <h1 className="font-normal text-3xl">{t("title")}</h1>

        <div className="flex flex-col">
          <p>
            {td("statementId")}: {statement.id}
          </p>
          <p>
            {td("description")}: {statement.description}
          </p>
        </div>

        <div className="flex justify-center">
          <Link href="/">
            <Button className="w-min" variant="primaryCCP">
              {t("backButton")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
