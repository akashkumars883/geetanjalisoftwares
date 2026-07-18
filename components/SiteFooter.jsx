'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import {
  BUSINESS_EMAIL,
  BUSINESS_PHONE_DISPLAY,
  GOOGLE_BUSINESS_URL,
  SOCIAL_LINKS,
} from '@/lib/seo';

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Portfolio', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'AI Website Builder', href: '/studio' },
  { label: 'Careers', href: '/careers', isHiring: true },
  { label: 'Latest Blogs', href: '/blogs' },
  { label: 'Contact Desk', href: '/contact' },
];

const serviceLinks = [
  { label: 'Website Development', href: '/services/website-design-development' },
  { label: 'UI/UX Redesigning', href: '/services/website-design-development/website-redesign' },
  { label: 'Landing Pages', href: '/services/website-design-development/landing-pages' },
  { label: 'Digital Marketing', href: '/services/digital-marketing' },
  { label: 'SEO & Search Growth', href: '/services/digital-marketing/seo' },
];

const connectLinks = [
  { label: 'Google Business Profile', href: GOOGLE_BUSINESS_URL, target: '_blank' },
  { label: 'Instagram', href: SOCIAL_LINKS.instagram, target: '_blank' },
  { label: 'Facebook', href: SOCIAL_LINKS.facebook, target: '_blank' },
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin || '#', target: '_blank' },
  { label: 'X (Twitter)', href: SOCIAL_LINKS.twitter || '#', target: '_blank' },
  { label: 'Pinterest', href: SOCIAL_LINKS.pinterest, target: '_blank' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-foreground/10 pt-16 pb-12 bg-background text-foreground relative z-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Main row — brand left, links right on desktop */}
        <div className="flex flex-col gap-16 lg:flex-row lg:justify-between">
          {/* Left Side: Brand Identity + Contacts info */}
          <div className="max-w-sm space-y-6">
            <div>
              <Link href="/" className="font-heading text-3xl font-bold uppercase tracking-tight text-foreground transition-colors hover:text-primary">
                Geetanjali <span className="text-primary font-light">Softwares</span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-foreground/60">
                Modern website design, performance-driven search optimization, and robust branding built for elite businesses that demand digital excellence.
              </p>
            </div>
            
            <ul className="space-y-4 pt-4 border-t border-foreground/10">
              <li>
                <a href={`mailto:${BUSINESS_EMAIL}`} className="group flex items-center gap-3 text-sm text-foreground/70 transition-colors hover:text-primary">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/5 text-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-background shrink-0">
                    <Mail size={14} />
                  </div>
                  {BUSINESS_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground/70">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/5 text-foreground shrink-0">
                  <Phone size={14} />
                </div>
                <div className="flex gap-1 flex-wrap">
                  <a href="tel:+917508657479" className="transition-colors hover:text-primary">
                    {BUSINESS_PHONE_DISPLAY}
                  </a>
                  <span>,</span>
                  <a href="tel:+916201231875" className="transition-colors hover:text-primary">
                    +91 6201231875
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground/70">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/5 text-foreground shrink-0">
                  <MapPin size={14} />
                </div>
                <span>Faridabad, Haryana, India</span>
              </li>
            </ul>
          </div>

          {/* Right Side: Organized Grid Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-x-12 xl:gap-x-16 pt-2 lg:pt-0">
            {/* 1. Core Services Column */}
            <div>
              <h3 className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-6">
                Services
              </h3>
              <nav className="flex flex-col items-start gap-4" aria-label="Footer services navigation">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs font-semibold text-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* 2. Company Column */}
            <div>
              <h3 className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-6">
                Company
              </h3>
              <nav className="flex flex-col items-start gap-4" aria-label="Footer company navigation">
                {companyLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center gap-2 text-xs font-semibold text-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                    {link.isHiring && (
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 font-heading text-[8px] font-bold uppercase tracking-widest text-primary border border-primary/20 transition-colors group-hover:bg-primary group-hover:text-background">
                        Hiring
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* 3. Connect Column */}
            <div>
              <h3 className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-6">
                Connect
              </h3>
              <nav className="flex flex-col items-start gap-4" aria-label="Footer social links">
                {connectLinks.map((link) => (
                  <a 
                    key={link.label}
                    href={link.href} 
                    target={link.target}
                    rel={link.target ? "noopener noreferrer" : undefined}
                    className="text-xs font-semibold text-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* 4. Legal Column */}
            <div>
              <h3 className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-6">
                Legal
              </h3>
              <nav className="flex flex-col items-start gap-4" aria-label="Footer legal links">
                {legalLinks.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className="text-xs font-semibold text-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Popular Locations We Serve Strip */}
        <div className="mt-20 border-t border-foreground/10 pt-10">
          <h3 className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-6 text-center lg:text-left">
            Popular Locations We Serve
          </h3>
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-3 text-[11px] text-foreground/40 font-semibold uppercase tracking-widest">
            {[
              'faridabad', 'delhi-ncr', 'patna', 'delhi', 'mumbai', 'bangalore', 'lucknow', 
              'jaipur', 'pune', 'noida', 'gurgaon', 'kolkata', 
              'chennai', 'hyderabad', 'ahmedabad', 'chandigarh', 
              'ranchi', 'bhopal', 'indore', 'kanpur', 'surat', 'guwahati'
            ].map((city, idx, arr) => {
              const cityName = city.replace(/-/g, ' ');
              return (
                <div key={city} className="flex items-center">
                  <Link
                    href={`/locations/${city}`}
                    className="hover:text-primary transition-colors duration-300"
                  >
                    {cityName}
                  </Link>
                  {idx < arr.length - 1 && (
                    <span className="ml-4 text-foreground/20 select-none">/</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-foreground/40">
              &copy; {new Date().getFullYear()} Geetanjali Softwares. All rights reserved.
            </p>
            <p className="font-heading text-[9px] font-bold uppercase tracking-widest text-foreground/30">
              GST: 06PBVPS6923K1ZE <span className="mx-2">|</span> Udyam: UDYAM-HR-03-0157495
            </p>
          </div>
          <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-1.5">
            Made with <span className="text-primary text-sm leading-none">♥</span> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
