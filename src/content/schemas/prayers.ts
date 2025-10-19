import { iconNames } from '../../data/icons';

type ZodModule = typeof import('zod');

export const createPrayerTagsSchema = (z: ZodModule) =>
  z
    .array(
      z.object({
        icon: z.enum(iconNames),
        label: z.string(),
      }),
    )
    .default([]);

export const createPrayersSchema = (z: ZodModule) =>
  z.object({
    title: z.string().trim().min(1),
    subtitle: z.string().trim().min(1),
    summary: z.string().trim().min(1).optional(),
    date: z.coerce.date().optional(),
    order: z.number().int().positive(),
    tags: createPrayerTagsSchema(z),
  });
