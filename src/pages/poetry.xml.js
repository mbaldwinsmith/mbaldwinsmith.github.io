import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const poems = await getCollection('poetry');
  return rss({
    title: 'Kerygma Academy — Poetry',
    description: 'New poems, reflections, and luminous craft',
    site: context.site,
    items: poems
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((p) => ({
        title: p.data.title,
        link: `/poetry/${p.slug}/`,
        pubDate: p.data.date,
      })),
  });
}
