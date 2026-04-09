import { supabase } from "@/lib/supabase";

export default async function AdminPage() {
  const { data: submissions } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid gap-6">
        {submissions?.map((submission) => (
          <div
            key={submission.id}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            <h2 className="text-2xl font-bold">
              {submission.title}
            </h2>
            <p>{submission.district}</p>
            <p>{submission.speaker}</p>
            <p>{submission.event_date}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
