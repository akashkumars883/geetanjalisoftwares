'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
  Sparkles,
  Code2,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';
import {
  BUSINESS_EMAIL,
  BUSINESS_PHONE_DISPLAY,
  SOCIAL_LINKS,
} from '@/lib/seo';

// =================== NAV CONFIG ===================
const NAV_LINKS = [
  { label: 'Services', href: '/services', hasMegaMenu: true },
  { label: 'Solutions', href: '/solutions', hasMegaMenu: true },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Contact', href: '/#contact-form' },
];

// Website Development submenu
const WEBSITE_DEVELOPMENT_LINKS = [
  {
    label: 'Business Websites',
    description: 'Professional company websites built to earn trust and enquiries.',
    href: '/services/website-design-development/business-website-development',
    icon: 'briefcase',
  },
  {
    label: 'E-commerce Websites',
    description: 'Online stores with smooth checkout and product journeys.',
    href: '/services/website-design-development/ecommerce-website-development',
    icon: 'cart',
  },
  {
    label: 'Landing Pages',
    description: 'High-converting single pages focused on a single CTA.',
    href: '/services/website-design-development/landing-pages',
    icon: 'rocket',
  },
  {
    label: 'Custom Web Applications',
    description: 'Tailored web apps with custom logic, APIs and dashboards.',
    href: '/services/website-design-development/custom-website-development',
    icon: 'code',
  },
  {
    label: 'Business Dashboards',
    description: 'Internal dashboards to track KPIs, sales and operations.',
    href: '/services/website-design-development/custom-website-development',
    icon: 'layout',
  },
  {
    label: 'Lead Management Systems',
    description: 'Capture, route and follow up on leads from one place.',
    href: '/services/website-design-development/custom-website-development',
    icon: 'funnel',
  },
  {
    label: 'Website Maintenance',
    description: 'Ongoing updates, backups, security and performance care.',
    href: '/services/website-design-development',
    icon: 'shield',
  },
];

// Solutions For (industries)
const SOLUTIONS_LINKS = [
  {
    label: 'Small Businesses',
    description: 'Affordable websites, SEO and marketing to grow locally.',
    href: '/solutions/small-businesses',
    icon: 'store',
  },
  {
    label: 'Healthcare',
    description: 'HIPAA-aware sites, appointment flows and patient reach.',
    href: '/solutions/healthcare',
    icon: 'heart',
  },
  {
    label: 'Education',
    description: 'Lead-gen sites for schools, coaching and edtech brands.',
    href: '/solutions/education',
    icon: 'edu',
  },
  {
    label: 'Real Estate',
    description: 'Property listing sites with lead capture and CRM sync.',
    href: '/solutions/real-estate',
    icon: 'building',
  },
  {
    label: 'Retail',
    description: 'Online stores, inventory sync and conversion focused UX.',
    href: '/solutions/retail',
    icon: 'tag',
  },
];

// Digital Marketing submenu
const DIGITAL_MARKETING_LINKS = [
  {
    label: 'SEO',
    description: 'Rank higher on Google and bring organic traffic that converts.',
    href: '/services/digital-marketing/seo',
    icon: 'search',
  },
  {
    label: 'Social Media Marketing',
    description: 'Stay consistent and visible across Instagram, Facebook & LinkedIn.',
    href: '/services/digital-marketing/social-media-marketing',
    icon: 'share',
  },
  {
    label: 'Google Ads / PPC',
    description: 'Paid campaigns planned for measurable enquiries and ROI.',
    href: '/services/digital-marketing/google-ads-ppc',
    icon: 'ads',
  },
  {
    label: 'Content Marketing',
    description: 'SEO blogs, service copy and content that supports growth.',
    href: '/services/digital-marketing/content-marketing',
    icon: 'pen',
  },
];

const SOCIAL_ITEMS = [
  { label: 'Instagram', href: SOCIAL_LINKS.instagram, icon: 'instagram' },
  { label: 'Facebook', href: SOCIAL_LINKS.facebook, icon: 'facebook' },
  { label: 'Twitter', href: SOCIAL_LINKS.twitter, icon: 'x' },
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, icon: 'linkedin' },
  { label: 'Pinterest', href: SOCIAL_LINKS.pinterest, icon: 'pinterest' },
];

