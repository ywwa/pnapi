import { z, type ZodSchema } from "zod";
import {
  Metadata,
  RevokeReasonEnum,
  StateEnum,
  dateSchema,
  steamSchema,
  userSchema,
} from "../shared.schema";

export const customerResponseSchema: ZodSchema = z.object({
  id: z.string(),
  store_id: z.string(),
  steam_id: z.string().nullable(),
  steam: steamSchema.nullable(),
  name: z.string().nullable(),
  metadata: Metadata.nullable(),
  created_by: userSchema.nullable().optional(),
  created_at: dateSchema.nullable().optional(),
  updated_by: userSchema.nullable().optional(),
  updated_at: dateSchema.nullable().optional(),
});

export const tokenResponseSchema: ZodSchema = z.object({
  token: z.string(),
});

export const itemResponseSchema: ZodSchema = z.object({
  id: z.string(),
  store_id: z.string(),
  customer: customerResponseSchema,
  order_customer: customerResponseSchema.nullable(),
  subscription_id: z.string().nullable(),
  checkout_id: z.string().nullable(),
  order_id: z.string().nullable(),
  order_line_id: z.string().nullable(),
  quantity_index: z.number().nullable(),
  execute_on_gameserver_id: z.string().nullable(),
  product: z.object({
    id: z.string(),
    store_id: z.string(),
    version_id: z.string(),
    slug: z.string(),
    name: z.string(),
  }),
  command_attempts: z.number().nullable(),
  state: StateEnum,
  expirable: z.boolean(),
  gift: z.boolean(),
  added_at: dateSchema.nullable(),
  added_by: userSchema.nullable(),
  active_at: dateSchema.nullable(),
  expires_at: dateSchema.nullable(),
  removed_at: dateSchema.nullable(),
  revoked_at: dateSchema.nullable(),
  revoke_reason: RevokeReasonEnum.nullable(),
  revoked_by: userSchema.nullable(),
});

export const customerCreateSchema: ZodSchema = z.object({
  steam_id: z.string().optional(),
  name: z.string().max(50).optional(),
  metadata: Metadata.optional(),
});

export const customerLookupSchema: ZodSchema = z
  .object({
    id: z.string().optional(),
    steam_id: z.string().optional(),
  })
  .refine(
    (data) => !data.id && !data.steam_id,
    "Either id or steam_id must be specified",
  );

type CustomerUpdateSchemaType = z.infer<typeof customerCreateSchema>;

export const customerUpdateSchema: ZodSchema = customerCreateSchema.refine(
  (data) => {
    const keys = Object.keys(data) as (keyof CustomerUpdateSchemaType)[];
    return keys.some((key) => data[key] !== undefined);
  },
  {
    message: "At least one field must be provided",
    path: ["steam_id", "name", "metadata"],
  },
);

export const itemAssignSchema: ZodSchema = z
  .object({
    product_id: z.string(),
    product_version_id: z.string(),
    quantity: z.number(),
  })
  .partial()
  .refine(
    (data) => {
      data.product_id === undefined && data.product_version_id === undefined;
    },
    {
      message: "Either product_id or product_version_id must be provided",
      path: ["product_id", "product_version_id"],
    },
  );
