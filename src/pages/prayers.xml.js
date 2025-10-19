import rss from '@astrojs/rss';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { getCollection } from 'astro:content';

const markdownProcessorPromise = createMarkdownProcessor();

export async function GET(context) {
  const prayers = await getCollection('prayers');
  const markdownProcessor = await markdownProcessorPromise;

  const sortedPrayers = [...prayers].sort((a, b) => {
    const dateA = a.data.date?.getTime();
    const dateB = b.data.date?.getTime();

    if (dateA && dateB && dateA !== dateB) {
      return dateB - dateA;
    }

    if (dateA && !dateB) {
      return -1;
    }

    if (!dateA && dateB) {
      return 1;
    }

    return a.data.order - b.data.order;
  });

  const items = await Promise.all(
    sortedPrayers.map(async (prayer) => {
      const html = prayer.body
        ? (await markdownProcessor.render(prayer.body, {
            frontmatter: prayer.data,
          })).code
        : '';

      return {
        title: prayer.data.title,
        link: `/prayers/${prayer.slug}/`,
        pubDate: prayer.data.date ?? undefined,
        description: prayer.data.summary ?? prayer.data.subtitle,
        content: html,
      };
    }),
  );

  return rss({
    title: 'Kerygma Academy — Prayers',
    description: 'Original prayers for everyday moments and sacred seasons.',
    site: context.site,
    items,
  });
}
