'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { services } from "@/lib/services";
import {
  ChevronDown,
  Mail,
  Phone,
  Sparkles,
} from 'lucide-react';
import {
  BUSINESS_EMAIL,
  BUSINESS_PHONE_DISPLAY,
  SOCIAL_LINKS,
} from '@/lib/seo';

const NAV_LINKS = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Tools', href: '/tools' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Contact', href: '/#contact-form' },
];

const WEB_SERVICE_LINKS = services
  .filter((service) => service.slug === "website-design-development" || service.slug.startsWith("website-design-development/"))
  .map((service) => ({
    label: service.title
      .replace(" Services", "")
      .replace("Professional ", "")
      .replace("Custom ", ""),
    description: service.description,
    href: `/services/${service.slug}`,
  }));

const MARKETING_SERVICE_LINKS = services
  .filter((service) => service.slug === "digital-marketing" || service.slug.startsWith("digital-marketing/"))
  .map((service) => ({
    label: service.title
      .replace(" Services", "")
      .replace("Result-Oriented ", "")
      .replace("Advanced ", ""),
    description: service.description,
    href: `/services/${service.slug}`,
  }));

const SOCIAL_ITEMS = [
  { label: "Instagram", href: SOCIAL_LINKS.instagram, icon: "instagram" },
  { label: "Facebook", href: SOCIAL_LINKS.facebook, icon: "facebook" },
  { label: "Twitter", href: SOCIAL_LINKS.twitter, icon: "x" },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: "linkedin" },
  { label: "Pinterest", href: SOCIAL_LINKS.pinterest, icon: "pinterest" },
];

function SocialIcon({ name }) {
  const paths = {
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
    facebook: <path d="M14 8h2V5h-2.4C10.9 5 10 6.7 10 8.7V11H8v3h2v7h3v-7h2.4l.6-3h-3V8.8c0-.6.2-.8 1-.8Z" />,
    x: (
      <>
        <path d="m5 5 14 14" />
        <path d="M19 5 5 19" />
      </>
    ),
    linkedin: (
      <>
        <path d="M7 10v11" />
        <path d="M7 7v.01" />
        <path d="M11 21v-6.5A3.5 3.5 0 0 1 17.5 12c2 0 3.5 1.5 3.5 4v5" />
      </>
    ),
    pinterest: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M10.5 18.5 12 12" />
        <path d="M12 12c.8 1.2 4 1 4-2 0-2.1-1.8-3.5-4-3.5S8 8 8 10.6c0 1.1.4 2.1 1.1 2.7" />
      </>
    ),
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function BrandLockup() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="text-3xl font-semibold leading-none text-orange-600">G</span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-semibold tracking-tight text-slate-950">Geetanjali</span>
        <span className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.28em] text-slate-500">Softwares</span>
      </span>
    </span>
  );
}

