import {
  type SubscriptionRequestDTO,
  type SubscriptionResponseDTO,
} from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { type ApiConfig, type RequestOptions } from "../../../../types";
import { query } from "../../../../zschemas/subscription.zsc";
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
    const options: RequestOptions = {
      url: this.__ep.base(),
      ...(params && { search: { schema: query, content: params } }),
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
      method: "DELETE",
    };

    return this._execute<void>(options);
  }
}
