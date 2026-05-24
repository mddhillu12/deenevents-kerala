// app/event/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { 
  MapPin, Calendar, Clock, Share2, Heart, ArrowLeft, 
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
    fetchEvent();
  }, [params.id]);

  const fetchEvent = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    const { data } = await supabase
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
    if (!event) return;
    const timer = setInterval(() => {
      const eventTime = new Date(`${event.date}T${event.time || "00:00"}`).getTime();
      const now = Date.now();
      const diff = eventTime - now;

      if (diff < 0) {
        setTimeLeft("Event has started");
        return;
      }
      const days = Math.floor(diff / (86400000));
      const hours = Math.floor((diff % 86400000) / 3600000);
      setTimeLeft(`${days}d ${hours}h left`);
    }, 60000);
    return () => clearInterval(timer);
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

  const shareToWhatsApp = () => {
    const text = `${event.title}\n\nBy: ${event.speaker}\nDate: ${event.date}\nVenue: ${event.location}, ${event.district}\n\nJoin us!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!event) return <div className="min-h-screen pt-20 text-center">Event not found</div>;

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-emerald-900 text-white pt-8 pb-20 px-4">
        <Link href="/" className="flex items-center gap-2 mb-6 text-emerald-200">
          <ArrowLeft size={20} /> Back
        </Link>
        <span className="inline-block bg-emerald-700 px-4 py-1 rounded-full text-sm">{event.category}</span>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-12 relative">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {event.poster_url && (
            <img src={event.poster_url} alt={event.title} className="w-full h-80 object-cover" />
          )}

          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 leading-tight">{event.title}</h1>

            <div className="inline-block bg-orange-100 text-orange-700 px-5 py-2 rounded-2xl text-sm font-medium mb-6">
              ⏳ {timeLeft}
            </div>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <User className="w-6 h-6 text-emerald-600 mt-1" />
                <div><p className="text-gray-500">Speaker</p><p className="font-semibold">{event.speaker}</p></div>
              </div>

              <div className="flex gap-4">
                <Calendar className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <p className="text-gray-500">Date & Time</p>
                  <p className="font-semibold">{new Date(event.date).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                  <p>{event.time}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <p className="text-gray-500">Venue</p>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button onClick={toggleSave} className={`py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 ${isSaved ? 'bg-red-100 text-red-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <Heart className={isSaved ? "fill-current" : ""} /> {isSaved ? "Saved" : "Save Event"}
              </button>

              <button onClick={shareToWhatsApp} className="bg-green-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-green-700">
                <Share2 /> Share on WhatsApp
              </button>
            </div>

            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location + ", " + event.district)}`} target="_blank" className="mt-4 block w-full text-center py-4 border border-emerald-600 text-emerald-600 rounded-2xl font-semibold">
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}