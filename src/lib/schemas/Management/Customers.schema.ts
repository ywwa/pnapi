import {
  boolean,
  number,
  object,
  string,
  infer as zinfer,
  type ZodSchema,
} from "zod";
import {
  Metadata,
  RevokeReasonEnum,
  StateEnum,
  dateSchema,
  steamSchema,
  userSchema,
} from "../shared.schema";

export const customerResponseSchema: ZodSchema = object({
  id: string(),
  store_id: string(),
  steam_id: string().nullable(),
  steam: steamSchema.nullable(),
  minecraft_uuid: string().nullable(),
  minecraft: object({
    id: string(),
    name: string(),
    avatar_url: string().nullable(),
  }).nullable(),
  name: string().nullable(),
  metadata: Metadata.nullable(),
  created_by: userSchema.nullable().optional(),
  created_at: dateSchema.nullable().optional(),
  updated_by: userSchema.nullable().optional(),
  updated_at: dateSchema.nullable().optional(),
});

export const tokenResponseSchema: ZodSchema = object({
  token: string(),
});

export const itemResponseSchema: ZodSchema = object({
  id: string(),
  store_id: string(),
  customer: customerResponseSchema,
  order_customer: customerResponseSchema.nullable(),
  subscription_id: string().nullable(),
  checkout_id: string().nullable(),
  order_id: string().nullable(),
  order_line_id: string().nullable(),
  quantity_index: number().nullable(),
  execute_on_gameserver_id: string().nullable(),
  product: object({
    id: string(),
    store_id: string(),
    version_id: string(),
    slug: string(),
    name: string(),
  }),
  command_attempts: number().nullable(),
  state: StateEnum,
  expirable: boolean(),
  gift: boolean(),
  added_at: dateSchema.nullable(),
  added_by: userSchema.nullable(),
  active_at: dateSchema.nullable(),
  expires_at: dateSchema.nullable(),
  removed_at: dateSchema.nullable(),
  revoked_at: dateSchema.nullable(),
  revoke_reason: RevokeReasonEnum.nullable(),
  revoked_by: userSchema.nullable(),
});

export const customerCreateSchema: ZodSchema = object({
  steam_id: string().optional(),
  name: string().max(50).optional(),
  metadata: Metadata.optional(),
});

export const customerLookupSchema: ZodSchema = object({
  id: string().optional(),
  steam_id: string().optional(),
}).refine(
  (data) => data.id || data.steam_id,
  "Either id or steam_id must be specified",
);

type CustomerUpdateSchemaType = zinfer<typeof customerCreateSchema>;

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

export const itemAssignSchema: ZodSchema = object({
  product_id: string(),
  product_version_id: string(),
  quantity: number(),
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
