"use client";

import { useState } from "react";
import { Sparkles, Download, Loader2, ArrowLeft, Image as ImageIcon, MapPin } from "lucide-react";
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

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulated local fallback delay matching your original setup
    await new Promise((resolve) => setTimeout(resolve, 2200));

    // Dynamic clean sample display placeholder
    setPosterUrl(`https://picsum.photos/id/${Math.floor(Math.random() * 500)}/800/1100`);
    setLoading(false);
  };

  const handleDownload = () => {
    if (posterUrl) {
      const link = document.createElement("a");
      link.href = posterUrl;
      link.download = `deen-event-poster.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white pb-24">
      {/* Premium Emerald Banner Header */}
      <div className="bg-gradient-to-b from-emerald-900/40 to-transparent pt-12 pb-16 px-6 border-b border-gray-900">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors mb-6">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="text-4xl font-bold flex items-center gap-3 tracking-tight">
            <Sparkles className="text-amber-400 animate-pulse" /> AI Poster Canvas
          </h1>
          <p className="text-gray-400 mt-2 text-base">Generate professional event flyers instantly.</p>
        </div>
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="max-w-5xl mx-auto px-4 -mt-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          
          {/* Interactive Form Panel */}
          <form onSubmit={handleGenerate} className="bg-gray-900/60 backdrop-blur-md rounded-3xl p-8 space-y-5 border border-gray-800/80 shadow-xl">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Event Title</label>
              <input
                type="text"
                placeholder="e.g., The Annual Majlis of Knowledge"
                className="w-full p-4 rounded-2xl bg-gray-950 border border-gray-800 focus:border-emerald-500 focus:outline-none transition-colors text-white"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Key Speaker</label>
              <input
                type="text"
                placeholder="e.g., Scholar Name"
                className="w-full p-4 rounded-2xl bg-gray-950 border border-gray-800 focus:border-emerald-500 focus:outline-none transition-colors text-white"
                value={form.speaker}
                onChange={(e) => setForm({ ...form, speaker: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Date</label>
                <input 
                  type="date" 
                  className="w-full p-4 rounded-2xl bg-gray-950 border border-gray-800 focus:border-emerald-500 focus:outline-none transition-colors text-white color-scheme-dark" 
                  value={form.date} 
                  onChange={(e) => setForm({ ...form, date: e.target.value })} 
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Time</label>
                <input 
                  type="text" 
                  placeholder="e.g., 4:30 PM" 
                  className="w-full p-4 rounded-2xl bg-gray-950 border border-gray-800 focus:border-emerald-500 focus:outline-none transition-colors text-white" 
                  value={form.time} 
                  onChange={(e) => setForm({ ...form, time: e.target.value })} 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Venue / Location</label>
              <input 
                type="text" 
                placeholder="e.g., Town Hall" 
                className="w-full p-4 rounded-2xl bg-gray-950 border border-gray-800 focus:border-emerald-500 focus:outline-none transition-colors text-white" 
                value={form.location} 
                onChange={(e) => setForm({ ...form, location: e.target.value })} 
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-emerald-950 transition-all cursor-pointer group disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin text-white" size={20} />
                  <span>Generating Beautiful Poster...</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} className="text-amber-300 group-hover:scale-110 transition-transform" />
                  <span className="uppercase tracking-wider text-sm">Generate AI Poster</span>
                </>
              )}
            </button>
          </form>

          {/* High-Fidelity Preview Panel */}
          <div className="bg-gray-900/40 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center justify-center min-h-[500px] border border-gray-800/60 shadow-xl relative overflow-hidden">
            {posterUrl ? (
              <div className="relative group w-full flex justify-center">
                <img 
                  src={posterUrl} 
                  alt="Generated Event Flyer" 
                  className="rounded-2xl shadow-2xl max-h-[520px] object-cover border border-gray-800/80 transition-transform duration-300 group-hover:scale-[1.01]" 
                />
                <button
                  onClick={handleDownload}
                  type="button"
                  className="absolute bottom-4 right-8 bg-emerald-600 p-4 rounded-full text-white hover:bg-emerald-500 shadow-xl transition-all hover:scale-110 active:scale-95 cursor-pointer z-10"
                  title="Download Image"
                >
                  <Download size={20} />
                </button>
              </div>
            ) : (
              <div className="text-center max-w-sm px-6">
                <div className="w-16 h-16 bg-gray-950 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-800">
                  <ImageIcon size={28} className="text-gray-600" />
                </div>
                <p className="text-gray-300 font-semibold text-lg">Your poster will appear here</p>
                <p className="text-sm text-gray-500 mt-1">Fill out the event details on the left dashboard to design your custom flyer canvas layout.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}