"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function StatementResultsPage() {
  const { statementId, salesmanId } = useParams<{
    statementId: string;
    salesmanId: string;
  }>();

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
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <div className="flex w-full max-w-md flex-col justify-center gap-12">
        <h1 className="font-normal text-3xl">Resultados de la búsqueda</h1>

        <div className="flex flex-col">
          <p>ID Informe: {statement.id}</p>
          <p>Descripción: {statement.description}</p>
        </div>

        <div className="flex justify-center">
          <Link href="/">
            <Button className="w-min" variant="primaryCCP">
              Volver al menú principal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
