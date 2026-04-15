import { supabase } from '@/lib/supabase';
import { services } from '@/lib/services';

export default async function sitemap() {
  const baseUrl = 'https://www.geetanjalisoftwares.in';

  // Fetch blogs from Supabase
  const { data: blogs } = await supabase
    .from('blogs')
    .select('slug, updated_at, created_at')
    .eq('is_published', true);

  const blogUrls = (blogs || []).map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog.updated_at || blog.created_at),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // Map services to URLs
  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const staticUrls = [
    '',
    '/about',
    '/services',
    '/contact',
    '/portfolio',
    '/blogs',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  return [...staticUrls, ...serviceUrls, ...blogUrls];
}
