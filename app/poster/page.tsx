// app/poster/page.tsx
"use client";

import { useState } from "react";
import { Sparkles, Download, Loader2 } from "lucide-react";

export default function PosterGenerator() {
  const [form, setForm] = useState({
    title: "",
    speaker: "",
    date: "",
    time: "",
    location: "",
  });
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    // TODO: Later integrate real AI (Grok Image or DALL-E)
    await new Promise(r => setTimeout(r, 1800));

    // Mock poster
    setPosterUrl("https://picsum.photos/id/1015/800/1000");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 flex items-center justify-center gap-3">
          <Sparkles className="text-emerald-400" /> AI Poster Generator
        </h1>
        <p className="text-center text-gray-400 mb-10">Create beautiful event posters in seconds</p>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-gray-900 rounded-3xl p-8 space-y-6">
            <input type="text" placeholder="Event Title" className="w-full bg-gray-800 rounded-2xl px-5 py-4" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
            <input type="text" placeholder="Speaker Name" className="w-full bg-gray-800 rounded-2xl px-5 py-4" value={form.speaker} onChange={(e) => setForm({...form, speaker: e.target.value})} />
            <input type="date" className="w-full bg-gray-800 rounded-2xl px-5 py-4" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} />
            <input type="text" placeholder="Time (e.g. After Asr)" className="w-full bg-gray-800 rounded-2xl px-5 py-4" value={form.time} onChange={(e) => setForm({...form, time: e.target.value})} />
            <input type="text" placeholder="Venue" className="w-full bg-gray-800 rounded-2xl px-5 py-4" value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} />

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Generate Poster"}
            </button>
          </div>

          <div className="bg-gray-900 rounded-3xl p-6 flex items-center justify-center min-h-[500px] relative border border-gray-800">
            {posterUrl ? (
              <div className="relative">
                <img src={posterUrl} alt="Poster" className="rounded-2xl shadow-2xl" />
                <button className="absolute bottom-4 right-4 bg-emerald-600 p-4 rounded-full">
                  <Download />
                </button>
              </div>
            ) : (
              <p className="text-gray-500 text-center">Your poster will appear here</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}