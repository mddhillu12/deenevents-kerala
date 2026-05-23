// app/events/map/DynamicMap.tsx
"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import L from "leaflet";

// Fix Leaflet default marker
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function DynamicMap() {
  const [events, setEvents] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("status", "approved")
      .limit(30);
    
    setEvents(data || []);
  };

  const getCoords = (district: string): [number, number] => {
    const map: Record<string, [number, number]> = {
      "Malappuram": [11.05, 76.07],
      "Kozhikode": [11.25, 75.78],
      "Kannur": [11.87, 75.37],
      "Kasargod": [12.50, 74.98],
      "Ernakulam": [9.98, 76.28],
      "Thrissur": [10.52, 76.21],
      "Thiruvananthapuram": [8.51, 76.96],
    };
    return map[district] || [10.8, 76.0];
  };

  return (
    <MapContainer 
      center={[10.8, 76.0]} 
      zoom={8} 
      className="h-[600px] rounded-3xl"
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {events.map((event) => {
        const [lat, lng] = getCoords(event.district);
        return (
          <Marker key={event.id} position={[lat, lng]}>
            <Popup>
              <div className="text-sm">
                <h3 className="font-bold">{event.title}</h3>
                <p>{event.speaker}</p>
                <p className="text-xs text-gray-500">{event.date}</p>
                <Link href={`/event/${event.id}`} className="text-emerald-600 hover:underline block mt-2">
                  View Details →
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}