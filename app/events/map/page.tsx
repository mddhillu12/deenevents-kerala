"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Compass, Flame, ShieldAlert, Sparkles } from "lucide-react";

export default function InteractiveEventsMap() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("Malappuram");

  // Mock Geographical Map Coordinate Clusters
  const districtPins = [
    { name: "Kozhikode", count: 12, liveNow: true, topVenue: "Markaz Central Masjid" },
    { name: "Malappuram", count: 18, liveNow: true, topVenue: "Islamic Center, Manjeri" },
    { name: "Ernakulam", count: 6, liveNow: false, topVenue: "Town Masjid Hall" },
    { name: "Thiruvananthapuram", count: 4, liveNow: false, topVenue: "Palayam Ground Assembly" }
  ];

  const activeDistrictData = districtPins.find(d => d.name === selectedDistrict);

  return (
    <div className="min-h-screen bg-[#020408] text-slate-100 pb-12">
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600" />

      <header className="border-b border-slate-900/60 bg-[#020408]/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Close Map Engine
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 space-y-6">
        <div className="space-y-1">
          <h1 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
            <Compass size={18} className="text-emerald-400" /> Interactive Gathering Topology Map
          </h1>
          <p className="text-xs text-slate-400">Click a regional district boundary pin to evaluate localized assembly telemetry metrics instantly.</p>
        </div>

        <div className="grid md:grid-cols-12 gap-6 items-stretch">
          
          {/* HIGH POLISHED INTERACTIVE MAP COMPONENT VIEW */}
          <div className="md:col-span-7 bg-[#040811] border border-slate-900 rounded-2xl p-6 flex flex-col justify-between min-h-[400px] relative shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none font-serif text-[180px] font-black">ك</div>
            
            <div className="text-[10px] uppercase font-bold text-slate-600 tracking-widest">Geographical Node Map Simplex (Kerala Vector)</div>
            
            {/* Abstract styled interactive node structure layout */}
            <div className="relative w-full h-64 my-auto flex flex-col items-center justify-center gap-4">
              {districtPins.map((district) => (
                <button
                  key={district.name}
                  onClick={() => setSelectedDistrict(district.name)}
                  className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 transition-all absolute ${
                    district.name === "Kozhikode" && "top-8 left-12"
                  } ${
                    district.name === "Malappuram" && "top-24 left-28 sm:left-40"
                  } ${
                    district.name === "Ernakulam" && "bottom-20 left-16 sm:left-24"
                  } ${
                    district.name === "Thiruvananthapuram" && "bottom-4 right-12"
                  } ${selectedDistrict === district.name ? "bg-emerald-600 text-white border-emerald-500 shadow-xl scale-105" : "bg-slate-950 text-slate-400 border-slate-900 hover:border-slate-800"}`}
                >
                  <MapPin size={12} className={selectedDistrict === district.name ? "text-white" : "text-emerald-500"} />
                  <span className="text-xs font-bold tracking-tight">{district.name}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-black ${selectedDistrict === district.name ? "bg-emerald-700 text-white" : "bg-slate-900 text-slate-500"}`}>
                    {district.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="text-[10px] text-slate-500 italic">Select individual district nodes to populate local active assembly cards.</div>
          </div>

          {/* TELEMETRY READOUT SIDEBAR DISPLAY */}
          <div className="md:col-span-5 bg-[#040811] border border-slate-900 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
            {activeDistrictData ? (
              <div className="space-y-6">
                <div className="border-b border-slate-900 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-bold uppercase text-slate-500 block tracking-widest">Selected Territory</span>
                    <h3 className="text-base font-black text-white mt-0.5">{activeDistrictData.name} Region</h3>
                  </div>
                  {activeDistrictData.liveNow && (
                    <span className="h-5 px-2 bg-rose-950 border border-rose-900 text-rose-400 text-[8px] font-black uppercase tracking-wider rounded flex items-center gap-1 animate-pulse">
                      <span className="w-1 h-1 rounded-full bg-rose-500" /> Live Clusters Active
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-slate-950 border border-slate-900/60 p-3 rounded-xl">
                    <span className="text-[8px] uppercase tracking-wider text-slate-500 font-bold block">Active Listings</span>
                    <span className="text-xl font-black text-white mt-1 block">{activeDistrictData.count}</span>
                  </div>
                  <div className="bg-slate-950 border border-slate-900/60 p-3 rounded-xl">
                    <span className="text-[8px] uppercase tracking-wider text-slate-500 font-bold block">Ecosystem Status</span>
                    <span className="text-[10px] font-black text-emerald-400 mt-2 block uppercase tracking-widest">Healthy</span>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-900 p-3 rounded-xl space-y-1">
                  <span className="text-[8px] text-slate-500 uppercase font-bold tracking-widest block">Primary Assembly Node</span>
                  <p className="text-xs text-slate-200 font-semibold flex items-center gap-1">
                    <MapPin size={11} className="text-slate-600" /> {activeDistrictData.topVenue}
                  </p>
                </div>
                
                <Link href={`/?district=${activeDistrictData.name}`} className="w-full h-8 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all">
                  Launch Local Event Feed →
                </Link>
              </div>
            ) : (
              <div className="text-center my-auto p-4 space-y-2">
                <ShieldAlert size={20} className="text-slate-700 mx-auto" />
                <p className="text-xs text-slate-500">Geographic tracking cluster inactive.</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}