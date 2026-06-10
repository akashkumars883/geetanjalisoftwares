import ContactFormSection from '@/components/ContactFormSection';
import { SITE_URL } from '@/lib/seo';

export const metadata = {
  title: 'Contact Us | Geetanjali Softwares',
  description:
    'Get in touch with Geetanjali Softwares for web development, SEO, and digital marketing services. Call us, WhatsApp, or fill the form. Located in Faridabad, Delhi NCR.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <ContactFormSection />
    </div>
  );
}