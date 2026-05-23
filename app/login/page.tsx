// app/login/page.tsx (Optional - Minor Polish)
"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-center text-gray-600 mb-10">Sign in to save and manage Islamic events</p>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-4 border border-gray-300 rounded-2xl hover:bg-gray-50 transition"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Continue with Google"}
        </button>
      </div>
    </div>
  );
}