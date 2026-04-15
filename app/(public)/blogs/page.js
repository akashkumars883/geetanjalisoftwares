import React from 'react';
import { createClient } from '@supabase/supabase-js';
import BlogListing from '@/components/BlogListing';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: 'Insights & Guides | Geetanjali Softwares Blog',
  description: 'Expert guides on web development, SEO strategies, and digital growth from the Geetanjali Softwares team.',
  openGraph: {
    title: 'Geetanjali Softwares Blog | Digital Growth Insights',
    description: 'Master web development and SEO with our expert guides.',
    images: ['https://www.geetanjalisoftwares.in/icon.png'],
  }
};

export default async function BlogsPage() {
  const { data: blogs, error } = await supabaseAdmin
    .from('blogs')
    .select('id, title, slug, image_url, created_at, category, excerpt, author')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase error:', error);
  }

  return (
    <div className="pt-0 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <BlogListing blogs={blogs || []} />
    </div>
  );
}
