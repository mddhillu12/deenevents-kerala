// app/event/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { 
  MapPin, Calendar, Clock, Share2, Heart, Map, ArrowLeft, 
  User, Building 
} from "lucide-react";

export default function EventDetails() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    fetchEventAndUser();
  }, [params.id]);

  const fetchEventAndUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", params.id)
      .single();

    if (data) {
      setEvent(data);
      
      if (user) {
        const { data: saved } = await supabase
          .from("saved_events")
          .select("id")
          .eq("event_id", data.id)
          .eq("user_id", user.id)
          .single();
        setIsSaved(!!saved);
      }
    }
    setLoading(false);
  };

  // Countdown
  useEffect(() => {
    if (!event?.date) return;
    const interval = setInterval(() => {
      const eventDate = new Date(`${event.date}T${event.time || "00:00"}`).getTime();
      const now = Date.now();
      const diff = eventDate - now;

      if (diff < 0) {
        setTimeLeft("Event has started");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setTimeLeft(`${days}d ${hours}h remaining`);
    }, 60000);

    return () => clearInterval(interval);
  }, [event]);

  const toggleSave = async () => {
    if (!user) return router.push("/login");

    if (isSaved) {
      await supabase.from("saved_events").delete().eq("event_id", event.id).eq("user_id", user.id);
    } else {
      await supabase.from("saved_events").insert({ event_id: event.id, user_id: user.id });
    }
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    const text = `${event.title}\nby ${event.speaker}\n${event.date} • ${event.location}`;
    if (navigator.share) {
      navigator.share({ title: event.title, text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full"></div></div>;

  if (!event) return <div className="min-h-screen pt-20 text-center">Event not found</div>;

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-emerald-900 text-white pt-6 pb-16 px-4 relative">
        <Link href="/" className="flex items-center gap-2 text-emerald-200 mb-6">
          <ArrowLeft /> Back to Events
        </Link>
        <span className="inline-block bg-emerald-700 px-4 py-1 rounded-full text-sm">{event.category}</span>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-10 relative">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {event.poster_url && (
            <img src={event.poster_url} alt={event.title} className="w-full h-80 object-cover" />
          )}

          <div className="p-7">
            <h1 className="text-3xl font-bold leading-tight mb-4">{event.title}</h1>

            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-2xl text-sm font-medium mb-6">
              ⏳ {timeLeft}
            </div>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <User className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <p className="text-gray-500 text-sm">Speaker</p>
                  <p className="font-semibold text-lg">{event.speaker}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Calendar className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <p className="text-gray-500 text-sm">Date & Time</p>
                  <p className="font-semibold">{new Date(event.date).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  <p>{event.time}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <p className="text-gray-500 text-sm">Venue</p>
                  <p className="font-semibold">{event.location}</p>
                  <p className="text-gray-600">{event.district}</p>
                </div>
              </div>
            </div>

            {event.description && (
              <div className="border-t pt-6 mb-8">
                <h3 className="font-bold mb-3">About the Event</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{event.description}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={toggleSave}
                className={`flex-1 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all ${isSaved ? "bg-red-100 text-red-600" : "bg-gray-100 hover:bg-gray-200"}`}
              >
                <Heart className={isSaved ? "fill-current" : ""} /> {isSaved ? "Saved" : "Save Event"}
              </button>

              <button
                onClick={handleShare}
                className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700"
              >
                <Share2 /> Share on WhatsApp
              </button>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location + ", " + event.district + ", Kerala")}`}
              target="_blank"
              className="mt-3 block w-full text-center py-4 border border-emerald-600 text-emerald-600 rounded-2xl font-semibold hover:bg-emerald-50"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}