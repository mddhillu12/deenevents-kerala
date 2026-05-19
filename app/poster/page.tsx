"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Edit2, Save, X, Trash2, ArrowLeft, Loader2, Image as ImageIcon, MapPin, Calendar, Clock, User } from "lucide-react";

export default function PosterManagementDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("id");
  const supabase = createClientComponentClient();

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [eventData, setEventData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  // Edit Buffer Fields
  const [editTitle, setEditTitle] = useState("");
  const [editSpeaker, setEditSpeaker] = useState("");
  const [editVenue, setEditVenue] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editImage, setEditImage] = useState("");

  useEffect(() => {
    const fetchEventContext = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);

      if (!eventId) {
        alert("No target event tracking identifier specified.");
        router.push("/");
        return;
      }

      const { data, error } = await supabase.from("events").select("*").eq("id", eventId).single();
      if (data) {
        setEventData(data);
        // Hydrate configuration buffers
        setEditTitle(data.title);
        setEditSpeaker(data.speaker);
        setEditVenue(data.venue);
        setEditDate(data.date);
        setEditTime(data.time);
        setEditImage(data.image_url || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200");
      }
      setLoading(false);
    };
    fetchEventContext();
  }, [eventId, supabase, router]);

  const handleUpdateSave = async () => {
    if (user?.id !== eventData.user_id) {
      return alert("Security Access Denied: You do not possess structural ownership permissions for this node.");
    }

    setLoading(true);
    const { error } = await supabase
      .from("events")
      .update({
        title: editTitle,
        speaker: editSpeaker,
        venue: editVenue,
        date: editDate,
        time: editTime,
        image_url: editImage
      })
      .eq("id", eventId);

    if (!error) {
      setEventData({
        ...eventData,
        title: editTitle,
        speaker: editSpeaker,
        venue: editVenue,
        date: editDate,
        time: editTime,
        image_url: editImage
      });
      setIsEditing(false);
    } else {
      alert(`Database rejected operations: ${error.message}`);
    }
    setLoading(false);
  };

  const handleDeleteNode = async () => {
    if (!window.confirm("Are you absolutely sure you want to completely drop this directory index node?")) return;
    
    const { error } = await supabase.from("events").delete().eq("id", eventId);
    if (!error) {
      router.push("/");
    } else {
      alert(`Deletion fault: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020408] flex flex-col items-center justify-center gap-2">
        <Loader2 className="text-emerald-500 animate-spin" size={20} />
        <span className="text-xs text-slate-600 font-bold tracking-widest uppercase">Syncing Live Buffers...</span>
      </div>
    );
  }

  // Fallback visual normalization to fix generic fruit issue
  const currentRenderImage = eventData?.image_url?.includes("fruit") || !eventData?.image_url
    ? "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200"
    : eventData.image_url;

  return (
    <div className="min-h-screen bg-[#020408] text-slate-100 pb-16">
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 to-teal-500" />

      <header className="border-b border-slate-900 bg-[#020408]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Leave Management Space
          </button>
          
          {user?.id === eventData?.user_id && (
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="h-8 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-white flex items-center gap-1.5 hover:border-slate-700 transition-colors">
                  <Edit2 size={13} className="text-emerald-400" /> Modify Registry
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button onClick={handleUpdateSave} className="h-8 px-3 rounded-lg bg-emerald-600 text-xs font-bold text-white flex items-center gap-1 hover:bg-emerald-500 transition-colors">
                    <Save size={13} /> Save Data
                  </button>
                  <button onClick={() => setIsEditing(false)} className="h-8 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 hover:text-white transition-colors">
                    <X size={13} /> Discard
                  </button>
                </div>
              )}
              <button onClick={handleDeleteNode} className="h-8 w-8 rounded-lg bg-rose-950/40 border border-rose-900/40 hover:border-rose-500 text-rose-400 flex items-center justify-center transition-all">
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 grid md:grid-cols-12 gap-8">
        
        {/* POSTER DISPLAY MEDIA COLUMN */}
        <div className="md:col-span-7 space-y-4">
          <div className="bg-[#040811] border border-slate-900 rounded-2xl p-4 overflow-hidden shadow-2xl relative group">
            <div className="aspect-video w-full bg-slate-950 border border-slate-900/60 rounded-xl overflow-hidden relative">
              <img src={isEditing ? editImage : currentRenderImage} alt="Event Cover Poster" className="w-full h-full object-cover opacity-80" />
            </div>
            
            {isEditing && (
              <div className="mt-4 space-y-1.5">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1"><ImageIcon size={11} /> Update Direct Banner URL Link</label>
                <input type="text" value={editImage} onChange={(e) => setEditImage(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/40" />
              </div>
            )}
          </div>
        </div>

        {/* DETAILS/EDITABLE FORM CONFIGURATION PANEL */}
        <div className="md:col-span-5 bg-[#040811] border border-slate-900 rounded-2xl p-6 space-y-5 shadow-xl">
          {!isEditing ? (
            // Pure View Metadata Output Mode
            <div className="space-y-4">
              <span className="text-[9px] font-black tracking-widest text-emerald-400 uppercase bg-emerald-950/40 border border-emerald-900/30 px-2 py-0.5 rounded inline-block">
                {eventData?.category}
              </span>
              <h2 className="text-base sm:text-lg font-black text-white leading-snug tracking-tight">{eventData?.title}</h2>
              
              <div className="space-y-2.5 pt-4 border-t border-slate-900 text-xs text-slate-400">
                <p className="flex items-center gap-2"><User size={13} className="text-slate-600" /> Speaker: <span className="text-white font-bold">{eventData?.speaker}</span></p>
                <p className="flex items-center gap-2"><MapPin size={13} className="text-slate-600" /> Center: <span className="text-slate-300">{eventData?.venue} ({eventData?.district})</span></p>
                <p className="flex items-center gap-2"><Calendar size={13} className="text-slate-600" /> Logged Date: <span className="text-slate-300 font-medium">{eventData?.date}</span></p>
                <p className="flex items-center gap-2"><Clock size={13} className="text-slate-600" /> Timeline hours: <span className="text-slate-300 font-medium">{eventData?.time}</span></p>
              </div>
            </div>
          ) : (
            // Live Inline Management Mutation Input Forms
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Modify Direct Title</label>
                <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/40" />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Modify Speaker Name</label>
                <input type="text" value={editSpeaker} onChange={(e) => setEditSpeaker(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/40" />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Modify Specific Venue Location</label>
                <input type="text" value={editVenue} onChange={(e) => setEditVenue(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/40" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Date Selection</label>
                  <input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none color-scheme-dark" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Time Window</label>
                  <input type="text" value={editTime} onChange={(e) => setEditTime(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none" />
                </div>
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}