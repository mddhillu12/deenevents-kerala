"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, LogIn } from "lucide-react";

export default function SubmitPage() {
  const router = useRouter();
  const districts = ["Malappuram", "Kozhikode", "Kannur", "Ernakulam", "Thrissur", "Kasaragod", "Palakkad", "Wayanad"];
  
  const [user, setUser] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: "", speaker: "", district: "", venue: "", event_date: "" });

  useEffect(() => {
    // Check if user is logged in
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/submit' }
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    
    // We set approved: false now because it's a public submission
    const { error } = await supabase.from("events").insert([
      { ...formData, approved: false, user_id: user.id }
    ]);
    
    if (!error) {
      setSubmitted(true);
      router.refresh();
    } else {
      alert("Error: Make sure your Supabase table has a 'user_id' column!");
    }
    setLoading(false);
  }

  // --- SHOW LOGIN SCREEN IF NOT LOGGED IN ---
  if (!user) {
    return (
      <main className="min-h-screen bg-[#020405] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-emerald-600/20 rounded-full flex items-center justify-center mb-6">
          <LogIn className="text-emerald-500" size={32} />
        </div>
        <h1 className="text-3xl font-black italic mb-2">Login Required</h1>
        <p className="text-gray-400 mb-8 max-w-xs text-sm font-bold">To reach all the guys in Kerala with real events, we need you to sign in first.</p>
        <button 
          onClick={handleGoogleLogin}
          className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-500 hover:text-white transition-all"
        >
          Sign in with Google
        </button>
      </main>
    );
  }

  // --- SHOW SUCCESS SCREEN ---
  if (submitted) {
    return (
      <main className="min-h-screen bg-[#020405] text-white flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle2 className="w-20 h-20 text-emerald-500 mb-6" />
        <h1 className="text-4xl font-black italic mb-4">Submitted!</h1>
        <p className="text-gray-400 mb-8 font-bold">Once we verify it, it will go live for everyone.</p>
        <Link href="/" className="bg-emerald-600 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px]">Back to Home</Link>
      </main>
    );
  }

  // --- SHOW FORM ---
  return (
    <main className="min-h-screen bg-[#020405] text-white p-6">
        <div className="max-w-xl mx-auto py-10">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-500 mb-10 hover:text-white transition-colors">
              <ArrowLeft size={16}/> Back to Events
            </Link>
            <h2 className="text-4xl font-black mb-10 italic tracking-tighter">Post an <span className="text-emerald-500">Event.</span></h2>
            
            <div className="bg-white/5 p-4 rounded-2xl mb-8 flex items-center gap-4 border border-white/10">
              <img src={user.user_metadata.avatar_url} className="w-10 h-10 rounded-full border border-emerald-500" />
              <div>
                <p className="text-[10px] font-black uppercase text-emerald-500">Posting as</p>
                <p className="text-sm font-bold">{user.user_metadata.full_name}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input required placeholder="Event Title" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-emerald-500" onChange={e => setFormData({...formData, title: e.target.value})} />
              <input required placeholder="Speaker Name" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-emerald-500" onChange={e => setFormData({...formData, speaker: e.target.value})} />
              <select required className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-emerald-500 text-gray-400" onChange={e => setFormData({...formData, district: e.target.value})}>
                  <option value="">Select District</option>
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <input required type="date" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-emerald-500 text-gray-400" onChange={e => setFormData({...formData, event_date: e.target.value})} />
              <input required placeholder="Venue Name" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-emerald-500" onChange={e => setFormData({...formData, venue: e.target.value})} />
              
              <button disabled={loading} className="w-full bg-emerald-600 py-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-emerald-500/20 active:scale-95 transition-all">
                {loading ? "Uploading..." : "Submit for Approval"}
              </button>
            </form>
        </div>
    </main>
  );
}