import test from 'node:test';
import assert from 'node:assert/strict';

import {
  evaluateCourseGroups,
  matchesSearch,
  normalizeCategory,
  normalizeSearchTerm,
} from '../src/utils/courseFilters.js';

test('normalizeCategory normalizes diacritics, punctuation, and casing', () => {
  assert.equal(normalizeCategory('  Líturgy & Music  '), 'liturgy-music');
  assert.equal(normalizeCategory('All'), 'all');
  assert.equal(normalizeCategory('Scripture 101'), 'scripture-101');
  assert.equal(normalizeCategory(null), '');
});

test('matchesSearch performs case-insensitive comparisons', () => {
  const normalizedTerm = normalizeSearchTerm('  Gospel  ');
  assert.equal(matchesSearch('Gospel of John', normalizedTerm), true);
  assert.equal(matchesSearch('Acts of the Apostles', normalizedTerm), false);
  assert.equal(matchesSearch('Any text', ''), true);
});

test('evaluateCourseGroups counts visible items across filters', () => {
  const groups = [
    {
      category: 'apologetics',
      items: [
        { text: 'Faith and Reason' },
        { text: 'Defending the Eucharist' },
      ],
    },
    {
      category: 'scripture',
      items: [
        { text: 'Gospel of John' },
        { text: 'Acts of the Apostles' },
      ],
    },
  ];

  const categoryResult = evaluateCourseGroups(groups, 'faith', 'apologetics');
  assert.equal(categoryResult.totalVisible, 1);
  assert.equal(categoryResult.groups[0].visibleCount, 1);
  assert.deepEqual(categoryResult.groups[0].itemVisibilities, [true, false]);
  assert.equal(categoryResult.groups[1].matchesCategory, false);
  assert.deepEqual(categoryResult.groups[1].itemVisibilities, [false, false]);

  const allResult = evaluateCourseGroups(groups, '', 'all');
  assert.equal(allResult.totalVisible, 4);
  assert.deepEqual(
    allResult.groups.map((group) => group.visibleCount),
    [2, 2],
  );
  assert.ok(allResult.groups.every((group) => group.matchesCategory));
});
