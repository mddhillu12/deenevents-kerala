"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Layers, 
  ArrowUpRight, 
  Search, 
  Flame, 
  Compass, 
  PlusCircle, 
  Bookmark, 
  Radio, 
  Smartphone,
  Send,
  SlidersHorizontal,
  Inbox,
  CheckCircle2,
  Home as HomeIcon,
  User
} from "lucide-react";

export default function Home() {
  const [activeDistrict, setActiveDistrict] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All Gatherings");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("soonest");
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, mins: 42 });
  const [savedEvents, setSavedEvents] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1 };
        return { ...prev, mins: 59, hours: prev.hours > 0 ? prev.hours - 1 : 23 };
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleSave = (id: string) => {
    setSavedEvents(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  // Mock Production-Grade Event Registry with Categorization & Image Assets
  const allEvents = [
    {
      id: "legacy-shafii",
      title: "The Legacy of Imam Shafi'i: Jurisprudence & Historical Impact across Malabar",
      speaker: "Dr. Anas Al-Yousufi",
      speakerTitle: "Medina University Graduate",
      venue: "Grand Masjid Auditorium, Calicut",
      district: "Kozhikode",
      date: "May 22, 2026",
      time: "4:30 PM - 8:30 PM",
      category: "Academic Lectures",
      tag: "Trending",
      isWeekend: true,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "youth-revival",
      title: "Youth Spiritual Revival & Character Development Intensive BootCamp",
      speaker: "Ustadh Faisal Muhammad",
      speakerTitle: "Youth Mentor & Educator",
      venue: "Town Masjid Conference Hall",
      district: "Ernakulam",
      date: "May 24, 2026",
      time: "9:00 AM - 1:00 PM",
      category: "Youth Programs",
      tag: "Filling Fast",
      isWeekend: true,
      image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "hadith-studies",
      title: "Authentic Hadith Studies & Classical Text Analysis (Sahih Al-Bukhari)",
      speaker: "Sheikh Rashid Ibrahim",
      speakerTitle: "Principal, Darul Uloom",
      venue: "Markaz Campus, Kuttipuram",
      district: "Malappuram",
      date: "May 29, 2026",
      time: "Friday after Asr",
      category: "Classical Dars",
      tag: "Weekly Series",
      isWeekend: false,
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "sisters-fiqh",
      title: "Sisters Fiqh Essentials: Contemporary Practical Matrimonial Guidelines",
      speaker: "Ustadha Maryam Ahmed",
      speakerTitle: "Classical Shari'ah Faculty",
      venue: "Islamic Center, Manjeri",
      district: "Malappuram",
      date: "June 02, 2026",
      time: "10:00 AM - 01:00 PM",
      category: "Women Only",
      tag: "Special Session",
      isWeekend: false,
      image: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const districts = ["All", "Kozhikode", "Malappuram", "Ernakulam", "Thiruvananthapuram", "Kannur", "Thrissur"];
  const categories = ["All Gatherings", "Academic Lectures", "Classical Dars", "Youth Programs", "Women Only"];

  // Smart Search, Filtering and Sorting logic
  const filteredEvents = allEvents.filter(event => {
    const matchesDistrict = activeDistrict === "All" || event.district === activeDistrict;
    const matchesCategory = activeCategory === "All Gatherings" || event.category === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDistrict && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#020408] bg-grid-pattern text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-400 pb-20 md:pb-0">
      
      {/* 10. ISLAMIC LUXURY TOP LINE GRADIENT ACCENT */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-amber-500 to-teal-600 animate-gradient-glow" />

      {/* HEADER NAVIGATION SYSTEM */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#020408]/80 border-b border-slate-900/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-950/40 relative group overflow-hidden">
              <span className="font-serif font-black text-lg text-white group-hover:rotate-12 transition-transform block">د</span>
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight text-white leading-none">DeenEvents <span className="text-emerald-500 font-medium text-xs">Kerala</span></h1>
              <p className="text-[9px] font-bold text-slate-500 tracking-wider uppercase mt-0.5">The modern directory for Islamic gatherings</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-400">
            <Link href="/" className="text-emerald-400 flex items-center gap-1"><Compass size={13} /> Discover Feed</Link>
            <Link href="/poster" className="hover:text-white transition-colors flex items-center gap-1"><Sparkles size={13} /> AI Studio Canvas</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/submit" className="h-9 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-md group">
              <PlusCircle size={14} className="text-emerald-500 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Publish Event</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        
        {/* 5. EMOTIONAL HERO SECTION */}
        <section className="text-center relative py-12 px-4 rounded-[2rem] bg-gradient-to-b from-[#060b14] to-transparent border border-slate-900/50 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-32 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/40 border border-emerald-500/20 rounded-full mb-6 shadow-inner">
            <Sparkles size={11} className="text-emerald-400" />
            <span className="text-[9px] font-black tracking-widest uppercase text-emerald-400">Verified Platform Asset Engine</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl mx-auto leading-[1.1] drop-shadow-sm">
            Discover Islamic Lectures & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 font-serif italic font-medium">Gatherings</span> Across Kerala
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-4 leading-relaxed">
            From local neighborhood masjid dars to massive statewide dynamic conferences — all unified inside one clean, modern discovery framework.
          </p>

          {/* Core Filter Bar Search Interface */}
          <div className="max-w-md mx-auto mt-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity" />
            <div className="relative bg-slate-950 border border-slate-900 rounded-xl flex items-center p-2 shadow-2xl">
              <Search size={16} className="text-slate-500 ml-2 shrink-0" />
              <input 
                type="text" 
                placeholder="Search scholar names, venues, keywords..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-xs focus:ring-0 placeholder:text-slate-600 px-3 text-white focus:outline-none"
              />
            </div>
          </div>

          {/* 7. LIVE ACTIVE INDICATOR CHIPS */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-10 border-t border-slate-900/60 pt-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 bg-slate-950/60 px-3.5 py-2 rounded-xl border border-slate-900">
              <Radio size={12} className="text-emerald-500 animate-pulse" />
              <span className="text-xs font-black text-white">23</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Events This Week</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-950/60 px-3.5 py-2 rounded-xl border border-slate-900">
              <Users size={12} className="text-amber-500" />
              <span className="text-xs font-black text-white">1,400+</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Users</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-950/60 px-3.5 py-2 rounded-xl border border-slate-900">
              <Layers size={12} className="text-teal-500" />
              <span className="text-xs font-black text-white">14</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Districts Mapping</span>
            </div>
          </div>
        </section>

        {/* 16. SOCIAL PROOF ACCELERATOR ROW */}
        <section className="bg-slate-950/30 border-y border-slate-900/60 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
          <p className="text-[11px] font-bold tracking-wide text-slate-400 uppercase">
            Trusted Framework Coordination utilized by <span className="text-white">50+ Verified Islamic Organizations</span> Across Kerala State
          </p>
        </section>

        {/* 2. CORE FEATURED EVENT CENTERPIECE HERO BANNER */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-black tracking-widest uppercase text-amber-500">
            <Flame size={14} className="text-amber-500 fill-amber-500/20" />
            <span>🔥 Featured Islamic Gathering of the Week</span>
          </div>

          <div className="relative rounded-3xl bg-gradient-to-br from-[#060e1a] to-[#03070d] border-2 border-amber-500/20 p-6 sm:p-8 overflow-hidden shadow-2xl group transition-all duration-500 hover:border-amber-500/40">
            <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-gradient-to-b from-amber-500/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

            <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded border border-amber-500/20 uppercase tracking-widest">Statewide Conference</span>
                  <span className="text-[9px] font-black bg-slate-950 text-slate-400 px-2.5 py-1 rounded border border-slate-900 uppercase tracking-widest flex items-center gap-1">
                    <MapPin size={10} className="text-emerald-500" /> Malappuram Region
                  </span>
                </div>

                <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  Grand Malabar Islamic Heritage & Contemporary Society Symposium
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                  Join prominent traditional scholars as we dissect classical legal frameworks, spiritual purification guidelines, and modern educational methodologies.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="w-7 h-7 rounded-lg bg-slate-950 border border-slate-900 flex items-center justify-center shrink-0"><Calendar size={12} className="text-amber-400" /></div>
                    <div>
                      <span className="text-[8px] font-bold uppercase text-slate-500 block">Date Grid</span>
                      <span className="text-[10px] font-black">May 20, 2026</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="w-7 h-7 rounded-lg bg-slate-950 border border-slate-900 flex items-center justify-center shrink-0"><Clock size={12} className="text-amber-400" /></div>
                    <div>
                      <span className="text-[8px] font-bold uppercase text-slate-500 block">Time Span</span>
                      <span className="text-[10px] font-black">04:00 PM onwards</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div>
                    <span className="text-[8px] font-black tracking-widest text-slate-500 uppercase block mb-1">Time Remaining to Session</span>
                    <div className="flex items-center gap-1.5">
                      <div className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-900 text-xs font-black text-white"><span className="text-amber-400">{timeLeft.days}</span>d</div>
                      <div className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-900 text-xs font-black text-white"><span className="text-amber-400">{timeLeft.hours}</span>h</div>
                      <div className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-900 text-xs font-black text-white"><span className="text-amber-400">{timeLeft.mins}</span>m</div>
                    </div>
                  </div>

                  <Link href="/event/legacy-shafii" className="sm:mt-auto h-11 px-6 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 text-white text-xs font-black rounded-xl inline-flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 group">
                    <span>View Conference Docket</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

              <div className="md:col-span-5 flex justify-center relative">
                <div className="w-full max-w-[280px] aspect-square rounded-2xl overflow-hidden border-2 border-slate-900 bg-slate-950 shadow-2xl relative">
                  <img 
                    src="https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=600" 
                    alt="Mosque architecture" 
                    className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03070d] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur border border-slate-900 p-2.5 rounded-xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">🎙</div>
                    <div className="truncate">
                      <span className="text-[7px] font-bold text-amber-400 uppercase tracking-wider block">Keynote Address</span>
                      <span className="text-[10px] font-black text-white block truncate">Sayyid Ibrahim Al-Hadi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 19. INTERACTION FILTER & SMART SORTING TOOL BAR */}
        <section className="bg-[#040811] border border-slate-900/80 p-4 rounded-2xl space-y-4 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Chips Layer */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`h-8 px-4 rounded-xl text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                    activeCategory === cat 
                      ? "bg-emerald-600 text-white" 
                      : "bg-slate-950 text-slate-400 border border-slate-900 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Smart Sort Select Engine Component */}
            <div className="flex items-center gap-2 self-end lg:self-auto">
              <SlidersHorizontal size={13} className="text-slate-500" />
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Sort Configuration:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-950 border border-slate-900 rounded-lg text-[10px] font-black text-slate-300 uppercase p-1.5 px-3 focus:outline-none focus:border-emerald-500/40"
              >
                <option value="soonest">Chronological Timeline</option>
                <option value="trending">High Traffic Trending</option>
              </select>
            </div>
          </div>

          {/* District Filter Layer */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-900/40 scrollbar-none">
            <span className="text-[9px] font-black uppercase text-slate-600 tracking-widest shrink-0 mr-1">District:</span>
            {districts.map((dist) => (
              <button
                key={dist}
                onClick={() => setActiveDistrict(dist)}
                className={`h-6 px-3 rounded-lg text-[9px] font-extrabold uppercase tracking-wider transition-colors ${
                  activeDistrict === dist ? "bg-slate-800 text-emerald-400 border border-slate-700" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {dist}
              </button>
            ))}
          </div>
        </section>

        {/* 3. CORE EVENT CARD GRID INTERFACE */}
        <section>
          {/* 17. EMPTY STATE CONTROLLER FRAMEWORK */}
          {filteredEvents.length === 0 ? (
            <div className="border border-dashed border-slate-900 bg-[#04070e]/50 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-900 flex items-center justify-center mx-auto text-slate-600">
                <Inbox size={20} />
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-wider">No Matching Registries Found</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  We couldn't locate any Islamic gatherings matching your criteria in this configuration context. Try clearing queries to reset paths.
                </p>
              </div>
              <button 
                onClick={() => { setActiveDistrict("All"); setActiveCategory("All Gatherings"); setSearchQuery(""); }}
                className="h-8 px-4 bg-slate-900 border border-slate-800 rounded-lg text-[10px] font-black uppercase hover:border-slate-700 transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((item) => (
                <article 
                  key={item.id} 
                  className="group relative rounded-2xl bg-[#050a12] border border-slate-900 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:border-emerald-500/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div>
                    {/* 4. Visual Media Placeholder Engine Integration */}
                    <div className="h-40 w-full bg-slate-950 relative overflow-hidden border-b border-slate-900/40">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050a12] via-transparent to-transparent" />
                      
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                        <span className="text-[8px] font-black bg-slate-950/90 text-slate-400 border border-slate-900 px-2 py-0.5 rounded uppercase tracking-wider backdrop-blur-sm">{item.category}</span>
                        <span className="text-[8px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase tracking-wider backdrop-blur-sm">{item.tag}</span>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-1.5 text-[9px] font-black uppercase text-emerald-400 tracking-wider">
                        <MapPin size={11} className="text-emerald-500" />
                        <span>{item.district} District Node</span>
                      </div>

                      <Link href={`/event/${item.id}`} className="block">
                        <h4 className="text-sm font-black text-white tracking-tight leading-snug hover:text-emerald-400 transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                      </Link>

                      <div className="bg-slate-950/40 border border-slate-900/60 rounded-xl p-2.5 flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-800 shrink-0 flex items-center justify-center text-xs text-slate-500">🎙</div>
                        <div className="truncate">
                          <span className="text-[10px] font-extrabold text-slate-200 block truncate">{item.speaker}</span>
                          <span className="text-[8px] font-bold text-slate-500 block truncate">{item.speakerTitle}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-slate-900/30 mt-2 flex items-center justify-between gap-4">
                    <div className="flex flex-col text-left">
                      <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest block">Timeline Grid</span>
                      <span className="text-[10px] font-bold text-slate-300">{item.date}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => toggleSave(item.id)}
                        className={`w-8 h-8 rounded-lg bg-slate-950 border border-slate-900 flex items-center justify-center transition-all ${
                          savedEvents.includes(item.id) ? "text-emerald-400 border-emerald-500/30" : "text-slate-500 hover:text-slate-400"
                        }`}
                      >
                        <Bookmark size={12} className={savedEvents.includes(item.id) ? "fill-emerald-500/10" : ""} />
                      </button>
                      <Link href={`/event/${item.id}`} className="h-8 px-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 transition-colors">
                        <span>Details</span>
                        <ArrowUpRight size={11} className="text-slate-500" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* 8. ROADMAP PIPELINE FEATURE SECTION */}
        <section className="bg-gradient-to-b from-[#040810] to-[#020408] border border-slate-900 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900/60 pb-4 mb-4">
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1.5"><Sparkles size={13} /> Project Map Blueprint Pipeline</h4>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Evolving updates built exclusively for the Kerala Muslim community framework.</p>
            </div>
            <span className="text-[8px] font-black bg-emerald-950 text-emerald-400 border border-emerald-900 px-2 py-0.5 rounded uppercase shrink-0">v1.2 Roadmap</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900">
              <span className="text-[9px] font-black text-white uppercase block">🔍 AI Poster Scanner</span>
              <p className="text-[8px] text-slate-500 mt-1 leading-relaxed">Drop raw WhatsApp images to extract metadata instantly into the dashboard.</p>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900">
              <span className="text-[9px] font-black text-white uppercase block">🔔 Alert Notifications</span>
              <p className="text-[8px] text-slate-500 mt-1 leading-relaxed">Subscribe to local district networks for automatic weekly updates on WhatsApp.</p>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900">
              <span className="text-[9px] font-black text-white uppercase block">📱 Native Mobile View</span>
              <p className="text-[8px] text-slate-500 mt-1 leading-relaxed">Bottom navigation mechanics for slick mobile home-screen integration flows.</p>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900">
              <span className="text-[9px] font-black text-white uppercase block">🕌 Masjid Directory</span>
              <p className="text-[8px] text-slate-500 mt-1 leading-relaxed">Unified maps tracking prayer timelines across major local state highways.</p>
            </div>
          </div>
        </section>

      </main>

      {/* 6. COMPREHENSIVE PRODUCT FOOTER COMPONENT */}
      <footer className="border-t border-slate-900 bg-[#03060c] mt-24 px-6 py-12 text-slate-500 text-xs font-medium">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-900">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center font-serif text-white text-xs font-black">د</div>
              <span className="font-black text-white text-xs tracking-tight">DeenEvents Kerala</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              A modern, hyper-focused open-source directory built to document and broadcast Islamic educational programs across Kerala.
            </p>
          </div>

          <div>
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block mb-3">Core Application</span>
            <ul className="space-y-2 text-[11px] font-bold text-slate-400">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">Discover Events Feed</Link></li>
              <li><Link href="/poster" className="hover:text-emerald-400 transition-colors">AI Studio Workspace</Link></li>
            </ul>
          </div>

          <div>
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block mb-3">Legality Support</span>
            <ul className="space-y-2 text-[11px] font-bold text-slate-400">
              <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Protocols</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact Engineering</Link></li>
            </ul>
          </div>

          <div>
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block mb-3">Community Links</span>
            <div className="flex flex-col gap-2">
              <a href="https://t.me" target="_blank" rel="noreferrer" className="h-9 px-3.5 bg-slate-950 hover:bg-slate-900 border border-slate-900 rounded-xl inline-flex items-center gap-2 text-slate-300 font-bold transition-all"><Send size={12} className="text-sky-500" /> <span>Join Telegram Hub</span></a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© 2026 DeenEvents Kerala. All rights reserved.</p>
          <div className="p-2 px-3 bg-slate-950 border border-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5"><Smartphone size={12} className="text-emerald-500" /> <span>Built Exclusively for Kerala Muslims</span></div>
        </div>
      </footer>

      {/* 12. MOBILE UX STICKY BOTTOM NAVIGATION DOCK (Hidden on Desktop) */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-[#020408]/90 backdrop-blur-lg border-t border-slate-900 md:hidden p-2 px-6 flex items-center justify-between shadow-2xl">
        <Link href="/" className="flex flex-col items-center gap-0.5 text-emerald-400">
          <HomeIcon size={16} />
          <span className="text-[8px] font-black uppercase tracking-wider">Home</span>
        </Link>
        <Link href="/poster" className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-slate-300">
          <Sparkles size={16} />
          <span className="text-[8px] font-black uppercase tracking-wider">AI Canvas</span>
        </Link>
        <Link href="/submit" className="flex flex-col items-center justify-center w-10 h-10 rounded-full bg-emerald-600 text-white shadow-lg relative -top-3 border-4 border-[#020408]">
          <PlusCircle size={18} />
        </Link>
        <button onClick={() => alert("Saved Bookmarks Engine Sync Active")} className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-slate-300">
          <Bookmark size={16} />
          <span className="text-[8px] font-black uppercase tracking-wider">Saved</span>
        </button>
        <button onClick={() => alert("Authentication State Profile Panel Locked")} className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-slate-300">
          <User size={16} />
          <span className="text-[8px] font-black uppercase tracking-wider">Profile</span>
        </button>
      </div>

    </div>
  );
}