// =================== ICONS ===================
function SocialIcon({ name }) {
  const paths = {
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
    facebook: (
      <path d="M14 8h2V5h-2.4C10.9 5 10 6.7 10 8.7V11H8v3h2v7h3v-7h2.4l.6-3h-3V8.8c0-.6.2-.8 1-.8Z" />
    ),
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
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function MegaIcon({ name }) {
  const cls = 'h-4 w-4';
  const props = {
    'aria-hidden': 'true',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: cls,
  };
  const paths = {
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 13h18" />
      </>
    ),
    cart: (
      <>
        <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L21 8H6" />
        <circle cx="9" cy="20" r="1.2" />
        <circle cx="18" cy="20" r="1.2" />
      </>
    ),
    rocket: (
      <>
        <path d="M4 20s2-1 4-3 6-6 9-9 4-4 4-4-1 1-4 4-7 7-9 9-4 3-4 3Z" />
        <path d="M14 6l4 4" />
        <path d="M9 15l-3 3" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </>
    ),
    share: (
      <>
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="18" cy="18" r="2.5" />
        <path d="m8 11 8-4" />
        <path d="m8 13 8 4" />
      </>
    ),
    ads: (
      <>
        <path d="M3 11a4 4 0 0 1 4-4h2l8-3v12l-8-3H7a4 4 0 0 0-4 4Z" />
        <path d="M7 13v4" />
      </>
    ),
    pen: (
      <>
        <path d="M14 4l6 6-10 10H4v-6L14 4Z" />
        <path d="m13 5 6 6" />
      </>
    ),
    code: (
      <>
        <path d="m8 8-5 4 5 4" />
        <path d="m16 8 5 4-5 4" />
        <path d="m14 4-4 16" />
      </>
    ),
    layout: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 9v12" />
      </>
    ),
    funnel: (
      <>
        <path d="M3 4h18l-7 9v6l-4 2v-8L3 4Z" />
      </>
    ),
    store: (
      <>
        <path d="M3 9 5 4h14l2 5" />
        <path d="M4 9v11h16V9" />
        <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
      </>
    ),
    heart: (
      <>
        <path d="M20.8 8.6a5 5 0 0 0-8.8-3.2 5 5 0 0 0-8.8 3.2c0 5 8.8 11.4 8.8 11.4s8.8-6.4 8.8-11.4Z" />
      </>
    ),
    edu: (
      <>
        <path d="m2 9 10-5 10 5-10 5L2 9Z" />
        <path d="M6 11v4c0 1.5 3 3 6 3s6-1.5 6-3v-4" />
        <path d="M22 9v5" />
      </>
    ),
    building: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="1" />
        <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" />
        <path d="M10 21v-3h4v3" />
      </>
    ),
    tag: (
      <>
        <path d="M20.6 12.6 12 21.2 3 12.2V3h9.2l8.4 8.4a1 1 0 0 1 0 1.2Z" />
        <circle cx="8" cy="8" r="1.4" />
      </>
    ),
  };
  return (
    <svg {...props}>
      {paths[name] || null}
    </svg>
  );
}

// =================== BRAND ===================
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

