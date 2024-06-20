import { z, type ZodSchema } from "zod";
import {
  type CouponRequestDTO,
  type CouponResponseDTO,
  type CouponUpdateRequestDTO,
} from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import {
  Discount,
  Method,
  type ApiConfig,
  type RequestOptions,
} from "../../../../types";
import { type CouponEndpoints } from "../../../Endpoint";

export class CouponApi extends BaseApi {
  private readonly __ep: CouponEndpoints;

  constructor(config: ApiConfig, endpoints: CouponEndpoints) {
    super(config);
    this.__ep = endpoints;
  }

  public async create(body: CouponRequestDTO): Promise<CouponResponseDTO> {
    const schema: ZodSchema = z.object({
      enabled: z.optional(z.boolean()),
      code: z.string().regex(/^(?!-)[a-zA-Z0-9-]{1,50}(?<!-)$/, {
        message:
          "Code must be alphanumeric, may include dashes, cannot start or end with a dash, and must be 1-50 characters long.",
      }),
      note: z.optional(z.string()),
      apply_to_tags: z.optional(z.string().array()),
      apply_to_products: z.optional(z.string().array()),
      discount_type: z.nativeEnum(Discount),
      discount_amount: z.number(),
      discount_apply_individually: z.optional(z.boolean()),
      discount_apply_before_sales: z.optional(z.boolean()),
      usable_by_customer_id: z.optional(z.string()),
      minimum_order_value: z.optional(z.number()),
      redeem_limit_store_enabled: z.optional(z.boolean()),
      redeem_limit_store_amount: z.optional(z.number()),
      redeem_limit_customer_enabled: z.optional(z.boolean()),
      redeem_limit_customer_amount: z.optional(z.number()),
      usable_on_one_time_purchase: z.optional(z.boolean()),
      usable_on_subscription: z.optional(z.boolean()),
      usable_at: z.optional(z.string().datetime()),
      expires_at: z.optional(z.string().datetime()),
    });

    const options: RequestOptions = {
      url: this.__ep.base(),
      method: Method.POST,
      data: { schema, content: body },
    };

    return this._execute<CouponResponseDTO>(options);
  }

  public async getAll(): Promise<CouponResponseDTO[]> {
    const options: RequestOptions = { url: this.__ep.base() };

    return this._execute<CouponResponseDTO[]>(options);
  }

  public async getById(coupon_id: string): Promise<CouponResponseDTO> {
    const options: RequestOptions = { url: this.__ep.by_id(coupon_id) };

    return this._execute<CouponResponseDTO>(options);
  }

  public async update(
    coupon_id: string,
    body?: CouponUpdateRequestDTO,
  ): Promise<CouponResponseDTO> {
    const schemaType = z.object({
      enabled: z.boolean(),
      code: z.string().regex(/^(?!-)[a-zA-Z0-9-]{1,50}(?<!-)$/, {
        message:
          "Code must be alphanumeric, may include dashes, cannot start or end with a dash, and must be 1-50 characters long.",
      }),
      note: z.string(),
      apply_to_tags: z.string().array(),
      apply_to_products: z.string().array(),
      discount_type: z.nativeEnum(Discount),
      discount_amount: z.number(),
      discount_apply_individually: z.boolean(),
      discount_apply_before_sales: z.boolean(),
      usable_by_customer_id: z.string(),
      minimum_order_value: z.number(),
      redeem_limit_store_enabled: z.boolean(),
      redeem_limit_store_amount: z.number(),
      redeem_limit_customer_enabled: z.boolean(),
      redeem_limit_customer_amount: z.number(),
      usable_on_one_time_purchase: z.boolean(),
      usable_on_subscription: z.boolean(),
      usable_at: z.string().datetime(),
      expires_at: z.string().datetime(),
    });
    type SchemaType = z.infer<typeof schemaType>;
    const schema: ZodSchema = schemaType.refine(
      (data) => {
        const keys = Object.keys(data) as (keyof SchemaType)[];
        return keys.some((key) => data[key] !== undefined);
      },
      {
        message: "At least one field must be provided",
        path: [
          "enabled",
          "code",
          "note",
          "apply_to_tags",
          "apply_to_products",
          "discount_type",
          "discount_apply_individually",
          "discount_apply_before_sales",
          "usable_by_customer_id",
          "minimum_order_value",
          "redeem_limit_store_enabled",
          "redeem_limit_store_amount",
          "redeem_limit_customer_enabled",
          "redeem_limit_customer_amount",
          "usable_on_one_time_purchase",
          "usable_on_subscription",
          "usable_at",
          "expires_at",
        ],
      },
    );

    const options: RequestOptions = {
      url: this.__ep.by_id(coupon_id),
      method: Method.PATCH,
      ...(body && { data: { schema, content: body } }),
    };

    return this._execute<CouponResponseDTO>(options);
  }

  public async delete(coupon_id: string): Promise<void> {
    const options: RequestOptions = {
      url: this.__ep.by_id(coupon_id),
      method: Method.DELETE,
    };

    return this._execute<void>(options);
  }
}
