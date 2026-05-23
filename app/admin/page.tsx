// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { CheckCircle2, XCircle, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const supabase = createClient();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    // Add your admin emails here
    const adminEmails = ["youradmin@gmail.com"]; 
    if (user && adminEmails.includes(user.email!)) {
      setIsAdmin(true);
      fetchPendingEvents();
    } else {
      setLoading(false);
    }
  };

  const fetchPendingEvents = async () => {
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false });
    
    setEvents(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    await supabase.from("events").update({ status }).eq("id", id);
    setEvents(events.filter(e => e.id !== id));
  };

  if (!isAdmin && !loading) return <div className="pt-20 text-center">Access Denied. Admin only.</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 mb-6 text-emerald-600">
          <ArrowLeft /> Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-8">Admin Approval Queue</h1>

        {events.length === 0 ? (
          <p className="text-center py-20 text-gray-500">No pending events for review.</p>
        ) : (
          <div className="space-y-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-3xl p-6 shadow flex gap-6">
                {event.poster_url && <img src={event.poster_url} className="w-32 h-32 object-cover rounded-2xl" />}
                <div className="flex-1">
                  <h3 className="font-bold text-xl">{event.title}</h3>
                  <p className="text-emerald-600">{event.speaker}</p>
                  <p className="text-gray-500 mt-1">{event.location}, {event.district}</p>

                  <div className="flex gap-3 mt-6">
                    <button onClick={() => updateStatus(event.id, "approved")} className="flex-1 bg-emerald-600 text-white py-3 rounded-2xl font-medium">
                      Approve
                    </button>
                    <button onClick={() => updateStatus(event.id, "rejected")} className="flex-1 bg-red-600 text-white py-3 rounded-2xl font-medium">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}