// =================== MEGA MENU ===================
function ServicesMegaMenu({ onItemClick }) {
  return (
    <div
      className="pointer-events-none fixed left-1/2 top-[6.95rem] z-50 w-screen -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100"
      role="menu"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_28px_70px_-22px_rgba(0,0,0,0.28)]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Website Development column */}
            <div className="border-b border-black/5 p-6 lg:col-span-5 lg:border-b-0 lg:border-r">
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                  <Code2 size={16} />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-600">Website Development</p>
                  <p className="text-xs font-medium text-black/55">Build a strong, modern online presence</p>
                </div>
              </div>
              <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-1">
                {WEBSITE_DEVELOPMENT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => onItemClick(link.label)}
                      className="group/item flex items-start gap-3 rounded-xl p-3 transition hover:bg-orange-50/70"
                    >
                      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition group-hover/item:bg-orange-100 group-hover/item:text-orange-600">
                        <MegaIcon name={link.icon} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-black">{link.label}</span>
                        <span className="mt-0.5 line-clamp-2 block text-[11px] font-medium leading-snug text-black/50">
                          {link.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Digital Marketing column */}
            <div className="border-b border-black/5 p-6 lg:col-span-5 lg:border-b-0 lg:border-r">
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                  <TrendingUp size={16} />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-600">Digital Marketing</p>
                  <p className="text-xs font-medium text-black/55">Get found, get clicks, get enquiries</p>
                </div>
              </div>
              <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-1">
                {DIGITAL_MARKETING_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => onItemClick(link.label)}
                      className="group/item flex items-start gap-3 rounded-xl p-3 transition hover:bg-orange-50/70"
                    >
                      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition group-hover/item:bg-orange-100 group-hover/item:text-orange-600">
                        <MegaIcon name={link.icon} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-black">{link.label}</span>
                        <span className="mt-0.5 line-clamp-2 block text-[11px] font-medium leading-snug text-black/50">
                          {link.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Promo / CTA column */}
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-orange-700 p-6 text-white lg:col-span-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-300">Need help?</p>
              <h4 className="mt-2 text-lg font-semibold leading-snug">
                Let's build something that grows your business.
              </h4>
              <p className="mt-2 text-[11px] font-medium leading-snug text-white/70">
                Talk to our team for a free consultation and a clear project plan.
              </p>
              <Link
                href="/#contact-form"
                onClick={() => onItemClick('Get Advice')}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-orange-300 hover:text-slate-900"
              >
                Get Free Advice
                <ArrowUpRight size={12} />
              </Link>
              <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-orange-500/20 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =================== MAIN COMPONENT ===================
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const [activeMegaKey, setActiveMegaKey] = useState(null);
  const [servicesHover, setServicesHover] = useState('Website Development');
  const closeTimer = useRef(null);

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

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setActiveMegaKey(null);
        setIsOpen(false);
        setOpenMobileDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

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
    setActiveMegaKey(null);
  };

  const openEnquiryForm = (service) => {
    window.dispatchEvent(new CustomEvent('open-enquiry-popup', { detail: { service } }));
  };

  const handleMegaEnter = (key) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMegaKey(key);
  };

  const handleMegaLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMegaKey(null), 120);
  };

  const closeMega = () => setActiveMegaKey(null);

  const mobileDropdowns = [
    { id: 'web', label: 'Website Development', links: WEBSITE_DEVELOPMENT_LINKS },
    { id: 'marketing', label: 'Digital Marketing', links: DIGITAL_MARKETING_LINKS },
    { id: 'solutions', label: 'Solutions For', links: SOLUTIONS_LINKS },
  ];

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
        {/* Top bar */}
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

        {/* Main bar */}
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            onClick={() => openEnquiryForm('Homepage')}
            className="flex items-center gap-2"
          >
            <BrandLockup />
          </Link>

          <div className="flex items-center gap-5 lg:gap-8">
            {/* Desktop nav */}
            <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
              {NAV_LINKS.map((link) =>
                link.hasMegaMenu ? (
                  <div
                    key={link.label}
                    className="group relative"
                    onMouseEnter={() => handleMegaEnter(link.label)}
                    onMouseLeave={handleMegaLeave}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveMegaKey((p) => (p === link.label ? null : link.label))}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-black/85 transition hover:text-orange-600"
                      aria-haspopup="true"
                      aria-expanded={activeMegaKey === link.label}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          activeMegaKey === link.label ? 'rotate-180' : 'group-hover:rotate-180'
                        }`}
                      />
                    </button>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => openEnquiryForm(link.label)}
                    className="text-sm font-medium text-black/85 transition hover:text-orange-600"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Desktop CTA */}
            <Link
              href="/#contact-form"
              onClick={() => openEnquiryForm('Free quote')}
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-orange-600 hover:shadow-[0_8px_20px_-6px_rgba(234,88,12,0.3)] transition-all duration-300 active:scale-95 border border-transparent"
            >
              <Sparkles size={12} className="text-orange-400 animate-pulse shrink-0" />
              <span>Get Free Quote</span>
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={handleToggleMenu}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/15 bg-white/70 text-black backdrop-blur-xl md:hidden"
            >
              <span className="sr-only">Toggle navigation menu</span>
              <span className={`absolute h-0.5 w-5 bg-current transition ${isOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
              <span className={`absolute h-0.5 w-5 bg-current transition ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute h-0.5 w-5 bg-current transition ${isOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
            </button>
          </div>
        </div>

        {/* Mega menu (hover/click triggered) */}
        <div
          className={`hidden md:block ${activeMegaKey ? 'pointer-events-auto' : 'pointer-events-none'}`}
          onMouseEnter={() => activeMegaKey && handleMegaEnter(activeMegaKey)}
          onMouseLeave={handleMegaLeave}
        >
          <div
            className={`fixed left-0 right-0 top-full z-40 transition-all duration-300 ${
              activeMegaKey ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-3">
              {activeMegaKey === 'Services' && (
                <div
                  className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_28px_70px_-22px_rgba(0,0,0,0.28)]"
                  onMouseLeave={() => setServicesHover('Website Development')}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* Left sidebar list (categories) */}
                    <div className="border-b border-black/5 bg-slate-50/60 p-4 lg:col-span-3 lg:border-b-0 lg:border-r">
                      <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-600">Our Services</p>
                      <p className="mt-1 px-2 text-xs font-medium text-black/55">Hover a category to explore</p>
                      <ul className="mt-3 flex flex-col gap-1">
                        {[
                          { id: 'Website Development', icon: Code2, count: WEBSITE_DEVELOPMENT_LINKS.length },
                          { id: 'Digital Marketing', icon: TrendingUp, count: DIGITAL_MARKETING_LINKS.length },
                        ].map((cat) => {
                          const Icon = cat.icon;
                          const active = servicesHover === cat.id;
                          return (
                            <li key={cat.id}>
                              <button
                                type="button"
                                onMouseEnter={() => setServicesHover(cat.id)}
                                onFocus={() => setServicesHover(cat.id)}
                                onClick={() => setServicesHover(cat.id)}
                                className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-3 text-left text-sm font-semibold transition ${
                                  active
                                    ? 'border-orange-500/30 bg-orange-50 text-orange-600 shadow-sm'
                                    : 'border-transparent text-black/80 hover:border-black/5 hover:bg-white'
                                }`}
                              >
                                <span className="flex items-center gap-2.5">
                                  <span
                                    className={`inline-flex h-7 w-7 items-center justify-center rounded-lg transition ${
                                      active ? 'bg-orange-100 text-orange-600' : 'bg-white text-slate-700'
                                    }`}
                                  >
                                    <Icon size={14} />
                                  </span>
                                  <span>{cat.id}</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <span
                                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                                      active ? 'bg-orange-600 text-white' : 'bg-black/5 text-black/55'
                                    }`}
                                  >
                                    {cat.count}
                                  </span>
                                  <ChevronRight size={14} className={active ? 'text-orange-600' : 'text-black/30'} />
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Right content area (active submenu) */}
                    <div className="border-b border-black/5 p-6 lg:col-span-6 lg:border-b-0 lg:border-r">
                      <div className="mb-4 flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                          {servicesHover === 'Website Development' ? <Code2 size={16} /> : <TrendingUp size={16} />}
                        </span>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-600">{servicesHover}</p>
                          <p className="text-xs font-medium text-black/55">
                            {servicesHover === 'Website Development'
                              ? 'Build a strong, modern online presence'
                              : 'Get found, get clicks, get enquiries'}
                          </p>
                        </div>
                      </div>
                      <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                        {(servicesHover === 'Website Development' ? WEBSITE_DEVELOPMENT_LINKS : DIGITAL_MARKETING_LINKS).map((link) => (
                          <li key={link.label}>
                            <Link
                              href={link.href}
                              onClick={() => {
                                openEnquiryForm(link.label);
                                closeMega();
                              }}
                              className="group/item flex items-start gap-3 rounded-xl p-3 transition hover:bg-orange-50/70"
                            >
                              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition group-hover/item:bg-orange-100 group-hover/item:text-orange-600">
                                <MegaIcon name={link.icon} />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold text-black">{link.label}</span>
                                <span className="mt-0.5 line-clamp-2 block text-[11px] font-medium leading-snug text-black/50">
                                  {link.description}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Promo / CTA column */}
                    <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-orange-700 p-6 text-white lg:col-span-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-300">Need help?</p>
                      <h4 className="mt-2 text-lg font-semibold leading-snug">Let's build something that grows your business.</h4>
                      <p className="mt-2 text-[11px] font-medium leading-snug text-white/70">
                        Talk to our team for a free consultation and a clear project plan.
                      </p>
                      <Link
                        href="/#contact-form"
                        onClick={() => {
                          openEnquiryForm('Get Advice');
                          closeMega();
                        }}
                        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-orange-300 hover:text-slate-900"
                      >
                        Get Free Advice
                        <ArrowUpRight size={12} />
                      </Link>
                      <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-orange-500/20 blur-2xl" />
                    </div>
                  </div>
                </div>
              )}

              {activeMegaKey === 'Solutions' && (
                <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_28px_70px_-22px_rgba(0,0,0,0.28)]">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="border-b border-black/5 p-6 lg:col-span-9 lg:border-b-0 lg:border-r">
                      <div className="mb-4 flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                          <Sparkles size={16} />
                        </span>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-600">Solutions For</p>
                          <p className="text-xs font-medium text-black/55">Industry-specific digital solutions tailored to your business</p>
                        </div>
                      </div>
                      <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
                        {SOLUTIONS_LINKS.map((link) => (
                          <li key={link.label}>
                            <Link
                              href={link.href}
                              onClick={() => {
                                openEnquiryForm(link.label);
                                closeMega();
                              }}
                              className="group/item flex items-start gap-3 rounded-xl p-3 transition hover:bg-orange-50/70"
                            >
                              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition group-hover/item:bg-orange-100 group-hover/item:text-orange-600">
                                <MegaIcon name={link.icon} />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold text-black">{link.label}</span>
                                <span className="mt-0.5 line-clamp-2 block text-[11px] font-medium leading-snug text-black/50">
                                  {link.description}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-orange-700 p-6 text-white lg:col-span-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-300">Industry expertise</p>
                      <h4 className="mt-2 text-lg font-semibold leading-snug">Built for your industry. Tuned for growth.</h4>
                      <p className="mt-2 text-[11px] font-medium leading-snug text-white/70">
                        We understand the specific challenges of your industry and build solutions that fit.
                      </p>
                      <Link
                        href="/solutions"
                        onClick={() => {
                          openEnquiryForm('Solutions');
                          closeMega();
                        }}
                        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-orange-300 hover:text-slate-900"
                      >
                        Explore Solutions
                        <ArrowUpRight size={12} />
                      </Link>
                      <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-orange-500/20 blur-2xl" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile backdrop */}
      <div
        onClick={closeMobileMenu}
        className={`fixed inset-0 z-40 bg-white/10 backdrop-blur-[2px] transition-opacity duration-200 md:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-[7rem] z-40 max-h-[calc(100vh-7rem)] overflow-y-auto border-b border-black/10 bg-[#f5f5f5]/95 shadow-lg backdrop-blur-xl transition-all duration-300 md:hidden ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0 pointer-events-none'
        }`}
      >
        <nav
          className="flex w-full flex-col items-start px-4 py-4 sm:px-6 text-left"
          aria-label="Mobile navigation"
        >
          {mobileDropdowns.map((group) => (
            <div key={group.id} className="w-full">
              <button
                type="button"
                onClick={() => setOpenMobileDropdown((prev) => (prev === group.id ? null : group.id))}
                className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-base font-medium text-black/85 transition hover:bg-white/60 hover:text-black"
              >
                <span>{group.label}</span>
                <ChevronDown size={16} className={`transition ${openMobileDropdown === group.id ? 'rotate-180' : ''}`} />
              </button>

              {openMobileDropdown === group.id && (
                <div className="ml-4 grid gap-1 border-l border-black/5 px-2 pb-2 pt-1">
                  {group.links.map((link) => (
                    <Link
                      key={link.label}
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

          {NAV_LINKS.filter((l) => !l.hasMegaMenu).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => {
                openEnquiryForm(link.label);
                closeMobileMenu();
              }}
              className="w-full rounded-xl px-3 py-3 text-left text-base font-medium text-black/85 transition hover:bg-white/60 hover:text-black"
            >
              {link.label}
            </Link>
          ))}

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
