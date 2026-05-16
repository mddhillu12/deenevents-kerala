import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  
  // 1. Extract the intended post-login destination, defaulting to the homepage
  const next = requestUrl.searchParams.get("next") ?? "/";

  if (code) {
    const cookieStore = await cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Intentionally caught to allow server components routing to pass safely
            }
          },
        },
      }
    );
    
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    // 2. Optional: If code exchange fails, redirect to a dedicated auth error view
    if (error) {
      return NextResponse.redirect(`${requestUrl.origin}/login?error=auth-callback-failed`);
    }
  }

  // 3. Ensure we only redirect internally to protect against open-redirect attacks
  // By passing next (e.g. "/dashboard") into the URL constructor with our origin,
  // it strips out external malicious domains.
  const safeRedirectUrl = new URL(next, requestUrl.origin);
  return NextResponse.redirect(safeRedirectUrl);
}