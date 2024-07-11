import {
  boolean,
  number,
  object,
  string,
  infer as zinfer,
  type ZodSchema,
} from "zod";
import { dateSchema, DiscountEnum, userSchema } from "../shared.schema";
import { simpleProductResponseSchema } from "./Products.schema";
import { simpleTagResponseSchema } from "./Tags.schema";

export const saleResponseSchema: ZodSchema = object({
  id: string(),
  store_id: string(),
  enabled: boolean(),
  name: string(),
  apply_to_tags: simpleTagResponseSchema.array(),
  apply_to_products: simpleProductResponseSchema.array(),
  discount_type: DiscountEnum,
  discount_amount: number(),
  minimum_order_value: number(),
  begins_at: dateSchema,
  ends_at: dateSchema.nullable(),
  created_by: userSchema.nullable(),
  created_at: dateSchema,
  updated_by: userSchema.nullable(),
  updated_at: dateSchema.nullable(),
});

export const saleCreateSchema = object({
  enabled: boolean(),
  name: string().min(1),
  begins_at: dateSchema,
  ends_at: dateSchema.optional(),
  discount_type: DiscountEnum,
  discount_amount: number(),
  apply_to_tags: string().array().optional(),
  apply_to_products: string().array().optional(),
  minimum_order_value: number().optional(),
});

const partialSaleSchema = saleCreateSchema.partial();

type SaleUpdateSchemaType = zinfer<typeof partialSaleSchema>;

export const saleUpdateSchema: ZodSchema = partialSaleSchema.refine(
  (data) => {
    const keys = Object.keys(
      partialSaleSchema,
    ) as (keyof SaleUpdateSchemaType)[];
    return keys.some((key) => data[key] !== undefined);
  },
  {
    message: "At least one field must be provided",
    path: [
      "enabled",
      "name",
      "begins_at",
      "ends_at",
      "discount_type",
      "discount_amount",
      "apply_to_tags",
      "apply_to_products",
      "minimum_order_value",
    ],
  },
);
