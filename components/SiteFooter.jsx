import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

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
    <footer className="border-t border-black/5 pt-14 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main row — brand left, links right on desktop */}
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">

          {/* Brand + contact */}
          <div className="max-w-xs">
            <Link href="/" className="text-xl font-bold tracking-tight text-black sm:text-2xl">
              Geetanjali  <span className="font-normal text-black/45">Softwares</span>
            </Link>
            <p className="mt-4 text-sm leading-7 text-black/55">
              Modern websites, performance-driven digital marketing, and unique branding for businesses that demand a stronger online presence.
            </p>
            <ul className="mt-6 space-y-3">
              <li>
                <a href="mailto:geetanjalisoftwares@gmail.com" className="flex items-start gap-2.5 text-sm text-black/50 hover:text-black transition">
                  <Mail size={15} className="text-orange-500 mt-0.5 shrink-0" />
                  geetanjalisoftwares@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+917508657479" className="flex items-center gap-2.5 text-sm text-black/50 hover:text-black transition">
                  <Phone size={15} className="text-orange-500 shrink-0" />
                  +91 7508657479
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-black/50">
                <MapPin size={15} className="text-orange-500 shrink-0" />
                Faridabad, Haryana, India
              </li>
            </ul>
          </div>

          {/* Links — 2 col on mobile (left-aligned), 3 col on desktop */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3 sm:gap-x-16">

            {/* Company */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Company</h3>
              <nav className="mt-5 flex flex-col items-start gap-3" aria-label="Footer company navigation">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-black/65 hover:text-black transition"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Connect</h3>
              <nav className="mt-5 flex flex-col items-start gap-3" aria-label="Social links">
                <a href="#" className="text-sm font-medium text-black/65 hover:text-black transition">LinkedIn</a>
                <a href="https://www.instagram.com/geetanjalisoftwares/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-black/65 hover:text-black transition">Instagram</a>
                <a href="#" className="text-sm font-medium text-black/65 hover:text-black transition">X (Twitter)</a>
              </nav>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Legal</h3>
              <nav className="mt-5 flex flex-col items-start gap-3" aria-label="Legal links">
                <Link href="/privacy" className="text-sm font-medium text-black/65 hover:text-black transition">Privacy Policy</Link>
                <Link href="/terms" className="text-sm font-medium text-black/65 hover:text-black transition">Terms of Service</Link>
              </nav>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-black/5 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-black/35">
            &copy; {new Date().getFullYear()} Geetanjali Softwares. All rights reserved.
          </p>
          <p className="text-xs text-black/25">Made with ♥ in India</p>
        </div>

      </div>
    </footer>
  );
}
