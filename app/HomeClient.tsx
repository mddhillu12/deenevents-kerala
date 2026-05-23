// app/HomeClient.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, Calendar, Clock, Users, Search } from "lucide-react";

type Event = {
  id: string;
  title: string;
  speaker: string;
  date: string;
  time: string;
  location: string;
  district: string;
  category: string;
  poster_url?: string;
};

export default function HomeClient({
  initialEvents,
  districts,
  initialSearch = "",
  initialCategory = "All",
  initialDistrict = "All Districts"
}: {
  initialEvents: Event[];
  districts: string[];
  initialSearch?: string;
  initialCategory?: string;
  initialDistrict?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [district, setDistrict] = useState(initialDistrict);
  const [events, setEvents] = useState(initialEvents);

  const categories = ["All", "Lecture", "Dars", "Khutbah", "Sisters Program", "Youth"];

  // Update URL when filters change
  const updateFilters = (newSearch: string, newCategory: string, newDistrict: string) => {
    const params = new URLSearchParams();
    if (newSearch) params.set("search", newSearch);
    if (newCategory !== "All") params.set("category", newCategory);
    if (newDistrict !== "All Districts") params.set("district", newDistrict);

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              updateFilters(e.target.value, category, district);
            }}
            placeholder="Search events, scholars, or places..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            updateFilters(search, e.target.value, district);
          }}
          className="px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={district}
          onChange={(e) => {
            setDistrict(e.target.value);
            updateFilters(search, category, e.target.value);
          }}
          className="px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
        >
          {districts.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.length === 0 ? (
          <div className="col-span-full text-center py-20 text-gray-500">
            No events found for your search.
          </div>
        ) : (
          events.map((event) => (
            <Link href={`/event/${event.id}`} key={event.id} className="group">
              <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                {event.poster_url && (
                  <div className="relative h-52">
                    <img 
                      src={event.poster_url} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full">
                      {event.category}
                    </div>
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-xl mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-emerald-600 font-medium mb-4">{event.speaker}</p>

                  <div className="mt-auto space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                      <Clock className="w-4 h-4 ml-3" />
                      <span>{event.time}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{event.location}, {event.district}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}