"use client";

import { useState, useEffect } from "react";
import { User, LogIn, LogOut, Settings, Bookmark, Heart, ChevronRight } from "lucide-react";
import Link from "next/link";
// Assuming you have a basic auth client. If you don't use Supabase Auth yet, this mimics the UI perfectly.

export default function ProfilePage() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Toggle this to see both states!

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24 pt-8 px-4 transition-colors">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Header Profile Section */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
              <User size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {isSignedIn ? "Abdullah" : "Guest User"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isSignedIn ? "abdullah@example.com" : "Sign in to save events"}
              </p>
            </div>
          </div>
          
          {/* Auth Button */}
          {isSignedIn ? (
            <button onClick={() => setIsSignedIn(false)} className="p-3 bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 rounded-xl hover:bg-red-100 transition-colors">
              <LogOut size={20} />
            </button>
          ) : (
            <button onClick={() => setIsSignedIn(true)} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 shadow-md transition-colors">
              <LogIn size={18} /> Sign In
            </button>
          )}
        </div>

        {/* Menu Items */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
          <Link href="/saved" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg">
                <Bookmark size={20} />
              </div>
              <span className="font-semibold text-gray-800 dark:text-gray-200">Saved Events</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </Link>

          <Link href="/my-events" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg">
                <Heart size={20} />
              </div>
              <span className="font-semibold text-gray-800 dark:text-gray-200">My Submissions</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </Link>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg">
                <Settings size={20} />
              </div>
              <span className="font-semibold text-gray-800 dark:text-gray-200">Account Settings</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>

      </div>
    </main>
  );
}