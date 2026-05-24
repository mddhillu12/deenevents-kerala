"use client";

import { useState } from "react";
import { createClient } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";
import { 
  Calendar, Clock, MapPin, User, Building, 
  FileText, Upload, Loader2, ArrowLeft, CheckCircle2, 
  Plus, X, Link as LinkIcon 
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

  // Upgraded State
  const [formData, setFormData] = useState({
    title: "",
    speakers: [""],      // Changed to array
    organizers: [""],    // Changed to array
    description: "",
    date: "",
    time: "",
    location: "",
    district: "Malappuram",
    category: "Lecture",
    requiresRegistration: false, // New boolean
    registrationLink: "",        // New link
  });

  const districts = [
    "Kasargod", "Kannur", "Wayanad", "Kozhikode", "Malappuram", 
    "Palakkad", "Thrissur", "Ernakulam", "Idukki", "Kottayam", 
    "Alappuzha", "Pathanamthitta", "Kollam", "Thiruvananthapuram"
  ];

  const categories = ["Lecture", "Dars", "Khutbah", "Conference", "Family Event", "Sisters Program", "Youth Program", "Quran Class"];

  // Standard inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  // Dynamic Array Handlers
  const handleArrayChange = (index: number, field: "speakers" | "organizers", value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: "speakers" | "organizers") => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayItem = (index: number, field: "speakers" | "organizers") => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  // File Handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPosterFile(file);
      setPosterPreview(URL.createObjectURL(file));
    }
  };

  // AI Parser
  const handleAIParse = () => {
    if (!smartText) return;
    let newFormData = { ...formData };
    
    const dateMatch = smartText.match(/\b\d{1,2}[-./]\d{1,2}[-./]?\d{0,4}\b/);
    if (dateMatch) newFormData.date = dateMatch[0]; 

    const timeMatch = smartText.match(/\b\d{1,2}:\d{2}\s?(AM|PM|am|pm)?\b/i) || smartText.match(/\b(?:After|Before)?\s?(Fajr|Zuhr|Asr|Maghrib|Isha)\b/i);
    if (timeMatch) newFormData.time = timeMatch[0];

    // Grab first speaker found
    const speakerMatch = smartText.match(/(?:Usthad|Moulavi|Sheikh|Shaykh)\s+([A-Za-z\s]+)/i);
    if (speakerMatch) newFormData.speakers = [speakerMatch[0].trim()];
    
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
        const { error: uploadError } = await supabase.storage.from("posters").upload(fileName, posterFile);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from("posters").getPublicUrl(fileName);
        posterUrl = data.publicUrl;
      }

      // Clean arrays (remove empty strings)
      const cleanSpeakers = formData.speakers.filter(s => s.trim() !== "");
      const cleanOrganizers = formData.organizers.filter(o => o.trim() !== "");

      const { error: insertError } = await supabase.from("events").insert([
        {
          title: formData.title,
          speakers: cleanSpeakers, // Requires DB array column
          organizers: cleanOrganizers, // Requires DB array column
          description: formData.description,
          date: formData.date, 
          time: formData.time,
          location: formData.location,
          district: formData.district,
          category: formData.category,
          requires_registration: formData.requiresRegistration,
          registration_link: formData.registrationLink,
          poster_url: posterUrl,
        },
      ]);

      if (insertError) throw insertError;
      setSuccess(true);
      setTimeout(() => router.push("/"), 2000);
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
          
          {/* Smart Paste Input... */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-4 md:p-5 mb-6 transition-colors">
            <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 mb-2 flex items-center gap-2">✨ AI Smart Auto-Fill</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <input type="text" value={smartText} onChange={(e) => setSmartText(e.target.value)} placeholder="Paste WhatsApp event forward here..." className="flex-1 px-4 py-3 text-sm rounded-xl border border-emerald-200 dark:border-emerald-800/50 bg-white dark:bg-gray-950 outline-none focus:ring-2 focus:ring-emerald-500 dark:text-gray-100 transition-colors" />
              <button type="button" onClick={handleAIParse} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-sm transition-colors">Auto-Fill</button>
            </div>
          </div>

          {/* Poster Upload... */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Event Poster</label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 text-center bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative cursor-pointer">
              <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" />
              {posterPreview ? (
                <img src={posterPreview} alt="Preview" className="h-48 md:h-64 w-full object-contain rounded-lg" />
              ) : (
                <div className="py-6 flex flex-col items-center"><Upload className="w-8 h-8 text-gray-400 mb-2" /><span className="text-sm font-medium text-gray-600 dark:text-gray-400">Click to upload official poster</span></div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Event Title</label>
            <input type="text" name="title" required value={formData.title} onChange={handleInputChange} placeholder="e.g., Grand Islamic Lecture" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors" />
          </div>

          {/* Dynamic Speakers Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Speakers / Scholars</label>
            <div className="space-y-3">
              {formData.speakers.map((speaker, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <User className="absolute left-3.5 top-3.5 text-gray-400 dark:text-gray-500 w-5 h-5" />
                    <input type="text" required={index === 0} value={speaker} onChange={(e) => handleArrayChange(index, "speakers", e.target.value)} placeholder="Name of the speaker" className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors" />
                  </div>
                  {formData.speakers.length > 1 && (
                    <button type="button" onClick={() => removeArrayItem(index, "speakers")} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem("speakers")} className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 transition-colors">
                <Plus className="w-4 h-4" /> Add another speaker
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category & District Inputs... */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Date</label>
              <input type="date" name="date" required value={formData.date} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition-colors [&::-webkit-calendar-picker-indicator]:dark:invert" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Time</label>
              <input type="text" name="time" required value={formData.time} onChange={handleInputChange} placeholder="e.g., After Asr" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Venue / Specific Address</label>
            <input type="text" name="location" required value={formData.location} onChange={handleInputChange} placeholder="e.g., Town Masjid Auditorium" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors" />
          </div>

          {/* Dynamic Organizers Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Organizers / Committees</label>
            <div className="space-y-3">
              {formData.organizers.map((organizer, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Building className="absolute left-3.5 top-3.5 text-gray-400 dark:text-gray-500 w-5 h-5" />
                    <input type="text" value={organizer} onChange={(e) => handleArrayChange(index, "organizers", e.target.value)} placeholder="e.g., Youth Coalition Malappuram" className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors" />
                  </div>
                  {formData.organizers.length > 1 && (
                    <button type="button" onClick={() => removeArrayItem(index, "organizers")} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem("organizers")} className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 transition-colors">
                <Plus className="w-4 h-4" /> Add another organizer
              </button>
            </div>
          </div>

          {/* Payment & Registration Toggle */}
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-4 rounded-xl transition-colors">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input 
                type="checkbox" 
                name="requiresRegistration" 
                checked={formData.requiresRegistration} 
                onChange={handleInputChange} 
                className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-emerald-500" 
              />
              <span className="font-semibold text-gray-800 dark:text-gray-200">Requires Registration / Tickets?</span>
            </label>
            
            {formData.requiresRegistration && (
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Registration or Payment Link</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3.5 top-3.5 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <input type="url" name="registrationLink" required={formData.requiresRegistration} value={formData.registrationLink} onChange={handleInputChange} placeholder="https://forms.gle/... or Ticket link" className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors" />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Event Description</label>
            <textarea name="description" rows={5} value={formData.description} onChange={handleInputChange} placeholder="Provide topics, dynamic timelines, special arrangements for sisters, food facilities, etc." className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none resize-none transition-colors" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-md hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-lg md:text-base mt-2">
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Publish Event"}
          </button>
        </form>
      </div>
    </main>
  );
}