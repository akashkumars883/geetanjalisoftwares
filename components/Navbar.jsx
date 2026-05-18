'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { services } from "@/lib/services";
import { Monitor, TrendingUp, Palette, ChevronDown, Sparkles } from 'lucide-react';

const SERVICE_INFO = {
  "website-design-development": {
    label: "Web Design & Development",
    description: "Custom, fast, and responsive websites.",
    icon: <Monitor size={20} className="text-blue-500" />
  },
  "digital-marketing": {
    label: "Digital Marketing & SEO",
    description: "ROI-driven growth and visibility.",
    icon: <TrendingUp size={20} className="text-orange-500" />
  },
  "branding": {
    label: "Brand Identity & Design",
    description: "Professional branding and logos.",
    icon: <Palette size={20} className="text-purple-500" />
  }
};

const SERVICE_LINKS = services
  .filter((service) => !service.slug.includes("/"))
  .map((service) => ({
    ...SERVICE_INFO[service.slug],
    href: `/services/${service.slug}`,
  }));

const NAV_LINKS = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Contact', href: '/#contact-form' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesMobileOpen, setIsServicesMobileOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY || document.documentElement.scrollTop;

    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;

      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY <= 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100 && !isOpen) {
        setIsVisible(false); // Scrolling down
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true); // Scrolling up
      }

      lastScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleToggleMenu = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setIsVisible(true);
      } else {
        setIsServicesMobileOpen(false);
      }
      return next;
    });
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setIsServicesMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-[#f5f5f5]/80 backdrop-blur-xl border-b border-black/8 shadow-sm py-0 sm:py-0.5'
            : 'bg-transparent border-b-0 py-2 sm:py-3.5'
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-8xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <img src="/images/logo.jpg" alt="Geetanjali Softwares Logo" className="h-8 w-auto object-contain mix-blend-multiply" />
          </Link>

          <div className="flex items-center gap-5 lg:gap-8">
            <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
              <div className="group relative">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-black/85 transition hover:text-black group-hover:text-orange-600"
                >
                  Services
                  <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                </Link>

                <div className="pointer-events-none absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-4 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
                  <div className="overflow-hidden rounded-[32px] border border-black/10 bg-white/95 p-2 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                    <div className="grid gap-1">
                      {SERVICE_LINKS.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-start gap-4 rounded-2xl p-4 transition hover:bg-white/[0.03]"
                        >
                          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.03] text-black">
                            {link.icon}
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-semibold text-black">{link.label}</span>
                            <span className="text-[11px] font-medium text-black/40 leading-tight">{link.description}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-black/85 transition hover:text-black"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Premium CTA Button */}
            <Link 
              href="/#contact-form"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-orange-600 hover:shadow-[0_8px_20px_-6px_rgba(234,88,12,0.3)] transition-all duration-300 active:scale-95 border border-transparent"
            >
              <Sparkles size={12} className="text-orange-400 animate-pulse shrink-0" />
              <span>Get Free Quote</span>
            </Link>

            <button
              type="button"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={handleToggleMenu}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/15 bg-white/70 text-black backdrop-blur-xl md:hidden"
            >
              <span className="sr-only">Toggle navigation menu</span>
              <span
                className={`absolute h-0.5 w-5 bg-current transition ${
                  isOpen ? 'rotate-45' : '-translate-y-1.5'
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 bg-current transition ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 bg-current transition ${
                  isOpen ? '-rotate-45' : 'translate-y-1.5'
                }`}
              />
            </button>
          </div>
        </div>
      </header>
 
      <div
        onClick={closeMobileMenu}
        className={`fixed inset-0 z-40 bg-white/10 backdrop-blur-[2px] transition-opacity duration-200 md:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-16 z-40 border-b border-black/10 bg-[#f5f5f5]/88 shadow-lg backdrop-blur-xl transition-all duration-300 md:hidden ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0 pointer-events-none'
        }`}
      >
        <nav
          className="flex w-full flex-col items-start px-4 py-4 sm:px-6 text-left"
          aria-label="Mobile navigation"
        >
          <div className="w-full rounded-2xl">
            <button
              type="button"
              onClick={() => setIsServicesMobileOpen((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-base font-medium text-black/85 transition hover:bg-white/5 hover:text-black"
            >
              <span>Services</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className={`h-4 w-4 transition ${isServicesMobileOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m5 7.5 5 5 5-5" />
              </svg>
            </button>

            {isServicesMobileOpen && (
              <div className="grid gap-1 px-2 pb-4 pt-2 border-l border-black/5 ml-4">
                {SERVICE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-4 rounded-2xl p-3 transition hover:bg-white/5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.03] text-black">
                      {link.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-black">{link.label}</span>
                      <span className="text-[10px] font-medium text-black/40">{link.description}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className="w-full rounded-xl px-3 py-3 text-left text-base font-medium text-black/85 transition hover:bg-white/5 hover:text-black"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile CTA Button */}
          <div className="w-full px-3 pt-4 mt-2 border-t border-black/5">
            <Link
              href="/#contact-form"
              onClick={closeMobileMenu}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-600 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-700 transition active:scale-[0.98]"
            >
              <Sparkles size={14} className="text-orange-200" />
              <span>Get Free Quote</span>
            </Link>
          </div>

        </nav>
      </div>
    </>
  );
}
