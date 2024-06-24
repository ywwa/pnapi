import { ZodIssueCode, z, type ZodSchema } from "zod";

export const create_update: ZodSchema = z
  .object({
    steam_id: z.string(),
    name: z.string().max(50),
    metadata: z
      .record(z.string().max(40), z.string().max(500))
      .superRefine((metadata, ctx) => {
        if (Object.keys(metadata).length > 50)
          ctx.addIssue({
            code: ZodIssueCode.custom,
            message: "Metadata must not exceed 50 key-value pairs",
          });
      }),
  })
  .partial();

export const lookup: ZodSchema = z
  .object({
    id: z.string(),
    steam_id: z.string(),
  })
  .partial()
  .refine(
    (d) => !d.id || !d.steam_id,
    "Either id or steam_id must be specified",
  );

export const item: ZodSchema = z
  .object({
    product_id: z.string(),
    product_version_id: z.string(),
    quantity: z.number(),
  })
  .partial()
  .refine(
    (d) => d.product_id === undefined && d.product_version_id === undefined,
    {
      message: "Either product_id or product_version_id must be provided",
      path: ["product_id", "product_version_id"],
    },
  );
