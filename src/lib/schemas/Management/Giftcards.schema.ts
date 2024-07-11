import {
  boolean,
  date,
  number,
  object,
  string,
  infer as zinfer,
  type ZodSchema,
} from "zod";
import { Code, dateSchema, userSchema } from "../shared.schema";

export const giftcardResponseSchema: ZodSchema = object({
  id: string(),
  store_id: string(),
  enabled: boolean(),
  code: string(),
  note: string(),
  balance: number(),
  starting_balance: number(),
  usable_at: dateSchema,
  expires_at: dateSchema.nullable(),
  created_by: userSchema.nullable(),
  created_at: dateSchema,
  updated_by: userSchema.nullable(),
  updated_at: dateSchema.nullable(),
  canceled_by: userSchema.nullable(),
  canceled_at: dateSchema.nullable(),
});

export const giftcardSchema = object({
  code: Code.min(1).max(50),
  note: string().min(1).max(200),
  enabled: boolean(),
  usable_at: date().optional(),
  expires_at: date().optional(),
  balance: number().min(1).max(100000),
});

export const giftcardCreateSchema: ZodSchema = giftcardSchema;

export const giftcardLookupSchema: ZodSchema = object({
  limit: number().optional(),
  after: string().optional(),
  before: string().optional(),
  include_canceled: boolean().optional(),
  code: string().optional(),
});

const partialGiftcardSchema = giftcardSchema.partial();
type GiftcardUpdateType = zinfer<typeof partialGiftcardSchema>;

export const giftcardUpdateSchema: ZodSchema = partialGiftcardSchema.refine(
  (data) => {
    const keys = Object.keys(data) as (keyof GiftcardUpdateType)[];
    return keys.some((key) => data[key] !== undefined);
  },
  {
    message: "At least one field must be provided",
    path: ["code", "note", "enabled", "usable_at", "expires_at", "balance"],
  },
);
