import React from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Calendar, ArrowLeft, Share2, Globe, MessageCircle } from 'lucide-react';

export const dynamic = "force-dynamic";

// Use a privileged client since this is a server component
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data: blog } = await supabaseAdmin
    .from('blogs')
    .select('title, excerpt')
    .eq('slug', slug)
    .single();

  if (!blog) return { title: 'Blog Not Found' };

  return {
    title: `${blog.title} | Geetanjali Softwares`,
    description: blog.excerpt || 'Read the full article on Geetanjali Softwares.',
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  const { data: blog, error } = await supabaseAdmin
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !blog) {
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold text-black">Article Not Found</h1>
        <p className="text-black/40 text-lg">The article you're looking for might have been removed or moved.</p>
        <Link 
          href="/blogs" 
          className="rounded-xl bg-orange-500 px-8 py-3 font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-600"
        >
          Back to Insights
        </Link>
      </div>
    );
  }

  return (
    <article className="py-12 sm:py-20 max-w-4xl mx-auto">
      <Link 
        href="/blogs" 
        className="inline-flex items-center gap-2 text-sm font-bold text-black/40 transition hover:text-black mb-12 group"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Back to Insights
      </Link>

      <div className="space-y-6 mb-12">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-orange-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-600">
            {blog.category || 'Insights'}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-black/30 flex items-center gap-1.5">
            <Calendar size={12} /> {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl leading-[1.1]">
          {blog.title}
        </h1>
        <div className="flex items-center gap-3 pt-4 border-t border-black/5">
           <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm">
             {blog.author?.charAt(0) || 'A'}
           </div>
           <div>
              <p className="text-sm font-bold text-black leading-none">{blog.author || 'Admin'}</p>
              <p className="text-[10px] font-bold text-black/30 uppercase tracking-wider mt-1">Lead Architect & Writer</p>
           </div>
        </div>
      </div>

      {blog.image_url && (
        <div className="relative aspect-video overflow-hidden rounded-[40px] border border-black/5 mb-16 shadow-2xl shadow-black/5">
          <img 
            src={blog.image_url} 
            alt={blog.title} 
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_80px] gap-12">
        <div 
          className="prose prose-orange prose-lg max-w-none text-black/80"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="hidden lg:flex flex-col gap-6 sticky top-32 h-fit">
           <div className="text-[10px] font-bold uppercase tracking-wider text-black/30 mb-2">Share</div>
           <button className="h-12 w-12 rounded-2xl border border-black/5 bg-white flex items-center justify-center text-black/40 transition hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/30">
              <MessageCircle size={20} />
           </button>
           <button className="h-12 w-12 rounded-2xl border border-black/5 bg-white flex items-center justify-center text-black/40 transition hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/30">
              <Globe size={20} />
           </button>
           <button className="h-12 w-12 rounded-2xl border border-black/5 bg-white flex items-center justify-center text-black/40 transition hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/30">
              <Share2 size={20} />
           </button>
        </div>
      </div>

      <div className="mt-20 pt-10 border-t border-black/5 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-black/30">Tags:</span>
            <span className="rounded-full bg-stone-100 px-3 py-1 text-[10px] font-bold text-black/50">{blog.category || 'General'}</span>
            <span className="rounded-full bg-stone-100 px-3 py-1 text-[10px] font-bold text-black/50">Insights</span>
         </div>
         <Link 
           href="/blogs"
           className="text-sm font-bold text-orange-500 hover:underline"
         >
           View more articles
         </Link>
      </div>
    </article>
  );
}
