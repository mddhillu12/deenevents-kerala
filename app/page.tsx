"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function HomePage() {
  const districts = [
    "Malappuram",
    "Kozhikode",
    "Kannur",
    "Ernakulam",
    "Thrissur",
    "Kasaragod",
  ];

  const [events, setEvents] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadEvents() {
      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false });

      setEvents(data || []);
    }

    loadEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-400">
          DeenEvents Kerala
        </h1>

        <Link
          href="/submit"
          className="bg-emerald-500 hover:bg-emerald-600 px-5 py-2 rounded-xl"
        >
          Submit Event
        </Link>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          Kerala Islamic Programmes
        </h2>

        <p className="text-gray-300 max-w-2xl mx-auto mb-10">
          Discover Islamic lectures, dars, camps and community events
          happening across Kerala district-wise.
        </p>

        <input
          type="text"
          placeholder="Search events or districts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-2xl rounded-2xl px-5 py-4 text-white bg-white/10 border border-white/20"
        />
      </section>

      {/* Districts */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">Browse by District</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {districts.map((district) => (
            <Link
              key={district}
              href={`/district/${district.toLowerCase()}`}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-emerald-400 transition"
            >
              <h3 className="text-xl font-semibold">{district}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Live Events */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold mb-8">Latest Programmes</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Link
              href={`/event/${event.id}`}
              key={event.id}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-emerald-400 transition"
            >
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p>{event.district}</p>
              <p className="text-sm text-gray-400">
                {event.event_date}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
