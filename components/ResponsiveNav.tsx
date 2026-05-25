// components/ResponsiveNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bookmark, PlusCircle, User, LogIn, LogOut, Map, Users, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ResponsiveNav() {
  const pathname = usePathname();
  const supabase = createClient();
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { 
        redirectTo: `${window.location.origin}/auth/callback` 
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Map", href: "/events/map", icon: Map },
    { label: "Saved", href: "/saved", icon: Bookmark },
    { label: "Submit", href: "/submit", icon: PlusCircle },
    { label: "Poster", href: "/poster", icon: Sparkles },
    { label: "Poster", href: "/poster", icon: Sparkles },
  ];

  return (
    <>
      {/* DESKTOP NAV */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 z-50 px-6 lg:px-8 py-4 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">د</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-500 tracking-tight">DeenEvents</span>
            <p className="text-[10px] text-emerald-600 -mt-1">Kerala</p>
          </div>
        </Link>

        <div className="flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.label} 
                href={item.href} 
                className={`flex items-center gap-2 font-medium transition-all hover:text-emerald-600 ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-600 dark:text-gray-300"}`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}

          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/profile" className="flex items-center gap-2 hover:text-emerald-600 transition">
                <User className="w-5 h-5" />
                <span className="font-medium text-sm">{user.user_metadata?.full_name?.split(" ")[0] || "Profile"}</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-500 transition flex items-center gap-1.5 text-sm"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleGoogleLogin} 
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-2xl font-medium transition-all shadow-sm"
            >
              <LogIn className="w-4 h-4" /> Sign In
            </button>
          )}
        </div>
      </nav>

      {/* MOBILE BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-2xl z-50 px-2 py-1.5 flex justify-around items-center pb-safe">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.label} 
              href={item.href} 
              className="flex flex-col items-center gap-0.5 py-1 px-3 flex-1"
            >
              <item.icon className={`w-6 h-6 transition-all ${isActive ? "text-emerald-600 dark:text-emerald-400 scale-110" : "text-gray-400 dark:text-gray-500"}`} />
              <span className={`text-[10px] font-medium mt-0.5 ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-500 dark:text-gray-400"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}

        {user ? (
          <Link href="/profile" className="flex flex-col items-center gap-0.5 py-1 px-3 flex-1">
            <User className={`w-6 h-6 ${pathname === "/profile" ? "text-emerald-600 dark:text-emerald-400 scale-110" : "text-gray-400 dark:text-gray-500"}`} />
            <span className={`text-[10px] font-medium mt-0.5 ${pathname === "/profile" ? "text-emerald-600 dark:text-emerald-400" : "text-gray-500 dark:text-gray-400"}`}>Profile</span>
          </Link>
        ) : (
          <button 
            onClick={handleGoogleLogin} 
            className="flex flex-col items-center gap-0.5 py-1 px-3 flex-1"
          >
            <LogIn className="w-6 h-6 text-gray-400 dark:text-gray-500" />
            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">Sign In</span>
          </button>
        )}
      </nav>
    </>
  );
}
