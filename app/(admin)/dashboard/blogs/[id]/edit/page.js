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
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    category: '',
    author: 'Admin',
    is_published: true,
    tags: []
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Upload failed');
      }

      const { url } = await res.json();
      setFormData(prev => ({ ...prev, image_url: url }));
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

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
    
    // Basic validation
    if (!formData.title || !formData.slug || !formData.content) {
      alert('Please fill in the Title, Slug, and Content before updating.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const contentType = res.headers.get('content-type');
      if (res.ok) {
        router.push('/dashboard/blogs');
        router.refresh();
      } else {
        let errorMessage = 'An error occurred';
        if (contentType && contentType.includes('application/json')) {
          const errorData = await res.json();
          errorMessage = errorData.error || errorMessage;
        } else {
          const textError = await res.text();
          errorMessage = `Server Error (${res.status}): ${textError.slice(0, 100)}...`;
        }
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert(`An unexpected error occurred: ${error.message}`);
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
         </div>

         <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-black/30 flex items-center gap-2">
                <Tag size={14} /> Category
              </label>
              <input 
                type="text" 
                placeholder="Business, Tech, etc."
                className="w-full rounded-2xl border border-black/5 bg-[#fcfcfc] px-5 py-3 text-sm font-medium text-black outline-none transition focus:border-orange-500/20 focus:ring-4 focus:ring-orange-500/5"
                value={formData.category || ''}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-black/30 flex items-center gap-2">
                <Tag size={14} /> Tags (Comma separated)
              </label>
              <input 
                type="text" 
                placeholder="web-design, seo, branding"
                className="w-full rounded-2xl border border-black/5 bg-[#fcfcfc] px-5 py-3 text-sm font-medium text-black outline-none transition focus:border-orange-500/20 focus:ring-4 focus:ring-orange-500/5"
                value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags || ''}
                onChange={(e) => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t !== '')})}
              />
            </div>
         </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-black/30 flex items-center gap-2">
            <ImageIcon size={14} /> Blog Cover Image
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
             <input 
               type="url" 
               placeholder="Paste image URL (Unsplash, etc.)"
               className="flex-1 rounded-2xl border border-black/5 bg-[#fcfcfc] px-5 py-3 text-sm font-medium text-black outline-none transition focus:border-orange-500/20 focus:ring-4 focus:ring-orange-500/5"
               value={formData.image_url || ''}
               onChange={(e) => setFormData({...formData, image_url: e.target.value})}
             />
             <div className="relative">
                <input 
                  type="file" 
                  id="image-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
                <label 
                  htmlFor="image-upload"
                  className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold transition cursor-pointer whitespace-nowrap justify-center w-full sm:w-auto ${
                    isUploading 
                    ? 'bg-black/5 text-black/20 cursor-not-allowed' 
                    : 'bg-black text-white hover:bg-orange-600'
                  }`}
                >
                  {isUploading ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
                  {isUploading ? 'Uploading...' : 'Computer Upload'}
                </label>
             </div>
          </div>
          {formData.image_url && (
            <div className="mt-4 relative aspect-[21/9] rounded-2xl overflow-hidden border border-black/5 bg-stone-50 group">
              <img 
                src={formData.image_url} 
                alt="Preview" 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-xs font-bold text-red-400 bg-red-50 uppercase tracking-wider">Invalid Image URL</div>';
                }}
              />
              <button 
                type="button"
                onClick={() => setFormData({...formData, image_url: ''})}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition hover:bg-red-500 shadow-xl"
              >
                ✕
              </button>
            </div>
          )}
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
            onChange={(val) => setFormData({...formData, content: val})}
          />
        </div>
      </form>
    </div>
  );
}
