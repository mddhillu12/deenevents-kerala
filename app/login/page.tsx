'use client'
import { createClient } from '@/utils/supabase/client' // Adjust path to your client helper

export default function LoginButton() {
  const supabase = createClient()

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // This MUST match your Cloudflare URL + /auth/callback
        redirectTo: `https://deenevents-kerala.mddhillu12.workers.dev/auth/callback`,
      },
    })
  }

  return (
    <button onClick={handleLogin} className="bg-white text-black p-2 rounded shadow">
      Sign in with Google
    </button>
  )
}