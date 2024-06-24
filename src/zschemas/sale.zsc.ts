import { z, type ZodSchema } from "zod";
import { DiscountEnum } from "./utils";

const sale = z.object({
  name: z.string().min(1),
  enabled: z.boolean(),
  begins_at: z.string().datetime().optional(),
  ends_at: z.string().datetime().optional(),
  discount_type: DiscountEnum,
  minimum_order_value: z.number().optional(),
  apply_to_tags: z.string().array().optional(),
  apply_to_products: z.string().array().optional(),
});

export const create: ZodSchema = sale;

const partialSale = sale.partial();
type SchemaType = z.infer<typeof partialSale>;

export const update: ZodSchema = sale.partial().refine(
  (d) => {
    const keys = Object.keys(d) as (keyof SchemaType)[];
    return keys.some((k) => d[k] !== undefined);
  },
  {
    message: "At least one field is required",
    path: [
      "name",
      "enabled",
      "discount_amount",
      "discount_type",
      "minimum_order_value",
      "begins_at",
      "ends_at",
      "apply_to_tags",
      "apply_to_products",
    ],
  },
);
