"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchProductsPage() {
  const { salesmanId, period } = useParams<{
    salesmanId: string;
    period: string;
  }>();
  const [date, setDate] = useState<Date>();
  const router = useRouter();
  const t = useTranslations("SalesmanReportSelectDatePage");
  const tb = useTranslations("Button");

  const handleContinuar = () => {
    if (date) {
      const dateValue = date.toISOString().split("T")[0];
      router.push(`/salesmans/reports/${salesmanId}/${period}/${dateValue}`);
    }
  };

  const handleVolver = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <div className="w-full max-w-md">
        <h1 className="mb-12 font-normal text-3xl">{t("title")}</h1>

        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center justify-center">
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span>{t("form.datePicker")}</span>
                )}
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {date && (
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
