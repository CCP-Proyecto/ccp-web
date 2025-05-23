import { env } from "@/env";
import { GoogleMap } from "./_components/GoogleMap";

import type { Waypoint } from "@/types";

const dataRaw = [
  {
    id: "1",
    idType: "CC",
    address: "Calle 22A # 72B-48, Bogotá, Colombia",
    name: "Cliente 1",
    phone: "123456789",
  },
  {
    id: "2",
    idType: "CC",
    address: "Carrera 11B # 119-36, Bogotá, Colombia",
    name: "Cliente 2",
    phone: "123456789",
  },
  {
    id: "3",
    idType: "CC",
    address: "Calle 23C # 70-50, Bogotá, Colombia",
    name: "Cliente 3",
    phone: "123456789",
  },
  {
    id: "4",
    idType: "CC",
    address: "Centro Comercial Multiplaza, Bogotá, Colombia",
    name: "Cliente 3",
    phone: "123456789",
  },
  {
    id: "5",
    idType: "CC",
    address: "Centro Comercial Hayuelos, Bogotá, Colombia",
    name: "Cliente 3",
    phone: "123456789",
  },
  {
    id: "6",
    idType: "CC",
    address: "Centro Comercial Salitre Plaza, Bogotá, Colombia",
    name: "Cliente 3",
    phone: "123456789",
  },
];

export default function RoutePage() {
  const origin =
    dataRaw.at(0)?.address ?? "Centro Comercial Hayuelos, Bogotá, Colombia";

  const waypoints: Waypoint[] = dataRaw
    .map((customer) => ({
      location: customer.address,
      stopover: true,
    }))
    .slice(1);

  return (
    <GoogleMap
      apiKey={env.GOOGLE_MAPS_API_KEY}
      origin={origin}
      waypoints={waypoints}
    />
  );
}
