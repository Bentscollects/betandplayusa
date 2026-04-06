export default function sitemap() {
  const baseUrl = 'https://betandplayusa.com';
  const states = ['ny', 'pa', 'nj', 'mi', 'il', 'oh', 'co', 'tn', 'va', 'az', 'ma', 'md', 'la', 'in', 'ia', 'ks', 'wv', 'wy', 'ct'];

  const staticPages = [
    { url: baseUrl, changeFrequency: 'daily', priority: 1 },
    { url: baseUrl + '/sportsbooks', changeFrequency: 'daily', priority: 0.9 },
    { url: baseUrl + '/sweepstakes', changeFrequency: 'weekly', priority: 0.8 },
    { url: baseUrl + '/casino', changeFrequency: 'weekly', priority: 0.8 },
    { url: baseUrl + '/dfs', changeFrequency: 'weekly', priority: 0.8 },
    { url: baseUrl + '/join', changeFrequency: 'weekly', priority: 0.9 },
    { url: baseUrl + '/activate', changeFrequency: 'weekly', priority: 0.9 },
    { url: baseUrl + '/privacy', changeFrequency: 'monthly', priority: 0.3 },
    { url: baseUrl + '/terms', changeFrequency: 'monthly', priority: 0.3 },
    { url: baseUrl + '/cookies', changeFrequency: 'monthly', priority: 0.3 },
    { url: baseUrl + '/responsible-gambling', changeFrequency: 'monthly', priority: 0.4 },
  ];

  const statePages = states.map(function(state) {
    return { url: baseUrl + '/states/' + state, changeFrequency: 'weekly', priority: 0.7 };
  });

  return [...staticPages, ...statePages];
}