function DesktopServiceDropdown({ label, href, links }) {
  const openEnquiryForm = () => {
    window.dispatchEvent(new CustomEvent('open-enquiry-popup', { detail: { service: label } }));
  };

  return (
    <div className="group relative">
      <Link
        href={href}
        onClick={openEnquiryForm}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-black/85 transition hover:text-black group-hover:text-orange-600"
      >
        {label}
        <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
      </Link>

      <div className="pointer-events-none fixed left-1/2 top-[6.95rem] z-50 w-[min(1120px,calc(100vw-32px))] -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white/98 p-4 shadow-[0_28px_70px_-22px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="mb-3 flex items-end justify-between gap-6 border-b border-black/5 pb-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-600">Explore</p>
              <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-950">{label}</h3>
            </div>
            <Link href="/#contact-form" onClick={openEnquiryForm} className="shrink-0 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-orange-600">
              Get Advice
            </Link>
          </div>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={openEnquiryForm}
                className="rounded-xl border border-transparent p-3 transition hover:border-orange-500/15 hover:bg-orange-50/50"
              >
                <span className="block text-sm font-semibold text-black">{link.label}</span>
                <span className="mt-1 line-clamp-2 block text-[11px] font-medium leading-snug text-black/45">
                  {link.description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);

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
        setOpenMobileDropdown(null);
      }
      return next;
    });
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setOpenMobileDropdown(null);
  };

  const mobileDropdowns = [
    { id: "web", label: "Website Development", links: WEB_SERVICE_LINKS },
    { id: "marketing", label: "Digital Marketing", links: MARKETING_SERVICE_LINKS },
  ];

  const openEnquiryForm = (service) => {
    window.dispatchEvent(new CustomEvent('open-enquiry-popup', { detail: { service } }));
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-[#f5f5f5]/92 backdrop-blur-xl border-b border-black/8 shadow-sm'
            : 'bg-[#f5f5f5]/82 backdrop-blur-xl border-b border-black/5'
        }`}
      >
        <div className="border-b border-white/10 bg-black text-white">
          <div className="mx-auto flex min-h-9 w-full max-w-7xl flex-col justify-center gap-2 px-4 py-2 text-[11px] font-medium text-white/75 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <a href="tel:+917508657479" onClick={() => openEnquiryForm('Phone enquiry')} className="inline-flex items-center gap-1.5 transition hover:text-orange-300">
                <Phone size={13} />
                {BUSINESS_PHONE_DISPLAY}
              </a>
              <a href={`mailto:${BUSINESS_EMAIL}`} onClick={() => openEnquiryForm('Email enquiry')} className="inline-flex items-center gap-1.5 transition hover:text-orange-300">
                <Mail size={13} />
                {BUSINESS_EMAIL}
              </a>
            </div>
            <div className="flex items-center gap-2" aria-label="Social media links">
              {SOCIAL_ITEMS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => openEnquiryForm(label)}
                  aria-label={label}
                  title={label}
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white/70 transition hover:bg-white hover:text-orange-600"
                >
                  <SocialIcon name={icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            onClick={() => openEnquiryForm('Homepage')}
            className="flex items-center gap-2"
          >
            <BrandLockup />
          </Link>

          <div className="flex items-center gap-5 lg:gap-8">
            <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
              <DesktopServiceDropdown
                label="Website Development"
                href="/services/website-design-development"
                links={WEB_SERVICE_LINKS}
              />
              <DesktopServiceDropdown
                label="Digital Marketing"
                href="/services/digital-marketing"
                links={MARKETING_SERVICE_LINKS}
              />

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => openEnquiryForm(link.label)}
                  className="text-sm font-medium text-black/85 transition hover:text-black"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Premium CTA Button */}
            <Link 
              href="/#contact-form"
              onClick={() => openEnquiryForm('Free quote')}
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
        className={`fixed inset-x-0 top-[7rem] z-40 border-b border-black/10 bg-[#f5f5f5]/95 shadow-lg backdrop-blur-xl transition-all duration-300 md:hidden ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0 pointer-events-none'
        }`}
      >
        <nav
          className="flex w-full flex-col items-start px-4 py-4 sm:px-6 text-left"
          aria-label="Mobile navigation"
        >
          {mobileDropdowns.map((group) => (
            <div key={group.id} className="w-full rounded-2xl">
              <button
                type="button"
                onClick={() => setOpenMobileDropdown((prev) => (prev === group.id ? null : group.id))}
                className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-base font-medium text-black/85 transition hover:bg-white/60 hover:text-black"
              >
                <span>{group.label}</span>
                <ChevronDown size={16} className={`transition ${openMobileDropdown === group.id ? 'rotate-180' : ''}`} />
              </button>

              {openMobileDropdown === group.id && (
                <div className="ml-4 grid gap-1 border-l border-black/5 px-2 pb-4 pt-2">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => {
                        openEnquiryForm(link.label);
                        closeMobileMenu();
                      }}
                      className="rounded-xl p-3 transition hover:bg-white/60"
                    >
                      <span className="block text-sm font-semibold text-black">{link.label}</span>
                      <span className="mt-1 line-clamp-2 block text-[10px] font-medium leading-tight text-black/45">
                        {link.description}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => {
                openEnquiryForm(link.label);
                closeMobileMenu();
              }}
              className="w-full rounded-xl px-3 py-3 text-left text-base font-medium text-black/85 transition hover:bg-white/5 hover:text-black"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile CTA Button */}
          <div className="w-full px-3 pt-4 mt-2 border-t border-black/5">
            <Link
              href="/#contact-form"
              onClick={() => {
                openEnquiryForm('Free quote');
                closeMobileMenu();
              }}
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
