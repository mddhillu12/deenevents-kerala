"use client";

import { Suspense, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Image as ImageIcon, Sparkles, ShieldCheck } from "lucide-react";

// 1. Move your primary layout into an inner content rendering engine
function PosterContent() {
  const searchParams = useSearchParams();
  const posterRef = useRef<HTMLDivElement>(null);

  // Read URL parameters safely
  const title = searchParams?.get("title") || "Grand Islamic Knowledge Session";
  const speaker = searchParams?.get("speaker") || "Honorable Scholar Node";
  const venue = searchParams?.get("venue") || "Central Town Hall Complex";
  const date = searchParams?.get("date") || "June 24, 2026";
  const district = searchParams?.get("district") || "Kozhikode";
  const organization = searchParams?.get("organization") || "Central Deen Committee";

  const [uploadedSpeakerImg, setUploadedSpeakerImg] = useState<string | null>(null);
  const [accentTheme, setAccentTheme] = useState<"emerald" | "amber">("emerald");

  const handleLocalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedSpeakerImg(imageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-[#030509] text-slate-100 py-8 px-4 font-sans antialiased">
      <div className="max-w-4xl mx-auto">
        
        {/* TOP CONFIGURATION CONTROL STRIP */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-[#080d16] border border-slate-900 p-4 rounded-xl shadow-xl">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Back to Directory Feed
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-900">
              <button onClick={() => setAccentTheme("emerald")} className={`text-[10px] font-bold px-2.5 py-1 rounded-md transition-all ${accentTheme === "emerald" ? "bg-emerald-600 text-white" : "text-slate-500"}`}>Emerald</button>
              <button onClick={() => setAccentTheme("amber")} className={`text-[10px] font-bold px-2.5 py-1 rounded-md transition-all ${accentTheme === "amber" ? "bg-amber-600 text-white" : "text-slate-500"}`}>Gold</button>
            </div>

            <label className="h-8 px-3 bg-slate-950 hover:bg-slate-900 border border-slate-900 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer text-slate-300">
              <ImageIcon size={13} className="text-emerald-500" />
              <span>Upload Scholar Pic</span>
              <input type="file" accept="image/*" onChange={handleLocalImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* CENTRAL PREVIEW DISPLAY PLATFORM LAYOUT WORKSPACE */}
        <div className="grid md:grid-cols-5 gap-8 items-start">
          
          {/* THE MASTER EDITABLE HIGH-FIDELITY ISLAMIC DESIGN CANVAS (3 COLS WIDE) */}
          <div className="md:col-span-3 flex justify-center">
            <div 
              ref={posterRef}
              className="w-full max-w-[380px] aspect-[1/1.5] bg-[#040912] border-4 rounded-[2.5rem] p-6 relative overflow-hidden flex flex-col justify-between shadow-2xl transition-all"
              style={{ borderColor: accentTheme === "emerald" ? "#065f46" : "#b45309" }}
            >
              
              {/* ISLAMIC PATTERN GEOMETRIC VECTOR DESIGN OVERLAY CHIPS */}
              <div className="absolute top-0 inset-x-0 h-32 opacity-10 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:12px_12px]" />
              <div className={`absolute top-[-40px] right-[-40px] w-32 h-32 rounded-full blur-2xl opacity-10 ${accentTheme === "emerald" ? "bg-emerald-500" : "bg-amber-500"}`} />

              {/* POSTER HEADER BRANDING TAG ROW */}
              <div className="relative z-10 text-center space-y-1 mt-2">
                <span className={`text-[9px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded border ${
                  accentTheme === "emerald" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                }`}>
                  {organization} Presents
                </span>
                <div className="w-2 h-2 rounded-full mx-auto my-1 bg-amber-500" />
              </div>

              {/* CENTRAL BLOCK CONTEXT AREA */}
              <div className="relative z-10 text-center space-y-4 my-auto">
                <h2 className="text-lg font-black tracking-tight text-white leading-snug px-2 drop-shadow-md">
                  {title}
                </h2> 

                {/* SCHOLAR PRESENTATION IMAGE EMBED MOCK INSIDE COMPONENT CANVAS */}
                <div className="w-24 h-24 mx-auto rounded-full border-2 overflow-hidden bg-slate-950 flex items-center justify-center relative shadow-xl" style={{ borderColor: accentTheme === "emerald" ? "#10b981" : "#f59e0b" }}>
                  {uploadedSpeakerImg ? (
                    <img src={uploadedSpeakerImg} alt="Scholar frame" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-2 text-slate-600">
                      <ImageIcon size={20} className="mx-auto mb-0.5" />
                      <span className="text-[8px] font-bold block leading-none">Drop Photo</span>
                    </div>
                  )}
                </div>

                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider block ${accentTheme === "emerald" ? "text-emerald-400" : "text-amber-400"}`}>Keynote Speaker</span>
                  <p className="text-sm font-black text-white">{speaker}</p>
                </div>
              </div>

              {/* FOOTER METADATA CARD (GLASSMORPHISM EMBED PANEL ARCHITECTURE) */}
              <div className="relative z-10 bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-2xl p-3.5 space-y-2 text-center shadow-lg">
                <div className="grid grid-cols-2 gap-2 text-left border-b border-white/5 pb-2">
                  <div>
                    <span className="text-[8px] font-bold uppercase text-slate-500 block">District Node</span>
                    <span className="text-[10px] font-extrabold text-slate-300 block truncate">{district}</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-bold uppercase text-slate-500 block">Calendar Timeline</span>
                    <span className="text-[10px] font-extrabold text-slate-300 block truncate">{date}</span>
                  </div>
                </div>

                <div className="text-left flex items-center justify-between gap-2">
                  <div className="truncate">
                    <span className="text-[8px] font-bold uppercase text-slate-500 block">Conference Venue</span>
                    <span className="text-[10px] font-black text-slate-200 truncate block">{venue}</span>
                  </div>
                  
                  {/* GENERATED SYSTEM VECTOR QR CODE PLACEHOLDER */}
                  <div className="w-7 h-7 bg-white p-0.5 rounded shrink-0 flex flex-col justify-between items-center opacity-80 shadow">
                    <div className="grid grid-cols-3 gap-0.5 w-full h-full">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => <div key={i} className={`rounded-sm ${i % 3 === 0 ? "bg-black" : "bg-slate-300"}`} />)}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDEBAR PANEL: CONTEXT MANUAL DOCUMENTATION */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-[#080d16] border border-slate-900 rounded-xl p-5 shadow-xl">
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 uppercase mb-2">
                <Sparkles size={13} /> Asset Engine Controls
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                This utility renders high-fidelity vector canvases on the fly. Organizers can choose between deep emerald or classic gold configuration options, attach custom local speaker portrait fragments, and view integrated location metadata maps automatically.
              </p>

              <button 
                onClick={() => alert("✨ Canvas export ready! Screen capture the card framework or press long-hold image on mobile to distribute directly to WhatsApp statuses!")}
                className="w-full h-11 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-md"
              >
                <Download size={14} /> Export Active Canvas Asset
              </button>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>DeenEvents Verified Asset Grid</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// 2. Main default export safely managing Next.js Client Side Bailouts via Suspense
export default function PosterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#030509] flex flex-col items-center justify-center text-xs font-bold text-slate-500 uppercase tracking-widest gap-2">
        <div className="w-5 h-5 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        <span>Generating Poster Canvas...</span>
      </div>
    }>
      <PosterContent />
    </Suspense>
  );
}