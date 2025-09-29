import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const response = NextResponse.next();

  // 1. Logging - Tüm istekleri logla
  console.log(`[${new Date().toISOString()}] ${req.method} ${pathname}`);

  // 2. Cors Headers - API Route'ları İçin
  if (pathname.startsWith("/api/")) {
    // cors headerları ekle...
  }

  // 3. Güvenlik Headers - Tüm sayfalar için
  response.headers.set("Refferer-Policy", "origin..");

  // 4. Route Koruması
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("auth-token");
    if (!token) return NextResponse.redirect("http://localhost:3000/");
  }

  // 5. Rate Limiting
  const ip = req.headers.get("x-forwarded-for");
  console.log(`IP: ${ip}`);
}

// middleware'in hangi route'larda çalışacağını belirliyoruz
export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};
