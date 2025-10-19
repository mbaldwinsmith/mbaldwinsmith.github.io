import { iconNames } from '../../data/icons';

type ZodModule = typeof import('zod');

export const createPrayerTagsSchema = (z: ZodModule) =>
  z
    .array(
      z.object({
        icon: z.enum(iconNames),
        label: z.string().trim().min(1),
      }),
    )
    .default([]);

export const createPrayersSchema = (z: ZodModule) =>
  z.object({
    title: z.string(),
    subtitle: z.string(),
    summary: z.string().optional(),
    date: z.coerce.date().optional(),
    order: z.number(),
    tags: createPrayerTagsSchema(z),
  });
