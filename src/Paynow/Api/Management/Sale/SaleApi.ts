import { z, type ZodSchema } from "zod";
import {
  SaleUpdateDTO,
  type SaleCreateDTO,
  type SaleResponseDTO,
} from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import {
  Discount,
  Method,
  type ApiConfig,
  type RequestOptions,
} from "../../../../types";
import { type SaleEndpoints } from "../../../Endpoint";

export class SaleApi extends BaseApi {
  private readonly __ep: SaleEndpoints;

  constructor(config: ApiConfig, endpoints: SaleEndpoints) {
    super(config);
    this.__ep = endpoints;
  }

  public async create(body: SaleCreateDTO): Promise<SaleResponseDTO> {
    const schema: ZodSchema = z.object({
      name: z.string(),
      enabled: z.optional(z.boolean()),
      apply_to_tags: z.optional(z.string().array()),
      apply_to_products: z.optional(z.string().array()),
      discount_type: z.nativeEnum(Discount),
      minimum_order_value: z.optional(z.number()),
      begins_at: z.optional(z.string().datetime()),
      ends_at: z.optional(z.string().datetime()),
    });

    const options: RequestOptions = {
      url: this.__ep.base(),
      method: Method.POST,
      data: { schema, content: body },
    };

    return this._execute<SaleResponseDTO>(options);
  }

  public async getAll(): Promise<SaleResponseDTO[]> {
    const options: RequestOptions = { url: this.__ep.base() };

    return this._execute<SaleResponseDTO[]>(options);
  }

  public async getById(sale_id: string): Promise<SaleResponseDTO> {
    const options: RequestOptions = { url: this.__ep.by_id(sale_id) };

    return this._execute<SaleResponseDTO>(options);
  }

  public async update(
    sale_id: string,
    body: SaleUpdateDTO,
  ): Promise<SaleResponseDTO> {
    const schemaType = z.object({
      name: z.string(),
      enabled: z.boolean(),
      apply_to_tags: z.string().array(),
      apply_to_products: z.string().array(),
      discount_type: z.nativeEnum(Discount),
      discount_amount: z.number(),
      minimum_order_value: z.number(),
      begins_at: z.string().datetime(),
      ends_at: z.string().datetime(),
    });
    type SchemaType = z.infer<typeof schemaType>;
    const schema: ZodSchema = schemaType.partial().refine((data) => {
      const keys = Object.keys(data) as (keyof SchemaType)[];

      return keys.some((key) => data[key] !== undefined);
    });

    const options: RequestOptions = {
      url: this.__ep.by_id(sale_id),
      method: Method.PATCH,
      data: { schema, content: body },
    };

    return this._execute<SaleResponseDTO>(options);
  }

  public async delete(sale_id: string): Promise<void> {
    const options: RequestOptions = {
      url: this.__ep.by_id(sale_id),
      method: Method.DELETE,
    };

    return this._execute<void>(options);
  }
}
