"use client";

import React, { useMemo, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toPng } from "html-to-image";
import { Download, Palette, Moon, ArrowLeft } from "lucide-react";
import Link from "next/link";

type PosterData = {
  title: string;
  speaker: string;
  venue: string;
  date: string;
  organization: string;
};

const templates = {
  emerald: {
    name: "Emerald",
    bg: "from-[#062016] via-[#0a3d29] to-[#062016]",
    accent: "text-emerald-400",
    border: "border-emerald-500/30",
  },
  gold: {
    name: "Royal",
    bg: "from-[#1a1405] via-[#3d300a] to-[#1a1405]",
    accent: "text-amber-300",
    border: "border-amber-500/30",
  },
  night: {
    name: "Night",
    bg: "from-[#050a1a] via-[#0a1b3d] to-[#050a1a]",
    accent: "text-blue-400",
    border: "border-blue-500/30",
  },
} as const;

function PosterBuilderContent() {
  const searchParams = useSearchParams();
  const posterRef = useRef<HTMLDivElement>(null);
  const [template, setTemplate] =
    useState<keyof typeof templates>("emerald");
  const [isDownloading, setIsDownloading] = useState(false);

  const [data, setData] = useState<PosterData>({
    title: searchParams.get("title") || "Friday Islamic Lecture",
    speaker: searchParams.get("speaker") || "Usthad Abdul Rahman",
    venue: searchParams.get("venue") || "Central Masjid, Malappuram",
    date: searchParams.get("date") || "Friday • After Maghrib",
    organization:
      searchParams.get("organization") || "DeenEvents Kerala",
  });

  const active = useMemo(() => templates[template], [template]);

  const updateField = (key: keyof PosterData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const downloadPoster = async () => {
    if (!posterRef.current) return;
    setIsDownloading(true);

    try {
      await new Promise((r) => setTimeout(r, 100));

      const dataUrl = await toPng(posterRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#020405",
      });

      const link = document.createElement("a");
      link.download = "deen-events-poster.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Poster download failed:", err);
      alert("Failed to generate poster.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020405] text-white">
      <nav className="p-6 border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Moon size={18} fill="white" />
            </div>
            <h1 className="text-xl font-black uppercase italic">
              DeenEvents<span className="text-emerald-500">.</span>
            </h1>
          </Link>

          <Link
            href="/"
            className="text-xs font-bold text-gray-400 flex items-center gap-2"
          >
            <ArrowLeft size={14} /> Back Home
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 p-6 lg:py-16">
        <section className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 space-y-8">
          <h2 className="text-3xl font-black flex items-center gap-3">
            <Palette className="text-emerald-500" />
            AI Poster Builder
          </h2>

          <div className="grid grid-cols-3 gap-3">
            {Object.entries(templates).map(([key, value]) => (
              <button
                key={key}
                onClick={() =>
                  setTemplate(key as keyof typeof templates)
                }
                className={`py-4 rounded-2xl border text-xs font-bold ${
                  template === key
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-white/10"
                }`}
              >
                {value.name}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <input
              value={data.title}
              onChange={(e) =>
                updateField("title", e.target.value)
              }
              placeholder="Title"
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4"
            />

            <input
              value={data.speaker}
              onChange={(e) =>
                updateField("speaker", e.target.value)
              }
              placeholder="Speaker"
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4"
            />

            <input
              value={data.venue}
              onChange={(e) =>
                updateField("venue", e.target.value)
              }
              placeholder="Venue"
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4"
            />

            <input
              value={data.date}
              onChange={(e) =>
                updateField("date", e.target.value)
              }
              placeholder="Date"
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4"
            />

            <input
              value={data.organization}
              onChange={(e) =>
                updateField("organization", e.target.value)
              }
              placeholder="Organization"
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4"
            />
          </div>

          <button
            onClick={downloadPoster}
            disabled={isDownloading}
            className="w-full bg-emerald-600 py-4 rounded-2xl font-bold"
          >
            {isDownloading ? "Generating..." : "Download Poster"}
          </button>
        </section>

        <section className="flex justify-center">
          <div
            ref={posterRef}
            className={`w-full max-w-[400px] aspect-[3/4] rounded-[3rem] bg-gradient-to-br ${active.bg} p-12 border-[12px] ${active.border} flex flex-col justify-between`}
          >
            <div>
              <p className={`text-xs uppercase ${active.accent}`}>
                Islamic Programme
              </p>
              <h2 className="text-5xl font-black italic mt-4">
                {data.title}
              </h2>
            </div>

            <div>
              <p className="text-2xl font-bold">{data.speaker}</p>
              <p className="mt-4">{data.venue}</p>
              <p>{data.date}</p>
            </div>

            <p className={`text-sm font-bold ${active.accent}`}>
              {data.organization}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function PosterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PosterBuilderContent />
    </Suspense>
  );
}
