// components/IslamicInfo.tsx
"use client";

import { useEffect, useState } from "react";
import { Moon, Clock, MapPin } from "lucide-react";
import axios from "axios";

type PrayerTimes = {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

export default function IslamicInfo({ district = "Malappuram" }: { district?: string }) {
  const [hijriDate, setHijriDate] = useState("");
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);

  const coordinates: Record<string, { lat: number; lng: number }> = {
    "Malappuram": { lat: 11.05, lng: 76.07 },
    "Kozhikode": { lat: 11.25, lng: 75.78 },
    "Kannur": { lat: 11.87, lng: 75.37 },
    "Ernakulam": { lat: 9.98, lng: 76.28 },
    "Thrissur": { lat: 10.52, lng: 76.21 },
    "Thiruvananthapuram": { lat: 8.51, lng: 76.96 },
  };

  useEffect(() => {
    const fetchIslamicData = async () => {
      setLoading(true);
      const coords = coordinates[district] || coordinates["Malappuram"];

      try {
        // Real Prayer Times from Aladhan API
        const { data } = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity?city=${district}&country=India&method=2`
        );

        const timings = data.data.timings;
        setPrayerTimes({
          Fajr: timings.Fajr,
          Sunrise: timings.Sunrise,
          Dhuhr: timings.Dhuhr,
          Asr: timings.Asr,
          Maghrib: timings.Maghrib,
          Isha: timings.Isha,
        });

        // Accurate Hijri Date
        const hijri = new Intl.DateTimeFormat('en-US-u-ca-islamic', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }).format(new Date());

        setHijriDate(hijri);
      } catch (error) {
        console.error("Failed to fetch prayer times");
      } finally {
        setLoading(false);
      }
    };

    fetchIslamicData();
  }, [district]);

  return (
    <div className="bg-white dark:bg-gray-900 border border-emerald-100 dark:border-emerald-800 rounded-3xl p-6 islamic-pattern shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <Moon className="text-emerald-600" size={26} />
          <div>
            <p className="font-semibold text-emerald-700">Islamic Information</p>
            <p className="text-sm text-gray-500">{district}, Kerala</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-emerald-600">Today</p>
          <p className="font-bold text-lg islamic-green">{hijriDate}</p>
        </div>
      </div>

      {loading ? (
        <div className="h-40 flex items-center justify-center">Loading prayer times...</div>
      ) : prayerTimes ? (
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(prayerTimes).map(([name, time]) => (
            <div key={name} className="bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl p-4 text-center">
              <p className="text-emerald-600 text-xs font-medium tracking-widest">{name.toUpperCase()}</p>
              <p className="font-mono text-xl font-semibold mt-1 text-gray-800 dark:text-white">{time}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}