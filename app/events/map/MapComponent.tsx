// app/events/map/MapComponent.tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import map to avoid SSR issues
const Map = dynamic(
  () => import("./DynamicMap"),
  { ssr: false }
);

export default function MapComponent() {
  return <Map />;
}