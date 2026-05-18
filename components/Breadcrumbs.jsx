'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.geetanjalisoftwares.in"
      },
      ...segments.map((s, i) => {
        const title = s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');
        const href = 'https://www.geetanjalisoftwares.in/' + segments.slice(0, i + 1).join('/');
        return {
          "@type": "ListItem",
          "position": i + 2,
          "name": title,
          "item": href
        };
      })
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6 hidden sm:flex items-center h-4 overflow-hidden text-black/30">
      {/* Home Section */}
      <Link href="/" className="flex items-center hover:text-black transition flex-shrink-0">
        <Home size={12} strokeWidth={2} className="relative mt-[-1px]" />
        <span className="hidden sm:inline ml-1 text-[10px] font-semibold uppercase tracking-widest leading-none relative top-[0.5px]">Home</span>
      </Link>
      
      {segments.map((s, i) => {
        const isLast = i === segments.length - 1;
        const isMiddle = i > 0 && !isLast;
        const title = s.replace(/-/g, ' ');
        const displayTitle = title.toUpperCase();
        const href = '/' + segments.slice(0, i + 1).join('/');

        // On mobile, if we have more than 2 segments, hide everything except Home and the Last segment
        // to avoid messy gaps and ensure it fits.
        const shouldHideOnMobile = segments.length > 1 && !isLast;

        return (
          <React.Fragment key={i}>
            <div className={`${shouldHideOnMobile ? 'hidden sm:flex' : 'flex'} items-center flex-shrink-0 min-w-0`}>
              <ChevronRight size={11} strokeWidth={2.5} className="mx-1 text-black/10 flex-shrink-0" />
              {isLast ? (
                <span className="text-[10px] font-semibold uppercase tracking-widest leading-none text-black/40 truncate max-w-[150px] sm:max-w-none flex-shrink-0 relative top-[0.5px]">
                  {displayTitle}
                </span>
              ) : (
                <Link href={href} className="text-[10px] font-semibold uppercase tracking-widest leading-none hover:text-black transition truncate max-w-[100px] sm:max-w-none flex-shrink-0 relative top-[0.5px]">
                  {displayTitle}
                </Link>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </nav>
    </>
  );
};

export default Breadcrumbs;
