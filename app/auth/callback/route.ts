import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Exchange the temporary authorization code secure token for a permanent session
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Reroute back to the main user feed platform dashboard directory cleanly
  return NextResponse.redirect(requestUrl.origin);
}