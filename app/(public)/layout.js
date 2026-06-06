import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import Breadcrumbs from "@/components/Breadcrumbs";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import FloatingConsultation from "@/components/FloatingConsultation";
import PopupForm from "@/components/PopupForm";

export default function PublicLayout({ children }) {
  return (
    <>
      <AnalyticsTracker />
      <main className="mx-auto min-h-screen w-full max-w-[1600px] px-4 pt-32 sm:px-6 sm:pt-32 lg:px-10">
        <Navbar />
        <Breadcrumbs />
        {children}
      </main>
      <SiteFooter />

      {/* Floating Conversion CTAs */}
      <FloatingWhatsApp />
      <FloatingConsultation />
      <PopupForm />

      <svg width="0" height="0" className="absolute pointer-events-none invisible">
        <filter id="chroma-key-white" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="1 0 0 0 0
                                               0 1 0 0 0
                                               0 0 1 0 0
                                               -1 -1 -1 3 -0.5" />
        </filter>
      </svg>
    </>
  );
}
