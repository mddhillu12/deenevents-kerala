"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Search, MapPin, Calendar, PlusCircle, Sparkles, 
  ArrowRight, LayoutDashboard, Clock, Compass, 
  CalendarDays, Moon, Share2, BadgeCheck 
} from "lucide-react";

export default function HomePage() {
  const districts = ["All", "Malappuram", "Kozhikode", "Kannur", "Ernakulam", "Thrissur", "Kasaragod", "Palakkad", "Wayanad"];
  
  const [events, setEvents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [activeDistrict, setActiveDistrict] = useState("All");
  const [loading, setLoading] = useState(true);
  const [hijriDate, setHijriDate] = useState("");

  useEffect(() => {
    async function init() {
      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("approved", true)
        .order("event_date", { ascending: true });
      
      setEvents(data || []);
      setLoading(false);

      const date = new Intl.DateTimeFormat('en-u-ca-islamic-uma-nu-latn', {
        day: 'numeric', month: 'long', year: 'numeric'
      }).format(new Date());
      setHijriDate(date + " AH");
    }
    init();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.speaker.toLowerCase().includes(search.toLowerCase());
      const matchDist = activeDistrict === "All" || e.district === activeDistrict;
      return matchSearch && matchDist;
    });
  }, [search, activeDistrict, events]);

  const handleShare = () => {
    const shareData = { title: 'DeenEvents', text: 'Check out Islamic events in Kerala', url: window.location.origin };
    if (navigator.share) navigator.share(shareData);
    else { navigator.clipboard.writeText(window.location.origin); alert("Link Copied!"); }
  };

  return (
    <main className="min-h-screen bg-[#020405] text-slate-200">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-[100] border-b border-white/5 bg-[#020405]/80 backdrop-blur-2xl px-6 h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Moon size={22} className="text-white fill-white" />
          </div>
          <h1 className="text-xl font-black text-white uppercase tracking-tighter italic">DeenEvents<span className="text-emerald-500">.</span></h1>
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden md:block text-right">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">Islamic Date</p>
              <p className="text-xs font-bold text-emerald-400">{hijriDate}</p>
          </div>
          <Link href="/submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-full text-xs font-black transition-transform active:scale-95">SUBMIT EVENT</Link>
        </div>
      </nav>

      {/* HERO */}
      <header className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-emerald-500/5 blur-[120px] rounded-full -z-10" />
        <h2 className="text-6xl md:text-8xl font-black mb-8 text-white tracking-tighter italic leading-none">
          Kerala Islamic <span className="text-emerald-500">Events.</span>
        </h2>
        <div className="max-w-2xl mx-auto relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-500" />
          <input
            type="text" placeholder="Search speakers or programs..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-16 rounded-2xl px-16 bg-white/5 border border-white/10 outline-none focus:border-emerald-500 transition-all font-medium"
          />
        </div>
      </header>

      {/* FILTER */}
      <section className="max-w-7xl mx-auto px-6 mb-12 flex flex-wrap gap-2 justify-center">
        {districts.map(d => (
          <button key={d} onClick={() => setActiveDistrict(d)}
            className={`px-5 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${activeDistrict === d ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10'}`}
          >
            {d.toUpperCase()}
          </button>
        ))}
      </section>

      {/* EVENT FEED */}
      <section className="max-w-7xl mx-auto px-6 pb-40">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? [1,2,3].map(i => <div key={i} className="h-64 bg-white/5 rounded-[2.5rem] animate-pulse" />) :
                filteredEvents.map(event => (
                    <Link href={`/event/${event.id}`} key={event.id} className="group h-full bg-gradient-to-b from-white/5 to-transparent rounded-[2.5rem] p-8 border border-white/5 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
                        <div>
                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase rounded-full border border-emerald-500/20 mb-6 inline-block">{event.district}</span>
                            <h4 className="text-2xl font-black text-white mb-2 leading-tight">{event.title}</h4>
                            <p className="text-gray-500 font-bold text-sm italic">{event.speaker}</p>
                        </div>
                        <div className="pt-6 mt-10 border-t border-white/5 flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                           <div className="flex items-center gap-2"><Calendar size={12} className="text-emerald-500"/> {event.event_date}</div>
                           <div className="flex items-center gap-2"><MapPin size={12} className="text-emerald-500"/> {event.venue}</div>
                        </div>
                    </Link>
                ))
            }
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 px-6 flex justify-between items-center opacity-50">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em]">© 2026 DeenEvents</p>
        <div className="flex gap-4">
            <button onClick={handleShare} className="p-3 bg-white/5 rounded-full hover:text-emerald-500 transition-colors"><Share2 size={18}/></button>
            <Link href="/admin" className="p-3 bg-white/5 rounded-full hover:text-emerald-500 transition-colors"><LayoutDashboard size={18}/></Link>
        </div>
      </footer>
    </main>
  );
}