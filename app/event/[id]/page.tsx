"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Share2, 
  Bookmark, 
  Send, 
  FileText, 
  User,
  ExternalLink,
  ShieldAlert,
  Home as HomeIcon,
  Sparkles,
  PlusCircle
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EventDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // Dynamic Content Mock Repository Lookup Engine match
  const staticDatabase: Record<string, any> = {
    "legacy-shafii": {
      title: "The Legacy of Imam Shafi'i: Jurisprudence & Historical Impact across Malabar",
      speaker: "Dr. Anas Al-Yousufi",
      speakerBio: "Graduate of Islamic University of Madinah, specialized in classical comparative Fiqh frameworks and traditional text preservation methodologies.",
      venue: "Grand Masjid Auditorium, Calicut",
      district: "Kozhikode",
      date: "May 22, 2026",
      time: "4:30 PM - 8:30 PM",
      organization: "Calicut Islamic Research Foundation",
      contact: "+91 9845 000 123",
      category: "Academic Lectures",
      longDescription: "This comprehensive symposium deep dives into the analytical frameworks formulated by Imam Shafi'i. The event is tailored for students of knowledge, professionals, and community leaders aiming to comprehend classical legal theories within a modern contextual society landscape.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"
    },
    "youth-revival": {
      title: "Youth Spiritual Revival & Character Development Intensive BootCamp",
      speaker: "Ustadh Faisal Muhammad",
      speakerBio: "Renowned mentor, activist, and counselor hosting critical character mapping lectures across major educational universities.",
      venue: "Town Masjid Conference Hall",
      district: "Ernakulam",
      date: "May 24, 2026",
      time: "9:00 AM - 1:00 PM",
      organization: "Ernakulam Muslim Youth Assembly",
      contact: "+91 9845 111 222",
      category: "Youth Programs",
      longDescription: "A fully guided intensive interactive seminar dealing explicitly with character layout systems, social media challenges, and keeping an unyielding spiritual attachment within modern consumer culture.",
      image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800"
    }
  };

  const currentEvent = staticDatabase[resolvedParams.id] || staticDatabase["legacy-shafii"];

  const handleShareCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020408] bg-grid-pattern text-slate-100 pb-24 md:pb-0 font-sans antialiased">
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-amber-500 to-teal-600" />

      {/* CORE HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#020408]/80 border-b border-slate-900/80 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Back to Directory Feed
          </Link>
          <span className="text-[9px] font-black px-2.5 py-0.5 rounded border bg-slate-950 border-slate-900 text-slate-500 uppercase tracking-widest">
            Gathering Index Node: {resolvedParams.id}
          </span>
        </div>
      </header>

      {/* DETAILED LAYOUT CONTAINER PLATFORM */}
      <main className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: PRIMARY CONTEXT DATA BLOCK (7 COLS) */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Main Content Media Image Bracket */}
          <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-slate-900 bg-slate-950 shadow-2xl relative">
            <img src={currentEvent.image} alt={currentEvent.title} className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 text-[9px] font-black bg-emerald-600 text-white px-2.5 py-1 rounded-md uppercase tracking-wider">
              {currentEvent.category}
            </span>
          </div>

          {/* Title block presentation typography */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              {currentEvent.title}
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Organized by <span className="text-slate-300 font-bold">{currentEvent.organization}</span>
            </p>
          </div>

          {/* Event description documentation */}
          <div className="border-t border-slate-900 pt-6 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <FileText size={13} className="text-emerald-500" /> Session Abstract & Target Outline
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              {currentEvent.longDescription}
            </p>
          </div>

          {/* Speaker focus metadata card profile block layout */}
          <div className="bg-[#040811] border border-slate-900 rounded-2xl p-4 space-y-3 shadow-xl">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
              <User size={13} className="text-emerald-500" /> Appointed Keynote Profile
            </h4>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="w-12 h-12 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-lg text-slate-600 shrink-0">🎙</div>
              <div>
                <span className="text-sm font-black text-white block">{currentEvent.speaker}</span>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{currentEvent.speakerBio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTION MECHANICS PANEL METADATA CARD CONTAINER (4 COLS) */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-[#050a13] border-2 border-slate-900 p-5 rounded-2xl space-y-4 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-xl rounded-full pointer-events-none" />

            {/* Action Bar Rows */}
            <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
              <button 
                onClick={handleShareCopy}
                className="w-full h-9 bg-slate-950 hover:bg-slate-900 border border-slate-900 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 text-slate-300 active:scale-95 transition-all"
              >
                <Share2 size={13} className="text-emerald-500" />
                <span>{copied ? "Link Copied!" : "Copy URL"}</span>
              </button>
              <button 
                onClick={() => setSaved(!saved)}
                className={`w-12 h-9 rounded-xl bg-slate-950 border flex items-center justify-center active:scale-95 transition-all ${
                  saved ? "text-emerald-400 border-emerald-500/30" : "text-slate-500 border-slate-900"
                }`}
              >
                <Bookmark size={13} className={saved ? "fill-emerald-500/10" : ""} />
              </button>
            </div>

            {/* Practical Metadata points rows */}
            <div className="space-y-3.5">
              <div className="flex gap-3">
                <Calendar size={14} className="text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">Timeline Calendar</span>
                  <span className="text-xs font-bold text-slate-200">{currentEvent.date}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock size={14} className="text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">Assigned Hours</span>
                  <span className="text-xs font-bold text-slate-200">{currentEvent.time}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">Geographic Center</span>
                  <span className="text-xs font-bold text-slate-200 block">{currentEvent.venue}</span>
                  <span className="text-[9px] font-bold text-emerald-400 uppercase mt-0.5 block">{currentEvent.district} State Node</span>
                </div>
              </div>
            </div>

            {/* MOCK MAP CONTAINER COMPONENT BLOCK */}
            <div className="h-28 w-full bg-slate-950 rounded-xl border border-slate-900 relative overflow-hidden flex flex-col items-center justify-center text-center p-4">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:10px_10px]" />
              <MapPin size={16} className="text-emerald-500 mb-1 relative z-10 animate-bounce" />
              <span className="text-[9px] font-black uppercase text-slate-400 relative z-10">Map Navigation Frame</span>
              <p className="text-[7px] font-bold text-slate-600 uppercase tracking-widest mt-0.5 relative z-10">Lat/Long Routing Enabled</p>
            </div>

            {/* Direct Coordinator Call Trigger */}
            <a 
              href={`tel:${currentEvent.contact}`}
              className="w-full h-11 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white text-xs font-black rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-inner"
            >
              Contact Organizing Desk
            </a>
          </div>

          <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl flex items-start gap-2 text-[9px] font-bold text-slate-500 uppercase tracking-normal leading-relaxed">
            <ShieldAlert size={14} className="text-amber-500 shrink-0 mt-0.5" />
            <span>Verify local adjustments via internal channels before scheduling distant transit routes across regional sectors.</span>
          </div>
        </div>
      </main>

      {/* MOBILE BOTTOM NAV COMPONENT DOCK FOR EVENT INDICES */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-[#020408]/90 backdrop-blur-lg border-t border-slate-900 md:hidden p-2 px-6 flex items-center justify-between shadow-2xl">
        <Link href="/" className="flex flex-col items-center gap-0.5 text-slate-500">
          <HomeIcon size={16} />
          <span className="text-[8px] font-black uppercase tracking-wider">Home</span>
        </Link>
        <Link href="/poster" className="flex flex-col items-center gap-0.5 text-slate-500">
          <Sparkles size={16} />
          <span className="text-[8px] font-black uppercase tracking-wider">AI Canvas</span>
        </Link>
        <Link href="/submit" className="flex flex-col items-center justify-center w-10 h-10 rounded-full bg-emerald-600 text-white shadow-lg relative -top-3 border-4 border-[#020408]">
          <PlusCircle size={18} />
        </Link>
        <button onClick={() => alert("Share engine triggered via mobile")} className="flex flex-col items-center gap-0.5 text-slate-500">
          <Share2 size={16} />
          <span className="text-[8px] font-black uppercase tracking-wider">Share</span>
        </button>
        <button onClick={() => setSaved(!saved)} className={`flex flex-col items-center gap-0.5 ${saved ? "text-emerald-400" : "text-slate-500"}`}>
          <Bookmark size={16} />
          <span className="text-[8px] font-black uppercase tracking-wider">Save</span>
        </button>
      </div>
    </div>
  );
}