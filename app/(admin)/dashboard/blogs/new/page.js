'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Type, Layout, Tag } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    category: '',
    author: 'Admin'
  });

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-');
  };

  const handleAIDraft = async () => {
    const topic = prompt("Enter the blog topic or keywords (e.g. 'Modern Web Design Trends 2026'):");
    if (!topic) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to generate content");
      }

      const data = await res.json();
      setFormData(prev => ({
        ...prev,
        title: data.title || prev.title || '',
        slug: generateSlug(data.title || prev.title || ''),
        excerpt: data.excerpt || prev.excerpt || '',
        content: data.content || prev.content || '',
        category: data.category || prev.category || ''
      }));
    } catch (error) {
      console.error("AI Error:", error);
      alert("Something went wrong with AI generation. Please check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        router.push('/dashboard/blogs');
        router.refresh();
      } else {
        const error = await res.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link 
          href="/dashboard/blogs" 
          className="inline-flex items-center gap-2 text-sm font-bold text-black/40 transition hover:text-black"
        >
          <ArrowLeft size={16} /> Back to Articles
        </Link>
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={handleAIDraft}
            disabled={loading || isGenerating}
            className="inline-flex items-center gap-2 rounded-xl bg-purple-500/10 px-6 py-3 text-sm font-bold text-purple-600 transition hover:bg-purple-500/20 disabled:opacity-50"
          >
            {isGenerating ? <Loader2 size={18} className="animate-spin" /> : '✨ AI Draft'} 
          </button>
          <button 
            onClick={handleSubmit}
            disabled={loading || isGenerating}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} 
            Publish Article
          </button>
        </div>
      </div>

      <form className="space-y-6 rounded-[32px] border border-black/5 bg-white p-6 lg:p-10 shadow-sm">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-black/30 flex items-center gap-2">
            <Type size={14} /> Blog Title
          </label>
          <input 
            type="text" 
            placeholder="Enter a catchy title..." 
            className="w-full rounded-2xl border border-black/5 bg-[#fcfcfc] px-5 py-4 text-lg font-bold text-black outline-none transition focus:border-orange-500/20 focus:ring-4 focus:ring-orange-500/5 placeholder:text-black/10"
            value={formData.title}
            onChange={handleTitleChange}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
           <div className="space-y-2">
             <label className="text-xs font-bold uppercase tracking-wider text-black/30 flex items-center gap-2">
               <Layout size={14} /> Slug (Unique URL)
             </label>
             <input 
               type="text" 
               placeholder="my-blog-post"
               className="w-full rounded-2xl border border-black/5 bg-[#fcfcfc] px-5 py-3 text-sm font-medium text-black outline-none transition focus:border-orange-500/20 focus:ring-4 focus:ring-orange-500/5"
               value={formData.slug}
               onChange={(e) => setFormData({...formData, slug: e.target.value})}
               required
             />
           </div>
           <div className="space-y-2">
             <label className="text-xs font-bold uppercase tracking-wider text-black/30 flex items-center gap-2">
               <Tag size={14} /> Category
             </label>
             <input 
               type="text" 
               placeholder="e.g. Website Design"
               className="w-full rounded-2xl border border-black/5 bg-[#fcfcfc] px-5 py-3 text-sm font-medium text-black outline-none transition focus:border-orange-500/20 focus:ring-4 focus:ring-orange-500/5 placeholder:text-black/10"
               value={formData.category}
               onChange={(e) => setFormData({...formData, category: e.target.value})}
             />
           </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-black/30 flex items-center gap-2">
            <ImageIcon size={14} /> Cover Image URL
          </label>
          <input 
            type="url" 
            placeholder="https://images.unsplash.com/your-image-url" 
            className="w-full rounded-2xl border border-black/5 bg-[#fcfcfc] px-5 py-3 text-sm font-medium text-black outline-none transition focus:border-orange-500/20 focus:ring-4 focus:ring-orange-500/5 placeholder:text-black/10"
            value={formData.image_url}
            onChange={(e) => setFormData({...formData, image_url: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-black/30 flex items-center gap-2">
            Excerpt (Short Summary)
          </label>
          <textarea 
            rows={2}
            placeholder="Write a brief summary to entice readers..." 
            className="w-full rounded-2xl border border-black/5 bg-[#fcfcfc] px-5 py-3 text-sm font-medium text-black outline-none transition focus:border-orange-500/20 focus:ring-4 focus:ring-orange-500/5 placeholder:text-black/10 resize-none"
            value={formData.excerpt}
            onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-black/30 flex items-center gap-2">
            Content Editor
          </label>
          <RichTextEditor 
            value={formData.content}
            onChange={(content) => setFormData({...formData, content})}
          />
        </div>
      </form>
    </div>
  );
}
