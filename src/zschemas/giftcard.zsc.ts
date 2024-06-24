import { ZodSchema, z } from "zod";
import { codeRegex } from "../lib/utils";

const giftcard = z.object({
  code: z.string().regex(codeRegex, "Invalid code").min(1).max(50),
  note: z.string().max(200).optional(),
  enabled: z.boolean(),
  usable_at: z.string().datetime().optional(),
  expires_at: z.string().datetime().optional(),
  starting_balance: z.number(),
});

export const create: ZodSchema = giftcard;

const partialGiftcard = giftcard.partial();
type SchemaType = z.infer<typeof partialGiftcard>;

export const update: ZodSchema = partialGiftcard.refine(
  (d) => {
    const keys = Object.keys(d) as (keyof SchemaType)[];
    return keys.some((k) => d[k] !== undefined);
  },
  {
    message: "At least one field must be provided",
    path: ["code", "note", "enabled", "usable_at", "expires_at", "balance"],
  },
);
