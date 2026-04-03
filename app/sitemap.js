import { supabase } from '@/lib/supabase';

export default async function sitemap() {
  const baseUrl = 'https://geetanjalisoftwares.com';

  // Fetch blogs from Supabase
  const { data: blogs } = await supabase
    .from('blogs')
    .select('slug, updated_at')
    .eq('status', 'published');

  const blogUrls = (blogs || []).map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog.updated_at),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const staticUrls = [
    '',
    '/about',
    '/services',
    '/contact',
    '/portfolio',
    '/blogs',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  return [...staticUrls, ...blogUrls];
}
