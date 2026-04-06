'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, ExternalLink, Calendar, Tag, Sparkles, RefreshCcw, ArrowRight } from 'lucide-react';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiTopic, setAiTopic] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const fetchAiTopic = async () => {
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai/blog-topics');
      const data = await res.json();
      setAiTopic(data);
    } catch (e) {
      console.error("AI Error:", e);
    } finally {
      setIsAiLoading(false);
    }
  };

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
    fetchAiTopic();
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
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-black tracking-tight">Article Hub</h2>
          <p className="text-black/40 text-sm mt-1">Design, deliver, and distribute your content across the web.</p>
        </div>
        <Link 
          href="/dashboard/blogs/new" 
          className="inline-flex items-center gap-2 rounded-2xl bg-black px-8 py-4 text-sm font-bold text-white shadow-2xl shadow-black/20 transition hover:scale-105 active:scale-95"
        >
          <Plus size={18} /> Add New Article
        </Link>
      </div>

      {/* AI Daily Suggester */}
      <div className="relative rounded-[40px] bg-gradient-to-br from-orange-500/10 via-white to-purple-500/10 p-1 border border-white shadow-xl shadow-black/[0.02] overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-[100px] opacity-[0.03] select-none pointer-events-none group-hover:scale-110 transition-transform duration-700">✍️</div>
        
        <div className="bg-white/40 backdrop-blur-3xl rounded-[38px] p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/50">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600 border border-orange-500/10">
                <Sparkles size={12} className="animate-pulse" /> Daily AI Trending
              </span>
              {aiTopic?.category && (
                <span className="text-[10px] font-bold text-black/20 uppercase tracking-[0.2em]">{aiTopic.category}</span>
              )}
            </div>
            
            {isAiLoading ? (
               <div className="space-y-3">
                 <div className="h-8 w-64 animate-pulse bg-black/5 rounded-lg" />
                 <div className="h-4 w-96 animate-pulse bg-black/5 rounded-md" />
               </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <h3 className="text-2xl font-bold tracking-tight text-black leading-tight selection:bg-orange-500/20 italic">
                  "{aiTopic?.title || 'Loading next big thing...'}"
                </h3>
                <p className="text-sm text-black/50 mt-2 font-medium">
                  {aiTopic?.description || 'AI is searching for high-traffic trends for your agency...'}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 shrink-0">
             <button 
               onClick={fetchAiTopic}
               disabled={isAiLoading}
               className="h-14 w-14 flex items-center justify-center rounded-2xl bg-white border border-black/5 text-black/40 hover:text-orange-600 hover:border-orange-500/20 active:scale-90 transition-all duration-300 disabled:opacity-50"
             >
               <RefreshCcw size={20} className={isAiLoading ? 'animate-spin' : ''} />
             </button>
             <Link
               href={`/dashboard/blogs/new?title=${encodeURIComponent(aiTopic?.title || '')}`}
               className="h-14 px-8 flex items-center gap-3 rounded-2xl bg-orange-500 text-white font-bold text-sm shadow-xl shadow-orange-500/20 hover:bg-orange-600 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
             >
               Start Posting <ArrowRight size={18} />
             </Link>
          </div>
        </div>
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
                     <img src={blog.image_url} alt={blog.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
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
                    <span suppressHydrationWarning={true} className="text-[10px] font-medium text-black/30 flex items-center gap-1">
                       <Calendar size={10} /> {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-bold text-black group-hover:text-orange-600 transition">{blog.title}</h3>
                  <p className="text-xs text-black/40 line-clamp-1 max-w-md">{blog.excerpt || 'No excerpt provided...'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 relative z-10">
                <Link 
                  href={`/blogs/${blog.slug}`} 
                  target="_blank"
                  className="rounded-xl p-2.5 text-black/40 transition hover:bg-black/5 hover:text-black focus:ring-2 focus:ring-orange-500/20 outline-none"
                  title="View Live"
                >
                  <ExternalLink size={18} />
                </Link>
                <Link 
                  href={`/dashboard/blogs/${blog.id}/edit`} 
                  className="rounded-xl p-2.5 text-black/40 transition hover:bg-black/5 hover:text-orange-600 focus:ring-2 focus:ring-orange-500/20 outline-none"
                  title="Edit Blog"
                >
                  <Edit2 size={18} />
                </Link>
                <button 
                  onClick={() => {
                    console.log('Deleting blog with ID:', blog.id);
                    handleDelete(blog.id);
                  }}
                  className="rounded-xl p-2.5 text-black/40 transition hover:bg-red-500/10 hover:text-red-600 focus:ring-2 focus:ring-red-500/20 outline-none"
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
