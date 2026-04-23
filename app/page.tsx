"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Search, MapPin, Calendar, Plus, Moon, Sun, Compass 
} from "lucide-react";

export default function HomePage() {
  const districts = ["All", "Malappuram", "Kozhikode", "Kannur", "Ernakulam", "Thrissur", "Kasaragod", "Palakkad", "Wayanad"];
  
  const [events, setEvents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [activeDistrict, setActiveDistrict] = useState("All");
  const [loading, setLoading] = useState(true);
  const [hijriDate, setHijriDate] = useState("");
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    async function init() {
      // --- THE FIX IS HERE ---
      // We removed .eq('approved', true) so you can see your test events
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });
      
      if (error) console.error("Supabase Error:", error);
      setEvents(data || []);
      setLoading(false);

      // Kerala Hijri Date Logic
      const date = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
        day: 'numeric', month: 'long', year: 'numeric'
      }).format(new Date());
      setHijriDate(date);

      // Prayer Times API
      fetch("https://api.aladhan.com/v1/timingsByCity?city=Malappuram&country=India&method=2")
        .then(res => res.json())
        .then(data => setPrayerTimes(data.data.timings));
    }
    init();

    // Theme logic
    const theme = localStorage.getItem("theme") || "dark";
    setDarkMode(theme === "dark");
    if (theme === "dark") document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // --- DISTRICT CASE-SENSITIVITY FIX ---
  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const searchTerm = search.toLowerCase();
      const matchSearch = 
        (e.title?.toLowerCase() || "").includes(searchTerm) || 
        (e.speaker?.toLowerCase() || "").includes(searchTerm);
      
      const matchDist = activeDistrict === "All" || 
        (e.district?.toLowerCase() === activeDistrict.toLowerCase());
        
      return matchSearch && matchDist;
    });
  }, [search, activeDistrict, events]);

  return (
    <main className="min-h-screen bg-white dark:bg-[#020405] text-slate-900 dark:text-slate-200 transition-colors">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-[100] border-b border-black/5 dark:border-white/5 bg-white/80 dark:bg-[#020405]/80 backdrop-blur-xl px-6 h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
            <Moon size={22} className="text-white fill-white" />
          </div>
          <h1 className="text-xl font-black uppercase tracking-tighter italic">DeenEvents</h1>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Islamic Date</p>
              <p className="text-xs font-bold text-emerald-500">{hijriDate}</p>
          </div>
          <button onClick={toggleTheme} className="p-2 rounded-lg bg-black/5 dark:bg-white/5">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link href="/submit" className="bg-emerald-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase">Submit</Link>
        </div>
      </nav>

      {/* PRAYER TIMES */}
      {prayerTimes && (
        <div className="bg-emerald-600/5 border-b border-emerald-500/10 py-2 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-6 flex gap-6 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            <span>Fajr: {prayerTimes.Fajr}</span>
            <span>Dhuhr: {prayerTimes.Dhuhr}</span>
            <span>Asr: {prayerTimes.Asr}</span>
            <span className="text-white bg-emerald-600 px-2 rounded">Maghrib: {prayerTimes.Maghrib}</span>
            <span>Isha: {prayerTimes.Isha}</span>
          </div>
        </div>
      )}

      {/* SEARCH */}
      <header className="py-16 px-6 text-center">
        <h2 className="text-5xl font-black mb-8 italic">Kerala Islamic <span className="text-emerald-500">Events.</span></h2>
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text" placeholder="Search by speaker or title..." 
            className="w-full h-14 rounded-2xl px-14 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none focus:border-emerald-500 transition-all"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {/* DISTRICTS */}
      <section className="max-w-7xl mx-auto px-6 mb-12 flex flex-wrap gap-2 justify-center">
        {districts.map(d => (
          <button key={d} onClick={() => setActiveDistrict(d)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${activeDistrict === d ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-black/5 dark:bg-white/5 text-gray-400'}`}
          >
            {d}
          </button>
        ))}
      </section>

      {/* LIST */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? <p className="text-center col-span-full font-bold animate-pulse">Loading events...</p> :
            filteredEvents.map(event => (
              <div key={event.id} className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2rem] p-8 shadow-xl flex flex-col justify-between">
                <div>
                  <span className="bg-emerald-500/10 text-emerald-500 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">{event.district}</span>
                  <h4 className="text-2xl font-black italic mb-2 leading-tight">{event.title}</h4>
                  <p className="text-gray-500 font-bold text-sm mb-6">By {event.speaker}</p>
                  
                  <div className="space-y-2 text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                    <div className="flex items-center gap-2"><MapPin size={14} className="text-emerald-500"/> {event.venue}</div>
                    <div className="flex items-center gap-2"><Calendar size={14} className="text-emerald-500"/> {event.event_date}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-8">
                    <button 
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue + " " + event.district)}`, '_blank')}
                      className="py-3 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest"
                    >Navigate</button>
                    <Link 
  href={`/poster?title=${event.title}&speaker=${event.speaker}&venue=${event.venue}&date=${event.event_date}&district=${event.district}&organization=DeenEvents`}
                      className="py-3 bg-white/10 text-center rounded-xl text-[9px] font-black uppercase tracking-widest"
                    >Poster</Link>
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </main>
  );
}