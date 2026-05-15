import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Expand share.google URLs so Apify actor recognizes the search format
    let startUrlForApify = url;
    if (url.includes('share.google')) {
      try {
        const r1 = await fetch(url, { redirect: 'manual', headers: { 'User-Agent': 'Mozilla/5.0' } });
        const loc1 = r1.headers.get('location');
        if (loc1) {
          const r2 = await fetch(loc1, { redirect: 'manual', headers: { 'User-Agent': 'Mozilla/5.0' } });
          const loc2 = r2.headers.get('location');
          if (loc2 && loc2.includes('q=')) {
            const matchQ = new URL(loc2).searchParams.get('q');
            if (matchQ) {
              startUrlForApify = `https://www.google.com/maps/search/${encodeURIComponent(matchQ)}`;
            }
          }
        }
      } catch (e) {
        console.error('URL Expand Error:', e);
      }
    }

    // ==========================================
    // APIFY INTEGRATION: Google Maps Scraper
    // ==========================================
    const APIFY_TOKEN = process.env.APIFY_API_TOKEN; 

    if (APIFY_TOKEN) {
      const apifyEndpoint = `https://api.apify.com/v2/acts/compass~crawler-google-places/run-sync-get-dataset-items?token=${APIFY_TOKEN}`;
      
      const apifyResponse = await fetch(apifyEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startUrls: [{ url: startUrlForApify }],
          maxCrawledPlacesPerSearch: 1,
          language: "en",
          scrapeReviewerUrl: false
        })
      });

      const items = await apifyResponse.json();

      if (items && items.length > 0) {
        const item = items[0];
        return NextResponse.json({
          success: true,
          businessName: item.title || item.searchString || '',
          phone: item.phone || item.phoneUnformatted || '',
          address: item.address || item.street || '',
          category: item.categoryName || 'Professional Studio',
          rating: item.totalScore || '4.8',
          scrapedUrl: startUrlForApify
        });
      }
    }

    // ========================================================
    // NATIVE DIRECT SCRAPE FALLBACK
    // ========================================================
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    };

    const response = await fetch(startUrlForApify, { method: 'GET', headers, redirect: 'follow' });
    const finalUrl = decodeURIComponent(response.url);
    const html = await response.text();

    let businessName = '';
    let phone = '';
    let address = '';
    let category = 'Professional Studio';
    let rating = '4.8';

    if (finalUrl.includes('/place/')) {
      const slug = finalUrl.split(/\/place\//i)[1].split('/')[0].split('?')[0];
      businessName = slug.replace(/\+/g, ' ').replace(/-/g, ' ');
    } else if (finalUrl.includes('/search/')) {
      const slug = finalUrl.split(/\/search\//i)[1].split('/')[0].split('?')[0];
      businessName = slug.replace(/\+/g, ' ').replace(/-/g, ' ');
    }

    const ogTitleMatch = html.match(/<meta property="og:title" content="([^"]+)"/i);
    if (ogTitleMatch && ogTitleMatch[1]) {
      const metaText = ogTitleMatch[1];
      if (!businessName || metaText.includes('·')) {
        businessName = metaText.split('·')[0].trim();
      }
      if (metaText.includes('·')) {
        address = metaText.split('·')[1].trim();
      }
    }

    businessName = businessName.replace(/\?.*$/, '').replace(/#.*$/, '');

    const phoneRegex = /(?:(?:\+|0{0,2})91[\s-]?)?([6789]\d{9})/g;
    const matches = [...html.matchAll(phoneRegex)];
    if (matches.length > 0) {
      phone = '91' + matches[0][1];
    }

    return NextResponse.json({
      success: true,
      businessName: businessName || 'My Business',
      phone: phone || '',
      address: address || '',
      category,
      rating,
      scrapedUrl: finalUrl
    });

  } catch (error) {
    console.error('Scraping Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to scrape profile', details: error.message },
      { status: 500 }
    );
  }
}
