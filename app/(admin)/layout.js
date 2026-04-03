'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Home, LogOut, Settings, FileText } from 'lucide-react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const isLoginPage = pathname === '/login';

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Leads', href: '/leads', icon: <Users size={20} /> },
    { label: 'Blogs', href: '/dashboard/blogs', icon: <FileText size={20} /> },
    { label: 'SEO Settings', href: '/settings', icon: <Settings size={20} /> },
  ];

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#fcfcfc]">
      {/* Sidebar */}
      <aside 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed inset-y-0 left-0 border-r border-black/5 bg-white/80 backdrop-blur-xl z-50 transition-all duration-300 ease-in-out ${
          isHovered ? 'w-64' : 'w-20'
        }`}
      >
        <div className={`flex h-16 items-center border-b border-black/5 px-6 overflow-hidden transition-all duration-300`}>
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-black flex-shrink-0">
            <div className="h-8 w-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-sm">G</div>
            <div className={`transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
              Geetanjali <span className="font-normal text-black/50 text-xs">Admin</span>
            </div>
          </Link>
        </div>

        <nav className="flex flex-col gap-1 p-4 overflow-hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={!isHovered ? item.label : ''}
                className={`flex items-center rounded-xl p-3 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'text-black/60 hover:bg-black/5 hover:text-black'
                }`}
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <span className={`ml-3 whitespace-nowrap transition-all duration-300 ${
                  isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-0 w-full px-4 flex flex-col gap-1 overflow-hidden">
          <Link
            href="/"
            title={!isHovered ? 'Back to Website' : ''}
            className="flex items-center rounded-xl p-3 text-sm font-medium text-black/60 transition-all duration-300 hover:bg-black/5 hover:text-black"
          >
            <div className="flex-shrink-0"><Home size={20} /></div>
            <span className={`ml-3 whitespace-nowrap transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
            }`}>
              Back to Website
            </span>
          </Link>
          <button
            onClick={handleLogout}
            title={!isHovered ? 'Logout' : ''}
            className="flex w-full items-center rounded-xl p-3 text-sm font-medium text-red-600/60 transition-all duration-300 hover:bg-red-500/5 hover:text-red-600"
          >
            <div className="flex-shrink-0"><LogOut size={20} /></div>
            <span className={`ml-3 whitespace-nowrap transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
            }`}>
              Logout Session
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isHovered ? 'ml-64' : 'ml-20'}`}>
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-black/5 bg-white/60 px-8 backdrop-blur-xl">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-black">
              {navItems.find((item) => pathname === item.href)?.label || 'Admin'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="h-9 w-9 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-600 font-bold text-sm">
               A
             </div>
          </div>
        </header>

        <main className="p-8">
          <div className="rounded-[32px] border border-black/5 bg-white p-1 shadow-sm">
            <div className="rounded-[28px] border border-black/[0.03] bg-[#fcfcfc] p-6 lg:p-10">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
