import { supabase } from '@/lib/supabase';
import { services } from '@/lib/services';

export default async function sitemap() {
  const baseUrl = 'https://www.geetanjalisoftwares.in';
  const studioUrl = 'https://studio.geetanjalisoftwares.in';

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
    '/pricing',
    '/tools',
    '/blogs',
    '/authors/akash',
    '/locations',
    '/careers',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  const studioEntry = {
    url: studioUrl,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  };

  // Programmatic Cities list for Multi-City Local SEO Indexing
  const targetCities = [
    'faridabad', 'delhi-ncr', 'delhi', 'noida', 'gurgaon'
  ];

  const locationUrls = targetCities.map((city) => ({
    url: `${baseUrl}/locations/${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Fetch all generated user websites from Supabase
  const { data: userWebsites } = await supabase
    .from('user_websites')
    .select('subdomain, updated_at, created_at');

  const userWebsiteUrls = (userWebsites || []).map((site) => ({
    url: `https://${site.subdomain}.geetanjalisoftwares.in`,
    lastModified: new Date(site.updated_at || site.created_at),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticUrls, studioEntry, ...serviceUrls, ...blogUrls, ...locationUrls, ...userWebsiteUrls];
}
