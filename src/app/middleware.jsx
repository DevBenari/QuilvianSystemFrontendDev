import { NextResponse } from 'next/server';

// Middleware untuk pengecekan auth di server-side (lebih cepat dari client-side)
export function middleware(request) {
  // Mendapatkan token dari cookies
  const token = request.cookies.get('token')?.value;
  
  // Mendapatkan path yang sedang diakses
  const { pathname } = request.nextUrl;
  
  // Daftar path yang tidak memerlukan autentikasi
  const publicPaths = ['/Login', '/register'];
  
  // Cek apakah path saat ini adalah path publik
  const isPublicPath = publicPaths.some(path => pathname === path);
  
  // Jika di path kiosk dan tidak ada token kiosk khusus, redirect ke login
  if (pathname.startsWith('/kiosk')) {
    const kioskToken = request.cookies.get('kiosk_token')?.value;
    if (!kioskToken) {
      return NextResponse.redirect(new URL('/Login', request.url));
    }
  }
  // Jika tidak ada token dan bukan public path, redirect ke login
  else if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/Login', request.url));
  }
  // Jika sudah login dan mencoba mengakses halaman login, redirect ke homepage
  else if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Jika kondisi di atas tidak terpenuhi, lanjutkan request
  return NextResponse.next();
}

// Konfigurasi path mana yang akan diproses middleware
export const config = {
  matcher: [
    // Matchers untuk semua paths kecuali next internal, api routes, assets statis, dll
    '/((?!api|_next/static|_next/image|favicon.ico|Images).*)',
  ],
};