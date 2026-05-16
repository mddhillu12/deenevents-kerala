"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Search, 
  MapPin, 
  Calendar, 
  Moon, 
  Sun, 
  SlidersHorizontal, 
  CheckCircle2, 
  Navigation, 
  Bookmark, 
  CalendarPlus, 
  ExternalLink,
  Sparkles
} from "lucide-react";

export default function HomePage() {
  const districts = ["All Districts", "Malappuram", "Kozhikode", "Kannur", "Ernakulam", "Thrissur", "Kasaragod", "Palakkad", "Wayanad"];
  
  const [events, setEvents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [activeDistrict, setActiveDistrict] = useState("All Districts");
  const [loading, setLoading] = useState(true);
  const [hijriDate, setHijriDate] = useState("");
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");

  useEffect(() => {
    async function init() {
      // 1. Fetch data from Supabase
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });
      
      if (error) console.error("Supabase Error:", error);
      setEvents(data || []);
      setLoading(false);

      // 2. Fetch Hijri Date configuration
      try {
        const date = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
          day: 'numeric', month: 'long', year: 'numeric'
        }).format(new Date());
        setHijriDate(date);
      } catch (e) {
        setHijriDate("");
      }

      // 3. Fetch Local Prayer Times
      fetch("https://api.aladhan.com/v1/timingsByCity?city=Malappuram&country=India&method=2")
        .then(res => res.json())
        .then(data => {
          if (data?.data?.timings) setPrayerTimes(data.data.timings);
        })
        .catch(err => console.error(err));
    }

    init();

    // Load bookmarks configuration from device storage securely
    const savedBookmarks = localStorage.getItem("deen_bookmarks");
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Toggle Bookmark Handler logic mapping
  const toggleBookmark = (eventId: string) => {
    let updated = [...bookmarks];
    if (updated.includes(eventId)) {
      updated = updated.filter(id => id !== eventId);
    } else {
      updated.push(eventId);
    }
    setBookmarks(updated);
    localStorage.setItem("deen_bookmarks", JSON.stringify(updated));
  };

  // Google Calendar Integration URL generator engine
  const getGoogleCalendarUrl = (event: any) => {
    const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
    const title = encodeURIComponent(event.title || "Islamic Program");
    const details = encodeURIComponent(`Speaker: ${event.speaker || 'Verified Scholar'}\nOrganized via DeenEvents`);
    const location = encodeURIComponent(`${event.venue || ''}, ${event.district || ''}, Kerala`);
    
    // Fallback date structure generation parameters
    return `${base}&text=${title}&details=${details}&location=${location}&sf=true&output=xml`;
  };

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const searchTerm = search.toLowerCase();
      const matchSearch = 
        (e.title?.toLowerCase() || "").includes(searchTerm) || 
        (e.speaker?.toLowerCase() || "").includes(searchTerm) ||
        (e.venue?.toLowerCase() || "").includes(searchTerm);
      
      const matchDist = activeDistrict === "All Districts" || 
        (e.district?.toLowerCase() === activeDistrict.toLowerCase());
        
      const matchTab = activeTab === "all" || bookmarks.includes(e.id?.toString());
        
      return matchSearch && matchDist && matchTab;
    });
  }, [search, activeDistrict, activeTab, events, bookmarks]);

  // Split out the very latest event to display inside the high-end Featured Bento slot frame
  const featuredEvent = events[0];
  const regularDisplayEvents = activeTab === "saved" ? filteredEvents : filteredEvents.filter(e => e.id !== featuredEvent?.id);

  return (
    <main className="min-h-screen bg-[#07090e] text-[#f1f5f9] font-sans selection:bg-emerald-500/30 antialiased">
      
      {/* PREMIUM HEADER UTILITY BAR */}
      <div className="bg-[#0b0f19] border-b border-slate-800/40 py-2.5 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] font-medium tracking-wide text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-300 font-semibold">{hijriDate || "Loading Islamic Calendar..."}</span>
          </div>
          {prayerTimes && (
            <div className="hidden lg:flex items-center gap-5">
              <span>Fajr <b className="text-slate-200 ml-1">{prayerTimes.Fajr}</b></span>
              <span>Dhuhr <b className="text-slate-200 ml-1">{prayerTimes.Dhuhr}</b></span>
              <span>Asr <b className="text-slate-200 ml-1">{prayerTimes.Asr}</b></span>
              <span>Maghrib <b className="text-emerald-400 ml-1 font-bold">{prayerTimes.Maghrib}</b></span>
              <span>Isha <b className="text-slate-200 ml-1">{prayerTimes.Isha}</b></span>
            </div>
          )}
        </div>
      </div>

      {/* MODERN GLASS NAVBAR */}
      <nav className="sticky top-0 z-[100] border-b border-slate-800/30 bg-[#07090e]/70 backdrop-blur-md px-6 h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/10 group-hover:scale-105 transition-all">
            <Moon size={18} className="text-white fill-white" />
          </div>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">DeenEvents</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-900/60 p-1 rounded-xl border border-slate-800/50 text-xs font-semibold">
            <button 
              onClick={() => setActiveTab("all")}
              className={`px-4 py-1.5 rounded-lg transition-all ${activeTab === "all" ? "bg-slate-800 text-white shadow" : "text-slate-400 hover:text-slate-200"}`}
            >
              Explore Programs
            </button>
            <button 
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${activeTab === "saved" ? "bg-slate-800 text-white shadow" : "text-slate-400 hover:text-slate-200"}`}
            >
              <Bookmark size={12} className={bookmarks.length > 0 ? "fill-emerald-500 text-emerald-500" : ""} />
              Saved ({bookmarks.length})
            </button>
          </div>
          <Link href="/submit" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-emerald-500/10 hover:opacity-95 transition-all">
            Publish Event
          </Link>
        </div>
      </nav>

      {/* MINIMAL HERO SECTION */}
      <header className="py-16 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
          Centralized Islamic Programs Directory
        </h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto mb-8 font-medium">
          Discover authenticated spiritual gatherings, conventions, and educational programs across each district in Kerala.
        </p>

        {/* MODERN SEARCH CONTAINER */}
        <div className="max-w-xl mx-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl blur-xl opacity-50 group-focus-within:opacity-100 transition-opacity" />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={20} />
          <input
            type="text" 
            placeholder="Search by scholar, organizer, or topic..." 
            className="w-full h-14 rounded-2xl px-14 bg-[#0f1422] border border-slate-800/60 outline-none text-slate-200 placeholder-slate-500 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {/* HORIZONTAL SWIPABLE DISTRICT FILTER */}
      <section className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
          <SlidersHorizontal size={14} className="text-slate-500" />
          <span>Filter By Region</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {districts.map(d => (
            <button 
              key={d} 
              onClick={() => setActiveDistrict(d)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide whitespace-nowrap transition-all border ${
                activeDistrict === d 
                  ? 'bg-white text-slate-950 border-white shadow-lg' 
                  : 'bg-[#0f1422] text-slate-400 border-slate-800/40 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </section>

      {/* MAIN EVENT DISPLAY LOGIC */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        {loading ? (
          /* PURE CSS SHIMMER CARD SKELETON LOADING BLOCK */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(n => (
              <div key={n} className="bg-[#0f1422] border border-slate-800/40 rounded-2xl p-6 h-64 animate-pulse flex flex-col justify-between">
                <div>
                  <div className="w-24 h-5 bg-slate-800 rounded-md mb-4" />
                  <div className="w-full h-7 bg-slate-800 rounded-md mb-2" />
                  <div className="w-2/3 h-4 bg-slate-800 rounded-md" />
                </div>
                <div className="w-full h-10 bg-slate-800 rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-[#0f1422]/30 rounded-3xl border border-slate-800/40 border-dashed p-8">
            <p className="text-slate-500 font-medium text-sm">No upcoming events listed for this selection yet.</p>
          </div>
        ) : (
          <>
            {/* FEATURED BENTO SECTION CONTAINER - ONLY SHOWS ON MAIN STREAM VIEW */}
            {featuredEvent && activeTab === "all" && search === "" && activeDistrict === "All Districts" && (
              <div className="mb-10 bg-gradient-to-r from-[#111827] via-[#0f172a] to-[#0f1422] border border-emerald-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-emerald-400 pointer-events-none group-hover:scale-110 transition-transform">
                  <Sparkles size={180} />
                </div>
                <div className="max-w-2xl relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-emerald-500 text-white text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                      <Sparkles size={10} className="fill-white" /> Featured Highlight
                    </span>
                    <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                      {featuredEvent.district}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight hover:text-emerald-400 transition-colors">
                    {featuredEvent.title}
                  </h3>
                  <p className="text-slate-400 text-base font-semibold mb-6">Presented By {featuredEvent.speaker}</p>
                  
                  <div className="flex flex-wrap gap-6 text-xs text-slate-400 font-medium mb-8">
                    <div className="flex items-center gap-2"><MapPin size={16} className="text-emerald-500" /> {featuredEvent.venue}</div>
                    <div className="flex items-center gap-2"><Calendar size={16} className="text-emerald-500" /> {featuredEvent.event_date}</div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((featuredEvent.venue || '') + ' ' + (featuredEvent.district || ''))}`, '_blank')}
                      className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-2 hover:bg-emerald-500 transition-colors"
                    >
                      <Navigation size={14} /> Navigate Routing
                    </button>
                    <button 
                      onClick={() => window.open(getGoogleCalendarUrl(featuredEvent), '_blank')}
                      className="px-5 py-3 bg-slate-800 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-700 transition-colors"
                    >
                      <CalendarPlus size={14} /> Sync to Google Calendar
                    </button>
                    <button 
                      onClick={() => toggleBookmark(featuredEvent.id?.toString())}
                      className="p-3 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl hover:text-white transition-colors"
                    >
                      <Bookmark size={16} className={bookmarks.includes(featuredEvent.id?.toString()) ? "fill-emerald-500 text-emerald-500 border-none" : ""} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SECONDARY STANDARD FEED CATALOG GRID */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularDisplayEvents.map(event => (
                <div key={event.id} className="bg-[#0f1422] border border-slate-800/40 hover:border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:-translate-y-0.5 transition-all duration-300">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {event.district}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                          <CheckCircle2 size={12} className="text-emerald-500" /> Verified
                        </span>
                        <button 
                          onClick={() => toggleBookmark(event.id?.toString())}
                          className="text-slate-500 hover:text-slate-300 p-0.5 transition-colors"
                        >
                          <Bookmark size={14} className={bookmarks.includes(event.id?.toString()) ? "fill-emerald-500 text-emerald-500 text-none" : ""} />
                        </button>
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-bold text-white mb-1 tracking-tight group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {event.title}
                    </h4>
                    <p className="text-slate-400 font-medium text-xs mb-5">By {event.speaker}</p>
                    
                    <div className="space-y-2 border-t border-slate-800/40 pt-4 text-xs text-slate-400 font-medium mb-6">
                      <div className="flex items-center gap-2.5">
                        <MapPin size={14} className="text-slate-500" /> 
                        <span className="line-clamp-1">{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Calendar size={14} className="text-slate-500" /> 
                        <span>{event.event_date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((event.venue || '') + ' ' + (event.district || ''))}`, '_blank')} 
                        className="py-2.5 bg-slate-800/60 hover:bg-slate-800 text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Navigation size={12} /> Route
                      </button>
                      <Link 
                        href={`/poster?title=${encodeURIComponent(event.title || '')}&speaker=${encodeURIComponent(event.speaker || '')}&venue=${encodeURIComponent(event.venue || '')}&date=${encodeURIComponent(event.event_date || '')}&district=${encodeURIComponent(event.district || '')}&organization=DeenEvents`}
                        className="py-2.5 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 hover:from-emerald-600/20 hover:to-teal-600/20 border border-emerald-500/10 text-emerald-400 text-center rounded-xl text-xs font-bold transition-all"
                      >
                        View Poster
                      </Link>
                    </div>
                    <button 
                      onClick={() => window.open(getGoogleCalendarUrl(event), '_blank')}
                      className="w-full py-2 bg-slate-900/40 hover:bg-slate-900 text-[11px] text-slate-500 hover:text-slate-300 font-medium rounded-lg transition-colors border border-slate-800/20 flex items-center justify-center gap-1"
                    >
                      <CalendarPlus size={12} /> Add to Google Calendar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}