import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://kerygma.academy',
  integrations: [tailwind(), sitemap()],
  image: {
    service: {
      entrypoint: 'astro/assets/services/squoosh',
    },
  },
});
