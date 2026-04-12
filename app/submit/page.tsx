"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, Moon } from "lucide-react";

export default function SubmitPage() {
  const districts = ["Malappuram", "Kozhikode", "Kannur", "Ernakulam", "Thrissur", "Kasaragod", "Palakkad", "Wayanad"];
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: "", speaker: "", district: "", venue: "", event_date: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("events").insert([{ ...formData, approved: false }]);
    if (!error) setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#020405] text-white flex items-center justify-center p-6">
        <div className="text-center space-y-8 bg-white/5 p-12 rounded-[3rem] border border-white/10 max-w-md w-full animate-in zoom-in-95">
          <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto" />
          <h1 className="text-4xl font-black italic tracking-tighter">Success!</h1>
          <p className="text-gray-400 font-medium">Your event is submitted and waiting for approval.</p>
          <div className="flex flex-col gap-3 pt-4">
            <button onClick={() => setSubmitted(false)} className="bg-emerald-600 py-4 rounded-2xl font-black uppercase tracking-widest text-xs">Submit Another</button>
            <Link href="/" className="text-gray-500 hover:text-white transition-colors py-2 font-black uppercase tracking-widest text-[10px]">Back to Home Screen</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020405] text-white">
      <nav className="p-6 border-b border-white/5 max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center"><Moon size={18} fill="white"/></div>
            <h1 className="text-xl font-black uppercase tracking-tighter">DeenEvents<span className="text-emerald-500">.</span></h1>
        </Link>
        <Link href="/" className="text-[10px] font-black text-gray-500 flex items-center gap-2 hover:text-white transition-colors uppercase tracking-[0.2em]"><ArrowLeft size={14}/> Back Home</Link>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-black mb-10 italic tracking-tighter">Submit <span className="text-emerald-500">Event.</span></h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input required placeholder="Event Title" onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-emerald-500" />
          <input required placeholder="Speaker Name" onChange={e => setFormData({...formData, speaker: e.target.value})} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-emerald-500" />
          <div className="grid md:grid-cols-2 gap-6">
            <select required onChange={e => setFormData({...formData, district: e.target.value})} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-emerald-500 appearance-none text-gray-400">
                <option value="" className="bg-[#020405]">Select District</option>
                {districts.map(d => <option key={d} value={d} className="bg-[#020405]">{d}</option>)}
            </select>
            <input required type="date" onChange={e => setFormData({...formData, event_date: e.target.value})} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-emerald-500 text-gray-400" />
          </div>
          <input required placeholder="Venue (e.g. Mosque Name, City)" onChange={e => setFormData({...formData, venue: e.target.value})} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-emerald-500" />
          <button disabled={loading} className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-emerald-500 transition-all active:scale-95 disabled:opacity-50">
            {loading ? "Sending..." : "Submit for Approval"}
          </button>
        </form>
      </div>
    </main>
  );
}