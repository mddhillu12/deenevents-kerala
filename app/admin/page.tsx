"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { LogOut, CheckCircle, ShieldAlert } from "lucide-react";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadEvents() {
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("approved", false)
      .order("created_at", { ascending: false });

    setEvents(data || []);
  }

  async function approveEvent(id: number) {
    const { error } = await supabase
      .from("events")
      .update({ approved: true })
      .eq("id", id);

    if (error) alert("Error approving: " + error.message);
    loadEvents();
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault(); // This allows the "Enter" key to work
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login failed: " + error.message);
    } else {
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
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">Checking credentials...</div>;
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6">
        <form onSubmit={handleSignIn} className="w-full max-w-md bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-md shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="bg-emerald-500/20 p-4 rounded-full">
                <ShieldAlert className="text-emerald-500 w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-center">Admin Access</h1>
          <p className="text-gray-400 text-center mb-8 text-sm">Sign in to manage Kerala Islamic programmes.</p>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin Email"
            className="w-full mb-4 rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-emerald-500 transition-all"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full mb-6 rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-emerald-500 transition-all"
            required
          />

          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20">
            Secure Login
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10 bg-white/5 p-6 rounded-3xl border border-white/10">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>

          <button onClick={signOut} className="bg-red-600/20 hover:bg-red-600/40 text-red-400 px-5 py-2.5 rounded-xl border border-red-500/20 flex items-center gap-2 transition-all">
            <LogOut size={18} /> Logout
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            Pending Approvals <span className="bg-emerald-600 text-[10px] px-2 py-0.5 rounded-full">{events.length}</span>
        </h2>

        {events.length === 0 ? (
            <div className="bg-white/5 border border-dashed border-white/10 rounded-3xl p-20 text-center">
                <CheckCircle className="mx-auto w-12 h-12 text-gray-600 mb-4" />
                <p className="text-gray-500 font-medium">No pending programmes to approve.</p>
            </div>
        ) : (
            <div className="grid gap-4">
            {events.map((event) => (
              <div key={event.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold group-hover:text-emerald-400 transition-colors">{event.title}</h2>
                        <p className="text-gray-400 text-sm">📍 {event.venue}, {event.district}</p>
                        <p className="text-gray-400 text-sm">🎤 {event.speaker} | 📅 {event.event_date}</p>
                    </div>
                    <button onClick={() => approveEvent(event.id)} className="bg-emerald-600 hover:bg-emerald-500 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap">
                        Approve Now
                    </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}