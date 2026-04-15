export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/leads/', '/settings/', '/api/', '/diag/', '/login'],
    },
    sitemap: 'https://www.geetanjalisoftwares.in/sitemap.xml',
  }
}
