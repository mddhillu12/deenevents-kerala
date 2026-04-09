"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);

  async function loadSubmissions() {
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    setSubmissions(data || []);
  }

  async function approveEvent(id: number) {
    await supabase
      .from("events")
      .update({ approved: true })
      .eq("id", id);

    loadSubmissions();
  }

  useEffect(() => {
    loadSubmissions();
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid gap-6">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            className="bg-white/5 rounded-2xl border border-white/10 p-6"
          >
            <h2 className="text-2xl font-bold">
              {submission.title}
            </h2>
            <p>{submission.district}</p>
            <p>{submission.speaker}</p>

            <button
              onClick={() => approveEvent(submission.id)}
              className="mt-4 bg-emerald-600 px-4 py-2 rounded-xl"
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
