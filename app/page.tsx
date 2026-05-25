// app/page.tsx
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { MapPin, Calendar, Clock, Search, Users } from "lucide-react";
import HomeClient from "./HomeClient";

export const revalidate = 3600; // Revalidate every hour (can reduce later)

const keralaDistricts = [
  "All Districts", "Malappuram", "Kozhikode", "Kannur", "Kasaragod", 
  "Thrissur", "Ernakulam", "Palakkad", "Wayanad", "Idukki", "Alappuzha", "Kottayam", "Pathanamthitta", "Thiruvananthapuram"
];

export default async function Home({ 
  searchParams 
}: { 
  searchParams: { search?: string; category?: string; district?: string } 
}) {
  const supabase = await createClient();

  const searchTerm = searchParams.search || "";
  const category = searchParams.category || "All";
  const district = searchParams.district || "All Districts";

  // Build query
  let query = supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true })
    .limit(20);
    // Remove strict status filter for now
// if (status) ...

  if (searchTerm) {
    query = query.or(`title.ilike.%${searchTerm}%,speaker.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`);
  }

  if (category !== "All") {
    query = query.eq("category", category);
  }

  if (district !== "All Districts") {
    query = query.eq("district", district);
  }

  const { data: events, error } = await query;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-900 text-white pt-16 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585208798174-6cedd86e19f0')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter">
            Deen Events Kerala
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Discover authentic Islamic lectures, dars, khutbahs &amp; community programs across Kerala
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <HomeClient 
              initialEvents={events || []} 
              districts={keralaDistricts}
              initialSearch={searchTerm}
              initialCategory={category}
              initialDistrict={district}
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-2xl mb-8">
            Error loading events. Please try again later.
          </div>
        )}

        <HomeClient 
          initialEvents={events || []} 
          districts={keralaDistricts}
          initialSearch={searchTerm}
          initialCategory={category}
          initialDistrict={district}
        />
      </div>
    </main>
  );
}