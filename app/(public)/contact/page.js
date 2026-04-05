import ContactFormSection from "@/components/ContactFormSection";

export default function ContactPage() {
  return (
    <div className="pt-4">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 rounded-full bg-orange-400/10 blur-3xl -z-10" />
      </div>
      <ContactFormSection />
    </div>
  );
}
