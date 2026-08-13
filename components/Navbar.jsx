"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null); // 'services', 'solutions', or null
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState(null); // 'services', 'solutions', or null
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll height to toggle crisp shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const servicesMenu = [
    {
      title: "Development",
      items: [
        { name: "Business Website", href: "/services/business-website" },
        { name: "Web Applications", href: "/services/web-applications" },
        { name: "Landing Pages", href: "/services/landing-pages" },
        { name: "E-Commerce", href: "/services/ecommerce" },
      ],
    },
    {
      title: "Growth",
      items: [
        { name: "SEO", href: "/services/seo" },
        { name: "Local SEO", href: "/services/local-seo" },
        { name: "Ecommerce SEO Service", href: "/services/ecommerce-seo" },
        { name: "Technical SEO Services", href: "/services/technical-seo" },
        { name: "Content Strategist", href: "/services/content-strategist" },
      ],
    },
    {
      title: "Technology",
      items: [
        { name: "AI Chatbot", href: "/services/ai-chatbot" },
        { name: "Business Automation", href: "/services/business-automation" },
        { name: "CRM / Custom Software", href: "/services/crm-custom-software" },
        { name: "API Integration", href: "/services/api-integration" },
      ],
    },
  ];

  const solutionsMenu = [
    {
      title: "Industries",
      items: [
        { name: "E-Commerce & Retail", href: "/solutions/ecommerce-retail" },
        { name: "Healthcare & Medical", href: "/solutions/healthcare-medical" },
        { name: "Real Estate & Property", href: "/solutions/real-estate" },
        { name: "FinTech & Finance", href: "/solutions/fintech-finance" },
        { name: "EdTech & Education", href: "/solutions/edtech-education" },
      ],
    },
    {
      title: "Business Size",
      items: [
        { name: "Startups & MVPs", href: "/solutions/startups-mvp" },
        { name: "Small & Medium Business", href: "/solutions/smb" },
        { name: "Enterprise Solutions", href: "/solutions/enterprise" },
      ],
    },
    {
      title: "Custom Systems",
      items: [
        { name: "Customer Portals", href: "/solutions/customer-portals" },
        { name: "Inventory Systems", href: "/solutions/inventory-systems" },
        { name: "Business Intelligence", href: "/solutions/business-intelligence" },
        { name: "Cloud SaaS Platforms", href: "/solutions/cloud-saas" },
      ],
    },
  ];

  const toggleMobileTab = (tab) => {
    setMobileActiveTab(mobileActiveTab === tab ? null : tab);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 px-6 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-stone-200/60 ${
          isScrolled 
            ? "py-3.5 shadow-sm" 
            : "py-4.5"
        }`}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        {/* Navbar Container */}
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* Left Brand Logo & Menu Items */}
          <div className="flex items-center gap-10">
            {/* Logo Only */}
            <Link href="/" className="flex items-center group">
              <div className="h-9.5 w-9.5 overflow-hidden group-hover:scale-105 transition-transform duration-300 relative">
                <img
                  src="/logo.png"
                  alt="Geetanjali Softwares Logo"
                  className="h-full w-full object-contain -rotate-12 transition-all duration-300"
                />
              </div>
            </Link>

            {/* Desktop Menu Items */}
            <div className="hidden md:flex items-center gap-6.5">
              <Link
                href="/"
                className="text-sm font-semibold text-stone-700 hover:text-orange-600 transition-colors"
              >
                Home
              </Link>

              {/* Services Mega Link */}
              <div 
                className="relative py-2"
                onMouseEnter={() => setActiveDropdown("services")}
              >
                <button
                  className="text-sm font-semibold text-stone-700 hover:text-orange-600 transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
                >
                  Services
                  <ChevronDown className={`h-4.5 w-4.5 transition-transform duration-300 ${activeDropdown === "services" ? "rotate-180 text-orange-600" : ""}`} />
                </button>
              </div>

              {/* Solutions Mega Link */}
              <div 
                className="relative py-2"
                onMouseEnter={() => setActiveDropdown("solutions")}
              >
                <button
                  className="text-sm font-semibold text-stone-700 hover:text-orange-600 transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
                >
                  Solutions
                  <ChevronDown className={`h-4.5 w-4.5 transition-transform duration-300 ${activeDropdown === "solutions" ? "rotate-180 text-orange-600" : ""}`} />
                </button>
              </div>

              {[
                { name: "Case Studies", href: "/case-studies" },
                { name: "Pricing", href: "/pricing" },
                { name: "About", href: "/about" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold text-stone-700 hover:text-orange-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Action Button (Desktop) & Hamburger (Mobile) */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden md:inline-flex px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-black text-white hover:bg-zinc-800 transition-all shadow-sm hover:scale-[1.02]"
            >
              Start a Project
            </Link>

            {/* Hamburger Icon */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 text-stone-800 hover:text-black transition-colors focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Floating Mega Dropdown Panel for Services (Desktop) */}
          {activeDropdown === "services" && (
            <div 
              className="absolute top-full left-0 w-full bg-white border border-stone-200/80 rounded-2xl text-stone-800 py-10 px-12 shadow-2xl transition-all duration-350 transform opacity-100 translate-y-3"
              onMouseEnter={() => setActiveDropdown("services")}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {servicesMenu.map((column, idx) => (
                  <div key={idx} className="flex flex-col gap-4 text-left">
                    <h4 className="text-xs font-bold text-orange-600 uppercase tracking-widest border-b border-stone-100 pb-2">
                      {column.title}
                    </h4>
                    <div className="flex flex-col gap-3">
                      {column.items.map((item, i) => (
                        <Link
                          key={i}
                          href={item.href}
                          className="text-sm font-medium text-stone-600 hover:text-orange-600 transition-colors hover:translate-x-1 duration-200 transform inline-block"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Floating Mega Dropdown Panel for Solutions (Desktop) */}
          {activeDropdown === "solutions" && (
            <div 
              className="absolute top-full left-0 w-full bg-white border border-stone-200/80 rounded-2xl text-stone-800 py-10 px-12 shadow-2xl transition-all duration-350 transform opacity-100 translate-y-3"
              onMouseEnter={() => setActiveDropdown("solutions")}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {solutionsMenu.map((column, idx) => (
                  <div key={idx} className="flex flex-col gap-4 text-left">
                    <h4 className="text-xs font-bold text-orange-600 uppercase tracking-widest border-b border-stone-100 pb-2">
                      {column.title}
                    </h4>
                    <div className="flex flex-col gap-3">
                      {column.items.map((item, i) => (
                        <Link
                          key={i}
                          href={item.href}
                          className="text-sm font-medium text-stone-600 hover:text-orange-600 transition-colors hover:translate-x-1 duration-200 transform inline-block"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Blurred screen backdrop behind the open mobile menu */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-md z-50 md:hidden animate-fade-in"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Slide-down Mobile Menu from the top */}
      {isMobileOpen && (
        <div className="fixed top-0 left-0 w-full bg-white z-50 md:hidden shadow-2xl border-b border-stone-100 animate-slide-down max-h-[90vh] overflow-y-auto">
          {/* Header inside open menu (with logo and close button) */}
          <div className="flex items-center justify-between py-5 px-6 border-b border-stone-100">
            {/* Logo */}
            <Link href="/" onClick={() => setIsMobileOpen(false)} className="flex items-center">
              <div className="h-9.5 w-9.5 overflow-hidden relative">
                <img
                  src="/logo.png"
                  alt="Geetanjali Softwares Logo"
                  className="h-full w-full object-contain -rotate-12"
                />
              </div>
            </Link>
            
            {/* Close button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-2 text-stone-800 hover:text-black focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Menu Items List */}
          <div className="flex flex-col gap-5 py-6 px-6 text-left">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className="text-base font-bold text-stone-800 py-1.5 border-b border-stone-50"
            >
              Home
            </Link>

            {/* Services Accordion (Mobile) */}
            <div className="border-b border-stone-50 pb-2">
              <button
                onClick={() => toggleMobileTab("services")}
                className="w-full flex items-center justify-between text-base font-bold text-stone-800 py-1.5 focus:outline-none text-left"
              >
                <span>Services</span>
                <ChevronDown className={`h-4.5 w-4.5 transition-transform ${mobileActiveTab === "services" ? "rotate-180 text-orange-600" : ""}`} />
              </button>
              {mobileActiveTab === "services" && (
                <div className="pl-4 pt-3 flex flex-col gap-4">
                  {servicesMenu.map((group, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                      <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">{group.title}</span>
                      {group.items.map((item, i) => (
                        <Link
                          key={i}
                          href={item.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="text-sm font-semibold text-stone-600 hover:text-black"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Solutions Accordion (Mobile) */}
            <div className="border-b border-stone-50 pb-2">
              <button
                onClick={() => toggleMobileTab("solutions")}
                className="w-full flex items-center justify-between text-base font-bold text-stone-800 py-1.5 focus:outline-none text-left"
              >
                <span>Solutions</span>
                <ChevronDown className={`h-4.5 w-4.5 transition-transform ${mobileActiveTab === "solutions" ? "rotate-180 text-orange-600" : ""}`} />
              </button>
              {mobileActiveTab === "solutions" && (
                <div className="pl-4 pt-3 flex flex-col gap-4">
                  {solutionsMenu.map((group, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                      <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">{group.title}</span>
                      {group.items.map((item, i) => (
                        <Link
                          key={i}
                          href={item.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="text-sm font-semibold text-stone-600 hover:text-black"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {[
              { name: "Case Studies", href: "/case-studies" },
              { name: "Pricing", href: "/pricing" },
              { name: "About", href: "/about" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="text-base font-bold text-stone-800 py-1.5 border-b border-stone-50"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setIsMobileOpen(false)}
              className="w-full text-center py-3.5 rounded-full bg-black text-white font-bold text-sm hover:bg-zinc-800 mt-2 shadow-md transition-colors"
            >
              Start a Project
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
