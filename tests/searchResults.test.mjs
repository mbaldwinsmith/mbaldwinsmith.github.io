import test from 'node:test';
import assert from 'node:assert/strict';

import { buildSearchResults } from '../src/utils/searchResults.ts';

const createPoemEntry = ({
  slug = 'poem-slug',
  title = 'Sample Poem',
  stanzas = [['Line one'], ['Line two']],
  order = 1,
} = {}) => ({
  slug,
  data: {
    title,
    stanzas,
    order,
  },
});

test('buildSearchResults matches mixed-case queries across poetry entries', async () => {
  const poetryEntries = [
    createPoemEntry({
      title: 'Morning Light',
      stanzas: [['The dawn breaks gently']],
      order: 2,
    }),
  ];

  const { query, hasQuery, results } = await buildSearchResults('  morNING  ', {
    poetryEntries,
    courseEntries: [],
    projectEntries: [],
  });

  assert.equal(query, 'morNING');
  assert.equal(hasQuery, true);
  assert.equal(results.length, 1);
  assert.equal(results[0].type, 'Poem');
  assert.equal(results[0].title, 'Morning Light');
});

test('buildSearchResults truncates long excerpts', async () => {
  const longLine = 'In the quiet hours we gather ';
  const stanzas = [
    [longLine.repeat(10)],
  ];
  const poetryEntries = [
    createPoemEntry({
      title: 'Gathering Song',
      stanzas,
    }),
  ];

  const { results } = await buildSearchResults('gather', {
    poetryEntries,
    courseEntries: [],
    projectEntries: [],
  });

  assert.equal(results.length, 1);
  const [result] = results;
  assert.ok(result.excerpt.endsWith('…'));
  assert.ok(result.excerpt.length <= 180);
});

test('buildSearchResults sorts results by order, type, then title', async () => {
  const poetryEntries = [
    createPoemEntry({
      slug: 'gamma',
      title: 'Gamma Poem',
      order: 5,
      stanzas: [['Tie breaker keyword']],
    }),
  ];
  const courseEntries = [
    { title: 'Alpha Course', url: 'https://example.com/alpha-course', sectionTitle: 'Formation' },
    { title: 'Beta Course', url: 'https://example.com/beta-course', sectionTitle: 'Formation' },
  ];
  const projectEntries = [
    {
      name: 'Alpha Project',
      subtitle: 'Keyword project',
      description: 'A project featuring the keyword throughout.',
      badges: [],
      highlights: [],
      image: {},
      primaryLink: { href: 'https://example.com/alpha-project', label: 'View project' },
      secondaryLink: undefined,
    },
  ];

  const { results } = await buildSearchResults('keyword', {
    poetryEntries,
    courseEntries,
    projectEntries,
  });

  assert.deepEqual(
    results.map((result) => result.title),
    ['Gamma Poem', 'Alpha Course', 'Beta Course', 'Alpha Project']
  );
});

test('buildSearchResults matches course section titles', async () => {
  const courseEntries = [
    { title: 'Christology', url: 'https://example.com/christology', sectionTitle: 'Doctrine' },
    { title: 'Ecclesiology', url: 'https://example.com/ecclesiology', sectionTitle: 'Ecclesiology (The Church)' },
  ];

  const { results } = await buildSearchResults('church', {
    poetryEntries: [],
    courseEntries,
    projectEntries: [],
  });

  assert.equal(results.length, 1);
  const [result] = results;
  assert.equal(result.type, 'Course');
  assert.equal(result.title, 'Ecclesiology');
  assert.ok(result.excerpt.includes('Ecclesiology'));
  assert.equal(result.url, 'https://example.com/ecclesiology');
});

test('buildSearchResults matches project highlights and links to primary URL', async () => {
  const projectEntries = [
    {
      name: 'Discernment App',
      subtitle: 'Track daily devotions',
      description: 'A project focused on daily examen prompts.',
      badges: [],
      highlights: ['Guided examen reflections', 'Community sharing'],
      image: {},
      primaryLink: { href: 'https://example.com/discernment-app', label: 'View project' },
      secondaryLink: { href: 'https://github.com/example/discernment-app', label: 'Browse source' },
    },
  ];

  const { results } = await buildSearchResults('examen', {
    poetryEntries: [],
    courseEntries: [],
    projectEntries,
  });

  assert.equal(results.length, 1);
  const [result] = results;
  assert.equal(result.type, 'Project');
  assert.equal(result.title, 'Discernment App');
  assert.equal(result.url, 'https://example.com/discernment-app');
  assert.ok(result.excerpt.includes('Track daily devotions'));
});
