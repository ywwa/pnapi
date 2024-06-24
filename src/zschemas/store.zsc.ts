import { z, type ZodSchema } from "zod";
import { CurrencyEnum, GameEnum, Slug, Timezone } from "./utils";

export const create: ZodSchema = z
  .object({
    name: z.string().min(2).max(24),
    slug: Slug.min(2).max(24),
    currency: CurrencyEnum,
    game: GameEnum,
    description: z.string().min(20).max(400).optional(),
  })
  .refine(
    (data) => {
      if (data.game === "other") return data.description !== undefined;
      return true;
    },
    {
      message: 'Description is required for platform "other"',
      path: ["description"],
    },
  );

export const update: ZodSchema = z
  .object({
    name: z.string().min(2).max(24),
    slug: Slug.min(2).max(24),
  })
  .partial();

export const member_set_role: ZodSchema = z.object({ role_id: z.string() });

export const dashboard: ZodSchema = z.object({ tz: Timezone.optional() });

export const orders: ZodSchema = z.object({
  tz: Timezone.optional(),
  start: z.string().datetime(),
  end: z.string().datetime(),
});

export const products: ZodSchema = z.object({
  tz: Timezone.optional(),
  start: z.string().datetime(),
  end: z.string().datetime(),
  limit: z.number().max(100).optional(),
});
