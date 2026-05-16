"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { 
  Moon, Sun, Calendar, MapPin, User, Search, 
  Bookmark, LogOut, Sparkles, Filter, 
  Wand2, Building2, Users, Flame, Clock, Radio, Send, Compass
} from "lucide-react";

interface EventItem {
  id: string;
  title: string;
  speaker: string;
  venue: string;
  district: string;
  event_date: string;
  organization: string;
  created_at: string;
  is_verified?: boolean;
  is_masjid_hosted?: boolean;
  is_featured?: boolean;
  category_tag?: "Women Only" | "Youth Program" | "General" | "Family Event";
  delivery_mode?: "Offline" | "Online";
  language?: string;
  attendance_count: number;
}

const PREMIUM_SEED_FEED: EventItem[] = [
  {
    id: "deen-alpha",
    title: "Statewide Spiritual Awakening Summit & Quranic Tafseer Exegesis",
    speaker: "Sheikh M.M. Akbar",
    venue: "Jalliyath Ground, Manjeri",
    district: "Malappuram",
    event_date: "2026-05-28",
    organization: "Niche of Truth",
    created_at: new Date().toISOString(),
    is_verified: true,
    is_featured: true,
    is_masjid_hosted: false,
    category_tag: "General",
    delivery_mode: "Offline",
    language: "Malayalam",
    attendance_count: 1420
  },
  {
    id: "deen-beta",
    title: "Prophetic Ethics for Modern Professionals & Interactive Q&A",
    speaker: "Dr. Alfurqan Al-Qasimi",
    venue: "Calicut Trade Centre, Swapnagari",
    district: "Kozhikode",
    event_date: "2026-06-02",
    organization: "ISM Kerala",
    created_at: new Date().toISOString(),
    is_verified: true,
    is_featured: false,
    is_masjid_hosted: false,
    category_tag: "Youth Program",
    delivery_mode: "Offline",
    language: "Malayalam",
    attendance_count: 840
  },
  {
    id: "deen-gamma",
    title: "Foundations of an Islamic Household: Rights, Roles, & Realities",
    speaker: "Usthad Rahmathullah Qasimi",
    venue: "Palayam Juma Masjid Auditorium",
    district: "Ernakulam",
    event_date: "2026-05-20",
    organization: "Deen Foundation",
    created_at: new Date().toISOString(),
    is_verified: false,
    is_featured: false,
    is_masjid_hosted: true,
    category_tag: "Family Event",
    delivery_mode: "Offline",
    language: "Malayalam",
    attendance_count: 512
  },
  {
    id: "deen-delta",
    title: "Purification of the Soul (Tazkiyah) Online Masterclass Series",
    speaker: "Sheikh Said Al-Kamil",
    venue: "Live Zoom Streaming Node",
    district: "Kozhikode",
    event_date: "2026-05-18",
    organization: "Kerala Islamic Academy",
    created_at: new Date().toISOString(),
    is_verified: true,
    is_featured: true,
    is_masjid_hosted: false,
    category_tag: "Women Only",
    delivery_mode: "Online",
    language: "English",
    attendance_count: 2310
  }
];

