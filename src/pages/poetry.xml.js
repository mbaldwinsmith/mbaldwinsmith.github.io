import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const poems = await getCollection('poetry');
  const escapeHtml = (value = '') =>
    String(value).replace(/[&<>"']/g, (char) => {
      switch (char) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '"':
          return '&quot;';
        case "'":
          return '&#39;';
        default:
          return char;
      }
    });

  const renderStanza = (stanza) =>
    `<p>${stanza.map((line) => escapeHtml(line)).join('<br />')}</p>`;

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
        content: Array.isArray(p.data.stanzas)
          ? p.data.stanzas.map((stanza) => renderStanza(stanza)).join('\n')
          : undefined,
      })),
  });
}
