export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/leads/', '/settings/', '/api/', '/diag/', '/login'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'Google-Extended'],
        allow: '/',
      }
    ],
    sitemap: 'https://www.geetanjalisoftwares.in/sitemap.xml',
  }
}
