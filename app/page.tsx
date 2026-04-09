import Link from "next/link";

export default function HomePage() {
  const districts = [
    "Malappuram",
    "Kozhikode",
    "Kannur",
    "Ernakulam",
    "Thrissur",
    "Kasaragod",
  ];

  const upcomingEvents = [
    {
      title: "Friday Islamic Lecture",
      district: "Malappuram",
      date: "April 12, 2026",
    },
    {
      title: "Youth Quran Camp",
      district: "Kozhikode",
      date: "April 15, 2026",
    },
    {
      title: "Family Dars Program",
      district: "Kannur",
      date: "April 18, 2026",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-700">
          DeenEvents Kerala
        </h1>
        <Link
  href="/submit"
  className="bg-emerald-600 text-white px-4 py-2 rounded-xl"
>
  Submit Event
</Link>

      </nav>

      {/* Hero */}
      <section className="bg-emerald-700 text-white py-20 px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Kerala Islamic Programmes in One Place
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Explore district-wise Islamic events, lectures, camps, dars,
          and community programmes happening across Kerala.
        </p>

        <input
          type="text"
          placeholder="Search by district, speaker, or event..."
          className="w-full max-w-xl rounded-2xl px-5 py-4 text-black"
        />
      </section>

      {/* Districts */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">Browse by District</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {districts.map((district) => (
            <Link
              href={`/district/${district.toLowerCase()}`}
              key={district}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition block"
            >
              <h3 className="text-xl font-semibold">{district}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold mb-8">Upcoming Programmes</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <Link
              href={`/event/${index}`}
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 block hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p>{event.district}</p>
              <p className="text-sm text-gray-500">{event.date}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-700 text-white text-center py-6">
        © 2026 DeenEvents Kerala. All rights reserved.
      </footer>
    </main>
  );
}
