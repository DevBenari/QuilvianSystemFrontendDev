'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

export function useAuth({ requireAuth = true } = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const { token } = useSelector((state) => state.auth);
  const [isClient, setIsClient] = useState(false);
  
  // Cek token dari cookies juga sebagai fallback
  const cookieToken = typeof window !== 'undefined' ? Cookies.get('token') : null;
  const isAuthenticated = !!token || !!cookieToken;
  
  // Daftar halaman publik
  const publicPages = ['/Login', '/register'];
  const isPublicPage = publicPages.includes(pathname);
  const isKioskPage = pathname.startsWith('/kiosk');

  // Use hydration-safe check
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; // Skip effect during SSR

    // Redirect only on client-side after hydration
    if (requireAuth && !isAuthenticated && !isPublicPage && !isKioskPage) {
      router.replace('/Login'); // Use replace instead of push for cleaner history
    }
    
    if (isAuthenticated && isPublicPage) {
      router.replace('/');
    }
  }, [isAuthenticated, pathname, requireAuth, router, isPublicPage, isKioskPage, isClient]);

  return { isAuthenticated };
}