"use client";

import { useState } from "react";
import { Sparkles, Download } from "lucide-react";

export default function PosterGenerator() {
  const [form, setForm] = useState({
    title: "Grand Islamic Lecture",
    speaker: "Shaykh Dr. Abdullah Al-Mubarak",
    date: "2026-06-15",
    time: "After Asr Prayer",
    location: "Masjidul Falah, Malappuram",
  });

  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  const generatePoster = () => {
    // In future: Call Grok Image API or Stable Diffusion
    setGeneratedUrl("https://picsum.photos/id/1015/800/1100"); // Placeholder
  };

  return (
    <div className="min-h-screen bg-emerald-950 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-2">Islamic Poster Studio</h1>
        <p className="text-center text-emerald-300">Create elegant event posters with Islamic aesthetics</p>

        <div className="grid md:grid-cols-2 gap-10 mt-12">
          {/* Form */}
          <div className="space-y-6">
            <input type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full bg-emerald-900 border border-emerald-700 rounded-2xl px-5 py-4" placeholder="Event Title" />
            <input type="text" value={form.speaker} onChange={(e) => setForm({...form, speaker: e.target.value})} className="w-full bg-emerald-900 border border-emerald-700 rounded-2xl px-5 py-4" placeholder="Speaker" />
            <input type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} className="w-full bg-emerald-900 border border-emerald-700 rounded-2xl px-5 py-4" />
            <input type="text" value={form.time} onChange={(e) => setForm({...form, time: e.target.value})} className="w-full bg-emerald-900 border border-emerald-700 rounded-2xl px-5 py-4" placeholder="Time" />
            <input type="text" value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} className="w-full bg-emerald-900 border border-emerald-700 rounded-2xl px-5 py-4" placeholder="Venue" />

            <button onClick={generatePoster} className="w-full bg-gradient-to-r from-emerald-600 to-amber-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-3">
              <Sparkles /> Generate Elegant Poster
            </button>
          </div>

          {/* Preview */}
          <div className="bg-emerald-900/50 border-2 border-dashed border-emerald-700 rounded-3xl flex items-center justify-center min-h-[500px]">
            {generatedUrl ? (
              <div className="relative">
                <img src={generatedUrl} alt="Poster" className="rounded-2xl shadow-2xl" />
                <button className="absolute -bottom-4 right-4 bg-emerald-600 hover:bg-emerald-500 px-6 py-3 rounded-2xl font-medium flex items-center gap-2">
                  <Download /> Download
                </button>
              </div>
            ) : (
              <p className="text-emerald-400 text-center">Your beautiful Islamic poster will appear here</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}