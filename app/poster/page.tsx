// app/poster/page.tsx
"use client";

import { useState } from "react";
import { Sparkles, Download, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PosterGenerator() {
  const [form, setForm] = useState({
    title: "",
    speaker: "",
    date: "",
    time: "",
    location: "",
    district: "Malappuram",
  });

  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    // Simulate AI generation (Later you can connect real AI like Grok Imagine)
    await new Promise(resolve => setTimeout(resolve, 2200));

    // Mock beautiful poster (you can replace with real AI later)
    setPosterUrl(`https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800/1100`);
    setLoading(false);
  };

  const handleDownload = () => {
    if (posterUrl) {
      const link = document.createElement("a");
      link.href = posterUrl;
      link.download = `deen-event-poster.jpg`;
      link.click();
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white pb-24">
      <div className="bg-emerald-900 pt-12 pb-16 px-6">
        <Link href="/" className="flex items-center gap-2 text-emerald-300 mb-6">
          <ArrowLeft /> Back to Home
        </Link>
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <Sparkles className="text-yellow-400" /> AI Poster Generator
        </h1>
        <p className="text-emerald-200 mt-2">Create professional Islamic event posters instantly</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-gray-900 rounded-3xl p-8 space-y-6">
            <input
              type="text"
              placeholder="Event Title"
              className="w-full p-4 rounded-2xl bg-gray-800 border border-gray-700"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Speaker Name"
              className="w-full p-4 rounded-2xl bg-gray-800 border border-gray-700"
              value={form.speaker}
              onChange={(e) => setForm({ ...form, speaker: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <input type="date" className="p-4 rounded-2xl bg-gray-800 border border-gray-700" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              <input type="text" placeholder="Time" className="p-4 rounded-2xl bg-gray-800 border border-gray-700" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            </div>
            <input type="text" placeholder="Venue / Location" className="w-full p-4 rounded-2xl bg-gray-800 border border-gray-700" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />

            <button
              onClick={handleGenerate}
              disabled={loading || !form.title || !form.speaker}
              className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
              {loading ? "Generating Beautiful Poster..." : "Generate AI Poster"}
            </button>
          </div>

          {/* Preview */}
          <div className="bg-gray-900 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[500px] border border-gray-800">
            {posterUrl ? (
              <div className="relative group">
                <img src={posterUrl} alt="Generated Poster" className="rounded-2xl shadow-2xl max-h-[520px]" />
                <button
                  onClick={handleDownload}
                  className="absolute bottom-4 right-4 bg-emerald-600 p-4 rounded-full hover:bg-emerald-500 transition-all"
                >
                  <Download size={24} />
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <Sparkles size={60} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg">Your poster will appear here</p>
                <p className="text-sm mt-2">Fill the form and click Generate</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}