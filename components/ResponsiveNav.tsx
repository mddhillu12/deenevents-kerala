"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bookmark, PlusCircle, User, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ResponsiveNav() {
  const pathname = usePathname();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Saved", href: "/saved", icon: Bookmark },
    { label: "Submit", href: "/submit", icon: PlusCircle },
  ];

  return (
    <>
      {/* DESKTOP TOP NAVIGATION (Hidden on mobile) */}
      <nav className="hidden md:flex fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50 px-8 py-4 items-center justify-between transition-colors">
        <Link href="/" className="text-2xl font-bold text-emerald-700 dark:text-emerald-500 tracking-tight">
          DeenEvents
        </Link>
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={`flex items-center gap-2 font-medium hover:text-emerald-600 transition-colors ${pathname === item.href ? "text-emerald-600 dark:text-emerald-400" : "text-gray-600 dark:text-gray-300"}`}>
              <item.icon className="w-5 h-5" /> {item.label}
            </Link>
          ))}
          {user ? (
            <Link href="/profile" className="flex items-center gap-2 font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600">
              <User className="w-5 h-5" /> Profile
            </Link>
          ) : (
            <button onClick={handleGoogleLogin} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2 rounded-full font-medium hover:bg-emerald-700 transition-colors shadow-sm">
              <LogIn className="w-4 h-4" /> Sign In
            </button>
          )}
        </div>
      </nav>

      {/* MOBILE BOTTOM NAVIGATION (Hidden on PC) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-xl z-50 px-6 py-2 flex justify-between items-center pb-safe transition-colors">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.label} href={item.href} className="flex flex-col items-center gap-1 px-3 py-1">
              <item.icon className={`w-5 h-5 transition-transform ${isActive ? "text-emerald-600 dark:text-emerald-400 scale-110" : "text-gray-400 dark:text-gray-500"}`} />
              <span className={`text-[10px] font-medium ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400 dark:text-gray-500"}`}>{item.label}</span>
            </Link>
          );
        })}
        
        {user ? (
          <Link href="/profile" className="flex flex-col items-center gap-1 px-3 py-1">
            <User className={`w-5 h-5 ${pathname === "/profile" ? "text-emerald-600 dark:text-emerald-400 scale-110" : "text-gray-400 dark:text-gray-500"}`} />
            <span className={`text-[10px] font-medium ${pathname === "/profile" ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400 dark:text-gray-500"}`}>Profile</span>
          </Link>
        ) : (
          <button onClick={handleGoogleLogin} className="flex flex-col items-center gap-1 px-3 py-1">
            <LogIn className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500">Sign In</span>
          </button>
        )}
      </nav>
    </>
  );
}