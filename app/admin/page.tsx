"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { CheckCircle2, XCircle, Trash2, Loader2, ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingEvents();
  }, []);

  const fetchPendingEvents = async () => {
    setLoading(true);
    // Fetch only unapproved events
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("approved", false)
      .order("created_at", { ascending: false });

    if (!error && data) setEvents(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: boolean) => {
    const { error } = await supabase
      .from("events")
      .update({ approved: status })
      .eq("id", id);

    if (!error) {
      setEvents(events.filter(e => e.id !== id));
    } else {
      alert("Error updating event status");
    }
  };

  const deleteEvent = async (id: string) => {
    if (!window.confirm("Delete this event permanently?")) return;
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (!error) setEvents(events.filter(e => e.id !== id));
  };

  if (loading) return (
    <div className="min-h-screen bg-[#020408] flex items-center justify-center">
      <Loader2 className="animate-spin text-emerald-500" size={32} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020408] p-6 text-slate-100">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-slate-500 text-xs mb-6 hover:text-white">
          <ArrowLeft size={14} /> Back to Home
        </Link>
        
        <h1 className="text-2xl font-black text-white flex items-center gap-3 mb-8">
          <ShieldAlert className="text-emerald-500" /> Admin Approval Queue
        </h1>

        {events.length === 0 ? (
          <div className="text-center py-20 border border-slate-900 rounded-2xl bg-[#040811]">
            <p className="text-slate-500">All caught up! No pending events.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="bg-[#040811] border border-slate-900 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white">{event.title}</h3>
                  <p className="text-xs text-slate-500">{event.venue} • {event.date}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => updateStatus(event.id, true)}
                    className="p-3 bg-emerald-950/40 text-emerald-400 rounded-xl hover:bg-emerald-900"
                  >
                    <CheckCircle2 size={20} />
                  </button>
                  <button 
                    onClick={() => deleteEvent(event.id)}
                    className="p-3 bg-rose-950/40 text-rose-400 rounded-xl hover:bg-rose-900"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}