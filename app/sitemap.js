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

  // Programmatic Cities list for Multi-City Local SEO Indexing
  const targetCities = [
    'patna', 'delhi', 'mumbai', 'bangalore', 'lucknow', 
    'jaipur', 'pune', 'noida', 'gurgaon', 'kolkata', 
    'chennai', 'hyderabad', 'ahmedabad', 'chandigarh', 
    'ranchi', 'bhopal', 'indore', 'kanpur', 'surat', 'guwahati'
  ];

  const locationUrls = targetCities.map((city) => ({
    url: `${baseUrl}/locations/${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticUrls, ...serviceUrls, ...blogUrls, ...locationUrls];
}
