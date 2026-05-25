// app/saved/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { MapPin, Calendar, Heart, Trash2, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

type Event = {
  id: string;
  title: string;
  speaker: string;
  date: string;
  time?: string;
  location: string;
  district: string;
  category?: string;
  poster_url?: string | null;
};

type SavedEvent = {
  id: string;
  event: Event;
};

export default function SavedEvents() {
  const supabase = createClient();
  const router = useRouter();

  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        await fetchSavedEvents(user.id);
      }
      setLoading(false);
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        fetchSavedEvents(session.user.id);
      } else {
        setSavedEvents([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchSavedEvents = async (userId: string) => {
    setLoading(true);

    const { data, error } = await supabase
      .from("saved_events")
      .select(`
        id,
        event:events (
          id, 
          title, 
          speaker, 
          date, 
          time, 
          location, 
          district, 
          category, 
          poster_url
        )
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching saved events:", error);
      setSavedEvents([]);
    } else {
      // Safe filtering and mapping
      const validEvents: SavedEvent[] = (data || [])
        .filter((item: any) => item?.event)
        .map((item: any) => ({
          id: item.id,
          event: {
            id: item.event.id,
            title: item.event.title,
            speaker: item.event.speaker,
            date: item.event.date,
            time: item.event.time,
            location: item.event.location,
            district: item.event.district,
            category: item.event.category,
            poster_url: item.event.poster_url,
          }
        }));

      setSavedEvents(validEvents);
    }
    setLoading(false);
  };

  const unsaveEvent = async (savedId: string) => {
    const { error } = await supabase
      .from("saved_events")
      .delete()
      .eq("id", savedId);

    if (!error) {
      setSavedEvents(prev => prev.filter(item => item.id !== savedId));
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20 px-4">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-6">🔖</div>
          <h2 className="text-2xl font-bold mb-3">Sign in to Save Events</h2>
          <p className="text-gray-600 mb-8">Your saved events are securely linked to your Google account.</p>
          <button 
            onClick={() => router.push('/login')}
            className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-medium flex items-center gap-2 mx-auto"
          >
            <LogIn className="w-5 h-5" /> Sign In with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Saved Events</h1>
          <span className="text-emerald-600 font-medium">{savedEvents.length} Saved</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="h-80 bg-white rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : savedEvents.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100">
            <Heart className="w-20 h-20 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No saved events yet</h3>
            <Link href="/" className="text-emerald-600 hover:underline font-medium">Browse Events →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedEvents.map((saved) => {
              const e = saved.event;
              return (
                <div key={saved.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group">
                  {e.poster_url && (
                    <div className="relative h-52">
                      <img 
                        src={e.poster_url} 
                        alt={e.title} 
                        className="w-full h-full object-cover" 
                      />
                      <button 
                        onClick={() => unsaveEvent(saved.id)}
                        className="absolute top-3 right-3 bg-white/90 hover:bg-red-50 p-2 rounded-full text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{e.title}</h3>
                    <p className="text-emerald-600 font-medium mb-4">{e.speaker}</p>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(e.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {e.location}, {e.district}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link 
                        href={`/event/${e.id}`} 
                        className="flex-1 text-center bg-emerald-600 text-white py-3 rounded-2xl font-medium hover:bg-emerald-700 transition-colors"
                      >
                        View Details
                      </Link>
                      <button 
                        onClick={() => unsaveEvent(saved.id)}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}