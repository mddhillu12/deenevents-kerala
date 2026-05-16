export const dynamic = "force-dynamic"; // Forces Next.js to load this page live on request instead of at build time
import { createClient } from "../utils/supabase/server"; // Fixed path
import { redirect } from "next/navigation";
import { Check, Trash2, ShieldAlert } from "lucide-react";
import { revalidatePath } from "next/cache";

interface EventItem {
  id: string;
  title: string;
  speaker: string;
  district: string;
  venue: string;
  event_date: string;
}

export default async function AdminPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/");
  }

  const { data: pendingEvents } = await supabase
    .from("events")
    .select("*")
    .eq("approved", false)
    .order("event_date", { ascending: true });

  async function approveEvent(formData: FormData) {
    "use server";
    const id = formData.get("id");
    const supabase = await createClient();
    await supabase.from("events").update({ approved: true }).eq("id", id);
    revalidatePath("/admin");
    revalidatePath("/");
  }

  async function deleteEvent(formData: FormData) {
    "use server";
    const id = formData.get("id");
    const supabase = await createClient();
    await supabase.from("events").delete().eq("id", id);
    revalidatePath("/admin");
  }

  return (
    <main className="min-h-screen bg-[#020405] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center gap-4 mb-12 border-b border-white/5 pb-6">
          <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight italic">Admin Control Center</h1>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-0.5">Event Verification Queue</p>
          </div>
        </header>

        {!pendingEvents || pendingEvents.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl">
            <p className="text-gray-400 font-bold">No pending events requiring approval.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {(pendingEvents as EventItem[]).map((event) => (
              <div key={event.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="bg-amber-500/10 text-amber-400 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">
                    {event.district}
                  </span>
                  <h3 className="text-xl font-black leading-tight mb-1">{event.title}</h3>
                  <p className="text-gray-400 font-bold text-xs mb-3">Speaker: {event.speaker}</p>
                  <p className="text-gray-500 text-xs">📍 {event.venue} | 📅 {event.event_date}</p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                  <form action={approveEvent} className="flex-1 md:flex-none">
                    <input type="hidden" name="id" value={event.id} />
                    <button type="submit" className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] uppercase tracking-wider px-5 py-3 rounded-xl transition-all">
                      <Check size={14} /> Approve
                    </button>
                  </form>

                  <form action={deleteEvent} className="flex-1 md:flex-none">
                    <input type="hidden" name="id" value={event.id} />
                    <button type="submit" className="w-full flex items-center justify-center gap-2 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white font-black text-[10px] uppercase tracking-wider px-5 py-3 rounded-xl transition-all">
                      <Trash2 size={14} /> Reject
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}