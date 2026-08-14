"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { BLOG_POSTS as FALLBACK_POSTS } from "@/lib/blogData";

const POSTS_PER_PAGE = 6;

export default function BlogFilterClient({ initialPosts }) {
  const postsList = initialPosts && initialPosts.length > 0 ? initialPosts : FALLBACK_POSTS;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ["All", "Engineering", "AI & Automation", "Strategy", "SEO", "Website Development", "Digital Marketing"];

  // Filter handler resets page to 1
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const filteredPosts = postsList.filter((post) => {
    const postCategory = post.category || "";
    const matchesCategory =
      selectedCategory === "All" ||
      postCategory.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate pagination slices
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="space-y-10">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-stone-100">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-stone-900 text-white shadow-sm"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 transition-colors"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {paginatedPosts.length > 0 ? (
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post, index) => (
              <article
                key={post.id || index}
                className="group bg-white border border-stone-200/80 rounded-xl overflow-hidden hover:border-stone-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Blog Card Header Image */}
                <div className="relative h-48 w-full overflow-hidden bg-stone-100 border-b border-stone-100 rounded-t-xl">
                  <img
                    src={post.image}
                    alt={post.imageAlt || post.title}
                    className="h-full w-full object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </div>

                <div className="p-6 space-y-4 text-left flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-orange-600">
                      <span className="flex items-center gap-1"><Tag className="h-3 w-3" /> {post.category || "General"}</span>
                      <span className="text-stone-400 font-light">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-stone-900 leading-snug group-hover:text-orange-600 transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-stone-600 font-light leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                  </div>

                  <div className="border-t border-stone-100 pt-4 flex items-center justify-between mt-4">
                    <span className="text-[10px] font-semibold text-stone-500">
                      {post.date}
                    </span>
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

          {/* Pagination Controls Bar */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-stone-100 text-xs">
              <span className="text-stone-500 font-light">
                Showing <strong className="font-semibold text-stone-900">{startIndex + 1}</strong> – <strong className="font-semibold text-stone-900">{Math.min(startIndex + POSTS_PER_PAGE, filteredPosts.length)}</strong> of <strong className="font-semibold text-stone-900">{filteredPosts.length}</strong> articles
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-8 w-8 rounded-full font-bold text-xs transition-all cursor-pointer ${
                        currentPage === page
                          ? "bg-orange-600 text-white shadow-sm"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold cursor-pointer"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-10 space-y-3 bg-stone-50 rounded-2xl border border-stone-200">
          <p className="text-base font-semibold text-stone-800">No articles found matching &quot;{searchQuery}&quot;</p>
          <p className="text-xs text-stone-500">Try searching for different keywords or select another category filter.</p>
        </div>
      )}
    </div>
  );
}
