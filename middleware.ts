import { NextRequest, NextResponse } from "next/server";

// In-memory rate limit store (resets on cold start — acceptable for serverless)
// For production scale, replace with Upstash Redis or similar edge store.
const store = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 3; // max submissions per window per IP

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const key = `lead:${ip}`;
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count += 1;
  return false;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rate limit public lead submission endpoints
  if (
    req.method === "POST" &&
    (pathname === "/api/buyer-leads" || pathname === "/api/owner-leads")
  ) {
    const ip = getIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 10 phút." },
        { status: 429 },
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/buyer-leads", "/api/owner-leads"],
};
