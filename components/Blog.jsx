import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getBlogPosts } from "@/lib/blogData";

export default async function Blog() {
  const allPosts = await getBlogPosts();
  const posts = allPosts.slice(0, 3); // Take top 3 most recent articles

  // JSON-LD Blog Schema for search engine indexing
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Geetanjali Softwares Engineering Blog",
    "description": "Insights, articles, and blueprints from our custom software, AI, and search engine optimization team.",
    "blogPost": posts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "datePublished": post.date,
      "description": post.description,
      "image": `https://geetanjalisoftwares.com${post.image}`,
      "author": {
        "@type": "Organization",
        "name": "Geetanjali Softwares"
      }
    }))
  };

  if (!posts || posts.length === 0) return null;

  return (
    <section 
      id="blog"
      aria-labelledby="blog-heading"
      className="py-10 bg-stone-50 border-b border-stone-100 relative z-10"
    >
      {/* Blog Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Block */}
        <div className="max-w-3xl text-left mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            Our Blog
          </div>
          <h2 
            id="blog-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-stone-900 leading-tight"
          >
            Insights and blueprints from <br />
            <span className="text-orange-600">our engineering team.</span>
          </h2>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={post.id || index}
              className="group bg-white border border-stone-200/80 rounded-xl overflow-hidden hover:border-stone-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Box */}
              <div className="relative h-48 w-full overflow-hidden bg-stone-50 rounded-t-xl">
                <img
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={190}
                  className="h-full w-full object-cover rounded-t-xl group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6 text-left">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-orange-600">
                    <span>{post.category}</span>
                    <span className="text-stone-400 font-light">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-stone-900 leading-snug group-hover:text-orange-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-light leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="border-t border-stone-50 pt-4 flex items-center justify-between">
                  <time className="text-[10px] font-semibold text-stone-400">
                    {post.date}
                  </time>
                  <Link
                    href={`/blog/${post.slug}`}
                    aria-label={`Read article: ${post.title}`}
                    className="text-[11px] font-bold uppercase tracking-wider text-stone-800 hover:text-black transition-colors flex items-center gap-1 group-hover:translate-x-0.5 duration-200 transform"
                  >
                    Read Article
                    <ArrowUpRight className="h-3.5 w-3.5 text-orange-600" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
