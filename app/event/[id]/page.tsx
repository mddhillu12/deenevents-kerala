type EventPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventPage({
  params,
}: EventPageProps) {
  const { id } = await params;

  const event = {
    title: "Friday Islamic Lecture",
    district: "Malappuram",
    venue: "Central Masjid",
    date: "April 12, 2026",
    speaker: "Usthad Abdul Rahman",
    organization: "DeenEvents Kerala",
    description:
      "A special Islamic lecture focused on family values and youth guidance.",
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-10">
        <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

        <p className="text-lg mb-2">
          📍 {event.venue}, {event.district}
        </p>

        <p className="text-lg mb-2">📅 {event.date}</p>
        <p className="text-lg mb-2">🎤 {event.speaker}</p>
        <p className="text-lg mb-6">🏢 {event.organization}</p>

        <p className="text-gray-700 leading-8">
          {event.description}
        </p>

        <button className="mt-8 bg-emerald-600 text-white px-6 py-3 rounded-xl">
          Share Event
        </button>
      </div>
    </main>
  );
}
