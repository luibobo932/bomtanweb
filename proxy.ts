import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabasePublishableKey, getSupabaseUrl, hasSupabasePublicEnv } from "@/lib/supabase-env";

// ─── Rate limiting (per serverless instance) ────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

// ─── Middleware ──────────────────────────────────────────────────────────────
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rate limit public lead APIs
  const isLeadApi =
    pathname === "/api/buyer-leads" || pathname === "/api/owner-leads";

  if (isLeadApi && request.method === "POST") {
    if (isRateLimited(getIp(request))) {
      return NextResponse.json(
        { error: "Quá nhiều yêu cầu. Vui lòng thử lại sau 1 phút." },
        { status: 429 },
      );
    }
  }

  // Supabase session refresh for admin routes
  let response = NextResponse.next({ request: { headers: request.headers } });

  if (hasSupabasePublicEnv()) {
    const supabase = createServerClient(
      getSupabaseUrl(),
      getSupabasePublishableKey(),
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );
    await supabase.auth.getUser();
  }

  return response;
}

export const config = {
  matcher: [
    "/api/buyer-leads",
    "/api/owner-leads",
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
