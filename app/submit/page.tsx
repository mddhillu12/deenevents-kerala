"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { 
  Calendar, MapPin, User, FileText, ShieldCheck, 
  ArrowLeft, Loader2, Sparkles, Languages, Map, Plus, X, Clock, Link as LinkIcon
} from "lucide-react";

export default function SubmitEventPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  // --- STANDARD FORM STATES ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [district, setDistrict] = useState("Kozhikode");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [category, setCategory] = useState("Academic Lectures");
  const [sistersOnly, setSistersOnly] = useState(false);
  const [familyFriendly, setFamilyFriendly] = useState(true);

  // --- NEW DYNAMIC STATES ---
  const [speakers, setSpeakers] = useState<string[]>([""]);
  const [organizations, setOrganizations] = useState<string[]>([""]);
  const [requiresRegistration, setRequiresRegistration] = useState(false);
  const [registrationLink, setRegistrationLink] = useState("");

  const [selectedLang, setSelectedLang] = useState<"en" | "ml" | "ar">("en");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login?callback=/submit");
      } else {
        setUser(session.user);
        setLoading(false);
      }
    };
    checkAuth();
  }, [router, supabase]);

  // --- DYNAMIC INPUT HANDLERS ---
  const handleAddInput = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, ""]);
  };

  const handleRemoveInput = (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (index: number, value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => {
      const newArray = [...prev];
      newArray[index] = value;
      return newArray;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Unauthorized access.");
    
    setSubmitting(true);
    let fallbackImage = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200"; 
    
    if (category === "Youth Programs") {
      fallbackImage = "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=1200";
    } else if (category === "Women Only" || sistersOnly) {
      fallbackImage = "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=1200";
    }

    // Clean arrays to remove empty strings before saving
    const cleanSpeakers = speakers.filter(s => s.trim() !== "");
    const cleanOrgs = organizations.filter(o => o.trim() !== "");

    const { error } = await supabase.from("events").insert([
      {
        title,
        description,
        speakers: cleanSpeakers,
        organizations: cleanOrgs,
        venue,
        district,
        date: eventDate, 
        time: eventTime,
        category,
        sisters_only: sistersOnly,
        family_friendly: familyFriendly,
        requires_registration: requiresRegistration,
        registration_link: requiresRegistration ? registrationLink : null,
        image_url: fallbackImage,
        user_id: user.id,
        approved: false // Point 3: Default to unapproved!
      }
    ]);

    setSubmitting(false);
    if (error) {
      alert(`Submission Fault: ${error.message}`);
    } else {
      alert("Event submitted successfully for review!");
      router.push("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020408] flex flex-col items-center justify-center gap-3">
        <Loader2 className="text-emerald-500 animate-spin" size={24} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020408] text-slate-100 pb-12">
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 to-teal-600" />
      
      <header className="border-b border-slate-900 bg-[#020408]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="hidden sm:flex items-center gap-1 text-[10px] font-black text-emerald-400 uppercase bg-emerald-950/40 border border-emerald-900/30 px-2.5 py-1 rounded-lg">
            <ShieldCheck size={12} /> {user?.email?.split("@")[0]}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 mt-8">
        <form onSubmit={handleSubmit} className="bg-[#040811] border border-slate-900 rounded-2xl p-6 space-y-6 shadow-2xl">
          <div className="border-b border-slate-900 pb-4">
            <h2 className="text-lg font-black text-white uppercase tracking-tight">Publish Event Listing</h2>
            <p className="text-xs text-slate-500 mt-1">All submissions require admin approval before appearing on the feed.</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">
              <FileText size={12}/> Gathering Title *
            </label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., The Foundations of Fiqh" className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/40" />
          </div>

          {/* DYNAMIC SPEAKERS SECTION */}
          <div className="space-y-2 bg-slate-900/20 p-4 rounded-xl border border-slate-900/50">
            <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1"><User size={12}/> Speakers / Orators</span>
              <button type="button" onClick={() => handleAddInput(setSpeakers)} className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"><Plus size={12}/> Add Speaker</button>
            </label>
            {speakers.map((spk, index) => (
              <div key={index} className="flex items-center gap-2">
                <input type="text" required={index === 0} value={spk} onChange={(e) => handleInputChange(index, e.target.value, setSpeakers)} placeholder="Speaker Name" className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/40" />
                {index > 0 && (
                  <button type="button" onClick={() => handleRemoveInput(index, setSpeakers)} className="p-3 text-rose-500 hover:bg-rose-950/30 rounded-xl"><X size={14}/></button>
                )}
              </div>
            ))}
          </div>

          {/* DYNAMIC ORGANIZATIONS SECTION */}
          <div className="space-y-2 bg-slate-900/20 p-4 rounded-xl border border-slate-900/50">
            <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1"><ShieldCheck size={12}/> Organizations / Hosts</span>
              <button type="button" onClick={() => handleAddInput(setOrganizations)} className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"><Plus size={12}/> Add Org</button>
            </label>
            {organizations.map((org, index) => (
              <div key={index} className="flex items-center gap-2">
                <input type="text" required={index === 0} value={org} onChange={(e) => handleInputChange(index, e.target.value, setOrganizations)} placeholder="Organization Name" className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/40" />
                {index > 0 && (
                  <button type="button" onClick={() => handleRemoveInput(index, setOrganizations)} className="p-3 text-rose-500 hover:bg-rose-950/30 rounded-xl"><X size={14}/></button>
                )}
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1"><MapPin size={12}/> District</label>
              <select value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/40">
                {["Kozhikode", "Malappuram", "Ernakulam", "Thiruvananthapuram", "Kannur", "Palakkad", "Thrissur"].map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">Specific Venue</label>
              <input type="text" required value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="e.g., Markaz Masjid" className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/40" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1"><Calendar size={12} /> Date *</label>
              <input type="date" required value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white uppercase focus:outline-none [color-scheme:dark]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1"><Clock size={12} /> Time *</label>
              <input type="text" required value={eventTime} onChange={(e) => setEventTime(e.target.value)} placeholder="e.g., 4:30 PM - 8:30 PM" className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/40" />
            </div>
          </div>

          {/* REGISTRATION TOGGLE */}
          <div className="space-y-4 bg-slate-900/20 p-4 rounded-xl border border-slate-900/50">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input type="checkbox" checked={requiresRegistration} onChange={(e) => setRequiresRegistration(e.target.checked)} className="rounded bg-slate-950 border-slate-900 text-emerald-500 focus:ring-0 focus:ring-offset-0 w-4 h-4" />
              <div>
                <span className="text-xs font-bold text-white block">Requires Registration / Payment</span>
                <span className="text-[10px] text-slate-500">Enable this if users need to buy tickets or RSVP online.</span>
              </div>
            </label>
            
            {requiresRegistration && (
              <div className="space-y-1.5 pt-2 border-t border-slate-900/50">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1"><LinkIcon size={12}/> Registration/Payment Link</label>
                <input type="url" required={requiresRegistration} value={registrationLink} onChange={(e) => setRegistrationLink(e.target.value)} placeholder="https://..." className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/40" />
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Extended Description Details</label>
            <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Provide agenda protocols, parking, food arrangements if applicable..." className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/40 resize-none" />
          </div>

          <button type="submit" disabled={submitting} className="w-full h-11 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-900 disabled:text-slate-600 transition-colors rounded-xl font-black text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2">
            {submitting ? <Loader2 className="animate-spin" size={14} /> : "Submit Event for Verification"}
          </button>
        </form>
      </main>
    </div>
  );
}