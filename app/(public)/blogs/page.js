import React from 'react';
import { createClient } from '@supabase/supabase-js';
import BlogListing from '@/components/BlogListing';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const dynamic = "force-dynamic";

export const metadata = {
  title: 'Blog | Geetanjali Softwares',
  description: 'Insights, guides, and updates from the team at Geetanjali Softwares.',
};

export default async function BlogsPage() {
  const { data: blogs, error } = await supabaseAdmin
    .from('blogs')
    .select('*')
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
