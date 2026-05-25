// app/page.tsx
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Search } from "lucide-react";
import HomeClient from "./HomeClient";
import IslamicInfo from "@/components/IslamicInfo";
import RamadanBanner from "@/components/RamadanBanner";

export const revalidate = 3600;

const keralaDistricts = [
  "All Districts", "Malappuram", "Kozhikode", "Kannur", "Kasaragod", 
  "Thrissur", "Ernakulam", "Palakkad", "Wayanad", "Idukki", 
  "Alappuzha", "Kottayam", "Pathanamthitta", "Thiruvananthapuram"
];

export default async function Home({ searchParams }: { searchParams: any }) {
  const supabase = await createClient();

  const searchTerm = searchParams.search || "";
  const category = searchParams.category || "All";
  const district = searchParams.district || "All Districts";

  let query = supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true })
    .limit(12);

  if (searchTerm) query = query.or(`title.ilike.%${searchTerm}%,speaker.ilike.%${searchTerm}%`);
  if (category !== "All") query = query.eq("category", category);
  if (district !== "All Districts") query = query.eq("district", district);

  const { data: events } = await query;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Ramadan / Eid Banner */}
      <RamadanBanner />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white pt-16 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">DeenEvents Kerala</h1>
          <p className="text-xl text-emerald-100 mb-10">Discover Authentic Islamic Events</p>
        </div>
      </section>

      {/* Islamic Info Bar (Prayer Times + Hijri) */}
      <div className="max-w-7xl mx-auto px-4 -mt-6 relative z-10">
        <IslamicInfo district="Malappuram" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
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