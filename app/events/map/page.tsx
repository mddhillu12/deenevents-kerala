// app/events/map/page.tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@/utils/supabase/client";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

export default function EventsMap() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Events Map - Kerala</h1>
        <MapComponent />
      </div>
    </div>
  );
}