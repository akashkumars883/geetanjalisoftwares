export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/diag/'],
    },
    sitemap: 'https://geetanjalisoftwares.com/sitemap.xml',
  }
}
