"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bookmark, PlusCircle, Sparkles, User, LogIn, Menu, X } from "lucide-react";

export default function ResponsiveNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false); // Simulated login state

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Saved", href: "/profile", icon: Bookmark }, // Redirects to profile options
    { name: "Submit", href: "/submit", icon: PlusCircle },
    { name: "AI Poster", href: "/poster", icon: Sparkles },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              DeenEvents
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  <Icon size={16} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right Side Action: Account Info / Sign In */}
          <div className="hidden md:flex items-center gap-3">
            {isSignedIn ? (
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:opacity-90 transition-opacity"
              >
                <User size={16} />
                Account
              </Link>
            ) : (
              <button
                onClick={() => setIsSignedIn(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 shadow-sm transition-colors"
              >
                <LogIn size={16} />
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 pt-2 pb-4 space-y-1 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            {isSignedIn ? (
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-200 font-semibold"
              >
                <User size={18} /> My Profile Dashboard
              </Link>
            ) : (
              <button
                onClick={() => {
                  setIsSignedIn(true);
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 text-white font-bold rounded-xl"
              >
                <LogIn size={18} /> Sign In with Google
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}