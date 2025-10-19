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

const createPrayerEntry = ({
  slug = 'prayer-slug',
  title = 'Sample Prayer',
  subtitle = 'Subtitle',
  summary = 'Summary',
  tags = [],
  order = 1,
  body = 'Body content',
} = {}) => ({
  slug,
  body,
  data: {
    title,
    subtitle,
    summary,
    tags,
    order,
  },
});

test('buildSearchResults matches mixed-case queries across poetry and prayers', async () => {
  const poetryEntries = [
    createPoemEntry({
      title: 'Morning Light',
      stanzas: [['The dawn breaks gently']],
      order: 2,
    }),
  ];
  const prayersEntries = [
    createPrayerEntry({
      title: 'Evening Prayer',
      summary: 'A reflection on morning mercies',
      order: 1,
      tags: [{ label: 'Devotion' }],
    }),
  ];

  const { query, hasQuery, results } = await buildSearchResults('  morNING  ', {
    poetryEntries,
    prayersEntries,
  });

  assert.equal(query, 'morNING');
  assert.equal(hasQuery, true);
  assert.equal(results.length, 2);
  assert.deepEqual(
    results.map((result) => result.type),
    ['Prayer', 'Poem']
  );
});

test('buildSearchResults matches prayer tag labels', async () => {
  const prayersEntries = [
    createPrayerEntry({
      title: 'Litany of Hope',
      summary: '',
      subtitle: '',
      body: 'Content without the keyword',
      tags: [{ label: 'Pilgrimage' }, { label: 'Compassion' }],
    }),
  ];

  const { results } = await buildSearchResults('compassion', {
    poetryEntries: [],
    prayersEntries,
  });

  assert.equal(results.length, 1);
  assert.equal(results[0].title, 'Litany of Hope');
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
    prayersEntries: [],
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
  const prayersEntries = [
    createPrayerEntry({
      slug: 'alpha',
      title: 'Alpha Prayer',
      order: 5,
      summary: 'Tie breaker keyword summary',
    }),
    createPrayerEntry({
      slug: 'beta',
      title: 'Beta Prayer',
      order: 5,
      summary: 'Tie breaker keyword summary',
    }),
  ];

  const { results } = await buildSearchResults('keyword', {
    poetryEntries,
    prayersEntries,
  });

  assert.deepEqual(
    results.map((result) => result.title),
    ['Gamma Poem', 'Alpha Prayer', 'Beta Prayer']
  );
});
