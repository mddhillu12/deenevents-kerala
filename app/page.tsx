"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Moon, Calendar, MapPin, User, Search, Share2, ArrowRight } from "lucide-react";

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

  const districts = ["All", "Malappuram", "Kozhikode", "Kannur", "Ernakulam", "Thrissur", "Kasaragod", "Palakkad", "Wayanad"];

  useEffect(() => {
    async function fetchEvents() {
      try {
        let query = supabase.from("events").select("*").order("created_at", { ascending: false });
        const { data, error } = await query;
        if (!error && data) setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.speaker.toLowerCase().includes(search.toLowerCase());
    const matchesDistrict = selectedDistrict === "All" || e.district === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f1f5f9] antialiased">
      {/* PREMIUM HEADER NAVIGATION AREA */}
      <header className="border-b border-slate-900 bg-[#07090e]/80 backdrop-blur-md sticky top-0 z-50 px-6 h-16 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/10">
            <Moon size={16} className="text-white fill-white" />
          </div>
          <span className="text-sm font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">DeenEvents</span>
        </Link>

        {/* CONNECTING REDIRECT BUTTON LINKS */}
        <div className="flex items-center gap-3">
          <Link 
            href="/submit" 
            className="h-9 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center transition-all shadow-md shadow-emerald-500/5"
          >
            + Publish Program
          </Link>
          <Link 
            href="/login" 
            className="h-9 px-4 bg-[#0f1422] border border-slate-800 hover:border-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center transition-all"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* HERO HERO SECTION */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="text-center max-w-xl mx-auto mb-12">
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            Islamic Program Directory
          </h1>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            Discover verified spiritual lectures, community gatherings, and Islamic conventions across Kerala.
          </p>
        </section>

        {/* CONTROLS BAR: SEARCH & FILTER */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 bg-[#0f1422] border border-slate-800/50 p-4 rounded-2xl shadow-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search by topic, keyword, or speaker..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-11 bg-slate-900/60 border border-slate-800 outline-none text-slate-200 pl-10 pr-4 text-xs font-medium rounded-xl focus:border-emerald-500/40 transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
            {districts.map(d => (
              <button
                key={d}
                onClick={() => setSelectedDistrict(d)}
                className={`h-11 px-4 text-xs font-bold rounded-xl whitespace-nowrap transition-all border ${
                  selectedDistrict === d 
                    ? "bg-emerald-600 border-emerald-500 text-white" 
                    : "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* LIVE DIRECTORY CONTAINER GRID */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-48 bg-[#0f1422] border border-slate-900 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-[#0f1422] border border-slate-900 rounded-3xl">
            <p className="text-slate-500 text-xs font-medium">No active program listings match your filter parameters.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <div 
                key={event.id}
                className="bg-[#0f1422] border border-slate-800/40 hover:border-emerald-500/20 rounded-3xl p-6 flex flex-col justify-between transition-all group relative shadow-md hover:shadow-xl"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                      {event.district}
                    </span>
                    <span className="text-[10px] font-medium text-slate-500">
                      {event.organization}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight leading-snug mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  
                  <div className="text-xs text-slate-400 font-semibold flex items-center gap-1.5 mb-4">
                    <User size={13} className="text-slate-500" />
                    <span>{event.speaker}</span>
                  </div>
                </div>

                <div className="border-t border-slate-800/50 pt-4 mt-2 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <MapPin size={14} className="text-emerald-500 shrink-0" />
                    <span className="line-clamp-1">{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <Calendar size={14} className="text-emerald-500 shrink-0" />
                    <span>{event.event_date}</span>
                  </div>

                  {/* ROUTING PATH TO AUTOMATED POSTER SHARING COMPONENT */}
                  <Link 
                    href={`/poster?title=${encodeURIComponent(event.title)}&speaker=${encodeURIComponent(event.speaker)}&venue=${encodeURIComponent(event.venue)}&date=${encodeURIComponent(event.event_date)}&district=${encodeURIComponent(event.district)}&organization=${encodeURIComponent(event.organization)}`}
                    className="w-full h-10 mt-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors group/btn"
                  >
                    <Share2 size={13} /> View & Share Poster <ArrowRight size={12} className="opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}