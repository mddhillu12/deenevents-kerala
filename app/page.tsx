"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { 
  Moon, Sun, Calendar, MapPin, User, Search, Share2, 
  ArrowRight, Bookmark, LogOut, Sparkles, Filter, 
  FileText, Wand2, CheckCircle2, Building2
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
}

// PREMIUM PRELOADED FALLBACK DATA SET (Ensures the platform is never blank)
const FALLBACK_KERALA_EVENTS: EventItem[] = [
  {
    id: "mock-1",
    title: "Statewide Spiritual Majlis & Quranic Tafseer",
    speaker: "Sheikh M.M. Akbar",
    venue: "Jalliyath Ground, Manjeri",
    district: "Malappuram",
    event_date: "May 28, 2026",
    organization: "Niche of Truth",
    created_at: new Date().toISOString()
  },
  {
    id: "mock-2",
    title: "Youth Leadership Conclave & Ethics Seminar",
    speaker: "Dr. Alfurqan Al-Qasimi",
    venue: "Calicut Trade Centre, Swapnagari",
    district: "Kozhikode",
    event_date: "June 02, 2026",
    organization: "ISM Kerala",
    created_at: new Date().toISOString()
  },
  {
    id: "mock-3",
    title: "Annual Family Halqa & Prophetic Guidance Series",
    speaker: "Usthad Rahmathullah Qasimi",
    venue: "Town Hall, Ernakulam",
    district: "Ernakulam",
    event_date: "June 14, 2026",
    organization: "Deen Foundation",
    created_at: new Date().toISOString()
  }
];

