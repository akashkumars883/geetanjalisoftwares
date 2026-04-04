'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Type, Layout, Tag, CheckCircle2 } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';

export default function EditBlogPage({ params }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    category: '',
    author: 'Admin',
    is_published: true
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const blog = await res.json();
        
        if (blog && !blog.error) {
          setFormData(blog);
        } else {
          console.error('Blog not found with ID:', id);
          alert('Error: Blog not found. Redirecting to dashboard.');
          router.push('/dashboard/blogs');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        alert('Failed to load article data.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
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
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center text-black/30 font-medium whitespace-nowrap">Loading Article Data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link 
          href="/dashboard/blogs" 
          className="inline-flex items-center gap-2 text-sm font-bold text-black/40 transition hover:text-black"
        >
          <ArrowLeft size={16} /> Back to Articles
        </Link>
        <button 
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} 
          Update Article
        </button>
      </div>

      <form className="space-y-6 rounded-[32px] border border-black/5 bg-white p-6 lg:p-10 shadow-sm transition-all">
        <div className="flex items-center justify-between mb-2">
           <label className="text-xs font-bold uppercase tracking-wider text-black/30 flex items-center gap-2">
            <Type size={14} /> Blog Title
           </label>
           <button 
             type="button"
             onClick={() => setFormData({...formData, is_published: !formData.is_published})}
             className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase transition ${
                formData.is_published 
                ? 'bg-green-100 text-green-600' 
                : 'bg-stone-100 text-black/40'
             }`}
           >
             <CheckCircle2 size={12} /> {formData.is_published ? 'Published' : 'Draft'}
           </button>
        </div>

        <input 
          type="text" 
          placeholder="Blog Title" 
          className="w-full rounded-2xl border border-black/5 bg-[#fcfcfc] px-5 py-4 text-lg font-bold text-black outline-none transition focus:border-orange-500/20 focus:ring-4 focus:ring-orange-500/5"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />

        <div className="grid md:grid-cols-2 gap-6">
           <div className="space-y-2">
             <label className="text-xs font-bold uppercase tracking-wider text-black/30 flex items-center gap-2">
               <Layout size={14} /> Slug (Unique URL)
             </label>
             <input 
               type="text" 
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
               className="w-full rounded-2xl border border-black/5 bg-[#fcfcfc] px-5 py-3 text-sm font-medium text-black outline-none transition focus:border-orange-500/20 focus:ring-4 focus:ring-orange-500/5"
               value={formData.category || ''}
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
            className="w-full rounded-2xl border border-black/5 bg-[#fcfcfc] px-5 py-3 text-sm font-medium text-black outline-none transition focus:border-orange-500/20 focus:ring-4 focus:ring-orange-500/5"
            value={formData.image_url || ''}
            onChange={(e) => setFormData({...formData, image_url: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-black/30 flex items-center gap-2">
            Excerpt (Short Summary)
          </label>
          <textarea 
            rows={2}
            className="w-full rounded-2xl border border-black/5 bg-[#fcfcfc] px-5 py-3 text-sm font-medium text-black outline-none transition focus:border-orange-500/20 focus:ring-4 focus:ring-orange-500/5 resize-none"
            value={formData.excerpt || ''}
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
