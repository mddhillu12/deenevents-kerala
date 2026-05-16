"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, CheckCircle2, Calendar, MapPin, User, FileText, Building2 } from "lucide-react";

export default function SubmitPage() {
  const router = useRouter();
  const districts = ["Malappuram", "Kozhikode", "Kannur", "Ernakulam", "Thrissur", "Kasaragod", "Palakkad", "Wayanad"];

  const [formData, setFormData] = useState({
    title: "",
    speaker: "",
    venue: "",
    district: "Malappuram",
    event_date: "",
    organization: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    if (!formData.title || !formData.speaker || !formData.venue || !formData.event_date) {
      setErr("Please populate all required fields.");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("events")
      .insert([
        {
          title: formData.title,
          speaker: formData.speaker,
          venue: formData.venue,
          district: formData.district,
          event_date: formData.event_date,
          organization: formData.organization || "Independent Community Organizer"
        }
      ]);

    if (error) {
      setErr(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        router.push("/");
      }, 2500);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-[#07090e] text-[#f1f5f9] flex flex-col justify-center items-center px-6">
        <div className="bg-[#0f1422] border border-emerald-500/20 rounded-3xl p-10 max-w-sm text-center shadow-2xl animate-in fade-in zoom-in-95 duration-300">
          <CheckCircle2 size={50} className="text-emerald-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-xl font-bold mb-2 text-white">Event Submitted Successfully</h2>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            The program directory has locked in your entry. Rerouting your interface back to the live main grid feed context...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07090e] text-[#f1f5f9] py-12 px-6 antialiased">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-300 mb-8 transition-colors group">
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Directory
        </Link>

        <header className="mb-10">
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">Publish a Program</h2>
          <p className="text-sm text-slate-400 font-medium">Add verified gatherings, lectures, and community conventions to our directory.</p>
        </header>

        {err && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-[#0f1422] border border-slate-800/40 rounded-3xl p-8 shadow-xl">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5"><FileText size={12} /> Program Headline/Title *</label>
            <input 
              type="text" required placeholder="e.g., Annual Youth Spiritual Convention"
              className="w-full h-12 rounded-xl bg-slate-900/60 border border-slate-800 outline-none text-slate-200 px-4 text-xs font-medium focus:border-emerald-500/50 transition-colors"
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5"><User size={12} /> Key Speaker / Scholar *</label>
              <input 
                type="text" required placeholder="Name of scholar"
                className="w-full h-12 rounded-xl bg-slate-900/60 border border-slate-800 outline-none text-slate-200 px-4 text-xs font-medium focus:border-emerald-500/50 transition-colors"
                onChange={e => setFormData({...formData, speaker: e.target.value})}
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5"><Building2 size={12} /> Host Organization</label>
              <input 
                type="text" placeholder="e.g., Local Committee / Organization Name"
                className="w-full h-12 rounded-xl bg-slate-900/60 border border-slate-800 outline-none text-slate-200 px-4 text-xs font-medium focus:border-emerald-500/50 transition-colors"
                onChange={e => setFormData({...formData, organization: e.target.value})}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5"><MapPin size={12} /> Select District *</label>
              <select 
                className="w-full h-12 rounded-xl bg-slate-900/60 border border-slate-800 outline-none text-slate-200 px-4 text-xs font-medium focus:border-emerald-500/50 transition-colors cursor-pointer"
                value={formData.district}
                onChange={e => setFormData({...formData, district: e.target.value})}
              >
                {districts.map(d => <option key={d} value={d} className="bg-[#0f1422] text-slate-200">{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5"><Calendar size={12} /> Event Date String *</label>
              <input 
                type="text" required placeholder="e.g., May 24, After Maghrib"
                className="w-full h-12 rounded-xl bg-slate-900/60 border border-slate-800 outline-none text-slate-200 px-4 text-xs font-medium focus:border-emerald-500/50 transition-colors"
                onChange={e => setFormData({...formData, event_date: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5"><MapPin size={12} /> Specific Venue Details *</label>
            <input 
              type="text" required placeholder="e.g., Town Juma Masjid Auditorium, Malappuram"
              className="w-full h-12 rounded-xl bg-slate-900/60 border border-slate-800 outline-none text-slate-200 px-4 text-xs font-medium focus:border-emerald-500/50 transition-colors"
              onChange={e => setFormData({...formData, venue: e.target.value})}
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs uppercase tracking-wider transition-opacity shadow-lg shadow-emerald-500/10 hover:opacity-95 disabled:opacity-50"
          >
            {loading ? "Registering and cataloging..." : "Publish to Public Feed"}
          </button>
        </form>
      </div>
    </main>
  );
}