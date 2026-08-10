'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Logo from '@/components/Logo';

const SERVICES_LINKS = [
  { label: 'Website Development', href: '/services/website-design-development' },
  { label: 'Digital Marketing', href: '/services/digital-marketing' },
  { label: 'SEO', href: '/services/digital-marketing/seo' },
  { label: 'Google Ads', href: '/services/digital-marketing/google-ads-ppc' },
];

const SOLUTIONS_LINKS = [
  { label: 'Small Businesses', href: '/solutions/small-businesses' },
  { label: 'Healthcare', href: '/solutions/healthcare' },
  { label: 'Education', href: '/solutions/education' },
  { label: 'Real Estate', href: '/solutions/real-estate' },
];

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '#', subLinks: SERVICES_LINKS },
  { label: 'Solutions', href: '#', subLinks: SOLUTIONS_LINKS },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset dropdown when menu closes
      setTimeout(() => setOpenDropdown(null), 500);
    }
  }, [isOpen]);

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
          }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="group relative z-50 flex items-center gap-3 uppercase"
          >
            {/* Premium Logo Icon */}
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 p-[1.5px] shadow-md shadow-orange-600/10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-orange-600/20">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-background transition-colors duration-300">
                <Logo
                  size={20}
                  className="text-orange-600 transition-transform duration-500 group-hover:rotate-[360deg]"
                />
              </div>
            </div>

            {/* Logo Text */}
            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold leading-none tracking-widest text-foreground transition-colors duration-300 group-hover:text-orange-600 md:text-2xl">
                Geetanjali
              </span>
              <span className="mt-1 text-[0.55rem] font-semibold leading-none tracking-[0.45em] text-neutral-500 transition-colors duration-300 group-hover:text-foreground md:text-[0.6rem]">
                Softwares
              </span>
            </div>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`group relative z-50 flex h-12 w-12 flex-col items-center justify-center gap-[6px] rounded-full bg-background transition-colors hover:border-primary focus:outline-none ${isOpen ? 'bg-primary border-primary' : ''}`}
            aria-label="Toggle Menu"
          >
            <span
              className={`h-[2px] transition-all duration-300 ${isOpen ? 'w-6 translate-y-[8px] rotate-45 bg-background' : 'w-8 bg-foreground group-hover:w-6 group-hover:bg-primary'
                }`}
            />
            <span
              className={`h-[2px] transition-all duration-300 ${isOpen ? 'w-0 opacity-0 bg-background' : 'w-8 bg-foreground group-hover:bg-primary'
                }`}
            />
            <span
              className={`h-[2px] transition-all duration-300 ${isOpen ? 'w-6 -translate-y-[8px] -rotate-45 bg-background' : 'w-8 bg-foreground group-hover:w-10 group-hover:bg-primary'
                }`}
            />
          </button>
        </div>
      </header>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-background px-6 pt-32 pb-24 text-foreground lg:px-12 overflow-y-auto scrollbar-hide"
          >
            <nav className="mx-auto flex w-full max-w-7xl flex-col gap-3 md:gap-6 mt-auto mb-auto">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.2, ease: 'easeOut' }}
                  className="flex flex-col"
                >
                  {link.subLinks ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(link.label)}
                        className="group flex items-center justify-between w-full md:justify-start gap-4 font-heading text-4xl font-bold uppercase tracking-tighter md:text-7xl"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-light text-foreground/50 md:text-2xl">
                            0{i + 1}
                          </span>
                          <span className="transition-transform duration-500 group-hover:translate-x-6 hover:text-orange-600">
                            {link.label}
                          </span>
                        </div>
                        <ChevronDown
                          size={32}
                          className={`transition-transform duration-300 md:ml-8 ${openDropdown === link.label ? 'rotate-180 text-orange-600' : 'text-foreground/50'}`}
                        />
                      </button>
                      <AnimatePresence>
                        {openDropdown === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="flex flex-col gap-3 pl-12 md:pl-20 pt-4 overflow-hidden"
                          >
                            {link.subLinks.map((sub) => (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                onClick={() => setIsOpen(false)}
                                className="text-xl md:text-3xl font-heading uppercase font-medium text-foreground/70 hover:text-orange-600 transition-colors"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-4 font-heading text-4xl font-bold uppercase tracking-tighter md:text-7xl"
                    >
                      <span className="text-lg font-light text-foreground/50 md:text-2xl">
                        0{i + 1}
                      </span>
                      <span className="transition-transform duration-500 group-hover:translate-x-6 hover:text-orange-600">
                        {link.label}
                      </span>
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
