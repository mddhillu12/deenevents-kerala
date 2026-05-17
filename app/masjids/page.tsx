"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Moon, MapPin, Search, Clock, ShieldCheck, 
  ArrowLeft, Calendar, Sparkles, Filter, Users 
} from "lucide-react";

export default function MasjidsDirectory() {
  const [districtFilter, setDistrictFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMode, setActiveMode] = useState("regular"); // regular, ramadan, eid

  const masjids = [
    {
      id: "markaz-calicut",
      name: "Markaz Masjid Complex",
      location: "Karanthur, Calicut",
      district: "Kozhikode",
      imam: "Sheikh Abu Bakr Ahmed",
      verified: true,
      khutbahTheme: "Sincerity in Community Infrastructure & Modern Challenges",
      timings: { Fajr: "04:52 AM", Dhuhr: "12:24 PM", Asr: "04:31 PM", Maghrib: "06:44 PM", Isha: "08:02 PM" },
      ramadan: { taraweeh: "20 Raka'at (08:30 PM)", iftarCapacity: "1,500 Daily", qiyam: "02:30 AM (Last 10 Nights)" },
      eid: { timing: "07:30 AM", venue: "Masjid Main Eid-Gah Ground" }
    },
    {
      id: "palayam-tvm",
      name: "Palayam Juma Masjid",
      location: "Palayam Complex, Trivandrum",
      district: "Thiruvananthapuram",
      imam: "Dr. Suhaib Maulavi",
      verified: true,
      khutbahTheme: "Preserving Moral Integrity inside Digital Ecosystems",
      timings: { Fajr: "04:58 AM", Dhuhr: "12:28 PM", Asr: "04:34 PM", Maghrib: "06:46 PM", Isha: "08:06 PM" },
      ramadan: { taraweeh: "8 Raka'at + Witr (08:15 PM)", iftarCapacity: "600 Daily", qiyam: "03:00 AM" },
      eid: { timing: "08:00 AM", venue: "Chandrasekharan Nair Stadium Ground" }
    }
  ];

  const filteredMasjids = masjids.filter(m => {
    const matchesDistrict = districtFilter === "All" || m.district === districtFilter;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#020408] text-slate-100 pb-12">
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600" />
      
      {/* HEADER CONTROLS */}
      <header className="border-b border-slate-900/60 bg-[#020408]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Back to Discover Feed
          </Link>
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-900">
            <button 
              onClick={() => setActiveMode("regular")}
              className={`h-7 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${activeMode === "regular" ? "bg-slate-900 text-white border border-slate-800" : "text-slate-500"}`}
            >
              Prayer Times
            </button>
            <button 
              onClick={() => setActiveMode("ramadan")}
              className={`h-7 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${activeMode === "ramadan" ? "bg-emerald-950 text-emerald-400 border border-emerald-900/30" : "text-slate-500"}`}
            >
              🌙 Ramadan Hub
            </button>
            <button 
              onClick={() => setActiveMode("eid")}
              className={`h-7 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${activeMode === "eid" ? "bg-amber-950 text-amber-400 border border-amber-900/30" : "text-slate-500"}`}
            >
              Eid Schedule
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-8">
        {/* TOP DESCRIPTION */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {activeMode === "regular" && "Central Masjid Directory"}
            {activeMode === "ramadan" && "Seasonal Ramadan Support Matrix"}
            {activeMode === "eid" && "Statewide Eid Congregation Hub"}
          </h1>
          <p className="text-xs text-slate-400 max-w-xl">
            Real-time verified data metrics tracking congregation lines, dynamic lecture updates, and localized settings adjustments.
          </p>
        </div>

        {/* SEARCH AND FILTERS */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-[#040811] p-3 rounded-xl border border-slate-900">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            {["All", "Kozhikode", "Malappuram", "Ernakulam", "Thiruvananthapuram"].map(d => (
              <button
                key={d} onClick={() => setDistrictFilter(d)}
                className={`h-7 px-3.5 rounded-lg text-[10px] font-bold uppercase whitespace-nowrap transition-all ${districtFilter === d ? "bg-emerald-600 text-white" : "bg-slate-950 text-slate-500 border border-slate-900"}`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="bg-slate-950 border border-slate-900 px-3 py-1.5 rounded-xl flex items-center gap-2">
            <Search size={14} className="text-slate-600" />
            <input 
              type="text" placeholder="Search by name or street..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none placeholder:text-slate-700 w-full md:w-48"
            />
          </div>
        </div>

        {/* LISTINGS DATA MATRIX */}
        <div className="grid gap-4">
          {filteredMasjids.map((masjid) => (
            <div key={masjid.id} className="bg-[#040811] border border-slate-900 rounded-2xl p-5 grid md:grid-cols-12 gap-6 items-center shadow-xl">
              
              {/* Profile Details Column */}
              <div className="md:col-span-4 space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-white">{masjid.name}</h3>
                  {masjid.verified && <ShieldCheck size={14} className="text-emerald-400" />}
                </div>
                <div className="space-y-1 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1"><MapPin size={11} className="text-slate-600" /> {masjid.location}</span>
                  <span className="flex items-center gap-1"><Users size={11} className="text-slate-600" /> Imam: {masjid.imam}</span>
                </div>
              </div>

              {/* Dynamic View Display Toggle Panels */}
              <div className="md:col-span-8">
                {activeMode === "regular" && (
                  <div className="grid grid-cols-5 gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-900/60 text-center">
                    {Object.entries(masjid.timings).map(([prayer, time]) => (
                      <div key={prayer} className="bg-[#020408] border border-slate-900 p-2 rounded-lg">
                        <span className="text-[8px] uppercase text-slate-500 block font-bold tracking-wider">{prayer}</span>
                        <span className="text-[10px] font-bold text-slate-300 mt-1 block whitespace-nowrap">{time}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeMode === "ramadan" && (
                  <div className="grid sm:grid-cols-3 gap-3 bg-emerald-950/10 border border-emerald-900/20 p-3 rounded-xl text-xs">
                    <div>
                      <span className="text-[8px] text-emerald-400 uppercase font-black block tracking-widest mb-0.5">Taraweeh Assembly</span>
                      <p className="text-slate-300 font-medium">{masjid.ramadan.taraweeh}</p>
                    </div>
                    <div>
                      <span className="text-[8px] text-emerald-400 uppercase font-black block tracking-widest mb-0.5">Community Iftar Capacity</span>
                      <p className="text-slate-300 font-medium">{masjid.ramadan.iftarCapacity}</p>
                    </div>
                    <div>
                      <span className="text-[8px] text-emerald-400 uppercase font-black block tracking-widest mb-0.5">Qiyam-ul-Layl Execution</span>
                      <p className="text-slate-300 font-medium">{masjid.ramadan.qiyam}</p>
                    </div>
                  </div>
                )}

                {activeMode === "eid" && (
                  <div className="grid sm:grid-cols-2 gap-3 bg-amber-950/10 border border-amber-900/20 p-3 rounded-xl text-xs">
                    <div>
                      <span className="text-[8px] text-amber-400 uppercase font-black block tracking-widest mb-0.5">Primary Eid Khutbah Clock</span>
                      <p className="text-slate-300 font-bold">{masjid.eid.timing}</p>
                    </div>
                    <div>
                      <span className="text-[8px] text-amber-400 uppercase font-black block tracking-widest mb-0.5">Congregation Ground Location</span>
                      <p className="text-slate-300 font-medium">{masjid.eid.venue}</p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}