import type { CollectionEntry } from 'astro:content';

import { cleanMarkdownToPlainText } from './cleanMarkdown.js';

export type SearchResult = {
  title: string;
  url: string;
  type: 'Poem' | 'Prayer';
  excerpt: string;
  order: number;
};

export type BuildSearchResultsOptions = {
  poetryEntries?: CollectionEntry<'poetry'>[];
  prayersEntries?: CollectionEntry<'prayers'>[];
};

const createExcerpt = (value: string): string => {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (!normalized) {
    return '';
  }
  return normalized.length > 180 ? `${normalized.slice(0, 177).trimEnd()}…` : normalized;
};

const includesQuery = (
  value: string | undefined | null,
  normalizedQuery: string,
): value is string => typeof value === 'string' && value.toLowerCase().includes(normalizedQuery);

type GetCollection = typeof import('astro:content')['getCollection'];

let getCollectionCache: GetCollection | undefined;

const loadGetCollection = async (): Promise<GetCollection> => {
  if (!getCollectionCache) {
    const mod = await import('astro:content');
    getCollectionCache = mod.getCollection;
  }
  return getCollectionCache;
};

const resolveCollectionEntries = async <TCollection extends 'poetry' | 'prayers'>(
  collection: TCollection,
  options: BuildSearchResultsOptions,
): Promise<CollectionEntry<TCollection>[]> => {
  if (collection === 'poetry') {
    if (Object.prototype.hasOwnProperty.call(options, 'poetryEntries')) {
      return (options.poetryEntries ?? []) as CollectionEntry<TCollection>[];
    }
  } else if (Object.prototype.hasOwnProperty.call(options, 'prayersEntries')) {
    return (options.prayersEntries ?? []) as CollectionEntry<TCollection>[];
  }

  const getCollection = await loadGetCollection();
  return getCollection(collection);
};

export const buildSearchResults = async (
  rawQuery: string,
  options: BuildSearchResultsOptions = {},
): Promise<{ query: string; hasQuery: boolean; results: SearchResult[] }> => {
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

  const poemResults = poetryEntries.flatMap<SearchResult>((entry) => {
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

  const prayerResults = prayersEntries.flatMap<SearchResult>((entry) => {
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
