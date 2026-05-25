// components/RamadanMode.tsx
"use client";

import { useEffect, useState } from "react";

export default function RamadanMode() {
  const [isRamadan, setIsRamadan] = useState(false);
  const [isEid, setIsEid] = useState(false);

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();

    // Rough detection (improve with proper Hijri library)
    if ((month === 3 || month === 4) && date > 10) { // March-April example
      setIsRamadan(true);
    }
  }, []);

  if (!isRamadan && !isEid) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 via-emerald-600 to-amber-500 text-white py-3 px-6 text-center font-medium text-sm flex items-center justify-center gap-3 border-b border-amber-400">
      <span>🌙</span>
      {isRamadan ? "Ramadan Mubarak - Special Events Highlighted" : "Eid Mubarak! 🎉"}
      <span>🌙</span>
    </div>
  );
}