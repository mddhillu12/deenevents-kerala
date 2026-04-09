"use client";

import { use } from "react";

type EventPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function EventPage({ params }: EventPageProps) {
  // In Client Components, we use 'use' to unwrap the params promise
  const { id } = use(params);

  // This is your dummy data (Later you will fetch this from Supabase using the 'id')
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

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

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

        <div className="flex flex-wrap gap-4 mt-8">
          {/* Native Share Button */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: event.title,
                  text: event.description,
                  url: shareUrl,
                });
              }
            }}
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition"
          >
            Share Event
          </button>

          {/* WhatsApp Share Button */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `${event.title} - ${shareUrl}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition"
          >
            Share on WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}