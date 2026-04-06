export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/leads/', '/settings/', '/api/', '/diag/', '/login'],
    },
    sitemap: 'https://geetanjalisoftwares.com/sitemap.xml',
  }
}
