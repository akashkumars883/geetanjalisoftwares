'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { services } from "@/lib/services";

const SERVICE_LINKS = services
  .filter((service) => !service.slug.includes("/"))
  .map((service) => ({
    label: service.title,
    href: `/services/${service.slug}`,
  }));

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
  { label: 'About', href: '/about' },
];

import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isServicesMobileOpen, setIsServicesMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY <= 20) {
        setIsVisible(true);
      } else if (currentY > lastScrollY.current && currentY > 80 && !isOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
        className={`fixed inset-x-0 top-0 z-50 border-b border-black/8 bg-[#f5f5f5]/72 backdrop-blur-xl transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-8xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold tracking-tight text-black sm:text-x"
          >
            <Logo size={28} className="text-orange-500" />
            <span>
              Geetanjali <span className="font-normal text-black/60">Softwares</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
              <Link href="/" className="text-sm font-medium text-black/85 transition hover:text-black">
                Home
              </Link>

              <div className="group relative">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-medium text-black/85 transition hover:text-black"
                >
                  Services
                </Link>

                <div className="pointer-events-none absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                  <div className="rounded-[32px] border border-black/10 bg-[#f5f5f5]/92 p-2 shadow-[0_24px_60px_-34px_rgba(0,0,0,0.3)] backdrop-blur-xl">
                    {SERVICE_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block rounded-2xl px-4 py-3 text-sm font-medium text-black/82 transition hover:bg-black/5 hover:text-black"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {NAV_LINKS.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-black/85 transition hover:text-black"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

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
        className={`fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px] transition-opacity duration-200 md:hidden ${
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
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="w-full rounded-2xl px-3 py-3 text-left text-base font-medium text-black/85 transition hover:bg-black/5 hover:text-black"
          >
            Home
          </Link>

          <div className="w-full rounded-2xl">
            <button
              type="button"
              onClick={() => setIsServicesMobileOpen((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-base font-medium text-black/85 transition hover:bg-black/5 hover:text-black"
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

            <div className={`${isServicesMobileOpen ? 'block' : 'hidden'} px-2 pb-2 ml-4 border-l border-black/5`}>
              {SERVICE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block w-full rounded-xl px-3 py-3 text-left text-sm font-medium text-black/72 transition hover:bg-black/5 hover:text-black"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {NAV_LINKS.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className="w-full rounded-xl px-3 py-3 text-left text-base font-medium text-black/85 transition hover:bg-black/5 hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
