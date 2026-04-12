"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Search, MapPin, Calendar, PlusCircle, Sparkles, 
  ArrowRight, LayoutDashboard, Clock, Compass, 
  CalendarDays, Moon, Share2, Map, Filter,
  Users, BadgeCheck
} from "lucide-react";

// --- TYPES ---
type Event = {
  id: string;
  title: string;
  speaker: string;
  district: string;
  venue: string;
  event_date: string;
  category?: string;
};

export default function HomePage() {
  // --- CONFIG ---
  const districts = ["All", "Malappuram", "Kozhikode", "Kannur", "Ernakulam", "Thrissur", "Kasaragod", "Palakkad", "Wayanad"];
  
  const tools = [
    { name: "Prayer Times", desc: "Kerala Timings", icon: <Clock className="text-emerald-400" />, url: "https://www.islamicfinder.org/world/india/55489/malappuram-prayer-times/" },
    { name: "Qibla Finder", desc: "Compass Tool", icon: <Compass className="text-amber-400" />, url: "https://qiblafinder.withgoogle.com/" },
    { name: "Hijri Today", desc: "Islamic Date", icon: <CalendarDays className="text-indigo-400" />, url: "https://www.islamicfinder.org/islamic-calendar/" },
    { name: "Zakat Calc", desc: "Easy Calculation", icon: <Sparkles className="text-blue-400" />, url: "https://www.islamic-relief.org.uk/about-us/what-we-do/zakat/zakat-calculator/" },
  ];

  // --- STATE ---
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [activeDistrict, setActiveDistrict] = useState("All");
  const [loading, setLoading] = useState(true);
  const [hijriDate, setHijriDate] = useState("Loading Hijri...");

  // --- DATA FETCHING ---
  useEffect(() => {
    async function init() {
      // 1. Fetch Events
      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("approved", true)
        .order("event_date", { ascending: true });
      
      setEvents(data || []);
      setLoading(false);

      // 2. Get Hijri Date (Simulated via Intl for speed)
      const date = new Intl.DateTimeFormat('en-u-ca-islamic-uma', {day:'numeric', month:'long', year:'numeric'}).format(new Date());
      setHijriDate(date);
    }
    init();
  }, []);

  // --- SEARCH & FILTER LOGIC ---
  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.speaker.toLowerCase().includes(search.toLowerCase());
      const matchDist = activeDistrict === "All" || e.district === activeDistrict;
      return matchSearch && matchDist;
    });
  }, [search, activeDistrict, events]);

  return (
    <main className="min-h-screen bg-[#020405] text-slate-200 selection:bg-emerald-500/40">
      
      {/* 1. ULTRA-NAVBAR */}
      <nav className="sticky top-0 z-[100] border-b border-white/5 bg-[#020405]/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/40 group-hover:rotate-12 transition-transform">
              <Moon size={22} className="text-black fill-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-white uppercase">DeenEvents<span className="text-emerald-500">.</span></span>
              <span className="text-[10px] text-emerald-500 font-bold tracking-[0.2em] uppercase leading-none">Kerala Portal</span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex flex-col items-end">
                <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Current Hijri</span>
                <span className="text-xs font-bold text-emerald-400">{hijriDate}</span>
            </div>
            <Link href="/submit" className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full text-sm font-black hover:bg-emerald-400 transition-all transform hover:scale-105 shadow-xl shadow-white/5">
              <PlusCircle size={18} />
              SUBMIT PROGRAMME
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO & SEARCH */}
      <header className="relative pt-24 pb-20 px-6 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full animate-pulse delay-700" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-emerald-400 mb-8 backdrop-blur-md">
            <Sparkles size={14} /> 
            <span>THE LARGEST ISLAMIC NETWORK IN KERALA</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8">
            Spiritual <br /> <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">Gatherings.</span>
          </h1>

          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={24} />
              <input
                type="text"
                placeholder="Search by speaker, title or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-20 rounded-2xl px-16 text-lg font-medium text-white bg-black border border-white/10 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </header>

      {/* 3. QUICK STATS BAR */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] backdrop-blur-sm">
            <div className="text-center">
                <p className="text-3xl font-black text-white">{events.length}+</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Active Events</p>
            </div>
            <div className="text-center border-l border-white/5">
                <p className="text-3xl font-black text-white">14</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Districts</p>
            </div>
            <div className="text-center border-l border-white/5">
                <p className="text-3xl font-black text-white">24/7</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Live Updates</p>
            </div>
            <div className="text-center border-l border-white/5">
                <p className="text-3xl font-black text-white">100%</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Verified</p>
            </div>
        </div>
      </section>

      {/* 4. ESSENTIAL TOOLS */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
            <h3 className="text-xl font-black tracking-tight text-white uppercase italic">Daily Toolbox</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((t) => (
            <a key={t.name} href={t.url} target="_blank" className="p-8 rounded-[2rem] bg-[#0A0D0F] border border-white/5 hover:border-emerald-500/50 hover:-translate-y-2 transition-all duration-300">
              <div className="mb-6">{t.icon}</div>
              <h4 className="text-lg font-bold text-white mb-1">{t.name}</h4>
              <p className="text-xs text-gray-500 font-medium">{t.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* 5. MAIN FEED SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-40">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
                <h3 className="text-4xl font-black tracking-tighter text-white mb-2 italic">Latest Feed</h3>
                <p className="text-gray-500 text-sm font-medium">Curated Islamic events across Kerala</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
                {districts.map(d => (
                    <button 
                        key={d} 
                        onClick={() => setActiveDistrict(d)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${activeDistrict === d ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'}`}
                    >
                        {d.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>

        {loading ? (
            <div className="grid md:grid-cols-3 gap-8 animate-pulse">
                {[1,2,3,4,5,6].map(i => <div key={i} className="h-64 bg-white/5 rounded-[2.5rem]"></div>)}
            </div>
        ) : filteredEvents.length === 0 ? (
            <div className="py-40 text-center bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10">
                <Search className="mx-auto text-gray-700 mb-4" size={48} />
                <p className="text-gray-500 font-bold italic">Nothing found in {activeDistrict} matching your search.</p>
            </div>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map(event => (
                    <Link href={`/event/${event.id}`} key={event.id} className="group relative">
                        <div className="h-full bg-gradient-to-b from-[#0F1316] to-[#0A0D0F] rounded-[2.5rem] p-8 border border-white/5 hover:border-emerald-500/40 transition-all duration-500 flex flex-col justify-between overflow-hidden">
                            {/* Accent Decoration */}
                            <div className="absolute -right-8 -top-8 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
                            
                            <div>
                                <div className="flex justify-between items-center mb-8">
                                    <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
                                        {event.district}
                                    </span>
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all">
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                                <h4 className="text-2xl font-black text-white mb-3 leading-tight tracking-tight">{event.title}</h4>
                                <p className="text-gray-500 font-bold text-sm mb-10">{event.speaker}</p>
                            </div>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <div className="flex items-center gap-3 text-gray-300 font-bold text-xs uppercase tracking-tighter">
                                    <Calendar size={14} className="text-emerald-500" />
                                    <span>{new Date(event.event_date).toLocaleDateString('en-GB', {day: 'numeric', month:'short', year: 'numeric'})}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400 font-medium text-xs">
                                    <MapPin size={14} className="text-emerald-500" />
                                    <span className="truncate">{event.venue}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )}
      </section>

      {/* 6. PRO-FOOTER */}
      <footer className="bg-[#020405] border-t border-white/5 py-24 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left relative z-10">
            <div className="space-y-4">
                <h2 className="text-3xl font-black text-white italic">DeenEvents<span className="text-emerald-500">.</span></h2>
                <p className="text-gray-500 max-w-sm text-sm font-medium">Empowering the Kerala Muslim community with timely information on spiritual gatherings.</p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-6">
                <Link href="/admin" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 hover:text-emerald-500 transition-colors">
                    <LayoutDashboard size={14} /> Admin System Login
                </Link>
                <div className="flex gap-4">
                    <div className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-emerald-500 cursor-pointer transition-all"><Share2 size={20} /></div>
                    <div className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-emerald-500 cursor-pointer transition-all"><Map size={20} /></div>
                </div>
            </div>
        </div>
        <p className="text-center mt-20 text-[10px] font-black text-gray-800 tracking-[0.5em] uppercase">Built with Excellence in Kerala</p>
      </footer>
    </main>
  );
}