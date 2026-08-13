"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <div className="flex-1 flex flex-col min-h-screen">{children}</div>;
  }

  return (
    <SmoothScrollProvider>
      <Navbar />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
    </SmoothScrollProvider>
  );
}
