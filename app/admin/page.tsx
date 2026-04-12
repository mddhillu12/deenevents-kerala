"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loadEvents() {
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("approved", false)
      .order("created_at", { ascending: false });

    setEvents(data || []);
  }

  async function approveEvent(id: number) {
    await supabase
      .from("events")
      .update({ approved: true })
      .eq("id", id);

    loadEvents();
  }

  async function signIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      setUser(data.user);
      loadEvents();
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        loadEvents();
      }
    });
  }, []);

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8">
          <h1 className="text-3xl font-bold mb-6">
            Admin Login
          </h1>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full mb-4 rounded-xl bg-white/5 border border-white/10 px-4 py-3"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full mb-6 rounded-xl bg-white/5 border border-white/10 px-4 py-3"
          />

          <button
            onClick={signIn}
            className="w-full bg-emerald-600 py-3 rounded-xl font-bold"
          >
            Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <button
            onClick={signOut}
            className="bg-red-600 px-4 py-2 rounded-xl"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold">
                {event.title}
              </h2>
              <p>{event.district}</p>
              <p>{event.speaker}</p>

              <button
                onClick={() => approveEvent(event.id)}
                className="mt-4 bg-emerald-600 px-4 py-2 rounded-xl"
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
