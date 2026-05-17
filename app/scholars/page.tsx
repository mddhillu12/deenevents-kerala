"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Search, CheckCircle2, ArrowLeft, Radio, PlayCircle, Star, BookOpen } from "lucide-react";

export default function ScholarsDirectory() {
  const [search, setSearch] = useState("");
  const [following, setFollowing] = useState<string[]>([]);
  const [selectedScholar, setSelectedScholar] = useState<string | null>("mm-akbar");

  const scholars = [
    {
      id: "mm-akbar",
      name: "Ustadh M.M. Akbar",
      title: "Director, Niche of Truth",
      specialty: "Comparative Religion & Islamic Apologetics",
      bio: "Prominent orator and researcher specialized explicitly in comparative theology, logic engines, and structural textual critique frameworks across Kerala.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
      topics: ["Aqeedah", "Logic", "Apologetics"],
      youtubeVideoId: "dQw4w9WgXcQ" // Replace with real YouTube stream IDs
    },
    {
      id: "anas-yousufi",
      name: "Dr. Anas Al-Yousufi",
      title: "Dean of Islamic Jurisprudence Faculty",
      specialty: "Hadith Textual Science Criticism",
      bio: "Classical graduate specializing in secondary transmitter evaluation rules and traditional manuscript analysis across regional institutions.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
      topics: ["Hadith", "Fiqh Foundations", "History"],
      youtubeVideoId: "dQw4w9WgXcQ"
    }
  ];

  const filteredScholars = scholars.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const activeScholarData = scholars.find(s => s.id === selectedScholar) || scholars[0];

  return (
    <div className="min-h-screen bg-[#020408] text-slate-100 pb-12">
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600" />

      <header className="border-b border-slate-900/60 bg-[#020408]/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Back to Discover Feed
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8 grid lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: LIST DIRECTORY CONTROL SECTION */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-1">
            <h1 className="text-xl font-black text-white uppercase tracking-tight">Regional Scholars Directory</h1>
            <p className="text-xs text-slate-500">Select an orator profile to track lecture archives and YouTube transmissions.</p>
          </div>

          <div className="bg-slate-950 border border-slate-900 px-3 py-1.5 rounded-xl flex items-center gap-2">
            <Search size={14} className="text-slate-600" />
            <input 
              type="text" placeholder="Filter instructors..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none placeholder:text-slate-700 w-full"
            />
          </div>

          <div className="space-y-2">
            {filteredScholars.map(s => (
              <div 
                key={s.id} onClick={() => setSelectedScholar(s.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${selectedScholar === s.id ? "bg-[#040811] border-emerald-500/20" : "bg-transparent border-slate-900/50 hover:border-slate-800"}`}
              >
                <div className="flex items-center gap-3 truncate">
                  <img src={s.image} alt={s.name} className="w-9 h-9 rounded-full object-cover grayscale border border-slate-800" />
                  <div className="truncate">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1">{s.name} <CheckCircle2 size={11} className="text-emerald-400" /></h4>
                    <span className="text-[10px] text-slate-500 block truncate">{s.title}</span>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setFollowing(prev => prev.includes(s.id) ? prev.filter(x => x !== s.id) : [...prev, s.id]);
                  }}
                  className={`h-6 px-2.5 text-[9px] font-bold uppercase tracking-wider rounded-md border ${following.includes(s.id) ? "bg-emerald-950 text-emerald-400 border-emerald-900/40" : "bg-slate-950 text-slate-400 border-slate-900"}`}
                >
                  {following.includes(s.id) ? "Saved" : "+ Keep Feed"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: RICH EXTENDED DATA MEDIA VIEW */}
        <div className="lg:col-span-7 bg-[#040811] border border-slate-900 rounded-2xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-start justify-between gap-4 border-b border-slate-900 pb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-white">{activeScholarData.name}</h2>
              <p className="text-xs text-emerald-400 font-medium">{activeScholarData.specialty}</p>
            </div>
            <img src={activeScholarData.image} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-800" />
          </div>

          <div className="space-y-2">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Biography Context</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">{activeScholarData.bio}</p>
          </div>

          {/* Point 17: Embedded Media Layout Configuration */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
              <PlayCircle size={12} className="text-rose-500" /> Featured Lecture Broadcast
            </h4>
            <div className="aspect-video w-full rounded-xl bg-slate-950 border border-slate-900 overflow-hidden relative shadow-inner">
              <iframe 
                src={`https://www.youtube.com/embed/${activeScholarData.youtubeVideoId}`}
                title="Lecture Stream" className="w-full h-full border-0 opacity-80"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><BookOpen size={11}/> Core Modules:</span>
            {activeScholarData.topics.map(topic => (
              <span key={topic} className="text-[10px] font-semibold bg-slate-950 text-slate-300 border border-slate-900 px-2.5 py-0.5 rounded-md">
                {topic}
              </span>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}