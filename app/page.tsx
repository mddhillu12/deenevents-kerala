"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { 
  Moon, Calendar, MapPin, User, Search, Share2, 
  ArrowRight, Bookmark, LogOut, Sparkles, Filter, CheckCircle2 
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

export default function HomePage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [loading, setLoading] = useState(true);
  
  // Upgrade Tracking States
  const [userSession, setUserSession] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const districts = ["All", "Malappuram", "Kozhikode", "Kannur", "Ernakulam", "Thrissur", "Kasaragod", "Palakkad", "Wayanad"];

  useEffect(() => {
    // 1. Fetch Auth State Engine
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserSession(session);
    });

    // 2. Hydrate Bookmark Ledger
    const savedBookmarks = localStorage.getItem("deen_bookmarks");
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }

    // 3. Fetch Event Stream Index
    async function fetchEvents() {
      try {
        let query = supabase.from("events").select("*").order("created_at", { ascending: false });
        const { data, error } = await query;
        if (!error && data) setEvents(data);
      } catch (err) {
        console.error("Directory Index Sync Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
    return () => subscription.unsubscribe();
  }, []);

  // Handle Bookmarks Engine
  const toggleBookmark = (id: string) => {
    const updated = bookmarks.includes(id)
      ? bookmarks.filter(bId => bId !== id)
      : [...bookmarks, id];
    setBookmarks(updated);
    localStorage.setItem("deen_bookmarks", JSON.stringify(updated));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  // Advanced Filtering Matrix
  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) || 
                          e.speaker.toLowerCase().includes(search.toLowerCase()) ||
                          e.organization.toLowerCase().includes(search.toLowerCase());
    const matchesDistrict = selectedDistrict === "All" || e.district === selectedDistrict;
    const matchesBookmark = !showBookmarksOnly || bookmarks.includes(e.id);
    return matchesSearch && matchesDistrict && matchesBookmark;
  });

  return (
    <div className="min-h-screen bg-[#05070c] text-[#f1f5f9] antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* GLOWING AMBIENT BACKGROUND LAYER */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[400px] right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* FIXED UPGRADED NAVIGATION INTERFACE */}
      <header className="border-b border-slate-900/80 bg-[#05070c]/70 backdrop-blur-xl sticky top-0 z-50 px-6 h-16 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-all">
            <Moon size={18} className="text-white fill-white" />
          </div>
          <div>
            <span className="text-sm font-black tracking-tight text-white block">DeenEvents</span>
            <span className="text-[9px] text-emerald-400/80 tracking-widest font-bold uppercase block -mt-0.5">Kerala Network</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link 
            href="/submit" 
            className="h-10 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold flex items-center justify-center transition-all shadow-md shadow-emerald-500/10 active:scale-[0.98]"
          >
            + Publish Program
          </Link>

          {userSession ? (
            <div className="flex items-center gap-2 bg-slate-900/40 border border-slate-800/80 p-1 pl-3 rounded-xl">
              <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">
                {userSession.user?.user_metadata?.full_name || "Organizer"}
              </span>
              {userSession.user?.user_metadata?.avatar_url ? (
                <img 
                  src={userSession.user.user_metadata.avatar_url} 
                  alt="User Avatar" 
                  className="w-7 h-7 rounded-lg border border-slate-700"
                />
              ) : (
                <div className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center text-[10px] font-bold text-emerald-400">
                  U
                </div>
              )}
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                title="Log Out"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="h-10 px-4 bg-[#0f1422] border border-slate-800/60 hover:border-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center transition-all hover:bg-slate-900"
            >
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* DASHBOARD CORE ELEMENT WRAPPER */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* BANNER HEADLINE HERO SECTION */}
        <section className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 animate-pulse">
            <Sparkles size={11} /> Next-Generation Islamic Core Directory
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            Centralized Platform for Spiritual Gatherings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-lg mx-auto leading-relaxed">
            Locate, log, and easily distribute verified Islamic lectures, public conventions, and family classes happening throughout Kerala.
          </p>
        </section>

        {/* HIGH-FIDELITY BENTO FILTER SYSTEM CONTROL MODULE */}
        <div className="bg-[#0c101c] border border-slate-900 rounded-3xl p-5 shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-900">
            
            {/* Search Field Box */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
              <input 
                type="text" 
                placeholder="Search by keyword, specific scholar name, or local organizing committee..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-12 bg-slate-950 border border-slate-900 outline-none text-slate-200 pl-11 pr-4 text-xs font-medium rounded-2xl focus:border-emerald-500/30 transition-all placeholder:text-slate-600"
              />
            </div>

            {/* Bookmark Filter System Trigger */}
            <button
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`h-12 px-5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all border ${
                showBookmarksOnly 
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400" 
                  : "bg-slate-950 border-slate-900 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Bookmark size={14} className={showBookmarksOnly ? "fill-amber-400" : ""} />
              {showBookmarksOnly ? "Showing Saved Lists" : "Filter by Bookmarks"} 
              <span className="ml-1 bg-slate-900 text-[10px] px-1.5 py-0.5 rounded-md text-slate-500">
                {bookmarks.length}
              </span>
            </button>
          </div>

          {/* Scrolling Horizontal District Filter Matrix */}
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-1">
            <div className="text-slate-600 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mr-1 shrink-0">
              <Filter size={12} /> Districts:
            </div>
            {districts.map(d => (
              <button
                key={d}
                onClick={() => setSelectedDistrict(d)}
                className={`h-9 px-4 text-xs font-bold rounded-xl whitespace-nowrap transition-all border ${
                  selectedDistrict === d 
                    ? "bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-600/10" 
                    : "bg-slate-950 border-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-800"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* EVENT PRESENTATION DISPLAY MODULE GRID */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-56 bg-[#0c101c] border border-slate-900 rounded-[2rem] animate-pulse" />
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-[#0c101c] border border-slate-900/60 rounded-[2.5rem] max-w-xl mx-auto">
            <div className="w-12 h-12 bg-slate-950 border border-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-600">
              <Search size={20} />
            </div>
            <h4 className="text-sm font-bold text-slate-300 mb-1">No Gatherings Found</h4>
            <p className="text-xs text-slate-500 font-medium px-6">
              We couldn't track items aligning with those filtering specifications. Check spelling parameters or try selecting a completely different region flag.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => {
              const isBookmarked = bookmarks.includes(event.id);
              return (
                <div 
                  key={event.id}
                  className="bg-[#0c101c] border border-slate-900 hover:border-slate-800/80 rounded-[2rem] p-6 flex flex-col justify-between transition-all group relative shadow-xl hover:-translate-y-0.5 duration-300"
                >
                  <div>
                    {/* Header Controls Row */}
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-1 rounded-lg">
                        {event.district}
                      </span>
                      
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-semibold text-slate-500 truncate max-w-[120px]" title={event.organization}>
                          {event.organization}
                        </span>
                        <button 
                          onClick={() => toggleBookmark(event.id)}
                          className={`p-1.5 rounded-lg border transition-all ${
                            isBookmarked 
                              ? "bg-amber-500/10 border-amber-500/20 text-amber-400" 
                              : "bg-slate-950 border-slate-900 text-slate-600 hover:text-slate-400"
                          }`}
                        >
                          <Bookmark size={13} className={isBookmarked ? "fill-amber-400" : ""} />
                        </button>
                      </div>
                    </div>

                    {/* Information Context Stack */}
                    <h3 className="text-base font-extrabold text-white tracking-tight leading-snug mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    
                    <div className="text-xs text-slate-400 font-bold flex items-center gap-2 mb-4">
                      <div className="w-5 h-5 bg-slate-950 border border-slate-900 rounded-md flex items-center justify-center">
                        <User size={11} className="text-emerald-500" />
                      </div>
                      <span>{event.speaker}</span>
                    </div>
                  </div>

                  {/* Footing Meta Details Container */}
                  <div className="border-t border-slate-900/80 pt-4 mt-2 space-y-2.5">
                    <div className="flex items-center gap-2.5 text-xs text-slate-400 font-medium">
                      <MapPin size={14} className="text-slate-600 shrink-0" />
                      <span className="line-clamp-1 text-slate-300">{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-400 font-medium">
                      <Calendar size={14} className="text-slate-600 shrink-0" />
                      <span className="text-slate-300">{event.event_date}</span>
                    </div>

                    {/* Explicit Dynamic Poster Parameter Router Trigger */}
                    <Link 
                      href={`/poster?title=${encodeURIComponent(event.title)}&speaker=${encodeURIComponent(event.speaker)}&venue=${encodeURIComponent(event.venue)}&date=${encodeURIComponent(event.event_date)}&district=${encodeURIComponent(event.district)}&organization=${encodeURIComponent(event.organization)}`}
                      className="w-full h-11 mt-3 bg-slate-950 border border-slate-900 hover:border-slate-800 text-slate-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all group/btn"
                    >
                      <Share2 size={13} className="text-slate-500 group-hover/btn:text-emerald-400 transition-colors" /> 
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