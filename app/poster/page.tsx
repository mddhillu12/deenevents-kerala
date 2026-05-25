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
      alert("Please fill Title and Speaker");
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1800)); // Simulate AI

    setPosterUrl("https://picsum.photos/id/1015/800/1100"); // Mock poster
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="pt-20 px-4 max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-emerald-400 mb-8">
          <ArrowLeft /> Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Sparkles className="text-yellow-400" /> AI Event Poster Generator
        </h1>
        <p className="text-gray-400 mb-10">Create beautiful posters for your Islamic events</p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Form */}
          <div className="space-y-6">
            <input 
              type="text" 
              placeholder="Event Title" 
              className="w-full p-4 rounded-2xl bg-gray-900 border border-gray-700" 
              value={form.title}
              onChange={(e) => setForm({...form, title: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Speaker Name" 
              className="w-full p-4 rounded-2xl bg-gray-900 border border-gray-700" 
              value={form.speaker}
              onChange={(e) => setForm({...form, speaker: e.target.value})}
            />
            <input 
              type="date" 
              className="w-full p-4 rounded-2xl bg-gray-900 border border-gray-700" 
              value={form.date}
              onChange={(e) => setForm({...form, date: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Time (e.g. After Asr)" 
              className="w-full p-4 rounded-2xl bg-gray-900 border border-gray-700" 
              value={form.time}
              onChange={(e) => setForm({...form, time: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Venue" 
              className="w-full p-4 rounded-2xl bg-gray-900 border border-gray-700" 
              value={form.location}
              onChange={(e) => setForm({...form, location: e.target.value})}
            />

            <button 
              onClick={generatePoster}
              disabled={loading}
              className="w-full bg-emerald-600 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
              {loading ? "Generating..." : "Generate AI Poster"}
            </button>
          </div>

          {/* Preview Area */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 flex items-center justify-center min-h-[500px]">
            {posterUrl ? (
              <div className="relative">
                <img src={posterUrl} alt="Poster" className="rounded-2xl shadow-2xl" />
                <button onClick={() => window.open(posterUrl, '_blank')} className="absolute bottom-4 right-4 bg-emerald-600 p-3 rounded-full">
                  <Download />
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <Sparkles size={70} className="mx-auto mb-4 opacity-30" />
                <p>Your AI poster will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}