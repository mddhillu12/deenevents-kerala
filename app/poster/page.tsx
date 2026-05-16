"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, Share2, Calendar, MapPin, User, Moon, HelpCircle } from "lucide-react";

// Inner component that safely pulls the dynamic URL query parameters
function PosterContent() {
  const searchParams = useSearchParams();
  
  const title = searchParams.get("title") || "Islamic Event Program";
  const speaker = searchParams.get("speaker") || "Islamic Scholar";
  const venue = searchParams.get("venue") || "Venue Specified Inside Routing Context";
  const date = searchParams.get("date") || "Date Pending Scheduling Verification";
  const district = searchParams.get("district") || "Kerala";
  const organization = searchParams.get("organization") || "DeenEvents Registry";

  const handleWhatsAppShare = () => {
    const textMsg = `*📢 NEW PROGRAM ANNOUNCEMENT*\n\n🔹 *Topic:* ${title}\n🔹 *Speaker:* ${speaker}\n🔹 *Venue:* ${venue} (${district})\n🔹 *Date/Time:* ${date}\n\nOrganized by: _${organization}_\n\nCheck more details or navigate directly using maps here:\nhttps://deenevents-kerala.mddhillu12.workers.dev`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(textMsg)}`, "_blank");
  };

  return (
    <div className="w-full">
      {/* HIGH-END MINIMAL POSTER CANVAS CONTAINER */}
      <div id="poster-canvas" className="w-full aspect-square bg-gradient-to-b from-[#111827] to-[#0f1422] border-2 border-emerald-500/30 rounded-[2.5rem] p-10 flex flex-col justify-between relative shadow-2xl overflow-hidden mb-6 group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Moon size={14} className="text-white fill-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">DeenEvents Listing</span>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
              {district} Region
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-3 text-balance group-hover:text-emerald-400 transition-colors">
            {title}
          </h1>
          <p className="text-slate-400 text-sm font-semibold flex items-center gap-2">
            <User size={14} className="text-emerald-500" /> By {speaker}
          </p>
        </div>

        <div className="border-t border-slate-800/60 pt-6 space-y-3">
          <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
            <MapPin size={16} className="text-emerald-500 shrink-0" />
            <span className="line-clamp-1">{venue}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
            <Calendar size={16} className="text-emerald-500 shrink-0" />
            <span>{date}</span>
          </div>
          
          <div className="pt-4 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            <span>Host: {organization}</span>
            <span className="text-emerald-500/70">Verified Invitation</span>
          </div>
        </div>
      </div>

      {/* CONTROL ENGAGEMENT ROW */}
      <div className="space-y-3">
        <button 
          onClick={handleWhatsAppShare}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 transition-all"
        >
          <Share2 size={14} /> Broadcast to WhatsApp Status / Groups
        </button>
        
        <div className="p-3.5 bg-[#0f1422] border border-slate-800/40 rounded-xl text-[11px] text-slate-400 font-medium text-center flex items-center justify-center gap-2">
          <HelpCircle size={14} className="text-slate-500" />
          <span>To save as an image, long-press or right-click the card above.</span>
        </div>
      </div>
    </div>
  );
}

// Main page component providing the mandatory Next.js Suspense Context Boundary wrapper
export default function PosterPage() {
  return (
    <main className="min-h-screen bg-[#07090e] text-[#f1f5f9] py-12 px-6 antialiased">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-300 mb-8 transition-colors group">
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Directory
        </Link>

        <Suspense 
          fallback={
            <div className="w-full aspect-square bg-[#0f1422] border border-slate-800/40 rounded-[2.5rem] flex flex-col items-center justify-center animate-pulse">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-slate-500 text-xs font-medium">Generating visual display...</p>
            </div>
          }
        >
          <PosterContent />
        </Suspense>
      </div>
    </main>
  );
}