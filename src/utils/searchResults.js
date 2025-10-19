import { cleanMarkdownToPlainText } from './cleanMarkdown.js';

/**
 * @typedef {Object} SearchResult
 * @property {string} title
 * @property {string} url
 * @property {'Poem' | 'Prayer'} type
 * @property {string} excerpt
 * @property {number} order
 */

/**
 * @typedef {Object} BuildSearchResultsOptions
 * @property {Array<import('astro:content').CollectionEntry<'poetry'>>} [poetryEntries]
 * @property {Array<import('astro:content').CollectionEntry<'prayers'>>} [prayersEntries]
 */

/**
 * @param {string} value
 * @returns {string}
 */
const createExcerpt = (value) => {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (!normalized) {
    return '';
  }
  return normalized.length > 180 ? `${normalized.slice(0, 177).trimEnd()}…` : normalized;
};

/**
 * @param {string | undefined | null} value
 * @param {string} normalizedQuery
 * @returns {boolean}
 */
const includesQuery = (value, normalizedQuery) =>
  typeof value === 'string' && value.toLowerCase().includes(normalizedQuery);

let getCollectionCache;

/**
 * @returns {Promise<import('astro:content').getCollection>}
 */
const loadGetCollection = async () => {
  if (!getCollectionCache) {
    const mod = await import('astro:content');
    getCollectionCache = mod.getCollection;
  }
  return getCollectionCache;
};

/**
 * @param {string} collection
 * @param {BuildSearchResultsOptions} options
 * @returns {Promise<Array<import('astro:content').CollectionEntry<any>>>}
 */
const resolveCollectionEntries = async (collection, options) => {
  const key = collection === 'poetry' ? 'poetryEntries' : 'prayersEntries';
  if (Object.prototype.hasOwnProperty.call(options, key)) {
    return options[key] ?? [];
  }

  const getCollection = await loadGetCollection();
  return getCollection(collection);
};

/**
 * @param {string} rawQuery
 * @param {BuildSearchResultsOptions} [options]
 * @returns {Promise<{ query: string; hasQuery: boolean; results: SearchResult[] }>}
 */
export const buildSearchResults = async (rawQuery, options = {}) => {
  const query = rawQuery.trim();
  const hasQuery = query.length > 0;

  if (!hasQuery) {
    return { query, hasQuery, results: [] };
  }

  const normalizedQuery = query.toLowerCase();
  const [poetryEntries, prayersEntries] = await Promise.all([
    resolveCollectionEntries('poetry', options),
    resolveCollectionEntries('prayers', options),
  ]);

  const poemResults = poetryEntries.flatMap((entry) => {
    const { title, stanzas, order } = entry.data;
    const lines = stanzas.flat();
    const fields = [title, ...lines];
    if (!fields.some((field) => includesQuery(field, normalizedQuery))) {
      return [];
    }

    const excerptSource = lines.join(' ');
    return [
      {
        title,
        url: `/poetry/${entry.slug}/`,
        type: 'Poem',
        excerpt: createExcerpt(excerptSource || title),
        order,
      },
    ];
  });

  const prayerResults = prayersEntries.flatMap((entry) => {
    const { title, subtitle, summary, tags, order } = entry.data;
    const tagLabels = tags.map((tag) => tag.label);
    const cleanedBody = cleanMarkdownToPlainText(entry.body);
    const fields = [title, subtitle, summary, ...tagLabels, cleanedBody];
    if (!fields.some((field) => includesQuery(field, normalizedQuery))) {
      return [];
    }

    const excerptSource = summary ?? subtitle ?? cleanedBody;
    return [
      {
        title,
        url: `/prayers/${entry.slug}/`,
        type: 'Prayer',
        excerpt: createExcerpt(excerptSource || title),
        order,
      },
    ];
  });

  const results = [...poemResults, ...prayerResults].sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }

    if (a.type !== b.type) {
      return a.type.localeCompare(b.type);
    }

    return a.title.localeCompare(b.title);
  });

  return { query, hasQuery, results };
};
