"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { 
  MapPin, Calendar, Clock, Share2, User, Building, 
  ArrowLeft, Loader2, Image as ImageIcon, Map 
} from "lucide-react";

export default function EventDetails() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");
  const supabase = createClient();

  useEffect(() => {
    async function fetchEvent() {
      if (!params?.id) return;
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", params.id)
        .single();

      if (data) setEvent(data);
      setLoading(false);
    }
    fetchEvent();
  }, [params]);

  // Countdown Timer Logic
  useEffect(() => {
    if (!event?.date) return;
    
    const timer = setInterval(() => {
      const eventDate = new Date(`${event.date}T${event.time || '00:00:00'}`).getTime();
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance < 0) {
        setTimeLeft("Event has started/ended");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setTimeLeft(`${days}d ${hours}h left`);
    }, 1000);

    return () => clearInterval(timer);
  }, [event]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: `Join this event: ${event.title} by ${event.speaker}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800">Event not found</h1>
        <button onClick={() => router.push('/')} className="mt-4 text-emerald-600 hover:underline">
          Go back home
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Islamic Styled Header */}
      <div className="bg-emerald-900 text-white pt-6 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        <div className="max-w-2xl mx-auto relative z-10 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-emerald-100 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back
          </Link>
          {event.category && (
            <span className="bg-emerald-800 border border-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
              {event.category}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Poster Section (Priority 2) */}
          {event.poster_url ? (
            <div className="w-full h-72 bg-gray-100 relative">
              <img 
                src={event.poster_url} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-32 bg-emerald-50 flex flex-col items-center justify-center border-b border-gray-100">
              <ImageIcon className="w-8 h-8 text-emerald-200 mb-2" />
              <span className="text-emerald-600/50 text-sm font-medium">No poster available</span>
            </div>
          )}

          <div className="p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
              {event.title}
            </h1>

            {/* Countdown Badge */}
            <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-xl font-bold text-sm mb-6">
              ⏱ {timeLeft}
            </div>

            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-3">
                <User className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Speaker</p>
                  <p className="text-gray-900 font-semibold text-lg">{event.speaker}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Date & Time</p>
                  <p className="text-gray-900 font-semibold">
                    {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-gray-700">{event.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Location</p>
                  <p className="text-gray-900 font-semibold">{event.location}</p>
                  <p className="text-gray-700">{event.district}</p>
                </div>
              </div>

              {event.organizer && (
                <div className="flex items-start gap-3">
                  <Building className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Organized By</p>
                    <p className="text-gray-900 font-semibold">{event.organizer}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 pt-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3">About this Event</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {event.description || "No description provided for this event."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location + ' ' + event.district)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-600 text-white py-3.5 px-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Map className="w-5 h-5" />
                Open in Maps
              </a>
              
              <button 
                onClick={handleShare}
                className="flex items-center justify-center gap-2 bg-white text-gray-700 border-2 border-gray-200 py-3.5 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Share Event
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}