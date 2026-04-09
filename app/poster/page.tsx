"use client";

import React, { useMemo, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { toPng } from "html-to-image";
import { Download, Palette } from "lucide-react";

type PosterData = {
  title: string;
  speaker: string;
  venue: string;
  date: string;
  organization: string;
};

const templates = {
  emerald: {
    name: "Emerald Mosque",
    bg: "from-emerald-950 via-emerald-800 to-emerald-950",
    accent: "text-emerald-300",
    border: "border-emerald-500/30",
  },
  gold: {
    name: "Royal Gold",
    bg: "from-slate-950 via-amber-900 to-slate-950",
    accent: "text-amber-200",
    border: "border-amber-500/30",
  },
  night: {
    name: "Ramadan Night",
    bg: "from-slate-950 via-indigo-950 to-blue-950",
    accent: "text-blue-200",
    border: "border-blue-500/30",
  },
} as const;

export default function PosterPage() {
  const searchParams = useSearchParams();
  const posterRef = useRef<HTMLDivElement>(null);

  const [template, setTemplate] =
    useState<keyof typeof templates>("emerald");

  const [data, setData] = useState<PosterData>({
    title:
      searchParams.get("title") || "Friday Islamic Lecture",
    speaker:
      searchParams.get("speaker") ||
      "Usthad Abdul Rahman",
    venue:
      searchParams.get("venue") ||
      "Central Masjid, Malappuram",
    date:
      searchParams.get("date") ||
      "Friday • After Maghrib",
    organization:
      searchParams.get("organization") ||
      "DeenEvents Kerala",
  });

  const active = useMemo(() => templates[template], [template]);

  const updateField = (
    key: keyof PosterData,
    value: string
  ) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const downloadPoster = async () => {
    if (!posterRef.current) return;

    const dataUrl = await toPng(posterRef.current, {
      cacheBust: true,
    });

    const link = document.createElement("a");
    link.download = `${data.title.replace(/\s+/g, "-")}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* LEFT */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Palette className="text-emerald-400" />
            AI Poster Builder
          </h1>

          <div className="grid grid-cols-3 gap-3">
            {Object.entries(templates).map(([key, value]) => (
              <button
                key={key}
                onClick={() =>
                  setTemplate(key as keyof typeof templates)
                }
                className={`py-3 rounded-xl border ${
                  template === key
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {value.name}
              </button>
            ))}
          </div>

          <input
            value={data.title}
            onChange={(e) =>
              updateField("title", e.target.value)
            }
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3"
          />

          <input
            value={data.speaker}
            onChange={(e) =>
              updateField("speaker", e.target.value)
            }
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3"
          />

          <input
            value={data.venue}
            onChange={(e) =>
              updateField("venue", e.target.value)
            }
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3"
          />

          <input
            value={data.date}
            onChange={(e) =>
              updateField("date", e.target.value)
            }
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3"
          />

          <input
            value={data.organization}
            onChange={(e) =>
              updateField("organization", e.target.value)
            }
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3"
          />

          <button
            onClick={downloadPoster}
            className="w-full bg-emerald-600 py-4 rounded-2xl font-bold flex justify-center gap-2"
          >
            <Download />
            Download Poster
          </button>
        </section>

        {/* RIGHT */}
        <section>
          <div
            ref={posterRef}
            className={`w-full max-w-md mx-auto aspect-[4/5] rounded-[2.5rem] bg-gradient-to-br ${active.bg} p-10 border-8 ${active.border} flex flex-col justify-between`}
          >
            <div>
              <p
                className={`text-xs tracking-[0.4em] uppercase font-bold mb-4 ${active.accent}`}
              >
                Islamic Programme
              </p>
              <h2 className="text-5xl font-extrabold leading-tight">
                {data.title}
              </h2>
            </div>

            <div className="space-y-5">
              <div className="rounded-3xl bg-white/10 p-6">
                <p className={active.accent}>Speaker</p>
                <p className="text-3xl font-bold">
                  {data.speaker}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl">
                  <p className="text-xs text-gray-300">
                    Venue
                  </p>
                  <p>{data.venue}</p>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl">
                  <p className="text-xs text-gray-300">
                    Date
                  </p>
                  <p>{data.date}</p>
                </div>
              </div>
            </div>

            <div>
              <p className={active.accent}>
                {data.organization}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
