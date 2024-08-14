import { z } from "zod";

export const DateSchema = z.string().transform((str) => new Date(str));

export const SlugSchema = z
  .string()
  .regex(/^(?!-)(?!.*--)[a-zA-Z0-9-]+(?<!-)$/, "Invalid Slug");

export const MetadataSchema = z
  .record(z.string().max(40), z.string().max(500))
  .superRefine((meta, ctx) => {
    if (Object.keys(meta).length > 50) {
      ctx.addIssue({
        code: "custom",
        message: "Metadata must not exceed 50 key-value pairs",
      });
    }
  });

export const PriceSchema = z
  .number()
  .min(0)
  .max(50_000_00)
  .refine((v) => v === 0 || v >= 50, {
    message: "Price must be 0 or at least 50",
  });
