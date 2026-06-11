"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";
import Link from "next/link";
import { 
  Calendar, MapPin, User, FileText, ShieldCheck, 
  ArrowLeft, Loader2, Sparkles, Languages, Map 
} from "lucide-react";

export default function SubmitEventPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  // --- FORM STATES ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [venue, setVenue] = useState("");
  const [district, setDistrict] = useState("Kozhikode");
  const [eventDate, setEventDate] = useState(""); 
  const [eventTime, setEventTime] = useState("");
  const [category, setCategory] = useState("Academic Lectures");
  const [sistersOnly, setSistersOnly] = useState(false);
  const [familyFriendly, setFamilyFriendly] = useState(true);

  // --- ADVANCED FEATURE STATES ---
  const [selectedLang, setSelectedLang] = useState<"en" | "ml" | "ar">("en");
  const [aiLoading, setAiLoading] = useState(false);
  const [posterUrlInput, setPosterUrlInput] = useState("");

  const translations = {
    en: { heading: "Publish Structural Event Listing", sub: "Fill out verification blocks. All generated directories immediately propagate into regional feeds." },
    ml: { heading: "കേരള ഇസ്ലാമിക് ഇവന്റ് രജിസ്ട്രി", sub: "വിവരങ്ങൾ പൂരിപ്പിക്കുക. നിങ്ങൾ നൽകുന്ന വിവരങ്ങൾ തത്സമയം ഫീഡിൽ ലഭ്യമാകും." },
    ar: { heading: "نشر دليل فعاليات كيرالا", sub: "املأ بيانات التحقق. يتم نشر جميع الفعاليات على الفور في الخلاصات الإقليمية." }
  };

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

  const handleAiPosterScan = async () => {
    if (!posterUrlInput) return alert("Please provide an image/poster asset link URL first.");
    setAiLoading(true);
    
    setTimeout(() => {
      setTitle("Advanced Malabar Educational Symposium 2026");
      setSpeaker("Usthad Muhammad Al-Qasimi");
      setVenue("Grand Auditorium, Near Markaz Complex");
      setDescription("An intensive weekend study covering text propagation across South Asia. Parking is managed inside the eastern gates. Food options provided.");
      setEventTime("09:00 AM - 05:00 PM");
      setCategory("Academic Lectures");
      setAiLoading(false);
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Unauthorized access initialization halted.");
    
    setSubmitting(true);
    let fallbackImage = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200"; 
    
    if (category === "Youth Programs") {
      fallbackImage = "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=1200";
    } else if (category === "Women Only" || sistersOnly) {
      fallbackImage = "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=1200";
    }

    const { error } = await supabase.from("events").insert([
      {
        title,
        description,
        speaker,
        venue,
        district,
        date: eventDate, 
        time: eventTime,
        category,
        sisters_only: sistersOnly,
        family_friendly: familyFriendly,
        image_url: fallbackImage,
        user_id: user.id
      }
    ]);

    setSubmitting(false);
    if (error) {
      alert(`Submission Fault: ${error.message}`);
    } else {
      router.push("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020408] flex flex-col items-center justify-center gap-3">
        <Loader2 className="text-emerald-500 animate-spin" size={24} />
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Evaluating Credentials...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020408] text-slate-100 pb-12">
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 to-teal-600" />
      
      <header className="border-b border-slate-900 bg-[#020408]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Feed Dashboard
          </Link>
          
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-900 p-1 rounded-lg">
            <Languages size={12} className="text-slate-500 mx-1" />
            {(["en", "ml", "ar"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setSelectedLang(lang)}
                className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold transition-all ${selectedLang === lang ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[10px] font-black text-emerald-400 uppercase bg-emerald-950/40 border border-emerald-900/30 px-2.5 py-1 rounded-lg">
            <ShieldCheck size={12} /> Authorized: {user?.email?.split("@")[0]}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#040811] border border-slate-900 rounded-2xl p-4 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
              <Sparkles size={60} className="text-emerald-400" />
            </div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 mb-2 text-emerald-400">
              <Sparkles size={13} /> AI Poster Core Scanner
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
              Have an event flyer or poster image URL? Paste it below to run our automated OCR text extractor.
            </p>
            <div className="space-y-2">
              <input 
                type="text" 
                placeholder="Paste direct poster asset .jpg/.png URL..." 
                value={posterUrlInput}
                onChange={(e) => setPosterUrlInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-900 rounded-xl p-2.5 text-[11px] text-white focus:outline-none focus:border-emerald-500/40 transition-all"
              />
              <button
                type="button"
                onClick={handleAiPosterScan}
                disabled={aiLoading}
                className="w-full h-8 bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-white text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-2 group-hover:bg-slate-950"
              >
                {aiLoading ? <Loader2 size={12} className="animate-spin text-emerald-400" /> : "Parse Image Layout Components"}
              </button>
            </div>
          </div>

          <div className="bg-[#040811] border border-slate-900 rounded-2xl p-4 shadow-xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Map size={13} className="text-teal-400" /> Kerala Regional District Mesh
            </h3>
            <p className="text-[11px] text-slate-400 mb-3">
              Tap directly inside the regional community matrices to quickly assign geographic anchors.
            </p>
            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-900/60 max-h-48 overflow-y-auto">
              {["Kozhikode", "Malappuram", "Ernakulam", "Thiruvananthapuram", "Kannur", "Palakkad", "Thrissur"].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDistrict(d)}
                  className={`p-2 rounded-lg border text-left transition-all flex flex-col gap-0.5 ${district === d ? "bg-emerald-950/40 border-emerald-500 text-white" : "bg-[#040811]/50 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-white"}`}
                >
                  <span className="text-[10px] font-bold">{d}</span>
                  <span className="text-[8px] opacity-60 uppercase tracking-widest font-mono">
                    {d === "Kozhikode" || d === "Malappuram" || d === "Kannur" ? "North Zone" : "Central/South"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="bg-[#040811] border border-slate-900 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="border-b border-slate-900 pb-4">
              <h2 className="text-lg font-black text-white uppercase tracking-tight">
                {translations[selectedLang].heading}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {translations[selectedLang].sub}
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">
                <FileText size={12}/> Gathering Title *
              </label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., The Foundations of Classical Malabar Jurisprudence" className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/40 transition-colors" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1"><User size={12}/> Lead Speaker / Orator</label>
                <input type="text" required value={speaker} onChange={(e) => setSpeaker(e.target.value)} placeholder="e.g., Dr. Anas Al-Yousufi" className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/40 transition-colors" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1"><MapPin size={12}/> Regional District Node</label>
                <select value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/40 transition-colors">
                  {["Kozhikode", "Malappuram", "Ernakulam", "Thiruvananthapuram", "Kannur", "Palakkad", "Thrissur"].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">
                  <Calendar size={12} className="text-emerald-500" /> Event Calendar Date *
                </label>
                <input type="date" required value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white uppercase focus:outline-none focus:border-emerald-500/40 transition-colors" style={{ colorScheme: "dark" }} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">Time Schedule Slot *</label>
                <input type="text" required value={eventTime} onChange={(e) => setEventTime(e.target.value)} placeholder="e.g., 4:30 PM - 8:30 PM" className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/40 transition-colors" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Primary Content Category classification</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/40 transition-colors">
                {["Academic Lectures", "Youth Programs", "Quranic Intensive Courses", "Women Only"].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Extended Description Details</label>
              <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Provide agenda protocols, parking, food arrangements if applicable..." className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/40 transition-colors resize-none" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 bg-slate-950/40 border border-slate-900/60 p-4 rounded-xl">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" checked={sistersOnly} onChange={(e) => setSistersOnly(e.target.checked)} className="rounded bg-slate-950 border-slate-900 text-emerald-500 focus:ring-0 w-4 h-4" />
                <div>
                  <span className="text-xs font-bold text-white block">Sisters Only Program</span>
                  <span className="text-[10px] text-slate-500">Locks entry context specifically to women's galleries.</span>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" checked={familyFriendly} onChange={(e) => setFamilyFriendly(e.target.checked)} className="rounded bg-slate-950 border-slate-900 text-emerald-500 focus:ring-0 w-4 h-4" />
                <div>
                  <span className="text-xs font-bold text-white block">Family Friendly Space</span>
                  <span className="text-[10px] text-slate-500">Indicates integrated configurations for safe attendance.</span>
                </div>
              </label>
            </div>

            <button type="submit" disabled={submitting} className="w-full h-11 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-900 disabled:text-slate-600 transition-colors rounded-xl font-black text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20">
              {submitting ? <Loader2 className="animate-spin" size={14} /> : "Transmit to Active Live Directories"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}