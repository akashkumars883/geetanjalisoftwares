"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Inbox, 
  Globe, 
  LogOut, 
  ShieldCheck 
} from "lucide-react";
import AdminGuard from "@/components/AdminGuard";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "All Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Create New Blog", href: "/admin/blogs/new", icon: PlusCircle },
    { name: "Leads & Inquiries", href: "/admin/leads", icon: Inbox },
  ];

  return (
    <AdminGuard>
      <div className="h-screen w-full overflow-hidden bg-stone-50 flex text-left font-sans selection:bg-orange-500/20">
        {/* Strictly Fixed Sidebar */}
        <aside className="w-64 bg-white border-r border-stone-200 shrink-0 flex flex-col justify-between hidden md:flex h-screen z-20">
          <div className="space-y-8 p-6">
            {/* Admin Brand */}
            <div className="flex items-center gap-3 border-b border-stone-100 pb-5">
              <div className="h-9 w-9 rounded-xl bg-orange-600/10 border border-orange-600/20 flex items-center justify-center text-orange-600 font-bold">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-stone-900 leading-none">Admin Panel</h2>
                <span className="text-[10px] font-medium text-stone-500">Geetanjali Softwares</span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-black text-white"
                        : "text-stone-600 hover:text-black hover:bg-stone-100"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Bottom Actions */}
          <div className="p-6 border-t border-stone-100 space-y-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2.5 text-xs font-semibold text-stone-600 hover:text-black px-3.5 py-2 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span>View Live Website</span>
            </Link>
            
            <button
              onClick={() => {
                localStorage.removeItem("geetanjali_admin_auth");
                window.location.href = "/admin";
              }}
              className="w-full flex items-center gap-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out Admin</span>
            </button>
          </div>
        </aside>

        {/* Independently Scrollable Right Area */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
          {/* Header */}
          <header className="h-16 bg-white border-b border-stone-200 px-6 flex items-center justify-between sticky top-0 z-10 shrink-0">
            <div className="flex items-center gap-4 md:hidden">
              <span className="text-sm font-bold text-stone-900">Admin Panel</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-500 font-light">
              <span>Admin Management Hub</span>
              <span>/</span>
              <span className="font-semibold text-stone-800 uppercase tracking-wider text-[10px]">
                {pathname.replace("/admin", "") || "Dashboard"}
              </span>
            </div>
          </header>

          {/* Content Body */}
          <main className="flex-1 p-6 md:p-10 w-full min-w-0">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
