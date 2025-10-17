import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mbaldwinsmith.github.io',
  image: {
    service: {
      entrypoint: 'astro/assets/services/squoosh',
    },
  },
});
