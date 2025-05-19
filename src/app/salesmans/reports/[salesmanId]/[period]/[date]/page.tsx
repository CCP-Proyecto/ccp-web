import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/server";
import { format } from "date-fns";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{
    salesmanId: string;
    period: "monthly" | "quarterly" | "annually";
    date: string;
  }>;
}

export default async function SalesmanReportPage({ params }: Props) {
  const { salesmanId, period, date } = await params;
  const report = await api.salesman.getReport({
    salespersonId: salesmanId,
    period,
    date,
  });
  const t = await getTranslations("SalesmanReportResultPage");
  const tr = await getTranslations("SalesmanReportResultPage.report");
  const trp = await getTranslations(
    "SalesmanReportResultPage.report.productTableHeaders",
  );

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8 gap-4">
      <h1 className="mb-16 font-normal text-4xl w-80">{t("title")}</h1>
      <div className="w-80 pb-16">
        <p className="text-2xl pb-4">
          <b>{tr("salesmanName")}</b> <br /> {report.salesperson.name}
        </p>
        <p>
          <b>{tr("reportPeriod")}:</b>{" "}
          {tr("reportPeriodType", {
            type: report.period.type,
          })}
        </p>
        <p>
          <b>{tr("reportStartDate")}</b>: {format(report.period.start, "P")}
        </p>
        <p>
          <b>{tr("totalOrders")}</b>: {report.summary.totalOrders}
        </p>
        <p>
          <b>{tr("totalSold")}</b>: ${report.summary.totalRevenue}
        </p>
      </div>
      <h2 className="text-2xl">{tr('soldProducts')}</h2>
      <div>
        <Table className="w-min">
          <TableHeader>
            <TableRow className="font-bold text-lg">
              <TableHead className="w-50">{trp("product")}</TableHead>
              <TableHead className="text-right">
                {trp("quantityTotal")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {report.soldProducts.map((product) => (
              <TableRow key={`${product.name}-${product.totalQuantity}`}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="text-right">
                  {product.totalQuantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
