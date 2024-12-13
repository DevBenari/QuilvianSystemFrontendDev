'use client';
// components/ScrollLayout.js
import { useEffect } from 'react';

export default function ScrollLayout({ children }) {
  useEffect(() => {
    // Menangani scroll ke atas ketika halaman dimuat
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return <>{children}</>;
}
