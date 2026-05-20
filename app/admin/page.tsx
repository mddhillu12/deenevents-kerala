"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {
  const [events, setEvents] = useState<any[]>([]);

  async function loadEvents() {
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("approved", false);

    setEvents(data || []);
  }

  useEffect(() => {
    loadEvents();
  }, []);

  async function approveEvent(id: number) {
    await supabase
      .from("events")
      .update({ approved: true })
      .eq("id", id);

    loadEvents();
  }

  async function deleteEvent(id: number) {
    await supabase
      .from("events")
      .delete()
      .eq("id", id);

    loadEvents();
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-black mb-10">
        Pending Events
      </h1>

      <div className="space-y-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white/5 p-6 rounded-2xl border border-white/10"
          >
            <h2 className="text-2xl font-bold">
              {event.title}
            </h2>

            <p>{event.speaker}</p>
            <p>{event.venue}</p>
            <p>{event.district}</p>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => approveEvent(event.id)}
                className="bg-emerald-600 px-6 py-3 rounded-xl"
              >
                Approve
              </button>

              <button
                onClick={() => deleteEvent(event.id)}
                className="bg-red-600 px-6 py-3 rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}