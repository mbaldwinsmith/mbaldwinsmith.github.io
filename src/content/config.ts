import { defineCollection, z } from 'astro:content';

const poetry = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number(),
    stanzas: z.array(z.array(z.string())),
    date: z.coerce.date(),
  }),
});

const prayers = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    summary: z.string().optional(),
    date: z.coerce.date().optional(),
    order: z.number(),
    tags: z
      .array(
        z.object({
          icon: z.string(),
          label: z.string(),
        }),
      )
      .default([]),
  }),
});

export const collections = { poetry, prayers };
