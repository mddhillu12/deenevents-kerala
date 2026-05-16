"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, Calendar, MapPin, User, Building2, Send, 
  Bookmark, CheckCircle2, Share2, Users, Bell, ArrowUpRight, 
  Map, Clock
} from "lucide-react";

interface EventDetail {
  id: string;
  title: string;
  speaker: string;
  venue: string;
  district: string;
  event_date: string;
  organization: string;
  description: string;
  is_verified: boolean;
  attendance_count: number;
}

const EXTENDED_MOCK_STORE: Record<string, EventDetail> = {
  "deen-alpha": {
    id: "deen-alpha",
    title: "Statewide Spiritual Awakening Summit & Quranic Tafseer Exegesis",
    speaker: "Sheikh M.M. Akbar",
    venue: "Jalliyath Ground, Manjeri",
    district: "Malappuram",
    event_date: "2026-05-28",
    organization: "Niche of Truth",
    description: "Join the largest spiritual assembly in Malappuram. This conference focuses on deep linguistic contextualization of ancient Quranic text modules, addressing contemporary real-world ethics, professional morality, and family community structures in the modern era. Full logistics, parking charts, and separated family facilities are fully arrayed on the grounds.",
    is_verified: true,
    attendance_count: 1420
  },
  "deen-beta": {
    id: "deen-beta",
    title: "Prophetic Ethics for Modern Professionals & Interactive Q&A",
    speaker: "Dr. Alfurqan Al-Qasimi",
    venue: "Calicut Trade Centre, Swapnagari",
    district: "Kozhikode",
    event_date: "2026-06-02",
    organization: "ISM Kerala",
    description: "An intensive interactive evening workshop addressing deep behavioral frameworks for software engineers, state administrators, and medical practitioners navigating secular spaces under high moral parameters.",
    is_verified: true,
    attendance_count: 840
  }
};

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params?.id as string;

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdownText, setCountdownText] = useState("");
  const [saved, setSaved] = useState(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const targetNode = EXTENDED_MOCK_STORE[eventId] || {
      id: eventId || "generated-node",
      title: "Community Islamic Lecture Matrix Series",
      speaker: "Verified Regional Scholar",
      venue: "Central Masjid Assembly Hall",
      district: "Kozhikode",
      event_date: "2026-06-15",
      organization: "Local Islamic Committee",
      description: "Detailed spiritual lecture session established to cultivate local community engagement, historical understanding of classical frameworks, and active question-and-answer tracking panels for all families.",
      is_verified: true,
      attendance_count: 310
    };

    setEvent(targetNode);
    setLoading(false);

    const targetTime = new Date(`${targetNode.event_date}T00:00:00`).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference < 0) {
        setCountdownText("Event Started / Active");
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setCountdownText(`${days}d ${hours}h Remaining`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [eventId]);

  const triggerWhatsAppShare = () => {
    if (!event) return;
    const shareMessage = `🎙 *ISLAMIC EVENT OUTLINE AVAILABLE:* \n\n📖 *Title:* ${event.title}\n👤 *Speaker:* ${event.speaker}\n🕌 *Venue:* ${event.venue}\n🗓 *Date:* ${event.event_date}\n\n🔗 View full directions and maps layout profile instantly here:\n${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`, "_blank");
  };

  const openGoogleMapsDirections = () => {
    if (!event) return;
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${event.venue}, ${event.district}, Kerala`)}`, "_blank");
  };

  const generateGoogleCalendarLink = () => {
    if (!event) return;
    const formatStr = event.event_date.replace(/-/g, "");
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatStr}/${formatStr}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.venue)}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030509] flex items-center justify-center text-slate-400 text-xs font-bold">
        Synchronizing Event Parameters...
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="min-h-screen bg-[#030509] text-slate-100 antialiased pb-12">
      <div className="relative h-64 md:h-80 w-full overflow-hidden bg-gradient-to-b from-emerald-950/40 via-slate-900 to-[#030509] border-b border-slate-900">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="absolute bottom-6 max-w-5xl mx-auto w-full px-4 md:px-6 flex items-center justify-between">
          <button onClick={() => router.back()} className="h-9 px-3 bg-black/40 backdrop-blur-md border border-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 text-slate-300 hover:text-white">
            <ArrowLeft size={14} /> Back to Directory
          </button>
          
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-black tracking-wider px-3 py-1 rounded-lg uppercase flex items-center gap-1.5">
            <Clock size={12} /> {countdownText}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 grid lg:grid-cols-3 gap-8 -mt-10 relative z-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#080d16] border border-slate-900 rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 px-2.5 py-1 rounded-md">
                {event.district} Region Flag
              </span>
              {event.is_verified && (
                <span className="text-[10px] font-bold bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-md flex items-center gap-1">
                  ✓ Verified Assembly
                </span>
              )}
            </div>

            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight leading-snug mb-6">
              {event.title}
            </h1>

            <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-900">
              <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-900">
                <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500 shrink-0">
                  <User size={15} />
                </div>
                <div className="truncate">
                  <span className="text-[9px] uppercase font-bold text-slate-500 block">Main Speaker</span>
                  <span className="text-xs font-bold text-slate-200 truncate block">{event.speaker}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-900">
                <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500 shrink-0">
                  <Building2 size={15} />
                </div>
                <div className="truncate">
                  <span className="text-[9px] uppercase font-bold text-slate-500 block">Convener</span>
                  <span className="text-xs font-bold text-slate-200 truncate block">{event.organization}</span>
                </div>
              </div>
            </div>

            <h4 className="text-xs font-black tracking-wider uppercase text-slate-400 mb-2">Conference Summary & Provisions</h4>
            <p className="text-xs text-slate-300 font-medium leading-relaxed mb-6 whitespace-pre-wrap">
              {event.description}
            </p>

            <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-900">
              <div className="flex items-start gap-2.5 text-xs font-medium">
                <MapPin size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block font-bold">Physical Address Location</span>
                  <span className="text-slate-200">{event.venue}, {event.district}, Kerala</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-xs font-medium border-t border-slate-900/60 pt-2.5">
                <Calendar size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block font-bold">Event Scheduled Window</span>
                  <span className="text-slate-200">{event.event_date} (Physical Entry Valid)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[#080d16] border border-slate-900 rounded-2xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1">
              <span className="flex items-center gap-1"><Users size={14} className="text-slate-500" /> {event.attendance_count} Attending</span>
              <span className="text-emerald-500">Verified Node</span>
            </div>

            <button onClick={() => setJoined(!joined)} className={`w-full h-11 rounded-xl text-xs font-black tracking-wide flex items-center justify-center gap-1.5 transition-all ${
              joined ? "bg-emerald-600 text-white" : "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:shadow-lg shadow-emerald-500/10 active:scale-98"
            }`}>
              {joined ? "✓ Verified Attending Registry" : "Register Attendance State"}
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button onClick={triggerWhatsAppShare} className="h-10 bg-slate-950 hover:bg-slate-900 border border-slate-900 rounded-xl text-xs font-bold text-slate-200 flex items-center justify-center gap-1">
                <Send size={13} className="text-emerald-500" /> WhatsApp
              </button>
              <button onClick={() => setSaved(!saved)} className="h-10 bg-slate-950 hover:bg-slate-900 border border-slate-900 rounded-xl text-xs font-bold text-slate-200 flex items-center justify-center gap-1">
                <Bookmark size={13} className={saved ? "fill-amber-400 text-amber-400" : "text-slate-500"} /> Save Bookmark
              </button>
            </div>
          </div>

          <div className="bg-[#080d16] border border-slate-900 rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center gap-1.5 text-xs font-black tracking-wider text-slate-400 uppercase mb-2">
              <Map size={13} className="text-emerald-500" /> Navigation Vector
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
              Click the anchor below to open exact spatial routing vectors directly inside your phone's native Google Maps configuration.
            </p>
            <button onClick={openGoogleMapsDirections} className="w-full h-10 bg-slate-950 hover:bg-slate-900 border border-slate-900 text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5">
              Launch Google Maps Router <ArrowUpRight size={13} />
            </button>
          </div>

          <div className="bg-[#080d16] border border-slate-900 rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center gap-1.5 text-xs font-black tracking-wider text-slate-400 uppercase mb-2">
              <Bell size={13} className="text-amber-500" /> Device Calendar Alarms
            </div>
            <button onClick={generateGoogleCalendarLink} className="w-full h-10 bg-slate-950 hover:bg-slate-900 border border-slate-900 text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5">
              Export to Google Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}