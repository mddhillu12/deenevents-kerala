// app/submit/page.tsx
"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SubmitEvent() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    speaker: "",
    date: "",
    time: "",
    location: "",
    district: "Malappuram",
    category: "Lecture",
    description: "",
  });

  const districts = ["Malappuram", "Kozhikode", "Kannur", "Kasargod", "Ernakulam", "Thrissur", "Palakkad", "Wayanad", "Idukki", "Kottayam", "Alappuzha", "Pathanamthitta", "Kollam", "Thiruvananthapuram"];
  const categories = ["Lecture", "Dars", "Khutbah", "Sisters Program", "Youth Program", "Quran Class", "Conference", "Other"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let poster_url = "";

      if (posterFile) {
        const fileName = `poster-${Date.now()}.${posterFile.name.split('.').pop()}`;
        const { error: uploadError } = await supabase.storage.from('posters').upload(fileName, posterFile);
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('posters').getPublicUrl(fileName);
        poster_url = data.publicUrl;
      }

      const { error: insertError } = await supabase.from("events").insert([{
        ...formData,
        poster_url,
        status: "pending",
        user_id: (await supabase.auth.getUser()).data.user?.id
      }]);

      if (insertError) throw insertError;

      setSuccess(true);
      setTimeout(() => router.push("/"), 2000);
    } catch (err: any) {
      setError(err.message || "Failed to submit event");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <CheckCircle2 className="w-20 h-20 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold">Event Submitted!</h2>
          <p>Waiting for admin approval...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-emerald-900 text-white pt-12 pb-16 px-6">
        <Link href="/" className="flex items-center gap-2 mb-6 text-emerald-200">
          <ArrowLeft /> Back
        </Link>
        <h1 className="text-4xl font-bold">Submit New Event</h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
          {error && <div className="bg-red-100 text-red-700 p-4 rounded-2xl">{error}</div>}

          <div>
            <label className="block text-sm font-medium mb-2">Event Poster</label>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
              <input type="file" accept="image/*" onChange={(e) => {
                if (e.target.files) {
                  setPosterFile(e.target.files[0]);
                  setPosterPreview(URL.createObjectURL(e.target.files[0]));
                }
              }} className="hidden" id="poster" />
              <label htmlFor="poster" className="cursor-pointer">
                {posterPreview ? <img src={posterPreview} className="max-h-64 mx-auto rounded-lg" /> : "Click to upload poster"}
              </label>
            </div>
          </div>

          <input type="text" placeholder="Event Title" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-4 rounded-2xl border" />
          <input type="text" placeholder="Speaker / Scholar Name" required value={formData.speaker} onChange={(e) => setFormData({...formData, speaker: e.target.value})} className="w-full p-4 rounded-2xl border" />

          <div className="grid grid-cols-2 gap-4">
            <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="p-4 rounded-2xl border" />
            <input type="text" placeholder="Time (e.g. After Asr)" required value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="p-4 rounded-2xl border" />
          </div>

          <select value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} className="w-full p-4 rounded-2xl border">
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-4 rounded-2xl border">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <textarea placeholder="Full Description" rows={5} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-4 rounded-2xl border" />

          <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg">
            {loading ? "Submitting..." : "Submit for Approval"}
          </button>
        </form>
      </div>
    </main>
  );
}