import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Portfolio', href: '/portfolio' },
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
  { label: 'Instagram', href: 'https://www.instagram.com/geetanjalisoftwares/', target: '_blank' },
  { label: 'LinkedIn', href: '#' },
  { label: 'X (Twitter)', href: '#' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 pt-16 pb-12 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main row — brand left, links right on desktop */}
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">

          {/* Left Side: Brand Identity + Contacts info */}
          <div className="max-w-xs space-y-4">
            <div>
              <Link href="/" className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Geetanjali <span className="font-light text-slate-400">Softwares</span>
              </Link>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-400">
                Modern website design, performance-driven search optimization, and robust branding built for elite businesses that demand digital excellence.
              </p>
            </div>
            
            <ul className="space-y-3 pt-2">
              <li>
                <a href="mailto:geetanjalisoftwares@gmail.com" className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 hover:text-white transition">
                  <Mail size={16} className="text-orange-500 mt-0.5 shrink-0" />
                  geetanjalisoftwares@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+917508657479" className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 hover:text-white transition">
                  <Phone size={16} className="text-orange-500 shrink-0" />
                  +91 7508657479
                </a>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <MapPin size={16} className="text-orange-500 shrink-0 mt-0.5" />
                <span>Faridabad, Haryana, India</span>
              </li>
            </ul>
          </div>

          {/* Right Side: Organized Grid Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-x-12 xl:gap-x-16">

            {/* 1. Core Services Column */}
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-4">
                Services
              </h3>
              <nav className="flex flex-col items-start gap-3" aria-label="Footer services navigation">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs font-semibold text-slate-300 hover:text-orange-500 transition duration-150"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* 2. Company Column */}
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-4">
                Company
              </h3>
              <nav className="flex flex-col items-start gap-3" aria-label="Footer company navigation">
                {companyLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs font-semibold text-slate-300 hover:text-orange-500 transition duration-150 inline-flex items-center gap-1.5"
                  >
                    {link.label}
                    {link.isHiring && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-[8px] font-semibold uppercase tracking-wider border border-orange-500/20">
                        Hiring
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* 3. Connect Column */}
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-4">
                Connect
              </h3>
              <nav className="flex flex-col items-start gap-3" aria-label="Footer social links">
                {connectLinks.map((link) => (
                  <a 
                    key={link.label}
                    href={link.href} 
                    target={link.target}
                    rel={link.target ? "noopener noreferrer" : undefined}
                    className="text-xs font-semibold text-slate-300 hover:text-orange-500 transition duration-150"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* 4. Legal Column */}
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-4">
                Legal
              </h3>
              <nav className="flex flex-col items-start gap-3" aria-label="Footer legal links">
                {legalLinks.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className="text-xs font-semibold text-slate-300 hover:text-orange-500 transition duration-150"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Geetanjali Softwares. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            Made with <span className="text-orange-500">♥</span> in India
          </p>
        </div>

      </div>
    </footer>
  );
}
