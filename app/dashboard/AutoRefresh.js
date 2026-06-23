'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AutoRefresh({ interval = 2000 }) {
  const router = useRouter();

  useEffect(() => {
    const minterval = setInterval(() => {
      // Soft refresh: fetches new data from the server without losing client state
      router.refresh();
    }, interval);
    
    return () => clearInterval(minterval);
  }, [router, interval]);

  return null;
}
