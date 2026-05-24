// app/events/map/page.tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

export default function EventsMap() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20 pb-8 px-4 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900">Events Map - Kerala</h1>
          <p className="text-gray-600">Find Islamic events near you</p>
        </div>
        
        <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200">
          <MapComponent />
        </div>
      </div>
    </div>
  );
}