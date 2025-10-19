import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

import { createPrayersSchema } from '../src/content/schemas/prayers';

const prayersSchema = createPrayersSchema(z);

test('prayers schema rejects invalid icon values', () => {
  const result = prayersSchema.safeParse({
    title: 'Test Prayer',
    subtitle: 'Testing invalid icon handling',
    order: 1,
    tags: [
      {
        icon: 'not-a-real-icon',
        label: 'Invalid icon',
      },
    ],
  });

  assert.equal(result.success, false);
  assert.ok(result.error, 'Expected validation to fail with a Zod error');
  const [issue] = result.error.issues;
  assert.equal(issue?.path.join('.'), 'tags.0.icon');
  assert.match(issue?.message ?? '', /Invalid enum value/i);
});
