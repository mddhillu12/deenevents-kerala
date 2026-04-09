import Link from "next/link";
import { Search, MapPin, Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";

export default function Home() {
  // TODO: Replace placeholder data with data fetched from Supabase
  const upcomingEvents = [
    {
      id: "1",
      title: "Friday Islamic Lecture: Family Values",
      district: "Malappuram",
      venue: "Central City Masjid",
      date: "April 12, 2026",
      time: "07:30 PM",
      speaker: "Usthad Abdul Rahman",
      tag: "Lecture",
    },
    {
      id: "2",
      title: "Youth Guidance Summit 2026",
      district: "Kozhikode",
      venue: "Islamic Cultural Center",
      date: "April 15, 2026",
      time: "09:00 AM",
      speaker: "Multiple Speakers",
      tag: "Summit",
    },
    {
      id: "3",
      title: "Weekly Quran Tafseer",
      district: "Ernakulam",
      venue: "Ernakulam Town Juma Masjid",
      date: "April 18, 2026",
      time: "06:00 PM",
      speaker: "Sheikh Abdullah",
      tag: "Classes",
    },
  ];

  const districts = ["Kozhikode", "Malappuram", "Ernakulam", "Kannur", "Thrissur", "Trivandrum"];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* HERO SECTION */}
      <section className="bg-emerald-900 text-white py-20 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight mb-6">
            Find Islamic Events in <span className="text-emerald-400">Kerala</span>
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-10">
            Your centralized directory for lectures, community gatherings, and educational programs happening in your district.
          </p>

          {/* Quick Search Bar */}
          <div className="max-w-3xl mx-auto bg-white rounded-full p-2 flex shadow-xl">
            <div className="flex-grow flex items-center px-4">
              <Search className="text-gray-400 w-6 h-6 mr-3" />
              <input
                type="text"
                placeholder="Search by speaker, topic, or location..."
                className="w-full py-3 text-gray-900 outline-none text-lg bg-transparent"
              />
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-500 transition px-8 py-3 rounded-full font-semibold">
              Search
            </button>
          </div>
        </div>
        
        {/* Decorative Background Element */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* BROWSE BY DISTRICT */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <MapPin className="mr-2 text-emerald-600" /> Browse by District
        </h2>
        <div className="flex flex-wrap gap-4">
          {districts.map((district) => (
            <Link 
              href={`/district/${district.toLowerCase()}`} 
              key={district}
              className="bg-white border border-gray-200 px-6 py-3 rounded-xl shadow-sm hover:border-emerald-500 hover:shadow-md transition text-gray-700 font-medium"
            >
              {district}
            </Link>
          ))}
          <Link href="/districts" className="px-6 py-3 rounded-xl font-medium text-emerald-700 hover:text-emerald-800 transition flex items-center">
            View All <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* UPCOMING EVENTS GRID */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold flex items-center">
            <Calendar className="mr-2 text-emerald-600" /> Upcoming Highlights
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="p-6 flex-grow">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-4">
                  {event.tag}
                </span>
                <h3 className="text-xl font-bold mb-2 leading-tight">{event.title}</h3>
                
                <div className="space-y-2 mt-4 text-gray-600 text-sm">
                  <p className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> {event.venue}, {event.district}</p>
                  <p className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {event.date}</p>
                  <p className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {event.time}</p>
                  <p className="flex items-center"><BookOpen className="w-4 h-4 mr-2" /> {event.speaker}</p>
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 mt-auto">
                <Link href={`/event/${event.id}`} className="text-emerald-700 font-semibold hover:text-emerald-800 flex items-center justify-between w-full">
                  View Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}