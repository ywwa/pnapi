import { z, type ZodSchema } from "zod";
import {
  type ProductRequestDTO,
  type ProductResponseDTO,
  type ProductUpdateRequestDTO,
} from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import {
  Method,
  Scale,
  Stage,
  type ApiConfig,
  type RequestOptions,
} from "../../../../types";
import { type ProductEndpoints } from "../../../Endpoint";

export class ProductApi extends BaseApi {
  private readonly __ep: ProductEndpoints;

  constructor(config: ApiConfig, endpoints: ProductEndpoints) {
    super(config);

    this.__ep = endpoints;
  }

  public async create(body: ProductRequestDTO): Promise<ProductResponseDTO> {
    const schemaType = z.object({
      slug: z.optional(z.string().min(3).max(36)),
      name: z.string().min(1).max(42),
      description: z.string().min(1).max(50_000),
      price: z.number().min(0).max(50_000_00),
      allow_one_time_purchase: z.optional(z.boolean()),
      allow_subscription: z.optional(z.boolean()),
      subscription_interval_value: z.optional(z.number()),
      subscription_interval_scale: z.optional(z.nativeEnum(Scale)),
      remove_after_enabled: z.optional(z.boolean()),
      remove_after_time_value: z.optional(z.number()),
      remove_after_time_scale: z.optional(z.nativeEnum(Scale)),
      "store_stock_limit.enabled": z.optional(z.boolean()),
      "store_stock_limit.quantity": z.optional(z.number()),
      "store_stock_limit.time_value": z.optional(z.number()),
      "store_stock_limit.time_scale": z.optional(z.nativeEnum(Scale)),
      "customer_stock_limit.enabled": z.optional(z.boolean()),
      "customer_stock_limit.quantity": z.optional(z.number()),
      "customer_stock_limit.time_value": z.optional(z.number()),
      "customer_stock_limit.time_scale": z.optional(z.nativeEnum(Scale)),
      stock_limit_do_not_include_removed: z.optional(z.boolean()),
      tags: z.optional(z.string().array()),
      gameservers: z.optional(z.string().array()),
      commands: z.optional(
        z
          .object({
            stage: z.nativeEnum(Stage),
            content: z.string(),
            online_only: z.boolean(),
          })
          .array(),
      ),
    });
    type SchemaType = z.infer<typeof schemaType>;
    const schema: ZodSchema = schemaType.refine(
      (data) => {
        const keys = Object.keys(data) as (keyof SchemaType)[];
        return keys.some((key) => data[key] !== undefined);
      },
      {
        message: "At least one field must be defined",
        path: [
          "slug",
          "name",
          "description",
          "price",
          "allow_one_time_purchase",
          "allow_subscription",
          "subscription_interval_value",
          "subscription_interval_scale",
          "remove_after_enabled",
          "remove_after_time_value",
          "remove_after_time_scale",
          "store_stock_limit.enabled",
          "store_stock_limit.quantity",
          "store_stock_limit.time_value",
          "store_stock_limit.time_scale",
          "customer_stock_limit.enabled",
          "customer_stock_limit.quantity",
          "customer_stock_limit.time_value",
          "customer_stock_limit.time_scale",
          "stock_limit_do_not_include_removed",
          "tags",
          "gameservers",
          "commands",
        ],
      },
    );

    // I HONESTLY HAVE NOT A SINGLE IDEA IF THIS WILL WORK OR NOT

    const options: RequestOptions = {
      url: this.__ep.base(),
      method: Method.POST,
      data: { schema, content: body },
    };

    return this._execute<ProductResponseDTO>(options);
  }

  public async getAll(): Promise<ProductResponseDTO[]> {
    const options: RequestOptions = { url: this.__ep.base() };

    return this._execute<ProductResponseDTO[]>(options);
  }

  public async getById(product_id: string): Promise<ProductResponseDTO> {
    const options: RequestOptions = { url: this.__ep.by_id(product_id) };

    return this._execute<ProductResponseDTO>(options);
  }

  public async update(
    product_id: string,
    body?: ProductUpdateRequestDTO,
  ): Promise<ProductResponseDTO> {
    const schemaType = z.object({
      slug: z.optional(z.string().min(3).max(36)),
      name: z.optional(z.string().min(1).max(42)),
      description: z.optional(z.string().min(1).max(50_000)),
      price: z.optional(z.number().min(0).max(50_000_00)),
      allow_one_time_purchase: z.optional(z.boolean()),
      allow_subscription: z.optional(z.boolean()),
      subscription_interval_value: z.optional(z.number()),
      subscription_interval_scale: z.optional(z.nativeEnum(Scale)),
      remove_after_enabled: z.optional(z.boolean()),
      remove_after_time_value: z.optional(z.number()),
      remove_after_time_scale: z.optional(z.nativeEnum(Scale)),
      "store_stock_limit.enabled": z.optional(z.boolean()),
      "store_stock_limit.quantity": z.optional(z.number()),
      "store_stock_limit.time_value": z.optional(z.number()),
      "store_stock_limit.time_scale": z.optional(z.nativeEnum(Scale)),
      "customer_stock_limit.enabled": z.optional(z.boolean()),
      "customer_stock_limit.quantity": z.optional(z.number()),
      "customer_stock_limit.time_value": z.optional(z.number()),
      "customer_stock_limit.time_scale": z.optional(z.nativeEnum(Scale)),
      stock_limit_do_not_include_removed: z.optional(z.boolean()),
      tags: z.optional(z.string().array()),
      gameservers: z.optional(z.string().array()),
      commands: z.optional(
        z
          .object({
            stage: z.nativeEnum(Stage),
            content: z.string(),
            online_only: z.boolean(),
          })
          .array(),
      ),
    });
    type SchemaType = z.infer<typeof schemaType>;
    const schema: ZodSchema = schemaType.refine(
      (data) => {
        const keys = Object.keys(data) as (keyof SchemaType)[];
        return keys.some((key) => data[key] !== undefined);
      },
      {
        message: "At least one field must be defined",
        path: [
          "slug",
          "name",
          "description",
          "price",
          "allow_one_time_purchase",
          "allow_subscription",
          "subscription_interval_value",
          "subscription_interval_scale",
          "remove_after_enabled",
          "remove_after_time_value",
          "remove_after_time_scale",
          "store_stock_limit.enabled",
          "store_stock_limit.quantity",
          "store_stock_limit.time_value",
          "store_stock_limit.time_scale",
          "customer_stock_limit.enabled",
          "customer_stock_limit.quantity",
          "customer_stock_limit.time_value",
          "customer_stock_limit.time_scale",
          "stock_limit_do_not_include_removed",
          "tags",
          "gameservers",
          "commands",
        ],
      },
    );

    const options: RequestOptions = {
      url: this.__ep.by_id(product_id),
      method: Method.PATCH,
      ...(body && { data: { schema, content: body } }),
    };

    return this._execute<ProductResponseDTO>(options);
  }

  public async delete(product_id: string): Promise<void> {
    const options: RequestOptions = {
      url: this.__ep.by_id(product_id),
      method: Method.DELETE,
    };

    return this._execute<void>(options);
  }
}
