"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, Search, Trash2, Edit3, Eye, CheckCircle2, Clock } from "lucide-react";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch (err) {
      console.error("Error fetching admin blogs:", err);
    } finally {
      setLoading(false);
    }
  }

  // Toggle Published/Draft status
  async function togglePublishStatus(blog) {
    const newStatus = !blog.is_published;
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: blog.id, is_published: newStatus }),
      });
      if (res.ok) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === blog.id ? { ...b, is_published: newStatus } : b))
        );
      }
    } catch (err) {
      console.error("Error toggling publish status:", err);
    }
  }

  // Delete Blog Post
  async function handleDeleteBlog(id, title) {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert("Failed to delete blog post.");
      }
    } catch (err) {
      console.error("Error deleting blog post:", err);
    } finally {
      setDeletingId(null);
    }
  }

  const filteredBlogs = blogs.filter((b) =>
    (b.title + " " + b.category).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Blog Posts Management
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-light">
            Create, edit, toggle publish state, or delete articles from your database.
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-black text-white hover:bg-zinc-800 transition-all shrink-0 cursor-pointer"
        >
          <PlusCircle className="h-4 w-4" /> Create New Article
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-stone-200">
        <div className="relative flex-1">
          <Search className="h-4 w-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by article title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-black transition-colors"
          />
        </div>
        <div className="text-xs font-semibold text-stone-500 shrink-0">
          Total: <span className="text-stone-900 font-bold">{filteredBlogs.length}</span>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="text-center py-10 text-xs text-stone-500">Loading blog entries...</div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-10 space-y-3">
            <p className="text-sm text-stone-600 font-light">No articles match your search query.</p>
            <button
              onClick={() => setSearchTerm("")}
              className="text-xs font-bold text-orange-600 hover:underline"
            >
              Clear Search Filter
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-6">Image</th>
                  <th className="py-3.5 px-4">Title &amp; Slug</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-light text-stone-700">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-stone-50/70 transition-colors">
                    {/* Thumbnail */}
                    <td className="py-4 px-6">
                      <div className="h-12 w-16 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                        {blog.image_url ? (
                          <img
                            src={blog.image_url}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-stone-400">No Image</div>
                        )}
                      </div>
                    </td>

                    {/* Title & Slug */}
                    <td className="py-4 px-4 max-w-sm">
                      <div className="font-bold text-stone-900 text-sm line-clamp-1">{blog.title}</div>
                      <div className="text-[11px] text-stone-400 font-mono line-clamp-1">/blog/{blog.slug}</div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 font-semibold text-[10px]">
                        {blog.category || "Engineering"}
                      </span>
                    </td>

                    {/* Status Toggle Button */}
                    <td className="py-4 px-4">
                      <button
                        onClick={() => togglePublishStatus(blog)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                          blog.is_published !== false
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }`}
                        title="Click to toggle status"
                      >
                        {blog.is_published !== false ? (
                          <>
                            <CheckCircle2 className="h-3 w-3 text-green-600" /> Published
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3 text-amber-600" /> Draft
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
                          title="Preview Article on Live Site"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Link>

                        <Link
                          href={`/admin/blogs/edit/${blog.id}`}
                          className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
                          title="Edit Article"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </Link>

                        <button
                          onClick={() => handleDeleteBlog(blog.id, blog.title)}
                          disabled={deletingId === blog.id}
                          className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                          title="Delete Article"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
