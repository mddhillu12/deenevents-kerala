"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function SubmitPage() {
  const [title, setTitle] = useState("");
  const [district, setDistrict] = useState("");
  const [venue, setVenue] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [description, setDescription] = useState("");
  const [organization, setOrganization] = useState("User Submission");
  const [poster, setPoster] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function generateDescription() {
    if (!title || !speaker) {
        alert("Please enter a Title and Speaker first!");
        return;
    }
    const autoText = `Join us for ${title}, a beneficial Islamic programme led by ${speaker} at ${venue} in ${district}. This session will provide valuable reminders and spiritual guidance. Everyone is warmly welcome.`;
    setDescription(autoText);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    let posterUrl = "";

    if (poster) {
      // Clean filename for Supabase
      const fileName = `${Date.now()}-${poster.name.replace(/\s+/g, '-')}`;
      const { error: uploadError } = await supabase.storage
        .from("posters")
        .upload(fileName, poster);

      if (!uploadError) {
        const { data } = supabase.storage.from("posters").getPublicUrl(fileName);
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
      approved: false, // Wait for admin approval
    });

    setLoading(false);

    if (error) {
      alert("Submission failed: " + error.message);
      return;
    }

    setSubmitted(true);
    
    // WhatsApp Share
    const message = `🕌 *${title}*\n📍 ${venue}, ${district}\n📅 ${eventDate}\n🎤 ${speaker}\n\nSubmitted to DeenEvents Kerala!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  }

  if (submitted) {
    return (
        <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
            <div className="text-center space-y-6 bg-white/5 p-12 rounded-[3rem] border border-white/10">
                <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto" />
                <h1 className="text-3xl font-bold">Submitted Successfully!</h1>
                <p className="text-gray-400">Your event is waiting for admin approval.</p>
                <button onClick={() => setSubmitted(false)} className="text-emerald-400 font-bold underline">Submit another</button>
            </div>
        </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-16">
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl backdrop-blur-md">
        <h1 className="text-4xl font-bold mb-2">Submit Programme</h1>
        <p className="text-gray-400 mb-8">Add Islamic events happening across Kerala.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Programme Title" className="input-style" required />
            <input value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="District (e.g. Malappuram)" className="input-style" required />
          </div>

          <input value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Venue / Masjid Name" className="input-style" required />

          <div className="grid md:grid-cols-2 gap-4">
            <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="input-style" required />
            <input value={speaker} onChange={(e) => setSpeaker(e.target.value)} placeholder="Speaker Name" className="input-style" required />
          </div>

          <button type="button" onClick={generateDescription} className="w-full bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 py-3 rounded-xl border border-indigo-500/30 flex items-center justify-center gap-2 transition-all">
            <Sparkles className="w-4 h-4" /> AI Description
          </button>

          <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write something about the event..." className="input-style" />

          <div className="space-y-2">
            <label className="text-xs text-gray-500 ml-2">UPLOAD POSTER (OPTIONAL)</label>
            <input type="file" accept="image/*" onChange={(e) => setPoster(e.target.files?.[0] || null)} className="input-style" />
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-4">
            <button disabled={loading} className="bg-emerald-600 hover:bg-emerald-500 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-900/20">
              {loading ? "Processing..." : "Submit to Public"}
            </button>

            <Link href={`/poster?title=${encodeURIComponent(title)}&speaker=${encodeURIComponent(speaker)}&venue=${encodeURIComponent(venue)}&date=${encodeURIComponent(eventDate)}`} className="bg-white/10 hover:bg-white/20 py-4 rounded-2xl font-bold text-center transition-all">
              Create AI Poster
            </Link>
          </div>
        </form>
      </div>

      <style jsx>{`
        .input-style {
          width: 100%;
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.75rem 1rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-style:focus {
          border-color: #10b981;
        }
      `}</style>
    </main>
  );
}