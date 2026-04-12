"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Sparkles } from "lucide-react";

export default function SubmitPage() {
  const [title, setTitle] = useState("");
  const [district, setDistrict] = useState("");
  const [venue, setVenue] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [description, setDescription] = useState("");
  const [organization, setOrganization] =
    useState("User Submission");
  const [poster, setPoster] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  function generateDescription() {
    const autoText = `Join us for ${title}, a beneficial Islamic programme led by ${speaker} at ${venue} in ${district}. This session will provide valuable reminders, spiritual guidance, and practical lessons for daily life. Everyone is warmly welcome to attend and benefit.`;

    setDescription(autoText);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    let posterUrl = "";

    // Upload poster if selected
    if (poster) {
      const fileName = `${Date.now()}-${poster.name}`;

      const { error: uploadError } = await supabase.storage
        .from("posters")
        .upload(fileName, poster);

      if (!uploadError) {
        const { data } = supabase.storage
          .from("posters")
          .getPublicUrl(fileName);

        posterUrl = data.publicUrl;
      }
    }

    const { error } = await supabase.from("events").insert({
      title,
      district,
      venue,
      event_date: eventDate,
      speaker,
      description,
      organization,
      poster_url: posterUrl,
      approved: false,
    });

    setLoading(false);

    if (error) {
      alert("Submission failed");
      return;
    }

    alert("Programme submitted successfully!");
    const message = `🕌 *${title}*\n📍 ${venue}, ${district}\n📅 ${eventDate}\n🎤 ${speaker}\n\n${description}`;

window.open(
  `https://wa.me/?text=${encodeURIComponent(message)}`,
  "_blank"
);


    setTitle("");
    setDistrict("");
    setVenue("");
    setEventDate("");
    setSpeaker("");
    setDescription("");
    setPoster(null);
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-16">
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl">
        <h1 className="text-4xl font-bold mb-2">
          Submit a Programme
        </h1>
        <p className="text-gray-400 mb-8">
          Add Islamic programmes happening across Kerala.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Programme Title"
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-emerald-500"
          />

          <input
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="District"
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-emerald-500"
          />

          <input
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            placeholder="Venue"
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-emerald-500"
          />

          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-emerald-500"
          />

          <input
            value={speaker}
            onChange={(e) => setSpeaker(e.target.value)}
            placeholder="Speaker"
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-emerald-500"
          />

          {/* AI DESCRIPTION */}
          <button
            type="button"
            onClick={generateDescription}
            className="w-full bg-purple-600 hover:bg-purple-500 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Generate AI Description
          </button>

          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Programme Description"
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-emerald-500"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setPoster(e.target.files?.[0] || null)
            }
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3"
          />

          {/* ACTION BUTTONS */}
          <div className="grid md:grid-cols-2 gap-4">
            <button
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-2xl font-bold"
            >
              {loading ? "Submitting..." : "Submit Programme"}
            </button>

            <Link
              href={`/poster?title=${encodeURIComponent(
                title
              )}&speaker=${encodeURIComponent(
                speaker
              )}&venue=${encodeURIComponent(
                venue
              )}&date=${encodeURIComponent(eventDate)}`}
              className="w-full bg-purple-700 hover:bg-purple-600 py-4 rounded-2xl font-bold text-center"
            >
              Generate Poster
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
