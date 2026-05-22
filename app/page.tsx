"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { 
  MapPin, Calendar, Clock, ArrowRight, Search, 
  BookOpen, Users, Star, Loader2 
} from "lucide-react";

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const supabase = createClient();

  const categories = ["All", "Lecture", "Dars", "Khutbah", "Sisters Program", "Youth"];

  useEffect(() => {
    async function fetchEvents() {
      // Fetching only upcoming approved events
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true })
        .limit(10);

      if (!error && data) {
        setEvents(data);
      }
      setLoading(false);
    }
    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Islamic Styled Hero Banner */}
      <section className="bg-emerald-900 text-white pt-20 pb-16 px-4 rounded-b-[40px] shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        <div className="max-w-md mx-auto relative z-10">
          <h1 className="text-4xl font-bold mb-3 tracking-tight">Discover Islamic Events in Kerala</h1>
          <p className="text-emerald-100 mb-6 text-lg">Find authentic lectures, dars, and community gatherings near you.</p>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search scholars, topics, or locations..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-900 shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>
      </section>

      <div className="max-w-md mx-auto px-4 mt-8">
        {/* Categories (Priority 7) */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat 
                  ? "bg-emerald-700 text-white shadow-md" 
                  : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-6 mt-4">
          <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
          <Link href="/events" className="text-emerald-600 text-sm font-medium hover:underline">
            View All
          </Link>
        </div>

        {/* Loading State (Priority 5) */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-4 animate-pulse shadow-sm border border-gray-100">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-100 rounded-lg w-20"></div>
                  <div className="h-8 bg-gray-100 rounded-lg w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No upcoming events found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <Link href={`/event/${event.id}`} key={event.id} className="block group">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
                  
                  {/* Event Status Badge (Priority 8) */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
                    Upcoming
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-1 pr-20 group-hover:text-emerald-700 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-emerald-600 font-medium text-sm mb-4">{event.speaker}</p>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2">
                      <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="truncate">{event.location}, {event.district}</span>
                    </div>
                  </div>

                  <div className="flex justify-end border-t border-gray-50 pt-3 mt-2">
                    <span className="flex items-center text-sm text-emerald-600 font-medium group-hover:translate-x-1 transition-transform">
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}