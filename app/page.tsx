"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { MapPin, Calendar, Clock, ArrowRight, Search } from "lucide-react";

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const supabase = createClient();
  const categories = ["All", "Lecture", "Dars", "Khutbah", "Sisters Program", "Youth"];

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await supabase.from("events").select("*").order("date", { ascending: true }).limit(12);
      if (data) setEvents(data);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section - Wider for PC */}
      <section className="bg-emerald-900 dark:bg-emerald-950 text-white pt-12 pb-16 px-6 md:px-12 md:rounded-3xl md:mt-6 shadow-xl relative overflow-hidden transition-colors">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Discover Islamic Events in Kerala</h1>
          <p className="text-emerald-100 md:text-xl mb-8">Find authentic lectures, dars, and community gatherings near you.</p>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search scholars, topics, or locations..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 bg-white shadow-lg focus:ring-4 focus:ring-emerald-500/30 outline-none text-lg transition-all"
            />
          </div>
        </div>
      </section>

      <div className="px-4 md:px-8 mt-8">
        {/* Categories Carousel */}
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat 
                  ? "bg-emerald-700 text-white shadow-md" 
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-emerald-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-6">Upcoming Events</h2>

        {/* Responsive Grid: 1 col mobile, 2 col tablet, 3 col PC */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            [1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white dark:bg-gray-900 rounded-3xl p-5 animate-pulse shadow-sm border border-gray-100 dark:border-gray-800 h-64"></div>
            ))
          ) : (
            events.map((event) => (
              <Link href={`/event/${event.id}`} key={event.id} className="block group">
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 transition-all duration-300 h-full flex flex-col relative overflow-hidden group-hover:-translate-y-1">
                  
                  {event.poster_url && (
                    <div className="w-full h-40 mb-4 rounded-xl overflow-hidden relative">
                      <img src={event.poster_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}

                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-emerald-700 text-xs font-bold rounded-full shadow-sm z-10">
                    Upcoming
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium text-sm mb-4">{event.speaker}</p>
                  
                  <div className="mt-auto space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="truncate">{event.location}, {event.district}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}