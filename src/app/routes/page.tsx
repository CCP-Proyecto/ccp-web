import { env } from "@/env";
import { DeliveryRouteGenerator } from "./_components/DeliveryRouteGenerator";

export default function RoutePage() {
  return <DeliveryRouteGenerator apiKey={env.GOOGLE_MAPS_API_KEY} />;
}
