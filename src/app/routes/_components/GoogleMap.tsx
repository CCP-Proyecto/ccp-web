"use client";

import {
  APIProvider,
  Map as RGMap,
  useApiIsLoaded,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Props {
  waypoints: {
    location: string;
  }[];
  origin: string;
}

interface GoogleMapsProps extends Props {
  apiKey: string;
}

export const GoogleMap: React.FC<GoogleMapsProps> = ({
  waypoints,
  origin,
  apiKey,
}) => {
  const t = useTranslations("RoutesPage");
  return (
    <APIProvider apiKey={apiKey}>
      <div className="flex h-full flex-col items-center justify-center gap-8">
        <h1 className="font-bold text-3xl">{t("optimizedRoute")}</h1>
        <ReactGoogleMap waypoints={waypoints} origin={origin} />
      </div>
    </APIProvider>
  );
};

const ReactGoogleMap: React.FC<Props> = ({ waypoints, origin }) => {
  const status = useApiIsLoaded();
  const t = useTranslations("RoutesPage");

  if (!status) {
    return <div>{t("loading")}</div>;
  }

  return (
    <RGMap
      defaultCenter={{ lat: 4.655, lng: -74.065 }}
      className="size-1/2"
      defaultZoom={9}
      gestureHandling="greedy"
      fullscreenControl={true}
      streetViewControl={false}
      mapTypeControl={false}
    >
      <Directions waypoints={waypoints} origin={origin} />
    </RGMap>
  );
};

const Directions: React.FC<Props> = ({ waypoints, origin }) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const leg = routes[0]?.legs[0];

  const [totalDistance, setTotalDistance] = useState(0);
  const [totalDuration, setTotalDuration] = useState({
    hours: 0,
    minutes: 0,
  });
  const t = useTranslations("RoutesPage.calculation");

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(
      new routesLibrary.DirectionsRenderer({ draggable: false, map }),
    );
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    if (!origin) return;

    if (!waypoints.length) return;

    directionsService
      .route({
        origin,
        waypoints,
        optimizeWaypoints: true,
        destination: origin,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
        let totalDistance = 0;
        let totalDuration = 0;

        for (const route of response.routes) {
          for (const leg of route.legs) {
            totalDistance += leg?.distance?.value ?? 0;
            totalDuration += leg?.duration?.value ?? 0;
          }
        }

        setTotalDistance(Math.round((totalDistance / 1000) * 10) / 10); // Convert to km with 1 decimal
        setTotalDuration({
          hours: Math.floor(totalDuration / 3600),
          minutes: Math.floor((totalDuration % 3600) / 60),
        });
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, origin, waypoints]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(0);
  }, [directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="directions">
      <p>
        {t("totalDistance")}: {totalDistance}km
      </p>
      <p>
        {t("totalDuration")}: {totalDuration.hours}h {totalDuration.minutes}m
      </p>
    </div>
  );
};
