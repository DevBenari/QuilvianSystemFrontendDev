'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  // Daftar halaman publik
  const publicPages = ['/Login', '/register'];
  const isPublicPage = publicPages.includes(pathname);
  const isKioskPage = pathname.startsWith('/kiosk');

  useEffect(() => {
    // Cek token
    const token = Cookies.get('token');

    if (!token && !isPublicPage && !isKioskPage) {
      router.replace('/Login');
    } else if (token && isPublicPage) {
      router.replace('/');
    } else {
      // Jika sudah sesuai, segera tampilkan konten
      setLoading(false);
    }
  }, [pathname, router, isPublicPage, isKioskPage]);

  // Tahan render sampai pengecekan auth selesai
  if (loading && !isPublicPage && !isKioskPage) {
    return null; // Tidak menampilkan apa-apa saat proses pengecekan
  }

  return children;
}