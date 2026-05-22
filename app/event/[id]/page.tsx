"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client"; 
import Link from "next/link";
import { 
  Edit2, Save, X, Trash2, ArrowLeft, Loader2, 
  MapPin, Calendar, Clock, User, Users, Share2, 
  Map as MapIcon, Link as LinkIcon, Building, CalendarPlus
} from "lucide-react";

export default function EventIdDashboard() {
  const router = useRouter();
  const params = useParams();
  const eventId = params?.id as string;
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [eventData, setEventData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  // Edit Buffer Fields
  const [editTitle, setEditTitle] = useState("");
  const [editVenue, setEditVenue] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    const fetchEventContext = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);

      if (!eventId) {
        router.push("/");
        return;
      }

      const { data, error } = await supabase.from("events").select("*").eq("id", eventId).single();
      if (data) {
        setEventData(data);
        setEditTitle(data.title || "");
        setEditVenue(data.venue || "");
        setEditDate(data.date || "");
        setEditTime(data.time || "");
        setEditImage(data.image_url || "");
        setEditDescription(data.description || "");
      }
      setLoading(false);
    };
    fetchEventContext();
  }, [eventId, supabase, router]);

  const handleUpdateSave = async () => {
    if (user?.id !== eventData.user_id) {
      return alert("Security Access Denied: You do not own this event.");
    }

    setLoading(true);
    const { error } = await supabase
      .from("events")
      .update({
        title: editTitle,
        venue: editVenue,
        date: editDate,
        time: editTime,
        image_url: editImage,
        description: editDescription
      })
      .eq("id", eventId);

    if (!error) {
      setEventData({
        ...eventData,
        title: editTitle,
        venue: editVenue,
        date: editDate,
        time: editTime,
        image_url: editImage,
        description: editDescription
      });
      setIsEditing(false);
    } else {
      alert(`Update failed: ${error.message}`);
    }
    setLoading(false);
  };

  const handleDeleteNode = async () => {
    if (!window.confirm("Are you absolutely sure you want to permanently delete this event?")) return;
    
    const { error } = await supabase.from("events").delete().eq("id", eventId);
    if (!error) {
      router.push("/");
    } else {
      alert(`Deletion fault: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020408] flex flex-col items-center justify-center gap-3">
        <Loader2 className="text-emerald-500 animate-spin" size={24} />
        <span className="text-xs font-bold tracking-widest uppercase text-slate-500">Loading Event Data...</span>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="min-h-screen bg-[#020408] flex flex-col items-center justify-center gap-3">
        <span className="text-sm font-bold tracking-widest uppercase text-slate-500">Event Not Found</span>
        <Link href="/" className="text-emerald-400 text-xs hover:underline">Return Home</Link>
      </div>
    );
  }

  // Handle old string vs new array formats seamlessly
  const displaySpeakers = Array.isArray(eventData.speakers) && eventData.speakers.length > 0 
    ? eventData.speakers 
    : [eventData.speaker].filter(Boolean);

  const displayOrgs = Array.isArray(eventData.organizations) && eventData.organizations.length > 0 
    ? eventData.organizations 
    : [];

  const currentRenderImage = eventData.image_url?.includes("fruit") || !eventData.image_url
    ? "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200"
    : eventData.image_url;

  // External Links Generation
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(`${eventData.venue}, ${eventData.district}, Kerala`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const shareText = encodeURIComponent(`Don't miss "${eventData.title}" on ${eventData.date} at ${eventData.venue}!\n\nDetails here: `);
  const whatsappUrl = typeof window !== "undefined" ? `https://wa.me/?text=${shareText}${window.location.href}` : "#";
  const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&location=${encodeURIComponent(`${eventData.venue}, ${eventData.district}, Kerala`)}&details=${encodeURIComponent(eventData.description || "Islamic Event in Kerala")}`;

  return (
    <div className="min-h-screen bg-[#020408] text-slate-100 pb-20">
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 to-teal-500" />

      {/* STICKY HEADER */}
      <header className="border-b border-slate-900 bg-[#020408]/80 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Back
          </button>
          
          {user?.id === eventData.user_id && (
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="h-8 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-white flex items-center gap-1.5 hover:border-slate-700 transition-colors">
                  <Edit2 size={13} className="text-emerald-400" /> Manage Event
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button onClick={handleUpdateSave} className="h-8 px-3 rounded-lg bg-emerald-600 text-xs font-bold text-white flex items-center gap-1 hover:bg-emerald-500 transition-colors">
                    <Save size={13} /> Save
                  </button>
                  <button onClick={() => setIsEditing(false)} className="h-8 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 hover:text-white transition-colors">
                    <X size={13} /> Cancel
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

      {/* EDIT MODE VIEW */}
      {isEditing ? (
        <main className="max-w-3xl mx-auto px-4 mt-8 space-y-6">
          <div className="bg-[#040811] border border-slate-900 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-black text-white uppercase tracking-tight border-b border-slate-900 pb-4">Edit Event Details</h2>
            
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Event Title</label>
              <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/40" />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Venue Location</label>
              <input type="text" value={editVenue} onChange={(e) => setEditVenue(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/40" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Date</label>
                <input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none [color-scheme:dark]" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Time Window</label>
                <input type="text" value={editTime} onChange={(e) => setEditTime(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Banner Image URL</label>
              <input type="text" value={editImage} onChange={(e) => setEditImage(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/40" />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Description</label>
              <textarea rows={5} value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/40 resize-none" />
            </div>
          </div>
        </main>
      ) : (

      /* PUBLIC EVENT VIEW */
      <main className="max-w-6xl mx-auto px-4 mt-8">
        {/* BIG HERO BANNER */}
        <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden relative shadow-2xl border border-slate-900 mb-8 group">
          <img src={currentRenderImage} alt={eventData.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-[#020408]/60 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 z-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-900/50 px-3 py-1 rounded-full backdrop-blur-md">
                {eventData.category}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 bg-slate-900/80 border border-slate-800 px-3 py-1 rounded-full backdrop-blur-md">
                {eventData.district}
              </span>
              {!eventData.approved && (
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 bg-rose-950/60 border border-rose-900/50 px-3 py-1 rounded-full backdrop-blur-md animate-pulse">
                  Pending Approval
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tighter max-w-4xl drop-shadow-lg">
              {eventData.title}
            </h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: INFO & MAP */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Speakers & Organizations Box */}
            <div className="grid sm:grid-cols-2 gap-4">
              {displaySpeakers.length > 0 && (
                <div className="bg-[#040811] border border-slate-900 p-5 rounded-2xl shadow-lg">
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                    <User size={12} /> Featured Speakers
                  </h3>
                  <div className="space-y-2">
                    {displaySpeakers.map((spk: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-bold text-white bg-slate-950 p-2.5 rounded-xl border border-slate-800/50">
                        <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-900 flex items-center justify-center text-[10px]">🎙</div>
                        {spk}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {displayOrgs.length > 0 && (
                <div className="bg-[#040811] border border-slate-900 p-5 rounded-2xl shadow-lg">
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                    <Building size={12} /> Organized By
                  </h3>
                  <div className="space-y-2">
                    {displayOrgs.map((org: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-bold text-white bg-slate-950 p-2.5 rounded-xl border border-slate-800/50">
                        <div className="w-8 h-8 rounded-full bg-teal-950 border border-teal-900 flex items-center justify-center text-[10px]">🏢</div>
                        {org}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description Details */}
            <div className="bg-[#040811] border border-slate-900 p-6 rounded-2xl shadow-lg space-y-4">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <MapIcon size={14} className="text-emerald-400" /> About The Gathering
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {eventData.description || "No specific details provided by the organizer. Please verify the timeline and location."}
              </p>
              
              {/* Event Attributes Row */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-900/60">
                {eventData.sisters_only && <span className="text-[10px] font-bold bg-rose-950/30 text-rose-400 border border-rose-900 px-3 py-1 rounded-lg">Sisters Only Entry</span>}
                {eventData.family_friendly && <span className="text-[10px] font-bold bg-teal-950/30 text-teal-400 border border-teal-900 px-3 py-1 rounded-lg">Family Friendly</span>}
              </div>
            </div>

            {/* Live Map Embed */}
            <div className="bg-[#040811] border border-slate-900 p-4 rounded-2xl shadow-lg overflow-hidden h-72 relative">
              <h3 className="absolute top-4 left-4 z-10 text-[10px] font-black text-slate-900 bg-white/90 px-3 py-1 rounded shadow-md uppercase tracking-wider flex items-center gap-1">
                <MapPin size={12} /> Venue Radar
              </h3>
              <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '0.75rem' }} 
                loading="lazy" 
                allowFullScreen 
                referrerPolicy="no-referrer-when-downgrade" 
                src={mapEmbedUrl}
              ></iframe>
            </div>

          </div>

          {/* RIGHT COLUMN: STICKY ACTION CARD */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
            
            {/* Primary Action Card */}
            <div className="bg-gradient-to-b from-[#060c18] to-[#040811] border border-slate-800 p-6 rounded-3xl shadow-2xl space-y-6">
              
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    <Calendar size={16} className="text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5 tracking-widest">Date</span>
                    <span className="text-sm font-black text-white">{eventData.date}</span>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5 tracking-widest">Time</span>
                    <span className="text-sm font-black text-white">{eventData.time}</span>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5 tracking-widest">Location</span>
                    <span className="text-sm font-black text-white block">{eventData.venue}</span>
                    <span className="text-xs text-slate-400">{eventData.district}, Kerala</span>
                  </div>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                {eventData.requires_registration && eventData.registration_link && (
                  <a href={eventData.registration_link} target="_blank" rel="noreferrer" className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 transition-colors text-white font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/50">
                    <LinkIcon size={14} /> Register / RSVP
                  </a>
                )}
                
                <div className="grid grid-cols-2 gap-3">
                  <a href={gCalUrl} target="_blank" rel="noreferrer" className="h-11 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors text-white font-bold text-[10px] uppercase tracking-wider rounded-xl flex items-center justify-center gap-2">
                    <CalendarPlus size={14} className="text-slate-400" /> Calendar
                  </a>
                  
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="h-11 bg-[#128C7E]/10 hover:bg-[#128C7E]/20 border border-[#128C7E]/30 transition-colors text-[#25D366] font-bold text-[10px] uppercase tracking-wider rounded-xl flex items-center justify-center gap-2">
                    <Share2 size={14} /> WhatsApp
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
      )}
    </div>
  );
}