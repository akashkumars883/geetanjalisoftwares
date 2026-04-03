import Link from 'next/link';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Contact', href: '/contact' },
  { label: 'About', href: '/about' },
];

export default function SiteFooter() {
  return (
    <footer className="pb-10 pt-16 sm:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <Link href="/" className="text-xl font-bold tracking-tight text-black sm:text-2xl">
              Geetanjali <span className="font-normal text-black/50">Softwares</span>
            </Link>
            <p className="mt-4 text-sm leading-7 text-black/60">
              Modern websites, performance-driven digital marketing, and unique branding for businesses that demand a stronger online presence.
            </p>
            <div className="mt-6 space-y-3">
              <ul className="mt-4 space-y-3">
                <li className="flex items-center gap-3 text-sm text-black/50">
                  <Mail size={16} className="text-orange-600" /> geetanjalisoftwares@gmail.com
                </li>
                <li className="flex items-center gap-3 text-sm text-black/50">
                  <Phone size={16} className="text-orange-600" /> +91 7508657479
                </li>
                <li className="flex items-center gap-3 text-sm text-black/50">
                  <MapPin size={16} className="text-orange-600" /> Faridabad, Haryana, India
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-black/30">Company</h3>
              <nav className="mt-4 flex flex-col gap-3" aria-label="Footer navigation">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-black/75 transition hover:text-black whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-black/30">Connect</h3>
              <nav className="mt-4 flex flex-col gap-3" aria-label="Social links">
                <a href="#" className="text-sm font-medium text-black/75 transition hover:text-black">LinkedIn</a>
                <a href="https://www.instagram.com/geetanjalisoftwares/" className="text-sm font-medium text-black/75 transition hover:text-black">Instagram</a>
                <a href="#" className="text-sm font-medium text-black/75 transition hover:text-black">X (Twitter)</a>
              </nav>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-bold uppercase tracking-wider text-black/30">Legal</h3>
              <nav className="mt-4 flex flex-col gap-3" aria-label="Legal links">
                <Link href="/privacy" className="text-sm font-medium text-black/75 transition hover:text-black">Privacy Policy</Link>
                <Link href="/terms" className="text-sm font-medium text-black/75 transition hover:text-black">Terms of Service</Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="mt-16 border-t border-black/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-black/40">
            &copy; 2026 Geetanjali Softwares. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
