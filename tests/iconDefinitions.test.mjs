import test from 'node:test';
import assert from 'node:assert/strict';

import { iconNames } from '../src/data/icons.ts';
import { iconMap } from '../src/components/iconMap.ts';

test('every icon name has a corresponding definition', () => {
  for (const iconName of iconNames) {
    assert.ok(iconMap[iconName], `Icon "${iconName}" should have a Font Awesome definition`);
  }
});
