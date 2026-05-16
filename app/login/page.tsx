"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Moon, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg("");
    
    // Triggers your perfectly configured Supabase-Google OAuth link
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `https://deenevents-kerala.mddhillu12.workers.dev/auth/callback`,
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#07090e] text-[#f1f5f9] flex flex-col justify-center items-center px-6 relative overflow-hidden antialiased">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-300 mb-8 transition-colors group">
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Directory
        </Link>

        <div className="bg-[#0f1422] border border-slate-800/50 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/10">
            <Moon size={24} className="text-white fill-white" />
          </div>
          
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Welcome to DeenEvents</h2>
          <p className="text-slate-400 text-xs max-w-xs mx-auto mb-8 font-medium">
            Sign in to securely register your organization, publish community schedules, and manage events.
          </p>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium rounded-xl text-left">
              {errorMsg}
            </div>
          )}

          {/* THE WORKING GOOGLE SIGN IN BUTTON */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full h-12 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <div className="mt-8 pt-6 border-t border-slate-800/60 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Secure Supabase Gatekeeper</span>
          </div>
        </div>
      </div>
    </main>
  );
}