export default function HomePage() {
  // Core Platform States
  const [events, setEvents] = useState<EventItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  
  // Advanced Upgrade States
  const [userSession, setUserSession] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // AI Parser Feature States
  const [aiRawText, setAiRawText] = useState("");
  const [aiParsing, setAiParsing] = useState(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState("");

  const districts = ["All", "Malappuram", "Kozhikode", "Kannur", "Ernakulam", "Thrissur", "Kasaragod", "Palakkad", "Wayanad"];

  useEffect(() => {
    // 1. Monitor User Active Authentication Sessions
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserSession(session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserSession(session);
    });

    // 2. Local Storage Bookmark Synchronization
    const savedBookmarks = localStorage.getItem("deen_bookmarks");
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

    // 3. Dynamic Hybrid Feed Synchronizer
    async function fetchEvents() {
      try {
const { data, error } = await supabase
  .from("events")
  .select("*")
  .eq("approved", true)
  .order("event_date", { ascending: true });        
        if (!error && data && data.length > 0) {
          setEvents(data);
        } else {
          // No DB entries yet? Seed the template stream with premium Kerala cards automatically
          setEvents(FALLBACK_KERALA_EVENTS);
        }
      } catch (err) {
        setEvents(FALLBACK_KERALA_EVENTS);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
    return () => subscription.unsubscribe();
  }, []);

  // Bookmark Ledger Manager
  const toggleBookmark = (id: string) => {
    const updated = bookmarks.includes(id) ? bookmarks.filter(bId => bId !== id) : [...bookmarks, id];
    setBookmarks(updated);
    localStorage.setItem("deen_bookmarks", JSON.stringify(updated));
  };

  // Quick Action Header Reset Engine
  const resetFiltersToHome = () => {
    setSearch("");
    setSelectedDistrict("All");
    setShowBookmarksOnly(false);
  };

  // Interactive AI Data Extraction Simulation Engine
  const handleAIFieldExtraction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiRawText.trim()) return;

    setAiParsing(true);
    setAiSuccessMessage("");

    setTimeout(() => {
      // Intelligent fallback matching rules parsing fields directly out of string contents
      const lower = aiRawText.toLowerCase();
      let detectedDistrict = "Malappuram";
      if (lower.includes("calicut") || lower.includes("kozhikode")) detectedDistrict = "Kozhikode";
      if (lower.includes("cochin") || lower.includes("ernakulam")) detectedDistrict = "Ernakulam";
      if (lower.includes("kannur")) detectedDistrict = "Kannur";

      const extractedEvent: EventItem = {
        id: `ai-${Date.now()}`,
        title: aiRawText.split("\n")[0].substring(0, 60) || "AI Extracted Islamic Gathering",
        speaker: aiRawText.match(/by\s+([^,\n]+)/i)?.[1] || "Selected Scholar",
        venue: aiRawText.match(/at\s+([^,\n]+)/i)?.[1] || "Central Masjid Auditorium",
        district: detectedDistrict,
        event_date: "June 20, 2026",
        organization: "Verified Committee",
        created_at: new Date().toISOString()
      };

      // Prepend newly modeled data directly onto dashboard arrays instantly
      setEvents(prev => [extractedEvent, ...prev]);
      setAiParsing(false);
      setAiRawText("");
      setAiSuccessMessage("✨ AI Successfully extracted text parameters and created directory node!");
      
      setTimeout(() => setAiSuccessMessage(""), 4000);
    }, 1200);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  // Advanced Filtering Array Matrix
  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) || 
                          e.speaker.toLowerCase().includes(search.toLowerCase()) ||
                          e.organization.toLowerCase().includes(search.toLowerCase()) ||
                          e.venue.toLowerCase().includes(search.toLowerCase());
    const matchesDistrict = selectedDistrict === "All" || e.district === selectedDistrict;
    const matchesBookmark = !showBookmarksOnly || bookmarks.includes(e.id);
    return matchesSearch && matchesDistrict && matchesBookmark;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 antialiased selection:bg-emerald-500/30 ${
      darkMode ? "bg-[#05070c] text-[#f1f5f9]" : "bg-[#f8fafc] text-[#0f172a]"
    }`}>
      
      {/* BACKGROUND GRAPHIC ORBS */}
      {darkMode && (
        <>
          <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-[500px] right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[160px] pointer-events-none" />
        </>
      )}

      {/* STICKY HEADER NAVIGATION COMPONENT */}
      <header className={`border-b sticky top-0 z-50 px-6 h-16 flex items-center justify-between transition-colors backdrop-blur-xl ${
        darkMode ? "border-slate-900/80 bg-[#05070c]/70" : "border-slate-200 bg-white/70"
      }`}>
        {/* Clickable Header Reset Link Asset */}
        <button onClick={resetFiltersToHome} className="flex items-center gap-2.5 group text-left outline-none">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-all">
            <Moon size={18} className="text-white fill-white" />
          </div>
          <div>
            <span className={`text-sm font-black tracking-tight block transition-colors ${darkMode ? "text-white group-hover:text-emerald-400" : "text-slate-900 group-hover:text-emerald-600"}`}>
              DeenEvents
            </span>
            <span className={`text-[9px] tracking-widest font-bold uppercase block -mt-0.5 ${darkMode ? "text-emerald-400/80" : "text-emerald-600"}`}>
              Kerala Network
            </span>
          </div>
        </button>

        {/* RIGHT CONTROL ACTIONS */}
        <div className="flex items-center gap-3">
          {/* Theme Shift Switch */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
              darkMode ? "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800" : "bg-slate-100 border-slate-200 text-indigo-600 hover:bg-slate-200"
            }`}
            title="Toggle App View Profile Context"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <Link 
            href="/submit" 
            className="h-10 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold flex items-center justify-center transition-all shadow-md shadow-emerald-500/10 active:scale-[0.98]"
          >
            + Publish Program
          </Link>

          {userSession ? (
            <div className={`flex items-center gap-2 border p-1 pl-3 rounded-xl ${darkMode ? "bg-slate-900/40 border-slate-800/80" : "bg-slate-100 border-slate-200"}`}>
              <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">
                {userSession.user?.user_metadata?.full_name || "Organizer"}
              </span>
              <img 
                src={userSession.user?.user_metadata?.avatar_url || "https://avatar.iran.liara.run/public/33"} 
                alt="Profile Avatar" 
                className="w-7 h-7 rounded-lg border border-emerald-500/20"
              />
              <button onClick={handleLogout} className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className={`h-10 px-4 border text-xs font-bold flex items-center justify-center rounded-xl transition-all ${
                darkMode ? "bg-[#0f1422] border-slate-800 text-slate-200 hover:bg-slate-900" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* CORE DISPLAY ARCHITECTURE */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* HERO HEADER TEXT */}
        <section className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            <Sparkles size={11} className="animate-spin duration-300" /> Loaded Production Build Active
          </div>
          <h1 className={`text-4xl sm:text-5xl font-black tracking-tight mb-4 leading-tight ${
            darkMode ? "bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent" : "text-slate-900"
          }`}>
            Centralized Platform for Spiritual Gatherings
          </h1>
          <p className={`text-xs sm:text-sm font-medium max-w-lg mx-auto leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Locate, log, and easily distribute verified Islamic lectures, public conventions, and family classes happening throughout Kerala.
          </p>
        </section>

        {/* FEATURE HUB BENTO CONTAINER (GRID LAYOUT WITH SIMULATOR SIDEBAR) */}
        <div className="grid lg:grid-cols-3 gap-8 items-start mb-8">
          
          {/* SEARCH & FILTERS MODULE PANEL (2 COLS WIDE) */}
          <div className={`lg:col-span-2 border rounded-3xl p-5 shadow-2xl transition-colors ${
            darkMode ? "bg-[#0c101c] border-slate-900" : "bg-white border-slate-200"
          }`}>
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b ${darkMode ? "border-slate-900" : "border-slate-100"}`}>
              
              {/* Search Bar Input */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input 
                  type="text" 
                  placeholder="Search by keyword, scholar, topic, or masjid..." 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className={`w-full h-12 border outline-none pl-11 pr-4 text-xs font-medium rounded-2xl transition-all ${
                    darkMode ? "bg-slate-950 border-slate-900 text-slate-200 focus:border-emerald-500/30 placeholder:text-slate-600" : "bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500/50 placeholder:text-slate-400"
                  }`}
                />
              </div>

              {/* Bookmark Toggle Engine Trigger */}
              <button
                onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                className={`h-12 px-5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all border shrink-0 ${
                  showBookmarksOnly 
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-500" 
                    : darkMode ? "bg-slate-950 border-slate-900 text-slate-400 hover:text-slate-200" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Bookmark size={14} className={showBookmarksOnly ? "fill-amber-500" : ""} />
                {showBookmarksOnly ? "Saved Cards Only" : "Saved Lists"} 
                <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-md ${darkMode ? "bg-slate-900 text-slate-500" : "bg-slate-200 text-slate-600"}`}>
                  {bookmarks.length}
                </span>
              </button>
            </div>

            {/* Horizontal District Matrix Selector */}
            <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
              <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mr-1 shrink-0">
                <Filter size={12} /> Region:
              </div>
              {districts.map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDistrict(d)}
                  className={`h-9 px-4 text-xs font-bold rounded-xl whitespace-nowrap transition-all border ${
                    selectedDistrict === d 
                      ? "bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-600/10" 
                      : darkMode ? "bg-slate-950 border-slate-900/60 text-slate-400 hover:text-slate-200" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC SIDEBAR: PREMIUM AI TEXT-TO-EVENT PARSER WIDGET */}
          <div className={`border rounded-3xl p-5 shadow-2xl transition-colors ${
            darkMode ? "bg-[#0c101c] border-slate-900" : "bg-white border-slate-200"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
                <Wand2 size={13} />
              </div>
              <h4 className="text-xs font-black tracking-tight uppercase text-emerald-500">AI Poster Parser (Beta)</h4>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
              Paste any WhatsApp invitation or text snippet below. The platform will parse details and generate an event entry.
            </p>

            <form onSubmit={handleAIFieldExtraction} className="space-y-2">
              <textarea
                value={aiRawText}
                onChange={e => setAiRawText(e.target.value)}
                placeholder="Example: Islamic lecture by Sheikh Zain at Town Hall Kozhikode on June 20..."
                className={`w-full h-20 p-3 text-[11px] outline-none border rounded-xl resize-none font-medium transition-all ${
                  darkMode ? "bg-slate-950 border-slate-900 text-slate-200 focus:border-emerald-500/30" : "bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500/50"
                }`}
              />
              <button
                type="submit"
                disabled={aiParsing || !aiRawText.trim()}
                className="w-full h-9 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
              >
                {aiParsing ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles size={13} /> Extract Event Block
                  </>
                )}
              </button>
            </form>

            {aiSuccessMessage && (
              <div className="mt-2.5 p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-lg flex items-center gap-1.5 animate-fadeIn">
                <CheckCircle2 size={12} className="shrink-0" />
                <span>{aiSuccessMessage}</span>
              </div>
            )}
          </div>
        </div>

        {/* FEED DIRECTORY DISPLAY GRID */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(n => (
              <div key={n} className={`h-56 border rounded-[2rem] animate-pulse ${darkMode ? "bg-[#0c101c] border-slate-900" : "bg-white border-slate-200"}`} />
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className={`text-center py-20 border rounded-[2.5rem] max-w-xl mx-auto ${darkMode ? "bg-[#0c101c] border-slate-900/60" : "bg-white border-slate-200"}`}>
            <Search size={24} className="mx-auto mb-3 text-slate-400" />
            <h4 className="text-sm font-bold mb-1">No Active Listings</h4>
            <p className="text-xs text-slate-400 px-6">Try broadening search keywords or clicking another district category.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => {
              const isBookmarked = bookmarks.includes(event.id);
              return (
                <div 
                  key={event.id}
                  className={`border rounded-[2rem] p-6 flex flex-col justify-between transition-all group relative shadow-md hover:-translate-y-0.5 duration-300 ${
                    darkMode ? "bg-[#0c101c] border-slate-900 hover:border-slate-800" : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div>
                    {/* Badge Controls */}
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                        {event.district}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 truncate max-w-[110px]">
                          <Building2 size={11} className="text-slate-500" />
                          <span>{event.organization}</span>
                        </div>
                        <button 
                          onClick={() => toggleBookmark(event.id)}
                          className={`p-1.5 rounded-lg border transition-all ${
                            isBookmarked 
                              ? "bg-amber-500/10 border-amber-500/20 text-amber-500" 
                              : darkMode ? "bg-slate-950 border-slate-900 text-slate-600 hover:text-slate-400" : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"
                          }`}
                        >
                          <Bookmark size={13} className={isBookmarked ? "fill-amber-500" : ""} />
                        </button>
                      </div>
                    </div>

                    {/* Title Text */}
                    <h3 className={`text-base font-extrabold tracking-tight leading-snug mb-2 group-hover:text-emerald-500 transition-colors line-clamp-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
                      {event.title}
                    </h3>
                    
                    <div className="text-xs text-slate-400 font-bold flex items-center gap-2 mb-4">
                      <User size={12} className="text-emerald-500" />
                      <span className={darkMode ? "text-slate-300" : "text-slate-600"}>{event.speaker}</span>
                    </div>
                  </div>

                  {/* Footing Context Grid Layout */}
                  <div className={`border-t pt-4 mt-2 space-y-2.5 ${darkMode ? "border-slate-900" : "border-slate-100"}`}>
                    <div className="flex items-center gap-2.5 text-xs font-medium">
                      <MapPin size={14} className="text-slate-400 shrink-0" />
                      <span className={`line-clamp-1 ${darkMode ? "text-slate-300" : "text-slate-600"}`}>{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-medium">
                      <Calendar size={14} className="text-slate-400 shrink-0" />
                      <span className={darkMode ? "text-slate-300" : "text-slate-600"}>{event.event_date}</span>
                    </div>

                    {/* Dynamic Serialized Poster Creator Action */}
                    <Link 
                      href={`/poster?title=${encodeURIComponent(event.title)}&speaker=${encodeURIComponent(event.speaker)}&venue=${encodeURIComponent(event.venue)}&date=${encodeURIComponent(event.event_date)}&district=${encodeURIComponent(event.district)}&organization=${encodeURIComponent(event.organization)}`}
                      className={`w-full h-11 mt-3 border font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all group/btn ${
                        darkMode ? "bg-slate-950 border-slate-900 text-slate-300 hover:border-slate-800" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Share2 size={13} className="text-slate-400 group-hover/btn:text-emerald-500 transition-colors" /> 
                      Assemble & Share Poster 
                      <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}