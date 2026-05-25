// app/poster/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Download, Loader2, ArrowLeft } from "lucide-react";

export default function PosterPage() {
  const [form, setForm] = useState({
    title: "",
    speaker: "",
    date: "",
    time: "",
    location: "",
  });

  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generatePoster = async () => {
    if (!form.title || !form.speaker) {
      alert("Please fill at least Title and Speaker");
      return;
    }

    setLoading(true);

    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Better mock poster URLs (more Islamic/event friendly)
    const mockPosters = [
      "https://picsum.photos/id/1015/800/1100",
      "https://picsum.photos/id/133/800/1100",
      "https://picsum.photos/id/201/800/1100",
      "https://picsum.photos/id/237/800/1100",
    ];

    const randomPoster = mockPosters[Math.floor(Math.random() * mockPosters.length)];
    setPosterUrl(randomPoster);
    setLoading(false);
  };

  const handleDownload = () => {
    if (!posterUrl) return;

    const link = document.createElement("a");
    link.href = posterUrl;
    link.download = `${form.title.replace(/\s+/g, '-')}-poster.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white pb-24">
      <div className="pt-20 px-4 max-w-5xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-emerald-400 mb-8 hover:text-emerald-300">
          <ArrowLeft /> Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Sparkles className="text-yellow-400" /> AI Event Poster Generator
        </h1>
        <p className="text-gray-400 mb-10">Create stunning posters for your Islamic events</p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Form Side */}
          <div className="space-y-6 bg-gray-900 p-8 rounded-3xl border border-gray-800">
            <input
              type="text"
              placeholder="Event Title *"
              className="w-full p-4 rounded-2xl bg-gray-800 border border-gray-700 focus:border-emerald-500 outline-none"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Speaker / Scholar Name *"
              className="w-full p-4 rounded-2xl bg-gray-800 border border-gray-700 focus:border-emerald-500 outline-none"
              value={form.speaker}
              onChange={(e) => setForm({ ...form, speaker: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                className="p-4 rounded-2xl bg-gray-800 border border-gray-700"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
              <input
                type="text"
                placeholder="Time (e.g. After Asr)"
                className="p-4 rounded-2xl bg-gray-800 border border-gray-700"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
            </div>
            <input
              type="text"
              placeholder="Venue / Location"
              className="w-full p-4 rounded-2xl bg-gray-800 border border-gray-700"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />

            <button
              onClick={generatePoster}
              disabled={loading || !form.title || !form.speaker}
              className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-70 transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
              {loading ? "Generating Poster..." : "Generate AI Poster"}
            </button>
          </div>

          {/* Preview Side */}
          <div className="bg-gray-900 rounded-3xl border border-gray-800 p-8 flex flex-col items-center justify-center min-h-[520px] relative">
            {posterUrl ? (
              <div className="relative group">
                <img 
                  src={posterUrl} 
                  alt="Generated Poster" 
                  className="rounded-2xl shadow-2xl max-h-[520px] object-contain" 
                />
                <button
                  onClick={handleDownload}
                  className="absolute bottom-6 right-6 bg-emerald-600 hover:bg-emerald-500 p-4 rounded-full shadow-lg transition-all"
                >
                  <Download size={24} />
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <Sparkles size={80} className="mx-auto mb-6 opacity-30" />
                <p className="text-xl">Your poster preview will appear here</p>
                <p className="text-sm mt-2">Fill the form and click Generate</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}