"use client";

import React, { useState } from "react";
import { 
  Menu, 
  Search, 
  Bell, 
  User, 
  Home, 
  PlusCircle, 
  Sparkles, 
  Bookmark, 
  Settings, 
  HelpCircle, 
  LogOut, 
  MapPin, 
  ChevronDown, 
  Calendar, 
  Volume2, 
  Clock 
} from "lucide-react";

export default function HomeView() {
  const [districtOpen, setDistrictOpen] = useState(false);

  // Mock Event Data from your Stitch canvas configuration
  const events = [
    {
      id: 1,
      title: "Weekly Spiritual Majlis",
      speakers: "Usthad Sulaiman Al-Qasimi, Moulavi K.P",
      time: "Today, 8:00 PM - 10:00 PM",
      location: "Markaz Masjid, Kozhikode",
      tag: "Live",
      category: "Dars",
      img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Jumu'ah Prayer & Khutbah",
      speakers: "Imam Abdul Rahman",
      time: "Friday, 1:00 PM",
      location: "Grand Mosque, Malappuram",
      tag: null,
      category: "Khutbah",
      img: "https://images.unsplash.com/photo-1597935212532-c923bb36d07e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Understanding Islamic Finance",
      speakers: "Dr. Tariq Ali, Prof. Hameed",
      time: "Saturday, 10:00 AM",
      location: "Islamic Center, Ernakulam",
      tag: null,
      category: "Lecture",
      img: "https://images.unsplash.com/photo-1435527173428-96c5358978ad?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="bg-[#0c1324] text-[#dce1fb] font-sans min-h-screen relative overflow-x-hidden selection:bg-emerald-500/30">
      {/* Arabesque Pattern Overlay Style Trick */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 0 L100 50 L50 100 L0 50 Z" fill="white" stroke="white" stroke-width="1"/></svg>')`,
          backgroundSize: "100px 100px"
        }}
      />

      {/* Top Navbar */}
      <header className="bg-[#0c1324]/70 backdrop-blur-xl border-b border-white/10 shadow-sm sticky top-0 flex justify-between items-center px-4 md:px-16 py-4 w-full z-50">
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-[#bbcabf] hover:text-[#4edea3] transition-colors">
            <Menu size={24} />
          </button>
          <h1 className="text-xl md:text-3xl font-bold text-[#4edea3] tracking-tight font-display">
            DeenEvents Kerala
          </h1>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <button className="text-[#bbcabf] hover:text-[#4edea3] transition-colors"><Search size={22} /></button>
          <button className="text-[#bbcabf] hover:text-[#4edea3] transition-colors relative">
            <Bell size={22} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#ffb4ab] rounded-full"></span>
          </button>
          <button className="text-[#bbcabf] hover:text-[#4edea3] transition-colors"><User size={22} /></button>
          <button className="hidden md:flex bg-[#4edea3] text-[#003824] font-semibold px-6 py-2 rounded-full hover:shadow-[0_0_15px_rgba(78,222,163,0.5)] transition-all cursor-pointer">
            Sign In
          </button>
        </div>
      </header>

      {/* Layout Wrapper */}
      <div className="flex max-w-[1440px] mx-auto relative z-10">
        
        {/* Sidebar Nav (Desktop view) */}
        <nav className="bg-[#151b2d] border-r border-white/10 h-[calc(100vh-88px)] w-64 fixed left-0 top-[77px] hidden lg:flex flex-col py-8 px-4 z-40">
          <div className="mb-8 px-4">
            <p className="text-xl font-bold text-[#dce1fb]">Welcome back</p>
            <p className="text-sm text-[#bbcabf]">Salam, Brother</p>
          </div>
          <div className="flex flex-col gap-2 flex-grow">
            <a className="bg-[#10b981] text-[#00422b] rounded-xl flex items-center gap-3 px-4 py-3 font-semibold text-sm transition-all shadow-md" href="#">
              <Home size={18} /> Home
            </a>
            <a className="text-[#bbcabf] flex items-center gap-3 px-4 py-3 font-semibold text-sm rounded-xl hover:bg-[#2e3447] hover:text-[#4edea3] transition-all" href="#">
              <PlusCircle size={18} /> Submit Event
            </a>
            <a className="text-[#bbcabf] flex items-center gap-3 px-4 py-3 font-semibold text-sm rounded-xl hover:bg-[#2e3447] hover:text-[#4edea3] transition-all" href="#">
              <Sparkles size={18} /> AI Generator
            </a>
            <a className="text-[#bbcabf] flex items-center gap-3 px-4 py-3 font-semibold text-sm rounded-xl hover:bg-[#2e3447] hover:text-[#4edea3] transition-all" href="#">
              <Bookmark size={18} /> My Events
            </a>
            <a className="text-[#bbcabf] flex items-center gap-3 px-4 py-3 font-semibold text-sm rounded-xl hover:bg-[#2e3447] hover:text-[#4edea3] transition-all" href="#">
              <Settings size={18} /> Settings
            </a>
          </div>
          <button className="w-full bg-[#ffb95f] text-[#472a00] font-bold py-3 rounded-xl mb-4 hover:shadow-[0_0_15px_rgba(255,185,95,0.5)] transition-all cursor-pointer">
            Submit Event
          </button>
          <div className="flex flex-col gap-2 mt-auto border-t border-white/10 pt-4">
            <a className="text-[#bbcabf] flex items-center gap-3 px-4 py-3 font-semibold text-sm rounded-xl hover:bg-[#2e3447] hover:text-[#4edea3] transition-all" href="#">
              <HelpCircle size={18} /> Help
            </a>
            <a className="text-[#bbcabf] flex items-center gap-3 px-4 py-3 font-semibold text-sm rounded-xl hover:bg-[#2e3447] hover:text-[#4edea3] transition-all" href="#">
              <LogOut size={18} /> Logout
            </a>
          </div>
        </nav>

        {/* Main Feed Content Panel */}
        <main className="w-full lg:ml-64 px-4 md:px-6 lg:px-16 py-8 pb-32 lg:pb-8 flex flex-col gap-12">
          
          {/* Header Action Row */}
          <section className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#dce1fb]">Upcoming Gatherings</h2>
              
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                {/* District Filter Selector */}
                <div className="relative">
                  <button 
                    onClick={() => setDistrictOpen(!districtOpen)}
                    className="bg-[#111827]/70 backdrop-blur-md border border-white/10 text-[#dce1fb] text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2 hover:border-[#4edea3] transition-colors cursor-pointer"
                  >
                    <MapPin size={16} className="text-[#4edea3]" />
                    All Districts
                    <ChevronDown size={16} />
                  </button>
                  {districtOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-[#2e3447] border border-white/10 rounded-xl shadow-xl z-20 overflow-hidden">
                      <ul className="py-1 text-sm font-medium">
                        <li className="px-4 py-2 hover:bg-[#191f31] cursor-pointer">Malappuram</li>
                        <li className="px-4 py-2 hover:bg-[#191f31] cursor-pointer">Kozhikode</li>
                        <li className="px-4 py-2 hover:bg-[#191f31] cursor-pointer">Ernakulam</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Category Quick Pills */}
                <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
                  <button className="bg-[#4edea3] text-[#003824] text-xs font-bold px-4 py-2 rounded-full shadow-sm">All</button>
                  <button className="bg-[#111827]/70 backdrop-blur-md border border-white/10 text-[#bbcabf] text-xs font-semibold px-4 py-2 rounded-full hover:text-white transition-colors">Dars</button>
                  <button className="bg-[#111827]/70 backdrop-blur-md border border-white/10 text-[#bbcabf] text-xs font-semibold px-4 py-2 rounded-full hover:text-white transition-colors">Khutbah</button>
                  <button className="bg-[#111827]/70 backdrop-blur-md border border-white/10 text-[#bbcabf] text-xs font-semibold px-4 py-2 rounded-full hover:text-white transition-colors">Lecture</button>
                </div>

                {/* Date Trigger Button */}
                <button className="bg-[#111827]/70 backdrop-blur-md border border-white/10 text-[#dce1fb] text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2 hover:border-[#4edea3] transition-colors cursor-pointer">
                  <Calendar size={16} />
                  Any Date
                </button>
              </div>
            </div>
          </section>

          {/* Dynamic Grid Mapping */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <article 
                key={event.id} 
                className="bg-[#111827]/70 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-300 flex flex-col group relative"
              >
                <div className="h-48 bg-[#191f31] relative overflow-hidden">
                  <img 
                    alt={event.title} 
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105" 
                    src={event.img}
                  />
                  <div className="absolute top-4 right-4 bg-[#0c1324]/80 backdrop-blur-md rounded-full p-2 text-[#dce1fb] hover:text-[#4edea3] cursor-pointer transition-colors border border-white/10">
                    <Bookmark size={16} />
                  </div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {event.tag && (
                      <span className="bg-[#ffb95f] text-[#472a00] text-xs font-bold px-2 py-1 rounded-md shadow-sm">{event.tag}</span>
                    )}
                    <span className="bg-[#0c1324]/80 backdrop-blur-md text-[#dce1fb] border border-white/10 text-xs font-semibold px-2 py-1 rounded-md">
                      {event.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col gap-4 flex-grow">
                  <h3 className="text-lg font-bold text-[#dce1fb] group-hover:text-[#4edea3] transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#bbcabf] text-xs font-medium">
                      <Volume2 size={14} className="text-[#4edea3]" />
                      <span className="truncate">{event.speakers}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#bbcabf] text-xs font-medium">
                      <Clock size={14} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#bbcabf] text-xs font-medium">
                      <MapPin size={14} />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </main>
      </div>

      {/* Bottom Navigation (Mobile Only view layout setup) */}
      <nav className="bg-[#2e3447]/80 backdrop-blur-2xl border-t border-white/10 shadow-2xl fixed bottom-0 rounded-t-xl lg:hidden left-0 w-full z-50 flex justify-around items-center px-4 py-3">
        <a className="flex flex-col items-center justify-center text-[#4edea3] font-bold transition-all" href="#">
          <Home size={20} />
          <span className="text-[10px] mt-1">Home</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#bbcabf] hover:text-[#4edea3] transition-colors" href="#">
          <PlusCircle size={20} />
          <span className="text-[10px] mt-1">Submit</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#bbcabf] hover:text-[#4edea3] transition-colors" href="#">
          <Sparkles size={20} />
          <span className="text-[10px] mt-1">AI Studio</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#bbcabf] hover:text-[#4edea3] transition-colors" href="#">
          <User size={20} />
          <span className="text-[10px] mt-1">Profile</span>
        </a>
      </nav>
    </div>
  );
}