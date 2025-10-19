import type { CollectionEntry } from 'astro:content';

import type { Course } from '../data/courses.ts';
import type { Project } from '../data/projects.ts';

export type SearchResultType = 'Poem' | 'Course' | 'Project';

export type SearchResult = {
  title: string;
  url: string;
  type: SearchResultType;
  excerpt: string;
  order: number;
};

export type BuildSearchResultsOptions = {
  poetryEntries?: CollectionEntry<'poetry'>[];
  courseEntries?: Course[];
  projectEntries?: Project[];
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

let courseEntriesCache: Course[] | undefined;

const resolveCourseEntries = async (
  options: BuildSearchResultsOptions,
): Promise<Course[]> => {
  if (Object.prototype.hasOwnProperty.call(options, 'courseEntries')) {
    return options.courseEntries ?? [];
  }

  if (!courseEntriesCache) {
    const mod = await import('../data/courses.ts');
    courseEntriesCache = mod.allCourses;
  }

  return courseEntriesCache;
};

let projectEntriesCache: Project[] | undefined;

const resolveProjectEntries = async (
  options: BuildSearchResultsOptions,
): Promise<Project[]> => {
  if (Object.prototype.hasOwnProperty.call(options, 'projectEntries')) {
    return options.projectEntries ?? [];
  }

  if (!projectEntriesCache) {
    const mod = await import('../data/projects.ts');
    projectEntriesCache = mod.projects;
  }

  return projectEntriesCache;
};

const resolveCollectionEntries = async (
  options: BuildSearchResultsOptions,
): Promise<CollectionEntry<'poetry'>[]> => {
  if (Object.prototype.hasOwnProperty.call(options, 'poetryEntries')) {
    return options.poetryEntries ?? [];
  }

  const getCollection = await loadGetCollection();
  return getCollection('poetry');
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
  const [poetryEntries, courseEntries, projectEntries] = await Promise.all([
    resolveCollectionEntries(options),
    resolveCourseEntries(options),
    resolveProjectEntries(options),
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

  const courseResults = courseEntries.flatMap<SearchResult>((course, index) => {
    const fields = [course.title, course.sectionTitle];
    if (!fields.some((field) => includesQuery(field, normalizedQuery))) {
      return [];
    }

    return [
      {
        title: course.title,
        url: course.url,
        type: 'Course',
        excerpt: createExcerpt(`Part of the ${course.sectionTitle} learning path.`),
        order: index,
      },
    ];
  });

  const projectResults = projectEntries.flatMap<SearchResult>((project, index) => {
    const { name, subtitle, description, highlights, primaryLink, secondaryLink } = project;
    const fields = [
      name,
      subtitle,
      description,
      primaryLink?.label,
      secondaryLink?.label,
      ...(highlights ?? []),
    ];
    if (!fields.some((field) => includesQuery(field, normalizedQuery))) {
      return [];
    }

    const excerptSource = subtitle || description;
    const href = primaryLink?.href ?? '#';
    return [
      {
        title: name,
        url: href,
        type: 'Project',
        excerpt: createExcerpt(excerptSource || description),
        order: index,
      },
    ];
  });

  const typePriority: Record<SearchResultType, number> = {
    Poem: 0,
    Course: 1,
    Project: 2,
  };

  const results = [...poemResults, ...courseResults, ...projectResults].sort((a, b) => {
    if (a.type !== b.type) {
      return typePriority[a.type] - typePriority[b.type];
    }

    if (a.order !== b.order) {
      return a.order - b.order;
    }

    return a.title.localeCompare(b.title);
  });

  return { query, hasQuery, results };
};
