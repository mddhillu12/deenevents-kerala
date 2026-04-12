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
  const [template, setTemplate] = useState<keyof typeof templates>("emerald");
  const [isDownloading, setIsDownloading] = useState(false);

  const [data, setData] = useState<PosterData>({
    title: searchParams.get("title") || "Friday Islamic Lecture",
    speaker: searchParams.get("speaker") || "Usthad Abdul Rahman",
    venue: searchParams.get("venue") || "Central Masjid, Malappuram",
    date: searchParams.get("date") || "Friday • After Maghrib",
    organization: searchParams.get("organization") || "DeenEvents Kerala",
  });

  const active = useMemo(() => templates[template], [template]);

  const updateField = (key: keyof PosterData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const downloadPoster = async () => {
    if (!posterRef.current) return;
    setIsDownloading(true);
    
    try {
      // Small delay ensures UI is settled before capture
      await new Promise(r => setTimeout(r, 100));

      const dataUrl = await toPng(posterRef.current, {
        cacheBust: true,
        pixelRatio: 3, // 3 is the sweet spot for 4K quality without crashing browsers
        backgroundColor: '#020405',
        skipFonts: false,
        fontEmbedCSS: '', // Helps with custom fonts if they fail
      });
      
      const link = document.createElement("a");
      link.download = `deen-events-poster.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("HD Download Error:", err);
      alert("Error generating poster. Try a different browser or take a screenshot.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020405] text-white">
      {/* HEADER */}
      <nav className="p-6 border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Moon size={18} fill="white"/>
                </div>
                <h1 className="text-xl font-black uppercase tracking-tighter italic text-white">
                  DeenEvents<span className="text-emerald-500">.</span>
                </h1>
            </Link>
            <Link href="/" className="text-[10px] font-black text-gray-500 flex items-center gap-2 hover:text-white transition-all uppercase tracking-widest">
              <ArrowLeft size={14}/> Back Home
            </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 p-6 lg:py-16">
        {/* CONTROLS */}
        <section className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 space-y-8 h-fit backdrop-blur-sm">
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter mb-2 flex items-center gap-3">
              <Palette className="text-emerald-500" /> AI Designer
            </h2>
            <p className="text-gray-500 text-sm font-medium">Customise your programme poster in seconds.</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {Object.entries(templates).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setTemplate(key as keyof typeof templates)}
                className={`py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                  template === key
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                    : "border-white/5 bg-white/5 text-gray-500 hover:bg-white/10"
                }`}
              >
                {value.name}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <input placeholder="Title" value={data.title} onChange={(e) => updateField("title", e.target.value)} className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-emerald-500 font-medium" />
            <input placeholder="Speaker" value={data.speaker} onChange={(e) => updateField("speaker", e.target.value)} className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-emerald-500 font-medium" />
            <div className="grid grid-cols-2 gap-4">
                <input placeholder="Venue" value={data.venue} onChange={(e) => updateField("venue", e.target.value)} className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-emerald-500 font-medium" />
                <input placeholder="Date/Time" value={data.date} onChange={(e) => updateField("date", e.target.value)} className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-emerald-500 font-medium" />
            </div>
            <input placeholder="Organization" value={data.organization} onChange={(e) => updateField("organization", e.target.value)} className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-emerald-500 font-medium" />
          </div>

          <button
            onClick={downloadPoster}
            disabled={isDownloading}
            className="w-full bg-white text-black hover:bg-emerald-500 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex justify-center items-center gap-3 transition-all active:scale-95 disabled:opacity-50"
          >
            <Download className="w-5 h-5" />
            {isDownloading ? "Generating HD..." : "Download 4K Poster"}
          </button>
        </section>

        {/* PREVIEW AREA */}
        <section className="flex flex-col items-center">
          <div
            ref={posterRef}
            className={`w-full max-w-[400px] aspect-[4/5] rounded-[3rem] bg-gradient-to-br ${active.bg} p-12 border-[12px] ${active.border} flex flex-col justify-between shadow-2xl overflow-hidden relative`}
          >
            {/* Design Element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            
            <div className="relative z-10">
              <p className={`text-[10px] tracking-[0.6em] uppercase font-black mb-6 ${active.accent} opacity-80`}>
                Islamic Programme
              </p>
              <h2 className="text-5xl font-black leading-[1.05] text-white italic tracking-tighter drop-shadow-md">
                {data.title}
              </h2>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="rounded-[2.5rem] bg-black/30 p-8 backdrop-blur-2xl border border-white/10 shadow-xl">
                <p className={`text-[10px] uppercase font-black mb-2 tracking-[0.2em] ${active.accent}`}>Main Speaker</p>
                <p className="text-3xl font-black text-white italic tracking-tighter">
                  {data.speaker}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-5 rounded-[1.5rem] border border-white/5">
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">Venue</p>
                  <p className="text-[11px] text-white font-bold leading-tight">{data.venue}</p>
                </div>
                <div className="bg-white/5 p-5 rounded-[1.5rem] border border-white/5">
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">Date</p>
                  <p className="text-[11px] text-white font-bold leading-tight">{data.date}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-between items-center relative z-10">
              <p className={`text-xs font-black uppercase tracking-widest italic ${active.accent}`}>
                {data.organization}
              </p>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
          </div>
          <p className="mt-8 text-gray-600 text-[10px] font-bold uppercase tracking-widest">Live HD Preview</p>
        </section>
      </div>
    </main>
  );
}

export default function PosterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020405] flex items-center justify-center font-black text-emerald-500 uppercase tracking-widest">Loading Builder...</div>}>
      <PosterBuilderContent />
    </Suspense>
  );
}