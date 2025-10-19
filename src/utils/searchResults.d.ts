import type { CollectionEntry } from 'astro:content';

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

export declare const buildSearchResults: (
  rawQuery: string,
  options?: BuildSearchResultsOptions
) => Promise<{ query: string; hasQuery: boolean; results: SearchResult[] }>;
