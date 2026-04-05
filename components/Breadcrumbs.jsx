'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment !== '');

  // Hide on homepage
  if (pathSegments.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 overflow-x-auto whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-black/30">
      <Link href="/" className="inline-flex items-center gap-1 hover:text-black transition">
        <Home size={11} strokeWidth={2.5} />
        Home
      </Link>
      
      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;
        const title = segment.replace(/-/g, ' ');

        return (
          <div key={href} className="flex items-center gap-2">
            <ChevronRight size={10} strokeWidth={3} className="text-black/20" />
            {isLast ? (
              <span className="text-black/60 truncate max-w-[200px]">{title}</span>
            ) : (
              <Link href={href} className="hover:text-black transition">
                {title}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
