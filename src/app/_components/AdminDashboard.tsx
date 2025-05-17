import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, Bus, Grid3X3, LineChart, User } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const AdminDashboard = async () => {
  const t = await getTranslations("DashboardPage");
  return (
    <main className="p-6">
      <h1 className="mb-12 font-bold text-4xl">{t("title")}</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border shadow-sm">
          <Link href="/manufacturers">
            <CardContent className="p-0">
              <div className="flex flex-col items-center p-6">
                <div className="mb-4 flex w-full justify-center rounded-lg p-8">
                  <User className="h-16 w-16" />
                </div>
                <h2 className="mb-2 text-center font-semibold text-sm">
                  {t("manufacturers.title")}
                </h2>
                <p className="text-center text-sm">
                  {t("manufacturers.description")}
                </p>
              </div>
            </CardContent>
          </Link>
        </Card>

        {/* Sales Card */}
        <Card className="border shadow-sm">
          <Link href="/salesmans">
            <CardContent className="p-0">
              <div className="flex flex-col items-center p-6">
                <div className="mb-4 flex w-full justify-center rounded-lg p-8">
                  <LineChart className="h-16 w-16" />
                </div>
                <h2 className="mb-2 text-center font-semibold text-sm">
                  {t("sales.title")}
                </h2>
                <p className="text-center text-sm">
                  {t("sales.description")}
                </p>
              </div>
            </CardContent>
          </Link>
        </Card>

        {/* Warehouses Card */}
        <Card className="border shadow-sm">
          <Link href="/warehouses">
            <CardContent className="p-0">
              <div className="flex flex-col items-center p-6">
                <div className="mb-4 flex w-full justify-center rounded-lg p-8">
                  <Grid3X3 className="h-16 w-16" />
                </div>
                <h2 className="mb-2 text-center font-semibold text-sm">
                  {t("warehouses.title")}
                </h2>
                <p className="text-center text-sm">
                  {t("warehouses.description")}
                </p>
              </div>
            </CardContent>
          </Link>
        </Card>

        {/* Products Card */}
        <Card className="border shadow-sm">
          <Link href="/products">
            <CardContent className="p-0">
              <div className="flex flex-col items-center p-6">
                <div className="mb-4 flex w-full justify-center rounded-lg p-8">
                  <Bookmark className="h-16 w-16" />
                </div>
                <h2 className="mb-2 text-center font-semibold text-sm">
                  {t("products.title")}
                </h2>
                <p className="text-center text-sm">
                  {t("products.description")}
                </p>
              </div>
            </CardContent>
          </Link>
        </Card>

        {/* Routes Card */}
        <Card className="border shadow-sm">
          <CardContent className="p-0">
            <div className="flex flex-col items-center p-6">
              <div className="mb-4 flex w-full justify-center rounded-lg p-8">
                <Bus className="h-16 w-16" />
              </div>
              <h2 className="mb-2 text-center font-semibold text-sm">{t("routes.title")}</h2>
              <p className="text-center text-sm">
                {t("routes.description")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
