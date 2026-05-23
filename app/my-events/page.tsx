// app/my-events/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Calendar, MapPin, Clock, Edit, Trash2 } from "lucide-react";

export default function MyEvents() {
  const supabase = createClient();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data } = await supabase
          .from("events")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        setEvents(data || []);
      }
      setLoading(false);
    };
    init();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Sign in to view your events</h2>
          <Link href="/login" className="bg-emerald-600 text-white px-8 py-3 rounded-2xl">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Submissions</h1>
        <p className="text-gray-600 mb-8">Events you have submitted</p>

        {loading ? (
          <p>Loading...</p>
        ) : events.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center">
            <p>You haven't submitted any events yet.</p>
            <Link href="/submit" className="text-emerald-600 mt-4 inline-block">Submit New Event →</Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-3xl p-6 shadow-sm flex gap-6">
                {event.poster_url && (
                  <img src={event.poster_url} className="w-28 h-28 object-cover rounded-2xl" alt="" />
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-xl">{event.title}</h3>
                  <p className="text-emerald-600">{event.speaker}</p>
                  <div className="flex gap-4 text-sm text-gray-500 mt-3">
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                    <span>{event.time}</span>
                  </div>
                  <p className="text-gray-600 mt-1">{event.location}, {event.district}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}