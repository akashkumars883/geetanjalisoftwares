import Link from "next/link";
import { ArrowUpRight, Sparkles, BookOpen, Clock, Tag } from "lucide-react";
import { getBlogPosts } from "@/lib/blogData";
import BlogFilterClient from "@/components/BlogFilterClient";
import FaqSection from "@/components/FaqSection";

export const metadata = {
  title: "Engineering Blog & Digital Growth Insights",
  description:
    "Read in-depth software engineering blueprints, AI automation guides, custom CRM architecture strategies, and technical SEO insights from Geetanjali Softwares.",
  keywords:
    "software engineering blog, AI chatbot development guide, Next.js performance tutorial, technical SEO blueprints, custom CRM development",
  alternates: {
    canonical: "https://geetanjalisoftwares.com/blog",
  },
  openGraph: {
    title: "Engineering Blog & Digital Growth Insights | Geetanjali Softwares",
    description:
      "Technical software architecture guides, AI integration patterns, and SEO strategies for modern businesses.",
    url: "https://geetanjalisoftwares.com/blog",
    type: "website",
  },
};

const BLOG_FAQS = [
  {
    question: "How frequently do you publish new technical guides and industry insights?",
    answer:
      "We publish weekly in-depth software engineering blueprints, AI integration tutorials, Core Web Vitals optimization guides, and search marketing strategies.",
  },
  {
    question: "Who writes the articles on the Geetanjali Softwares engineering blog?",
    answer:
      "Our articles are authored directly by lead software architects, AI engineers, and technical SEO specialists who build production systems every day.",
  },
  {
    question: "Can I request a technical tutorial or topic for your engineering team to cover?",
    answer:
      "Yes! We love answering client questions. Send us your technical query via our contact page and our lead engineers will consider drafting a dedicated blueprint.",
  },
  {
    question: "Are these guides suitable for non-technical business owners and founders?",
    answer:
      "We write for both technical founders and business decision-makers — explaining complex software architectures with clear practical ROI takeaways.",
  },
  {
    question: "How can I apply these technical strategies directly to my business?",
    answer:
      "You can follow our step-by-step code examples or schedule a free technical consultation with our lead architects to implement these blueprints for your platform.",
  },
];

export default async function BlogListingPage() {
  const posts = await getBlogPosts();
  const featuredPost = posts.find((p) => p.featured) || posts[0];

  return (
    <main className="min-h-screen bg-white pt-24 text-left selection:bg-orange-500/20 selection:text-orange-900">
      {/* Header Section */}
      <section className="py-16 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            <BookOpen className="h-3.5 w-3.5 text-orange-600" /> Engineering Blog & Insights
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-stone-900 leading-[1.1] max-w-5xl">
            Software engineering blueprints <br />
            <span className="text-orange-600">& digital growth strategies.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            In-depth technical guides, AI integration patterns, custom CRM architectures, and search engine optimization strategies straight from our development team.
          </p>
        </div>
      </section>

      {/* Featured Article Section (Original Height Layout + rounded-xl image) */}
      {featuredPost && (
        <section className="py-12 bg-white border-b border-stone-100 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-stone-300 transition-all shadow-sm">
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-600/20 text-[10px] font-bold uppercase tracking-wider text-orange-600">
                    <Sparkles className="h-3 w-3" /> Featured Article
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-stone-200/60 text-stone-700 font-semibold text-[10px] uppercase tracking-wider">
                    <Tag className="h-3 w-3" /> {featuredPost.category}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-stone-900 leading-tight">
                  <Link href={`/blog/${featuredPost.slug}`} className="hover:text-orange-600 transition-colors">
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-sm text-stone-600 font-light leading-relaxed line-clamp-3">
                  {featuredPost.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-stone-200/60">
                  <div className="flex items-center gap-3 text-xs text-stone-500">
                    <span className="font-semibold text-stone-900">{featuredPost.author.name}</span>
                    <span>•</span>
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {featuredPost.readTime}</span>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-black text-white hover:bg-zinc-800 transition-all shadow-md shrink-0"
                  >
                    Read Full Article
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Featured Image Container with rounded-xl */}
              <div className="lg:col-span-5 h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-sm relative group">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.imageAlt || featuredPost.title}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter & Search Bar + Articles Grid (Client Component) */}
      <section className="py-12 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <BlogFilterClient initialPosts={posts} />
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection
        title="Frequently Asked Questions About Our Blog"
        subtitle="Insights regarding technical content publishing, code examples, and topics."
        faqs={BLOG_FAQS}
      />
    </main>
  );
}
