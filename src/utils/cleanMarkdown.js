/**
 * Convert Markdown text to plain text for search and excerpts.
 *
 * @param {string | null | undefined} value
 * @returns {string}
 */
export const cleanMarkdownToPlainText = (value) => {
  if (!value) {
    return '';
  }

  return value
    .replace(/!\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/^\s*>+\s?/gm, '')
    .replace(/^#+\s*/gm, '')
    .replace(/[*_`~]/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};
