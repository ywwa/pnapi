import { z, type ZodSchema } from "zod";
import {
  type InventoryRequestDTO,
  type InventoryResponseDTO,
} from "../../../dtos";
import { BaseApi } from "../../../lib";
import { Method, type ApiConfig, type RequestOptions } from "../../../types";
import { type InventoryEndpoints } from "../../Endpoint";

export class InventoryApi extends BaseApi {
  private readonly __ep: InventoryEndpoints;

  constructor(config: ApiConfig, endpoints: InventoryEndpoints) {
    super(config);

    this.__ep = endpoints;
  }

  public async assign(
    customer_id: string,
    body?: InventoryRequestDTO,
  ): Promise<InventoryResponseDTO[]> {
    const schema: ZodSchema = z
      .object({
        product_id: z.optional(z.string()),
        product_version_id: z.optional(z.string()),
        quantity: z.optional(z.number()),
      })
      .refine(
        (data) =>
          data.product_id !== undefined ||
          data.product_version_id !== undefined,
        {
          message: "Either product_id or product_version_id must be provided",
          path: ["product_id", "product_version_id"],
        },
      );

    const options: RequestOptions = {
      url: this.__ep.base(customer_id),
      method: Method.POST,
      ...(body && { data: { schema, content: body } }),
    };

    return this._execute<InventoryResponseDTO[]>(options);
  }

  public async get(customer_id: string): Promise<InventoryResponseDTO[]> {
    const options: RequestOptions = {
      url: this.__ep.base(customer_id),
    };

    return this._execute<InventoryResponseDTO[]>(options);
  }

  public async revoke(customer_id: string, item_id: string): Promise<void> {
    const options: RequestOptions = {
      url: this.__ep.by_id(customer_id, item_id),
      method: Method.DELETE,
    };

    return this._execute<void>(options);
  }
}
