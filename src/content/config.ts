import { defineCollection, z } from 'astro:content';
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

export const collections = { poetry };
