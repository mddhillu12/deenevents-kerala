"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { 
  Sparkles, MapPin, Calendar, Clock, PlusCircle, 
  Bookmark, User, Search, Flame 
} from "lucide-react";

export default function Home() {
  const supabase = createClient();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("approved", true) // ONLY SHOW APPROVED EVENTS
        .order("date", { ascending: true });

      if (data) setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-[#020408] text-slate-100 pb-20">
      {/* HEADER SECTION */}
      <header className="px-6 py-8">
        <div className="max-w-6xl mx-auto flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Gatherings</h1>
            <p className="text-slate-500 text-xs mt-1">Kerala's verified event network.</p>
          </div>
          <button className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-slate-400 hover:text-white">
            <Search size={18} />
          </button>
        </div>
      </header>

      {/* FEED GRID */}
      <main className="max-w-6xl mx-auto px-6">
        {loading ? (
          /* SKELETON LOADERS */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-72 bg-slate-900/50 rounded-3xl animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link key={event.id} href={`/event/${event.id}`} className="group bg-[#040811] border border-slate-900 rounded-3xl overflow-hidden hover:border-emerald-900/50 transition-all shadow-lg">
                <div className="h-40 bg-slate-900 relative">
                  <img src={event.image_url || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform" />
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white uppercase">{event.district}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-black text-white mb-3 group-hover:text-emerald-400 transition-colors">{event.title}</h3>
                  <div className="space-y-2 text-[11px] text-slate-500">
                    <div className="flex items-center gap-2"><Calendar size={12} /> {event.date}</div>
                    <div className="flex items-center gap-2"><MapPin size={12} /> {event.venue}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 w-full bg-[#020408]/90 backdrop-blur-lg border-t border-slate-900 p-3 flex justify-around items-center z-50">
        <Link href="/" className="flex flex-col items-center gap-1 text-emerald-500">
          <Flame size={18} />
          <span className="text-[8px] font-black uppercase">Home</span>
        </Link>
        <Link href="/poster" className="flex flex-col items-center gap-1 text-slate-500 hover:text-white">
          <Sparkles size={18} />
          <span className="text-[8px] font-black uppercase">AI Canvas</span>
        </Link>
        <Link href="/submit" className="bg-emerald-600 text-white p-3 rounded-full -mt-8 border-4 border-[#020408] shadow-lg">
          <PlusCircle size={24} />
        </Link>
        <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-white">
          <Bookmark size={18} />
          <span className="text-[8px] font-black uppercase">Saved</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-white">
          <User size={18} />
          <span className="text-[8px] font-black uppercase">Profile</span>
        </button>
      </div>
    </div>
  );
}