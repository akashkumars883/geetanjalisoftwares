import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User, ArrowUpRight, Tag } from "lucide-react";
import { getBlogPosts } from "@/lib/blogData";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  
  if (!post) {
    return { title: "Article Not Found – Geetanjali Softwares" };
  }

  return {
    title: `${post.title} – Geetanjali Softwares Engineering Blog`,
    description: post.description,
    alternates: {
      canonical: `https://geetanjalisoftwares.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://geetanjalisoftwares.com/blog/${post.slug}`,
      images: [post.image],
      type: "article",
    },
  };
}

// Convert markdown syntax or format HTML content for headings, bullets & lists
function formatArticleContent(content = "") {
  if (!content) return "";

  // If already full HTML with tags, return as is
  if (content.includes("<p>") || content.includes("<h2>") || content.includes("<h3>") || content.includes("<div") || content.includes("<ul")) {
    return content;
  }

  // Parse markdown headings & lists
  let formatted = content
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^\s*[\-\*] (.*$)/gim, '<li>$1</li>')
    .replace(/^\s*\d+\. (.*$)/gim, '<li>$1</li>');

  // Wrap contiguous <li> tags into <ul>
  formatted = formatted.replace(/(<li>.*?<\/li>\s*)+/gs, (match) => `<ul>${match}</ul>`);

  // Wrap remaining text blocks into <p>
  const blocks = formatted.split(/\n\n+/);
  return blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<pre")
      ) {
        return trimmed;
      }
      return `<p>${trimmed}</p>`;
    })
    .join("\n");
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = posts.filter((p) => p.slug !== slug).slice(0, 2);
  const formattedContent = formatArticleContent(post.content);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Geetanjali Softwares",
      "url": "https://geetanjalisoftwares.com",
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://geetanjalisoftwares.com/blog/${post.slug}`,
    },
  };

  return (
    <main className="min-h-screen bg-white pt-28 pb-20 text-left selection:bg-orange-500/20 selection:text-orange-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      <article className="max-w-4xl mx-auto px-6 space-y-10">
        
        {/* Back Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-black transition-colors bg-stone-100 px-4 py-2 rounded-full"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to All Articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-6 border-b border-stone-200 pb-10">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-600/20 text-xs font-bold uppercase tracking-wider text-orange-600">
              <Tag className="h-3 w-3" /> {post.category || "Engineering"}
            </span>
            <span className="text-xs text-stone-500 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed">
            {post.description}
          </p>

          {/* Author & Date Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-stone-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 font-bold text-xs uppercase">
                <User className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900">{post.author.name}</div>
                <div className="text-xs text-stone-500 font-light">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-500">
              <Calendar className="h-3.5 w-3.5 text-stone-400" />
              <span>Published on {post.date}</span>
            </div>
          </div>
        </header>

        {/* Article Cover Image Banner */}
        {post.image && (
          <div className="relative w-full h-[320px] sm:h-[420px] rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm">
            <img
              src={post.image}
              alt={post.imageAlt || post.title}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        )}

        {/* Article Body HTML Render with Typography (.prose) */}
        <section 
          className="prose max-w-none text-stone-800 text-base leading-relaxed font-light pt-4"
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />

        {/* Footer Share & CTA */}
        <footer className="pt-10 border-t border-stone-200 space-y-10">
          <div className="p-8 rounded-2xl bg-black text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-lg text-left">
              <h3 className="text-xl font-bold text-white">Need a custom software engineering solution?</h3>
              <p className="text-xs text-zinc-400 font-light">
                Our architects can help you build scalable web apps, AI tools, or custom CRM systems.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors shrink-0"
            >
              Get Technical Consultation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="space-y-6 text-left">
              <h3 className="text-xl font-bold text-stone-900">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((related, i) => (
                  <Link
                    key={i}
                    href={`/blog/${related.slug}`}
                    className="p-5 rounded-xl bg-stone-50 border border-stone-200 hover:border-stone-300 hover:shadow-lg transition-all space-y-4 block group"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-stone-100 rounded-xl border border-stone-200/60">
                      <img
                        src={related.image}
                        alt={related.imageAlt || related.title}
                        className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">{related.category}</span>
                      <h4 className="text-base font-bold text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-2">{related.title}</h4>
                      <p className="text-xs text-stone-500 font-light line-clamp-2">{related.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </footer>

      </article>
    </main>
  );
}