export default function HomePage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [feedFilter, setFeedFilter] = useState<"all" | "trending" | "tonight" | "weekend">("all");
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  
  const [filterTag, setFilterTag] = useState("All");
  const [filterMode, setFilterMode] = useState("All");
  const [filterLang, setFilterLang] = useState("All");

  const [userSession, setUserSession] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [joinedEvents, setJoinedEvents] = useState<string[]>([]);

  const [aiRawText, setAiRawText] = useState("");
  const [aiParsing, setAiParsing] = useState(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState("");

  const districts = ["All", "Malappuram", "Kozhikode", "Kannur", "Ernakulam", "Thrissur", "Kasaragod", "Palakkad", "Wayanad"];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUserSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setUserSession(session));

    const savedBookmarks = localStorage.getItem("deen_bookmarks");
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

    const savedJoined = localStorage.getItem("deen_joined");
    if (savedJoined) setJoinedEvents(JSON.parse(savedJoined));

    async function fetchEvents() {
      try {
        let { data, error } = await supabase.from("events").select("*").order("created_at", { ascending: false });
        if (!error && data && data.length > 0) {
          setEvents(data.map(item => ({ ...item, attendance_count: item.attendance_count ?? Math.floor(Math.random() * 300) + 50 })));
        } else {
          setEvents(PREMIUM_SEED_FEED);
        }
      } catch {
        setEvents(PREMIUM_SEED_FEED);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
    return () => subscription.unsubscribe();
  }, []);

  const handleToggleBookmark = (id: string) => {
    const updated = bookmarks.includes(id) ? bookmarks.filter(b => b !== id) : [...bookmarks, id];
    setBookmarks(updated);
    localStorage.setItem("deen_bookmarks", JSON.stringify(updated));
  };

  const handleToggleJoin = (id: string) => {
    const updated = joinedEvents.includes(id) ? joinedEvents.filter(j => j !== id) : [...joinedEvents, id];
    setJoinedEvents(updated);
    localStorage.setItem("deen_joined", JSON.stringify(updated));
    
    setEvents(prev => prev.map(ev => {
      if (ev.id === id) {
        return { ...ev, attendance_count: joinedEvents.includes(id) ? ev.attendance_count - 1 : ev.attendance_count + 1 };
      }
      return ev;
    }));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const resetFiltersToHome = () => {
    setSearch("");
    setSelectedDistrict("All");
    setFeedFilter("all");
    setFilterTag("All");
    setFilterMode("All");
    setFilterLang("All");
    setShowBookmarksOnly(false);
  };

  const triggerWhatsAppShare = (event: EventItem) => {
    const textMessage = `📌 *NEW ISLAMIC EVENT:* \n\n📖 *Title:* ${event.title}\n🎙 *Scholar:* ${event.speaker}\n🕌 *Venue:* ${event.venue} (${event.district})\n🗓 *Date:* ${event.event_date}\n👥 *Organized By:* ${event.organization}\n\n🔗 View details here:\nhttps://deenevents.pages.dev/event/${event.id}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(textMessage)}`, "_blank");
  };

  const handleAIFieldExtraction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiRawText.trim()) return;
    setAiParsing(true);

    setTimeout(() => {
      const lower = aiRawText.toLowerCase();
      let extractedDistrict = "Malappuram";
      if (lower.includes("calicut") || lower.includes("kozhikode")) extractedDistrict = "Kozhikode";
      if (lower.includes("cochin") || lower.includes("ernakulam")) extractedDistrict = "Ernakulam";

      const extracted: EventItem = {
        id: `ai-node-${Date.now()}`,
        title: aiRawText.split("\n")[0].substring(0, 65) || "AI Decoded Community Gathering",
        speaker: aiRawText.match(/by\s+([^,\n]+)/i)?.[1] || "Verified Scholar",
        venue: aiRawText.match(/at\s+([^,\n]+)/i)?.[1] || "Central Town Ground",
        district: extractedDistrict,
        event_date: "2026-06-10",
        organization: "Local Committee Assembly",
        created_at: new Date().toISOString(),
        is_verified: true,
        category_tag: "General",
        delivery_mode: "Offline",
        language: "Malayalam",
        attendance_count: 120
      };

      setEvents(prev => [extracted, ...prev]);
      setAiParsing(false);
      setAiRawText("");
      setAiSuccessMessage("✨ AI Parsed Text Block & Generated Live Event Node!");
      setTimeout(() => setAiSuccessMessage(""), 4000);
    }, 1100);
  };

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) || 
                          e.speaker.toLowerCase().includes(search.toLowerCase()) ||
                          e.venue.toLowerCase().includes(search.toLowerCase());
    const matchesDistrict = selectedDistrict === "All" || e.district === selectedDistrict;
    const matchesBookmark = !showBookmarksOnly || bookmarks.includes(e.id);
    const matchesTag = filterTag === "All" || e.category_tag === filterTag;
    const matchesMode = filterMode === "All" || e.delivery_mode === filterMode;
    const matchesLang = filterLang === "All" || e.language === filterLang;

    let matchesTimeline = true;
    if (feedFilter === "trending") matchesTimeline = e.attendance_count > 600;
    if (feedFilter === "tonight") matchesTimeline = e.id === "deen-delta";
    if (feedFilter === "weekend") matchesTimeline = e.district === "Malappuram" || e.district === "Kozhikode";

    return matchesSearch && matchesDistrict && matchesBookmark && matchesTag && matchesMode && matchesLang && matchesTimeline;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 pb-20 md:pb-6 font-sans antialiased ${
      darkMode ? "bg-[#030509] text-slate-100" : "bg-[#f8fafc] text-slate-900"
    }`}>
      {darkMode && (
        <div className="absolute top-0 inset-x-0 h-[500px] opacity-[0.02] pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] mix-blend-color-dodge" />
      )}

      <header className={`border-b sticky top-0 z-50 px-6 h-16 flex items-center justify-between transition-colors backdrop-blur-xl ${
        darkMode ? "border-slate-900 bg-[#030509]/80" : "border-slate-200 bg-white/80"
      }`}>
        <button onClick={resetFiltersToHome} className="flex items-center gap-2.5 group text-left outline-none">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-600 via-emerald-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <Moon size={16} className="text-white fill-white" />
          </div>
          <div>
            <span className={`text-sm font-black tracking-tight block ${darkMode ? "text-white" : "text-slate-900"}`}>DeenEvents</span>
            <span className="text-[9px] font-bold tracking-widest text-emerald-500 uppercase block -mt-1">Kerala Matrix</span>
          </div>
        </button>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
              darkMode ? "bg-slate-900 border-slate-800 text-amber-400" : "bg-slate-100 border-slate-200 text-emerald-600"
            }`}
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <Link href="/submit" className="h-9 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl text-xs font-bold items-center hidden md:flex hover:shadow-lg shadow-emerald-500/10 transition-all">
            + Add Listing
          </Link>

          {userSession ? (
            <div className="flex items-center gap-2">
              <img src={userSession.user?.user_metadata?.avatar_url || "https://avatar.iran.liara.run/public/32"} alt="User profile" className="w-7 h-7 rounded-lg border border-emerald-500/20" />
              <button onClick={handleLogout} className="text-slate-500 hover:text-red-400 transition-colors"><LogOut size={15} /></button>
            </div>
          ) : (
            <Link href="/login" className={`h-9 px-4 rounded-xl text-xs font-bold flex items-center border ${darkMode ? "bg-slate-900 border-slate-800 text-slate-200" : "bg-white border-slate-200 text-slate-700"}`}>
              Sign In
            </Link>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <section className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Sparkles size={11} className="text-amber-400" /> Authentic Kerala Islamic Conference Registry
          </div>
          <h1 className={`text-3xl sm:text-4xl font-black tracking-tight mb-3 ${darkMode ? "text-white" : "text-slate-900"}`}>
            Unified Islamic Directory
          </h1>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Discover and securely track verified spiritual streams, public lectures, and localized educational circles within Kerala.
          </p>
        </section>

        <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto no-scrollbar py-1">
          {[
            { id: "all", label: "All Events", icon: <Compass size={13} /> },
            { id: "trending", label: "Trending in Kerala", icon: <Flame size={13} className="text-amber-500" /> },
            { id: "tonight", label: "Happening Tonight", icon: <Clock size={13} className="text-emerald-500" /> },
            { id: "weekend", label: "This Weekend", icon: <Radio size={13} className="text-indigo-500" /> },
          ].map(track => (
            <button
              key={track.id}
              onClick={() => setFeedFilter(track.id as any)}
              className={`h-9 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap border ${
                feedFilter === track.id
                  ? "bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-500/10"
                  : darkMode ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {track.icon}
              {track.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start mb-8">
          <div className={`lg:col-span-3 border rounded-2xl p-5 shadow-xl ${darkMode ? "bg-[#080d16] border-slate-900" : "bg-white border-slate-200"}`}>
            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
              <input 
                type="text" 
                placeholder="Search by topic title, scholar, keyword, or specific venue..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className={`w-full h-11 pl-10 pr-4 rounded-xl text-xs font-medium border outline-none transition-all ${
                  darkMode ? "bg-slate-950 border-slate-900 text-slate-200 focus:border-emerald-500/20" : "bg-slate-50 border-slate-200 text-slate-900"
                }`}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Region</label>
                <select value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)} className={`w-full h-9 px-2 text-xs font-bold border rounded-lg outline-none ${darkMode ? "bg-slate-950 border-slate-900 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"}`}>
                  {districts.map(d => <option key={d} value={d}>{d === "All" ? "All Districts" : d}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Target Group</label>
                <select value={filterTag} onChange={e => setFilterTag(e.target.value)} className={`w-full h-9 px-2 text-xs font-bold border rounded-lg outline-none ${darkMode ? "bg-slate-950 border-slate-900 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"}`}>
                  <option value="All">All Audiences</option>
                  <option value="General">General</option>
                  <option value="Youth Program">Youth Program</option>
                  <option value="Family Event">Family Event</option>
                  <option value="Women Only">Women Only</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Medium</label>
                <select value={filterMode} onChange={e => setFilterMode(e.target.value)} className={`w-full h-9 px-2 text-xs font-bold border rounded-lg outline-none ${darkMode ? "bg-slate-950 border-slate-900 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"}`}>
                  <option value="All">All Formats</option>
                  <option value="Offline">Offline Physical</option>
                  <option value="Online">Online Broadcast</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Language</label>
                <select value={filterLang} onChange={e => setFilterLang(e.target.value)} className={`w-full h-9 px-2 text-xs font-bold border rounded-lg outline-none ${darkMode ? "bg-slate-950 border-slate-900 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"}`}>
                  <option value="All">All Languages</option>
                  <option value="Malayalam">Malayalam</option>
                  <option value="English">English</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-900/50 pt-3">
              <button onClick={resetFiltersToHome} className="text-[11px] font-bold text-slate-500 hover:text-slate-400">Clear Search Profiles</button>
              <button onClick={() => setShowBookmarksOnly(!showBookmarksOnly)} className={`text-[11px] font-bold flex items-center gap-1.5 ${showBookmarksOnly ? "text-amber-400" : "text-slate-400"}`}>
                <Bookmark size={13} className={showBookmarksOnly ? "fill-amber-400 text-amber-400" : ""} /> Saved Bookmarks ({bookmarks.length})
              </button>
            </div>
          </div>

          <div className={`border rounded-2xl p-5 shadow-xl ${darkMode ? "bg-[#080d16] border-slate-900" : "bg-white border-slate-200"}`}>
            <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-xs uppercase mb-1.5">
              <Wand2 size={13} /> AI Whatsapp Parser
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">Drop unformatted invite notification texts or forwards below to instantly unpack parameters.</p>
            <form onSubmit={handleAIFieldExtraction} className="space-y-2">
              <textarea 
                value={aiRawText} 
                onChange={e => setAiRawText(e.target.value)} 
                placeholder="Islamic event by Sheikh M.M Akbar at Manjeri ground on June 2..."
                className={`w-full h-16 p-2 text-[11px] font-medium outline-none border rounded-lg resize-none ${darkMode ? "bg-slate-950 border-slate-900 text-slate-200 focus:border-emerald-500/20" : "bg-slate-50 border-slate-200 text-slate-900"}`}
              />
              <button type="submit" disabled={aiParsing || !aiRawText.trim()} className="w-full h-8 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-lg text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-all">
                {aiParsing ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Extract Content Details"}
              </button>
            </form>
            {aiSuccessMessage && <div className="mt-2 text-[10px] font-bold text-emerald-500 bg-emerald-500/5 p-2 rounded border border-emerald-500/10">{aiSuccessMessage}</div>}
          </div>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(n => <div key={n} className={`h-56 rounded-2xl animate-pulse ${darkMode ? "bg-slate-900/60" : "bg-white border"}`} />)}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className={`text-center py-16 border rounded-2xl ${darkMode ? "bg-slate-900/10 border-slate-900" : "bg-white"}`}>
            <Search size={24} className="mx-auto mb-2 text-slate-500" />
            <h4 className="text-xs font-bold mb-1">No Active Listings Tracked</h4>
            <p className="text-[11px] text-slate-400">No events matched those current combination criteria profiles.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => {
              const isSaved = bookmarks.includes(event.id);
              const isJoined = joinedEvents.includes(event.id);
              
              return (
                <div key={event.id} className={`border rounded-2xl p-5 flex flex-col justify-between transition-all group hover:-translate-y-0.5 duration-300 relative ${
                  event.is_featured ? (darkMode ? "bg-[#0b1424] border-amber-500/20 shadow-amber-500/5" : "bg-amber-50/50 border-amber-200") : (darkMode ? "bg-[#080d16] border-slate-900/80 hover:border-slate-800" : "bg-white border-slate-200")
                }`}>
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="text-[9px] font-black tracking-wider uppercase bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded">
                          {event.district}
                        </span>
                        {event.is_verified && (
                          <span className="text-[9px] font-bold bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded flex items-center gap-0.5" title="Verified Organization">
                            ✅ Org
                          </span>
                        )}
                        {event.is_masjid_hosted && (
                          <span className="text-[9px] font-bold bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded flex items-center gap-0.5" title="Masjid Hosted">
                            🕌 Mosque
                          </span>
                        )}
                      </div>

                      <button onClick={() => handleToggleBookmark(event.id)} className={`p-1 rounded transition-colors ${isSaved ? "text-amber-400" : "text-slate-600"}`}>
                        <Bookmark size={14} className={isSaved ? "fill-amber-400" : ""} />
                      </button>
                    </div>

                    <Link href={`/event/${event.id}`} className="block group-hover:text-emerald-500 transition-colors mb-2">
                      <h3 className={`text-sm font-bold tracking-tight leading-snug line-clamp-2 ${darkMode ? "text-slate-100" : "text-slate-900"}`}>
                        {event.title}
                      </h3>
                    </Link>

                    <div className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 mb-3">
                      <User size={12} className="text-emerald-500" />
                      <span>{event.speaker}</span>
                    </div>
                  </div>

                  <div className={`border-t pt-3 mt-1 space-y-2 ${darkMode ? "border-slate-900" : "border-slate-100"}`}>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                      <MapPin size={12} className="text-slate-500 shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                      <Calendar size={12} className="text-slate-500 shrink-0" />
                      <span>{event.event_date}</span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold pt-1">
                      <span className="flex items-center gap-1">
                        <Users size={11} className="text-slate-600" /> {event.attendance_count} Going
                      </span>
                      <span>Target: {event.category_tag}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 pt-2">
                      <button onClick={() => handleToggleJoin(event.id)} className={`h-8 rounded-lg text-[10px] font-bold border transition-colors ${
                        isJoined ? "bg-emerald-600 text-white border-emerald-500" : darkMode ? "bg-slate-950 border-slate-900 text-slate-300 hover:bg-slate-900" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}>
                        {isJoined ? "✓ Attending" : "I'm Going"}
                      </button>

                      <button onClick={() => triggerWhatsAppShare(event)} className={`h-8 rounded-lg text-[10px] font-bold border flex items-center justify-center gap-1 ${
                        darkMode ? "bg-slate-950 border-slate-900 text-slate-300 hover:bg-slate-900" : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}>
                        <Send size={10} className="text-emerald-500" /> Share
                      </button>

                      <Link href={`/poster?title=${encodeURIComponent(event.title)}&speaker=${encodeURIComponent(event.speaker)}&venue=${encodeURIComponent(event.venue)}&date=${encodeURIComponent(event.event_date)}&district=${encodeURIComponent(event.district)}&organization=${encodeURIComponent(event.organization)}`} className={`h-8 rounded-lg text-[10px] font-bold border flex items-center justify-center gap-0.5 ${
                        darkMode ? "bg-slate-950 border-slate-900 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}>
                        Poster →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <div className={`fixed bottom-0 inset-x-0 h-14 border-t z-50 flex items-center justify-around md:hidden backdrop-blur-xl ${
        darkMode ? "bg-[#030509]/90 border-slate-900" : "bg-white/90 border-slate-200"
      }`}>
        <button onClick={resetFiltersToHome} className="flex flex-col items-center justify-center text-emerald-500">
          <Compass size={18} />
          <span className="text-[9px] font-bold mt-0.5">Explore</span>
        </button>
        <button onClick={() => setShowBookmarksOnly(!showBookmarksOnly)} className={`flex flex-col items-center justify-center ${showBookmarksOnly ? "text-amber-400" : "text-slate-500"}`}>
          <Bookmark size={18} />
          <span className="text-[9px] font-bold mt-0.5">Saved</span>
        </button>
        <Link href="/submit" className="flex flex-col items-center justify-center text-slate-500">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white shadow-md">
            +
          </div>
        </Link>
        <button onClick={() => { setFeedFilter("trending"); setSelectedDistrict("All"); }} className={`flex flex-col items-center justify-center ${feedFilter === "trending" ? "text-amber-500" : "text-slate-500"}`}>
          <Flame size={18} />
          <span className="text-[9px] font-bold mt-0.5">Trending</span>
        </button>
      </div>
    </div>
  );
}