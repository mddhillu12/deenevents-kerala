import { createClient } from "../../utils/supabase/server"; // Fixed path
type EventPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (!event) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        Event not found
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950 text-white px-6 py-16">
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-10">
        <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
        <p className="text-lg mb-2">📍 {event.venue}, {event.district}</p>
        <p className="text-lg mb-2">📅 {event.event_date}</p>
        <p className="text-lg mb-2">🎤 {event.speaker}</p>
        <p className="text-lg mb-6">🏢 {event.organization || "N/A"}</p>
        <p className="text-gray-300 leading-8">{event.description || "No description provided."}</p>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${event.title || ""} - ${event.venue || ""}`)}`}
          target="_blank" rel="noopener noreferrer"
          className="mt-8 inline-block bg-green-600 text-white px-6 py-3 rounded-xl"
        >Share on WhatsApp</a>
      </div>
    </main>
  );
}