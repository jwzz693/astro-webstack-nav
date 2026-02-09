import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
// import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://localhost',
  integrations: [
    tailwind(), 
    preact(), 
    sitemap()
  ]
});
