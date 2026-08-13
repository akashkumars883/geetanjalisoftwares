"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Inbox, PlusCircle, ArrowUpRight, Sparkles, CheckCircle2, Clock } from "lucide-react";

export default function AdminDashboardPage() {
  const [blogs, setBlogs] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAdminData() {
      try {
        const [blogsRes, inquiriesRes] = await Promise.all([
          fetch("/api/admin/blogs"),
          fetch("/api/contact"),
        ]);

        const blogsData = await blogsRes.json();
        const inquiriesData = await inquiriesRes.json();

        setBlogs(blogsData.blogs || []);
        setInquiries(inquiriesData.inquiries || []);
      } catch (err) {
        console.error("Error loading admin dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAdminData();
  }, []);

  const publishedCount = blogs.filter((b) => b.is_published !== false).length;
  const draftCount = blogs.length - publishedCount;

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-8 rounded-xl border border-stone-200">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-600/10 text-orange-600 font-bold text-[10px] uppercase tracking-wider">
            <Sparkles className="h-3 w-3" /> Dashboard Overview
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Welcome to Admin Management
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-light">
            Manage your blog posts, track client lead inquiries, and monitor website content.
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-black text-white hover:bg-zinc-800 transition-all shrink-0"
        >
          <PlusCircle className="h-4 w-4" /> Write New Article
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl bg-white border border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Total Articles</span>
            <div className="h-9 w-9 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-stone-900 tracking-tight">
            {loading ? "..." : blogs.length}
          </div>
          <p className="text-xs text-stone-500 font-light">Total articles in database</p>
        </div>

        <div className="p-6 rounded-xl bg-white border border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Published Blogs</span>
            <div className="h-9 w-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-stone-900 tracking-tight">
            {loading ? "..." : publishedCount}
          </div>
          <p className="text-xs text-stone-500 font-light">Live on website sitemap &amp; blog page</p>
        </div>

        <div className="p-6 rounded-xl bg-white border border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Draft Articles</span>
            <div className="h-9 w-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-stone-900 tracking-tight">
            {loading ? "..." : draftCount}
          </div>
          <p className="text-xs text-stone-500 font-light">Unpublished drafts</p>
        </div>

        <div className="p-6 rounded-xl bg-white border border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Lead Inquiries</span>
            <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Inbox className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-stone-900 tracking-tight">
            {loading ? "..." : inquiries.length}
          </div>
          <p className="text-xs text-stone-500 font-light">Submitted client inquiries</p>
        </div>
      </div>

      {/* Recent Blogs Section */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Recent Blog Posts</h2>
            <p className="text-xs text-stone-500 font-light">Manage your latest published articles and drafts.</p>
          </div>
          <Link
            href="/admin/blogs"
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            View All ({blogs.length}) <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-10 text-xs text-stone-500">Loading blog entries...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-10 space-y-3">
            <p className="text-sm text-stone-600">No blog posts found in database.</p>
            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-black text-white"
            >
              Create Your First Blog Post
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-100 text-stone-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="pb-3 pr-4">Article Title</th>
                  <th className="pb-3 px-4">Category</th>
                  <th className="pb-3 px-4">Status</th>
                  <th className="pb-3 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-light text-stone-700">
                {blogs.slice(0, 5).map((blog) => (
                  <tr key={blog.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3.5 pr-4 font-semibold text-stone-900 line-clamp-1 max-w-md">
                      {blog.title}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 font-semibold text-[10px]">
                        {blog.category || "Engineering"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {blog.is_published !== false ? (
                        <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-800 font-bold text-[10px]">
                          Published
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 pl-4 text-right">
                      <Link
                        href={`/admin/blogs/edit/${blog.id}`}
                        className="text-orange-600 hover:text-orange-700 font-bold text-xs"
                      >
                        Edit
                      </Link>
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
