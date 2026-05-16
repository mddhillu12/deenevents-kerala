import { createBrowserClient } from '@supabase/ssr'

// This safely pulls your real keys from Cloudflare/local env without placeholders
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)