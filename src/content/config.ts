import { defineCollection, z } from 'astro:content';

const poems = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number(),
    stanzas: z.array(z.array(z.string())),
  }),
});

export const collections = { poems };
