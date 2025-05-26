"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { api } from "@/trpc/react";
import type { Order } from "@/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { GoogleMap } from "./GoogleMap";
import { SelectWarehouseAddress } from "./SelectWarehouseAddress";

interface Props {
  apiKey: string;
}

interface OrderWithSelected extends Order {
  selected?: boolean;
}

export const DeliveryRouteGenerator: React.FC<Props> = ({ apiKey }) => {
  const { data: pendingOrders } = api.order.getAllPendingOrders.useQuery();
  const [orders, setOrders] = useState<OrderWithSelected[]>([]);
  const selectedOrders = orders.filter((order) => order.selected);
  const [isRouteGenerated, setIsRouteGenerated] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>("");
  const { data: warehouses } = api.warehouse.getAllWarehouses.useQuery();

  const t = useTranslations("RoutesPage");
  const tf = useTranslations("RoutesPage.form");

  useEffect(() => {
    if (!pendingOrders) return;

    const updatedOrders = pendingOrders.map((order) => ({
      ...order,
      selected: false,
    }));

    setOrders(updatedOrders);
  }, [pendingOrders]);

  const waypoints = selectedOrders.map((order) => ({
    location: order.customer.address,
    stopover: true,
  }));

  const toggleOrderSelection = (orderId: number) => {
    setOrders(
      orders.map((order) =>
        Number(order.id) === orderId
          ? { ...order, selected: !order.selected }
          : order,
      ),
    );
  };

  const generateRoute = () => {
    setIsRouteGenerated(true);
    toast("Generando ruta óptima...");
  };

  if (isRouteGenerated && selectedOrders.length > 0) {
    return (
      <div>
        <GoogleMap
          apiKey={apiKey}
          origin={selectedWarehouse}
          waypoints={waypoints}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-2 text-center font-bold text-4xl">{t("title")}</h1>
      <p className="mb-8 text-center text-xl">{t("subtitle")}</p>

      <SelectWarehouseAddress
        warehouses={warehouses}
        setSelectedWarehouse={setSelectedWarehouse}
      />
      <p className="my-8 text-center text-xl">{tf("ordersSelectionLabel")}</p>

      <div className="mb-8 space-y-4">
        {pendingOrders?.map((order, index) => (
          <div
            key={order.id}
            className="flex items-center rounded-xl border p-4"
          >
            <div className="mr-4">
              <Checkbox
                checked={orders[index]?.selected}
                onCheckedChange={() => toggleOrderSelection(order.id)}
                className="h-6 w-6 rounded border-2"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col justify-between md:flex-row md:items-center">
                <div>
                  <h3 className="font-bold text-xl">{order.customer.name}</h3>
                  <p className="text-gray-600">{order.customer.address}</p>
                </div>
                <div className="mt-2 flex items-center justify-between md:mt-0">
                  <span className="rounded-full bg-gray-200 px-4 py-1 text-sm capitalize">
                    {tf("status.pending")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          onClick={generateRoute}
          variant="primaryCCP"
          className="w-min text-nowrap"
          disabled={selectedOrders.length === 0 || !selectedWarehouse}
        >
          {t("form.generateRouteButton")}
        </Button>
      </div>
    </div>
  );
};
