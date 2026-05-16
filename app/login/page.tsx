'use client'
'use client'
import { createClient } from '../utils/supabase/client' // Fixed path
export default function LoginButton() {
  const supabase = createClient()

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `https://deenevents-kerala.mddhillu12.workers.dev/auth/callback`,
      },
    })
  }

  return (
    <main className="min-h-screen bg-[#020405] flex items-center justify-center p-6">
      <button onClick={handleLogin} className="bg-white text-black font-bold py-3 px-6 rounded-xl shadow">
        Sign in with Google
      </button>
    </main>
  )
}