"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bookmark, PlusCircle, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Saved", href: "/saved", icon: Bookmark },
    { label: "Submit", href: "/submit", icon: PlusCircle },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-xl z-50 px-6 py-2 flex justify-between items-center max-w-md mx-auto rounded-t-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link 
            key={item.label} 
            href={item.href} 
            className="flex flex-col items-center gap-0.5 px-3 py-1 text-center transition-colors"
          >
            <Icon 
              className={`w-5 h-5 transition-transform ${
                isActive ? "text-emerald-700 scale-110 stroke-[2.5px]" : "text-gray-400 stroke-[2px]"
              }`} 
            />
            <span 
              className={`text-[11px] font-medium tracking-tight ${
                isActive ? "text-emerald-700 font-bold" : "text-gray-400"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}