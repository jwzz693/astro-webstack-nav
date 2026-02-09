import fs from 'fs';
import path from 'path';
import { parseStringPromise } from 'xml2js'; // Need to install xml2js or regex parse
// Let's use simple regex to avoid adding more deps if possible, or just add xml2js

const SITE_URL = process.env.SITE_URL || 'https://astro-webstack.demo';
const BAIDU_TOKEN = process.env.BAIDU_PUSH_TOKEN;

async function pushToBaidu(urls) {
  if (!BAIDU_TOKEN) {
    console.log('Baidu Token not found, skipping push.');
    return;
  }
  
  const api = `http://data.zz.baidu.com/urls?site=${SITE_URL}&token=${BAIDU_TOKEN}`;
  
  try {
    const response = await fetch(api, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: urls.join('\n')
    });
    const result = await response.json();
    console.log('Baidu Push Result:', result);
  } catch (e) {
    console.error('Baidu Push Error:', e);
  }
}

async function main() {
  // Read sitemap from dist (after build)
  const sitemapPath = path.resolve('dist/sitemap-0.xml');
  
  if (!fs.existsSync(sitemapPath)) {
    console.log('Sitemap not found at', sitemapPath);
    return;
  }

  const content = fs.readFileSync(sitemapPath, 'utf-8');
  const urls = content.match(/<loc>(.*?)<\/loc>/g)?.map(val => val.replace(/<\/?loc>/g, '')) || [];
  
  console.log(`Found ${urls.length} URLs`);
  
  if (urls.length > 0) {
    await pushToBaidu(urls);
  }
}

main();
