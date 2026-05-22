"use client";

import { useState } from "react";
import { Sparkles, Download, Wand2, Loader2, Palette } from "lucide-react";

export default function PosterCanvas() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [posterUrl, setPosterUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Here you would eventually call your OpenAI/DALL-E or API endpoint
    setPosterUrl("https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020408] text-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Sparkles className="text-emerald-500" /> AI Poster Canvas
          </h1>
          <p className="text-slate-500 text-xs">Generate professional event flyers instantly.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Side */}
          <div className="bg-[#040811] border border-slate-900 p-6 rounded-2xl space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Event Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Key Speaker</label>
              <input 
                type="text" 
                value={speaker} 
                onChange={(e) => setSpeaker(e.target.value)}
                className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs" 
              />
            </div>
            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="w-full h-11 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-black uppercase flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <Wand2 size={16} />}
              {loading ? "Generating..." : "Generate AI Poster"}
            </button>
          </div>

          {/* Preview Side */}
          <div className="bg-[#040811] border border-slate-900 p-2 rounded-2xl flex items-center justify-center min-h-[300px]">
            {posterUrl ? (
              <div className="relative group">
                <img src={posterUrl} alt="Generated Poster" className="rounded-xl" />
                <button className="absolute bottom-4 right-4 bg-emerald-600 p-3 rounded-full shadow-lg">
                  <Download size={18} />
                </button>
              </div>
            ) : (
              <div className="text-center text-slate-600">
                <Palette size={48} className="mx-auto mb-2 opacity-20" />
                <p className="text-xs">Poster Preview Will Appear Here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}