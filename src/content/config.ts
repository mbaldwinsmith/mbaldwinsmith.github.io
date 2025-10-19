import { defineCollection, z } from 'astro:content';
import { createPrayersSchema } from './schemas/prayers';

const poetry = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number(),
    summary: z.string().optional(),
    stanzas: z.array(z.array(z.string())),
    date: z.coerce.date(),
  }),
});

const prayers = defineCollection({
  type: 'content',
  schema: createPrayersSchema(z),
});

export const collections = { poetry, prayers };
