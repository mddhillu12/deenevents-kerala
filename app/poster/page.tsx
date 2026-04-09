"use client";

import React, { useMemo, useState, useRef } from "react";
import { toPng } from "html-to-image";
import { Download, Palette, Type, Share2 } from "lucide-react";

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
  const posterRef = useRef<HTMLDivElement>(null);
  const [template, setTemplate] = useState<keyof typeof templates>("emerald");
  const [data, setData] = useState<PosterData>({
    title: "Friday Islamic Lecture",
    speaker: "Usthad Abdul Rahman",
    venue: "Central Masjid, Malappuram",
    date: "Friday • After Maghrib",
    organization: "DeenEvents Kerala",
  });

  const active = useMemo(() => templates[template], [template]);

  const updateField = (key: keyof PosterData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const downloadPoster = async () => {
    if (posterRef.current === null) return;
    try {
      const dataUrl = await toPng(posterRef.current, { cacheBust: true });
      const link = document.createElement("a");
      link.download = `${data.title.replace(/\s+/g, "-")}-poster.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        {/* LEFT: CONTROLS */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm space-y-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Palette className="text-emerald-400" /> AI Poster Builder
          </h1>
          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Style</label>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(templates).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setTemplate(key as keyof typeof templates)}
                  className={`py-3 rounded-xl border text-sm transition-all ${
                    template === key ? "border-emerald-500 bg-emerald-500/10" : "border-white/10 bg-white/5"
                  }`}
                >
                  {value.name}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <input value={data.title} onChange={(e) => updateField("title", e.target.value)} placeholder="Title" className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:border-emerald-500 outline-none" />
            <input value={data.speaker} onChange={(e) => updateField("speaker", e.target.value)} placeholder="Speaker" className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:border-emerald-500 outline-none" />
            <input value={data.venue} onChange={(e) => updateField("venue", e.target.value)} placeholder="Venue" className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:border-emerald-500 outline-none" />
            <div className="grid grid-cols-2 gap-3">
               <input value={data.date} onChange={(e) => updateField("date", e.target.value)} placeholder="Date" className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:border-emerald-500 outline-none" />
               <input value={data.organization} onChange={(e) => updateField("organization", e.target.value)} placeholder="Org" className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:border-emerald-500 outline-none" />
            </div>
          </div>
          <button onClick={downloadPoster} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
            <Download className="w-5 h-5" /> Download Poster
          </button>
        </section>

        {/* RIGHT: PREVIEW */}
        <section className="sticky top-8">
          <div ref={posterRef} className={`w-full max-w-md mx-auto aspect-[4/5] rounded-[2.5rem] bg-gradient-to-br ${active.bg} p-10 shadow-2xl border-8 ${active.border} flex flex-col justify-between overflow-hidden relative`}>
            <div className="relative z-10">
              <p className={`text-xs tracking-[0.4em] uppercase font-bold mb-4 ${active.accent}`}>Islamic Programme</p>
              <h2 className="text-5xl font-extrabold text-white leading-tight">{data.title}</h2>
            </div>
            <div className="relative z-10 space-y-6">
              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-xl border border-white/10">
                <p className={`text-xs uppercase font-bold mb-1 ${active.accent}`}>Speaker</p>
                <p className="text-3xl font-bold text-white">{data.speaker}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-white">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5"><p className="text-[10px] uppercase text-gray-400">Location</p><p className="text-sm">{data.venue}</p></div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5"><p className="text-[10px] uppercase text-gray-400">Date</p><p className="text-sm">{data.date}</p></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}