"use client";

import React, { useMemo, useState } from "react";

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
    bg: "from-emerald-900 via-emerald-700 to-emerald-950",
    accent: "text-emerald-200",
  },
  gold: {
    name: "Gold Arabic",
    bg: "from-amber-900 via-yellow-700 to-amber-950",
    accent: "text-yellow-100",
  },
  night: {
    name: "Ramadan Night",
    bg: "from-slate-950 via-indigo-900 to-slate-950",
    accent: "text-indigo-100",
  },
} as const;

export default function PosterBuilder() {
  const [template, setTemplate] = useState<keyof typeof templates>("emerald");
  const [data, setData] = useState<PosterData>({
    title: "Friday Islamic Lecture",
    speaker: "Usthad Abdul Rahman",
    venue: "Central Masjid, Malappuram",
    date: "Friday • After Maghrib",
    organization: "DeenEvents Kerala",
  });

  const active = useMemo(() => templates[template], [template]);

  function updateField(key: keyof PosterData, value: string) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Controls */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-5">
          <h1 className="text-3xl font-bold">AI Poster Builder</h1>
          <p className="text-gray-300">
            Auto-create beautiful Islamic event posters using smart templates.
          </p>

          <div>
            <label className="block mb-2 font-medium">Template Style</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Object.entries(templates).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setTemplate(key as keyof typeof templates)}
                  className={`rounded-2xl border px-4 py-3 text-left transition ${
                    template === key
                      ? "border-emerald-400 bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  {value.name}
                </button>
              ))}
            </div>
          </div>

          <input
            value={data.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Programme title"
            className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3"
          />

          <input
            value={data.speaker}
            onChange={(e) => updateField("speaker", e.target.value)}
            placeholder="Speaker"
            className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3"
          />

          <input
            value={data.venue}
            onChange={(e) => updateField("venue", e.target.value)}
            placeholder="Venue"
            className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3"
          />

          <input
            value={data.date}
            onChange={(e) => updateField("date", e.target.value)}
            placeholder="Date"
            className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3"
          />

          <input
            value={data.organization}
            onChange={(e) => updateField("organization", e.target.value)}
            placeholder="Organization"
            className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3"
          />
        </section>

        {/* Live Preview */}
        <section className="flex items-center justify-center">
          <div
            id="poster-preview"
            className={`w-full max-w-xl aspect-[4/5] rounded-[2rem] bg-gradient-to-br ${active.bg} p-8 shadow-2xl border border-white/10 flex flex-col justify-between`}
          >
            <div>
              <p className={`text-sm tracking-[0.3em] uppercase ${active.accent}`}>
                Islamic Programme
              </p>
              <h2 className="text-4xl font-bold leading-tight mt-4">
                {data.title}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md">
                <p className="text-sm text-gray-200">Speaker</p>
                <p className="text-2xl font-semibold">{data.speaker}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-gray-200">Venue</p>
                  <p>{data.venue}</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-gray-200">Date</p>
                  <p>{data.date}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className={`font-semibold ${active.accent}`}>
                {data.organization}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
