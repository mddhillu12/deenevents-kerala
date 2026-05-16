"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Search, MapPin, Calendar, Moon, Sun, SlidersHorizontal, CheckCircle2, Navigation
} from "lucide-react";

export default function HomePage() {
  const districts = ["All Districts", "Malappuram", "Kozhikode", "Kannur", "Ernakulam", "Thrissur", "Kasaragod", "Palakkad", "Wayanad"];
  
  const [events, setEvents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [activeDistrict, setActiveDistrict] = useState("All Districts");
  const [loading, setLoading] = useState(true);
  const [hijriDate, setHijriDate] = useState("");
  const [prayerTimes, setPrayerTimes] = useState<any>(null);

  useEffect(() => {
    async function init() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });
      
      if (error) console.error("Supabase Error:", error);
      setEvents(data || []);
      setLoading(false);

      try {
        const date = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
          day: 'numeric', month: 'long', year: 'numeric'
        }).format(new Date());
        setHijriDate(date);
      } catch (e) {
        setHijriDate("");
      }

      fetch("https://api.aladhan.com/v1/timingsByCity?city=Malappuram&country=India&method=2")
        .then(res => res.json())
        .then(data => {
          if (data?.data?.timings) setPrayerTimes(data.data.timings);
        })
        .catch(err => console.error(err));
    }
    init();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const searchTerm = search.toLowerCase();
      const matchSearch = 
        (e.title?.toLowerCase() || "").includes(searchTerm) || 
        (e.speaker?.toLowerCase() || "").includes(searchTerm);
      
      const matchDist = activeDistrict === "All Districts" || 
        (e.district?.toLowerCase() === activeDistrict.toLowerCase());
        
      return matchSearch && matchDist;
    });
  }, [search, activeDistrict, events]);

  return (
    <main className="min-h-screen bg-[#07090e] text-[#f1f5f9] font-sans selection:bg-emerald-500/30 antialiased">
      
      {/* PREMIUM HEADER UTILITY BAR */}
      <div className="bg-[#0b0f19] border-b border-slate-800/40 py-2.5 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] font-medium tracking-wide text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-300 font-semibold">{hijriDate || "Loading Islamic Date..."}</span>
          </div>
          {prayerTimes && (
            <div className="hidden lg:flex items-center gap-5 division-x division-slate-800">
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
      <nav className="sticky top-0 z-[100] border-b border-slate-800/30 bg-[#07090e]/70 backdrop-blur-md px-6 h-20 flex justify-between items-center transition-all">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/10 group-hover:scale-105 transition-all">
            <Moon size={18} className="text-white fill-white" />
          </div>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">DeenEvents</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-xs font-semibold text-slate-400 hover:text-white transition-colors px-3 py-2">
            Sign In
          </Link>
          <Link href="/submit" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-emerald-500/10 hover:opacity-95 transition-all">
            Publish Event
          </Link>
        </div>
      </nav>

      {/* MINIMAL HERO SECTION */}
      <header className="py-20 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
          Centralized Islamic Programs Directory
        </h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto mb-10 font-medium">
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
      <section className="max-w-7xl mx-auto px-6 mb-14">
        <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
          <SlidersHorizontal size={14} className="text-slate-500" />
          <span>Filter By Region</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none mask-gradient-r">
          {districts.map(d => (
            <button 
              key={d} 
              onClick={() => setActiveDistrict(d)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 border ${
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

      {/* EVENT CATALOG GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500 text-sm font-medium">Fetching verified listings...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-[#0f1422]/30 rounded-3xl border border-slate-900 border-dashed p-8">
            <p className="text-slate-500 font-medium text-sm">No upcoming events listed for this selection yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <div key={event.id} className="bg-[#0f1422] border border-slate-800/40 hover:border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:-translate-y-0.5 transition-all duration-300">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {event.district}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                      <CheckCircle2 size={12} className="text-emerald-500" /> Verified Host
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-1 tracking-tight group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {event.title}
                  </h4>
                  <p className="text-slate-400 font-medium text-sm mb-6">By {event.speaker}</p>
                  
                  <div className="space-y-2.5 border-t border-slate-800/50 pt-4 text-xs text-slate-400 font-medium">
                    <div className="flex items-center gap-2.5">
                      <MapPin size={15} className="text-slate-500" /> 
                      <span className="line-clamp-1">{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Calendar size={15} className="text-slate-500" /> 
                      <span>{event.event_date}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-6 pt-2">
                  <button 
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent((event.venue || '') + ' ' + (event.district || ''))}`, '_blank')} 
                    className="py-2.5 bg-slate-800/60 hover:bg-slate-800 text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Navigation size={12} /> Route
                  </button>
                  <Link 
                    href={`/poster?title=${encodeURIComponent(event.title || '')}&speaker=${encodeURIComponent(event.speaker || '')}&venue=${encodeURIComponent(event.venue || '')}&date=${encodeURIComponent(event.event_date || '')}&district=${encodeURIComponent(event.district || '')}&organization=DeenEvents`}
                    className="py-2.5 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 hover:from-emerald-600/30 hover:to-teal-600/30 border border-emerald-500/20 text-emerald-400 text-center rounded-xl text-xs font-bold transition-all"
                  >
                    View Poster
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}