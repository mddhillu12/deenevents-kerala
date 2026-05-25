"use client";

import { useEffect, useState } from "react";

export default function RamadanBanner() {
  const [mode, setMode] = useState<"ramadan" | "eid" | null>(null);

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1;

    // Rough detection (you can improve with proper library)
    if (month === 3 || month === 4) setMode("ramadan");
    else if (month === 4 && now.getDate() < 10) setMode("eid");
  }, []);

  if (!mode) return null;

  return (
    <div className={`py-3 px-6 text-center font-medium text-sm border-b flex items-center justify-center gap-3 ${
      mode === "ramadan" 
        ? "bg-gradient-to-r from-amber-500 to-emerald-600 text-white" 
        : "bg-gradient-to-r from-rose-500 to-amber-500 text-white"
    }`}>
      {mode === "ramadan" ? "🌙 Ramadan Mubarak - Special Tarawih & Iftar Events" : "🎉 Eid Mubarak! Taqabbalallahu Minna Wa Minkum"}
    </div>
  );
}