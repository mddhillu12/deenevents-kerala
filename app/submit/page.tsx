"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SubmitPage() {
  const [title, setTitle] = useState("");
  const [district, setDistrict] = useState("");
  const [venue, setVenue] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("events").insert({
      title,
      district,
      venue,
      event_date: eventDate,
      speaker,
      description,
      organization: "User Submission",
    });

    if (!error) {
      alert("Programme submitted successfully!");
      setTitle("");
      setDistrict("");
      setVenue("");
      setEventDate("");
      setSpeaker("");
      setDescription("");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-10">
        <h1 className="text-4xl font-bold mb-8">
          Submit a Programme
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Programme Title"
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="District"
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            placeholder="Venue"
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            value={speaker}
            onChange={(e) => setSpeaker(e.target.value)}
            placeholder="Speaker"
            className="w-full border rounded-xl px-4 py-3"
          />
          <input
  type="file"
  accept="image/*"
  onChange={(e) => setPoster(e.target.files?.[0] || null)}
  className="w-full border rounded-xl px-4 py-3"
/>


          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Programme Description"
            className="w-full border rounded-xl px-4 py-3"
          />

          <button className="w-full bg-emerald-600 text-white py-4 rounded-xl">
            Submit Programme
          </button>
        </form>
      </div>
    </main>
  );
}
