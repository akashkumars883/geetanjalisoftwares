'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, ExternalLink, Calendar, Tag } from 'lucide-react';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      } else {
        alert('Failed to delete blog');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center text-black/30 font-medium">Loading Blogs...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black tracking-tight">Article Management</h2>
          <p className="text-black/40 text-sm">Create, edit, and manage your website blogs.</p>
        </div>
        <Link 
          href="/dashboard/blogs/new" 
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-600 active:scale-95"
        >
          <Plus size={18} /> New Article
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-[32px] border border-dashed border-black/10 bg-black/[0.01] text-black/30">
          <p className="font-medium">No articles found.</p>
          <p className="text-xs">Get started by creating your first blog post.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="group relative flex items-center justify-between rounded-3xl border border-black/5 bg-white p-5 transition hover:border-orange-500/20 hover:shadow-xl hover:shadow-black/5">
              <div className="flex items-center gap-5">
                <div className="h-16 w-16 overflow-hidden rounded-2xl bg-black/5">
                   {blog.image_url ? (
                     <img src={blog.image_url} alt={blog.title} className="h-full w-full object-cover" />
                   ) : (
                     <div className="flex h-full w-full items-center justify-center text-black/10">
                        <Tag size={24} />
                     </div>
                   )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange-600">
                      {blog.category || 'General'}
                    </span>
                    <span className="text-[10px] font-medium text-black/30 flex items-center gap-1">
                       <Calendar size={10} /> {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-bold text-black group-hover:text-orange-600 transition">{blog.title}</h3>
                  <p className="text-xs text-black/40 line-clamp-1 max-w-md">{blog.excerpt || 'No excerpt provided...'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Link 
                  href={`/blogs/${blog.slug}`} 
                  target="_blank"
                  className="rounded-xl p-2.5 text-black/40 transition hover:bg-black/5 hover:text-black"
                  title="View Live"
                >
                  <ExternalLink size={18} />
                </Link>
                <Link 
                  href={`/dashboard/blogs/${blog.id}/edit`} 
                  className="rounded-xl p-2.5 text-black/40 transition hover:bg-black/5 hover:text-orange-600"
                  title="Edit Blog"
                >
                  <Edit2 size={18} />
                </Link>
                <button 
                  onClick={() => handleDelete(blog.id)}
                  className="rounded-xl p-2.5 text-black/40 transition hover:bg-red-500/10 hover:text-red-600"
                  title="Delete Blog"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
