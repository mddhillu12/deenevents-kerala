// components/IslamicDate.tsx
"use client";

import { useEffect, useState } from "react";
import { Moon, Clock } from "lucide-react";

export default function IslamicDate({ district = "Malappuram" }: { district?: string }) {
  const [hijriDate, setHijriDate] = useState("");
  const [prayerTimes, setPrayerTimes] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    // Simple Hijri calculation (you can use a proper library later)
    const now = new Date();
    const hijri = new Intl.DateTimeFormat('ar-SA', { 
      calendar: 'islamic',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(now);
    
    setHijriDate(hijri);

    // Mock Prayer Times (Replace with real API later)
    setPrayerTimes({
      Fajr: "05:12",
      Sunrise: "06:28",
      Dhuhr: "12:35",
      Asr: "16:10",
      Maghrib: "18:45",
      Isha: "20:05"
    });
  }, [district]);

  return (
    <div className="bg-emerald-900/5 border border-emerald-200 dark:border-emerald-800 rounded-3xl p-5 islamic-pattern">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Moon className="text-emerald-600" />
          <span className="font-semibold text-emerald-700">Islamic Date</span>
        </div>
        <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
          {district}
        </span>
      </div>

      <div className="text-2xl font-bold text-emerald-800 mb-1">{hijriDate}</div>
      
      <div className="grid grid-cols-3 gap-3 mt-6 text-sm">
        {prayerTimes && Object.entries(prayerTimes).map(([name, time]) => (
          <div key={name} className="text-center">
            <p className="text-emerald-600 text-xs">{name}</p>
            <p className="font-mono font-semibold">{time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}