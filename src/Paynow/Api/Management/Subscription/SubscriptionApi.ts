import { z, type ZodSchema } from "zod";
import {
  type SubscriptionRequestDTO,
  type SubscriptionResponseDTO,
} from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { Method, type ApiConfig, type RequestOptions } from "../../../../types";
import { type SubscriptionEndpoints } from "../../../Endpoint";

export class SubscriptionApi extends BaseApi {
  private readonly __ep: SubscriptionEndpoints;

  constructor(config: ApiConfig, endpoints: SubscriptionEndpoints) {
    super(config);
    this.__ep = endpoints;
  }

  public async getMany(
    params?: SubscriptionRequestDTO,
  ): Promise<SubscriptionResponseDTO[]> {
    const schema: ZodSchema = z.object({
      limit: z.optional(z.number().min(1).max(100)),
      after: z.optional(z.string()),
      before: z.optional(z.string()),
      customer_id: z.optional(z.string()),
    });

    const options: RequestOptions = {
      url: this.__ep.base(),
      ...(params && { search: { schema, content: params } }),
    };

    return this._execute<SubscriptionResponseDTO[]>(options);
  }

  public async getById(
    subscription_id: string,
  ): Promise<SubscriptionResponseDTO> {
    const options: RequestOptions = { url: this.__ep.by_id(subscription_id) };

    return this._execute<SubscriptionResponseDTO>(options);
  }

  public async cancel(subscription_id: string): Promise<void> {
    const options: RequestOptions = {
      url: this.__ep.cancel(subscription_id),
      method: Method.DELETE,
    };

    return this._execute<void>(options);
  }
}
