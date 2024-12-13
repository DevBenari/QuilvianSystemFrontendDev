import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const useCachedPathname = () => {
    const pathname = usePathname(); 
    const [cachedPathname, setCachedPathname] = useState(pathname);

    useEffect(() => {
        if (pathname !== cachedPathname) {
            setCachedPathname(pathname);
        }
    }, [pathname, cachedPathname]);

    return cachedPathname;
};

export default useCachedPathname;
