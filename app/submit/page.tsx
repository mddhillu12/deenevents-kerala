"use client";

import { useState } from "react";
// Using absolute relative path to bypass the @ alias issue
import { createClient } from "../../utils/supabase/client";
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
  const [smartText, setSmartText] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    speaker: "",
    description: "",
    date: "",
    time: "",
    location: "",
    district: "Malappuram",
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

  const handleAIParse = () => {
    if (!smartText) return;
    
    let newFormData = { ...formData };
    
    const dateMatch = smartText.match(/\b\d{1,2}[-./]\d{1,2}[-./]?\d{0,4}\b/);
    if (dateMatch) {
        newFormData.date = dateMatch[0]; 
    }

    const timeMatch = smartText.match(/\b\d{1,2}:\d{2}\s?(AM|PM|am|pm)?\b/i) || smartText.match(/\b(?:After|Before)?\s?(Fajr|Zuhr|Asr|Maghrib|Isha)\b/i);
    if (timeMatch) newFormData.time = timeMatch[0];

    const speakerMatch = smartText.match(/(?:Usthad|Moulavi|Sheikh|Shaykh)\s+([A-Za-z\s]+)/i);
    if (speakerMatch) newFormData.speaker = speakerMatch[0].trim();
    
    newFormData.description = smartText;

    setFormData(newFormData);
    alert("✨ AI successfully extracted details from your text!");
    setSmartText(""); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let posterUrl = "";

      if (posterFile) {
        const fileExt = posterFile.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("posters")
          .upload(filePath, posterFile);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("posters").getPublicUrl(filePath);
        posterUrl = data.publicUrl;
      }

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4 transition-colors">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-gray-100 dark:border-gray-800 transition-colors">
          <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4 animate-bounce" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Event Submitted!</h1>
          <p className="text-gray-600 dark:text-gray-400">Your event has been listed successfully. Redirecting home...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24 transition-colors">
      <div className="bg-emerald-900 dark:bg-emerald-950 text-white pt-10 pb-20 px-4 md:px-8 md:pt-12 md:rounded-3xl md:mx-4 md:mt-4 relative overflow-hidden rounded-b-[30px] shadow-lg transition-colors">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        <div className="max-w-2xl mx-auto relative z-10">
          <Link href="/" className="flex items-center gap-2 text-emerald-100 mb-4 hover:text-white w-max">
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Submit Islamic Event</h1>
          <p className="text-emerald-100 text-sm md:text-base">Fill in the details to publish your event across Kerala.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-10 relative z-20">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 space-y-5 transition-colors">
          
          {/* ✨ AI Smart Paste Section */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-4 md:p-5 mb-6 transition-colors">
            <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 mb-2 flex items-center gap-2">
              ✨ AI Smart Auto-Fill
            </h3>
            <p className="text-xs md:text-sm text-emerald-600 dark:text-emerald-500/80 mb-3">
              Paste a WhatsApp message. We will automatically fill out the speaker, time, date, and description for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="text" 
                value={smartText}
                onChange={(e) => setSmartText(e.target.value)}
                placeholder="Paste WhatsApp event forward here..." 
                className="flex-1 px-4 py-3 text-sm rounded-xl border border-emerald-200 dark:border-emerald-800/50 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-gray-100 transition-colors"
              />
              <button 
                type="button" 
                onClick={handleAIParse}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-sm transition-colors whitespace-nowrap"
              >
                Auto-Fill
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Event Poster</label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 text-center bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative cursor-pointer">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
              />
              {posterPreview ? (
                <div className="relative h-48 md:h-64 w-full rounded-lg overflow-hidden">
                  <img src={posterPreview} alt="Preview" className="w-full h-full object-contain bg-black/5" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-medium opacity-0 hover:opacity-100 transition-opacity">
                    Tap to change image
                  </div>
                </div>
              ) : (
                <div className="py-6 flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Click to upload official poster</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">Supports JPG, PNG up to 5MB</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Event Title</label>
            <input type="text" name="title" required value={formData.title} onChange={handleInputChange} placeholder="e.g., Grand Islamic Lecture" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition-colors">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">District</label>
              <select name="district" value={formData.district} onChange={handleInputChange} className="w-full px-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition-colors">
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Speaker / Scholar</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input type="text" name="speaker" required value={formData.speaker} onChange={handleInputChange} placeholder="Name of the speaker" className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-3.5 text-gray-400 dark:text-gray-500 w-5 h-5 sm:hidden" />
                <input type="date" name="date" required value={formData.date} onChange={handleInputChange} className="w-full px-4 sm:pl-4 pl-11 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition-colors [&::-webkit-calendar-picker-indicator]:dark:invert" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Time</label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-3.5 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input type="text" name="time" required value={formData.time} onChange={handleInputChange} placeholder="e.g., After Asr" className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition-colors" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Venue / Specific Address</label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input type="text" name="location" required value={formData.location} onChange={handleInputChange} placeholder="e.g., Town Masjid Auditorium" className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Organizer / Committee</label>
            <div className="relative">
              <Building className="absolute left-3.5 top-3.5 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input type="text" name="organizer" value={formData.organizer} onChange={handleInputChange} placeholder="e.g., Youth Coalition Malappuram" className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Event Description</label>
            <div className="relative">
              <FileText className="absolute left-3.5 top-3.5 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <textarea name="description" rows={5} value={formData.description} onChange={handleInputChange} placeholder="Provide topics, dynamic timelines, special arrangements for sisters, food facilities, etc." className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none resize-none transition-colors" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-md hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-lg md:text-base mt-2"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Publish Event"}
          </button>

        </form>
      </div>
    </main>
  );
}