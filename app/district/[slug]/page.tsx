import Link from "next/link";

type DistrictPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DistrictPage({
  params,
}: DistrictPageProps) {
  const { slug } = await params;

  const districtName =
    slug.charAt(0).toUpperCase() + slug.slice(1);

  const events = [
    {
      title: "Friday Islamic Lecture",
      venue: "Central Masjid",
      date: "April 12, 2026",
    },
    {
      title: "Quran Study Circle",
      venue: "Town Hall",
      date: "April 14, 2026",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">
        {districtName} Programmes
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {events.map((event, index) => (
          <Link
            href={`/event/${index}`}
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 block hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
            <p>{event.venue}</p>
            <p className="text-gray-500">{event.date}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
