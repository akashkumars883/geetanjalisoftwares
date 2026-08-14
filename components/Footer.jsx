"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, Check, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setIsSubscribed(true);
        setTimeout(() => {
          setEmail("");
          setIsSubscribed(false);
        }, 5000);
      }
    } catch (err) {
      console.error("Subscription error:", err);
    }
  };

  const links = {
    services: [
      { name: "Web Applications", href: "/services/web-applications" },
      { name: "AI & Automation", href: "/services/business-automation" },
      { name: "Technical SEO", href: "/services/technical-seo" },
      { name: "Corporate Branding", href: "/services/branding" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Blog", href: "/blog" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Pricing Plans", href: "/pricing" },
      { name: "Get In Touch", href: "/contact" },
    ],
  };

  return (
    <footer className="bg-[#09090b] text-white border-t border-white/5 py-10 px-6 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Top Section: Brand + Navigation Links + Subscribe */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-5 text-left">
            <Link href="/" className="inline-flex items-center">
              <div className="h-9.5 w-9.5 overflow-hidden relative">
                <img
                  src="/logo.png"
                  alt="Geetanjali Softwares Logo"
                  className="h-full w-full object-contain invert -rotate-12"
                />
              </div>
            </Link>
            <p className="text-xs text-zinc-300 font-light leading-relaxed max-w-sm">
              Premier digital marketing agency &amp; website development company in India, Delhi NCR, Noida &amp; USA. Custom software, SEO services, local SEO, ecommerce SEO, performance marketing, and white label SEO reseller programs.
            </p>

            {/* Direct Contact Info */}
            <div className="pt-2 space-y-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                <a href="mailto:geetanjalisoftwares@gmail.com" className="hover:text-white transition-colors">
                  geetanjalisoftwares@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                <span>+91 6201231875 &nbsp;|&nbsp; +91 7508657479</span>
              </div>
            </div>
          </div>

          {/* Links Column 1: Services */}
          <div className="space-y-4 text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">
              Services
            </h4>
            <ul className="space-y-2.5">
              {links.services.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2: Company */}
          <div className="space-y-4 text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">
              Company
            </h4>
            <ul className="space-y-2.5">
              {links.company.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Subscribe & Social Connect */}
          <div className="space-y-6 text-left">
            {/* Newsletter Subscribe */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-widest">
                Subscribe
              </h4>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-sm font-semibold text-orange-500 animate-fade-in">
                  <Check className="h-4 w-4" />
                  <span>Subscribed successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex bg-white/5 border border-white/10 rounded-full overflow-hidden p-1">
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent pl-3 text-[11px] text-white placeholder-zinc-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="p-2 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Social Icons Connect (Facebook, Instagram, Pinterest, LinkedIn, Twitter X, Email - No GitHub) */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Follow Us
              </h4>
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/geetanjalisoftwares/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="h-8.5 w-8.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/geetanjalisoftwares/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="h-8.5 w-8.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Pinterest */}
                <a
                  href="https://www.pinterest.com/geetanjalisoftwares/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
                  className="h-8.5 w-8.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/geetanjalisoftwares/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="h-8.5 w-8.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* Twitter X */}
                <a
                  href="https://x.com/geetanjalisoftwares"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter X"
                  className="h-8.5 w-8.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Email */}
                <a
                  href="mailto:geetanjalisoftwares@gmail.com"
                  aria-label="Email"
                  className="h-8.5 w-8.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright + Legal */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="text-xs font-medium text-zinc-200">
            &copy; {currentYear} Geetanjali Softwares. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
            <Link
              href="/privacy-policy"
              className="text-xs font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-xs font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/refund-policy"
              className="text-xs font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Refund Policy
            </Link>
            <Link
              href="/sitemap"
              className="text-xs font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
