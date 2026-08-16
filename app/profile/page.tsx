  // app/profile/page.tsx
  "use client";

  import { useEffect, useState } from "react";
  import { createClient } from "@/utils/supabase/client";
  import Link from "next/link";
  import { User, Bookmark, Heart, LogOut, Settings, Calendar } from "lucide-react";
  import { useRouter } from "next/navigation";

  export default function ProfilePage() {
    const supabase = createClient();
    const router = useRouter();
    
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState({ saved: 0, submitted: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchProfile = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          // Saved count
          const { count: savedCount } = await supabase
            .from("saved_events")
            .select("*", { count: 'exact', head: true })
            .eq("user_id", user.id);

          // Submitted count
          const { count: submittedCount } = await supabase
            .from("events")
            .select("*", { count: 'exact', head: true })
            .eq("user_id", user.id);

          setStats({
            saved: savedCount || 0,
            submitted: submittedCount || 0
          });
        }
        setLoading(false);
      };

      fetchProfile();
    }, []);

    const handleLogout = async () => {
      await supabase.auth.signOut();
      router.push("/");
    };

    if (loading) return <div className="pt-20 text-center">Loading profile...</div>;

    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24 pt-20 px-4">
        <div className="max-w-xl mx-auto space-y-8">
          {/* Profile Header */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm text-center border border-gray-100 dark:border-gray-800">
            <div className="w-24 h-24 mx-auto bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mb-4">
              {user?.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} className="w-24 h-24 rounded-full" alt="" />
              ) : (
                <User size={48} className="text-emerald-600" />
              )}
            </div>
            <h2 className="text-2xl font-bold">{user?.user_metadata?.full_name || "Muslim Brother/Sister"}</h2>
            <p className="text-gray-500">{user?.email}</p>

            <div className="flex justify-center gap-8 mt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-600">{stats.saved}</p>
                <p className="text-xs text-gray-500">Saved</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-600">{stats.submitted}</p>
                <p className="text-xs text-gray-500">Submitted</p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800">
            <Link href="/saved" className="flex items-center gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800">
              <Bookmark className="w-6 h-6 text-blue-600" />
              <div className="flex-1">Saved Events</div>
              <span className="text-emerald-600 font-medium">{stats.saved}</span>
            </Link>

            <Link href="/my-events" className="flex items-center gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800">
              <Heart className="w-6 h-6 text-purple-600" />
              <div className="flex-1">My Submissions</div>
              <span className="text-emerald-600 font-medium">{stats.submitted}</span>
            </Link>

            <Link href="/submit" className="flex items-center gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800">
              <Calendar className="w-6 h-6 text-emerald-600" />
              <div className="flex-1">Submit New Event</div>
            </Link>

            <button onClick={handleLogout} className="w-full flex items-center gap-4 p-5 hover:bg-red-50 dark:hover:bg-red-950 text-red-600">
              <LogOut className="w-6 h-6" />
              <div>Sign Out</div>
            </button>
          </div>
        </div>
      </main>
    );
  }