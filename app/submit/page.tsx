"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { 
  Calendar, Clock, MapPin, User, Building, 
  FileText, Upload, Loader2, ArrowLeft, CheckCircle2 
} from "lucide-react";
import Link from "next/link";

export default function SubmitEvent() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    speaker: "",
    description: "",
    date: "",
    time: "",
    location: "",
    district: "Malappuram", // Default district
    category: "Lecture",
    organizer: "",
  });

  const districts = [
    "Kasargod", "Kannur", "Wayanad", "Kozhikode", "Malappuram", 
    "Palakkad", "Thrissur", "Ernakulam", "Idukki", "Kottayam", 
    "Alappuzha", "Pathanamthitta", "Kollam", "Thiruvananthapuram"
  ];

  const categories = ["Lecture", "Dars", "Khutbah", "Conference", "Family Event", "Sisters Program", "Youth Program", "Quran Class"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPosterFile(file);
      setPosterPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let posterUrl = "";

      // 1. Handle Poster Upload to Supabase Storage if file exists
      if (posterFile) {
        const fileExt = posterFile.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("posters")
          .upload(filePath, posterFile);

        if (uploadError) throw uploadError;

        // Get Public URL
        const { data } = supabase.storage.from("posters").getPublicUrl(filePath);
        posterUrl = data.publicUrl;
      }

      // 2. Insert Event Row into Database
      const { error: insertError } = await supabase.from("events").insert([
        {
          title: formData.title,
          speaker: formData.speaker,
          description: formData.description,
          date: formData.date,
          time: formData.time,
          location: formData.location,
          district: formData.district,
          category: formData.category,
          organizer: formData.organizer,
          poster_url: posterUrl,
        },
      ]);

      if (insertError) throw insertError;

      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      alert(error.message || "Something went wrong creating the event.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-gray-100">
          <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4 animate-bounce" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Event Submitted!</h1>
          <p className="text-gray-600">Your event has been listed successfully. Redirecting home...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-emerald-900 text-white pt-6 pb-20 px-4 relative overflow-hidden rounded-b-[30px]">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        <div className="max-w-md mx-auto relative z-10">
          <Link href="/" className="flex items-center gap-2 text-emerald-100 mb-4 hover:text-white">
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Link>
          <h1 className="text-3xl font-bold">Submit Islamic Event</h1>
          <p className="text-emerald-100 text-sm">Fill in the details to publish your event across Kerala.</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-10 relative z-20">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 space-y-5">
          
          {/* Poster Upload Element */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Event Poster</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center bg-gray-50 hover:bg-gray-100 transition-colors relative cursor-pointer">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              {posterPreview ? (
                <div className="relative h-40 w-full rounded-lg overflow-hidden">
                  <img src={posterPreview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-medium">
                    Tap to change image
                  </div>
                </div>
              ) : (
                <div className="py-4 flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-gray-600">Click to upload official poster</span>
                  <span className="text-xs text-gray-400 mt-1">Supports JPG, PNG up to 5MB</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Event Title</label>
            <input type="text" name="title" required value={formData.title} onChange={handleInputChange} placeholder="e.g., Grand Islamic Lecture" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-3 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">District</label>
              <select name="district" value={formData.district} onChange={handleInputChange} className="w-full px-3 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm">
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Speaker / Scholar</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
              <input type="text" name="speaker" required value={formData.speaker} onChange={handleInputChange} placeholder="Name of the speaker" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
              <input type="date" name="date" required value={formData.date} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Time</label>
              <input type="text" name="time" required value={formData.time} onChange={handleInputChange} placeholder="e.g., After Asr" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Venue / Specific Address</label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
              <input type="text" name="location" required value={formData.location} onChange={handleInputChange} placeholder="e.g., Town Masjid Auditorium" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Organizer / Committee</label>
            <div className="relative">
              <Building className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
              <input type="text" name="organizer" value={formData.organizer} onChange={handleInputChange} placeholder="e.g., Youth Coalition Malappuram" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Event Description</label>
            <div className="relative">
              <FileText className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
              <textarea name="description" rows={4} value={formData.description} onChange={handleInputChange} placeholder="Provide topics, dynamic timelines, special arrangements for sisters, food facilities, etc." className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 text-white py-3.5 rounded-xl font-bold shadow-md hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Publish Event"}
          </button>

        </form>
      </div>
    </main>
  );
}