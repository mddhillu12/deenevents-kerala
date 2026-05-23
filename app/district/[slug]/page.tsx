// app/district/[slug]/page.tsx
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { MapPin, Calendar } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ category?: string }>;
};

export default async function DistrictPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { category } = await searchParams;

  const districtName = slug.charAt(0).toUpperCase() + slug.slice(1);
  const supabase = await createClient();

  let query = supabase
    .from("events")
    .select("*")
    .eq("district", districtName)
    .order("date", { ascending: true });

  if (category) query = query.eq("category", category);

  const { data: events } = await query;

  return (
    <main className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-emerald-800">{districtName}</h1>
          <p className="text-xl text-gray-600 mt-2">Islamic Events in {districtName} District</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.length === 0 ? (
            <p className="col-span-full text-center py-20 text-gray-500">No events found in this district yet.</p>
          ) : (
            events?.map((event: any) => (
              <Link href={`/event/${event.id}`} key={event.id} className="block">
                <div className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition-all">
                  {event.poster_url && (
                    <img src={event.poster_url} className="w-full h-52 object-cover" alt="" />
                  )}
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 line-clamp-2">{event.title}</h3>
                    <p className="text-emerald-600 font-medium">{event.speaker}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString('en-IN')}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}