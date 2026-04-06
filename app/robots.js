export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/host/'],
    },
    sitemap: 'https://betandplayusa.com/sitemap.xml',
  };
}
