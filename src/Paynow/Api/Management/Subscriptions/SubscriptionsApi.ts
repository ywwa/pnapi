import {
  type SubscriptionLookupDTO,
  type SubscriptionResponseDTO,
} from "../../../../dtos";
import {
  Api,
  subscriptionLookupSchema,
  subscriptionResponseSchema,
} from "../../../../lib";
import { Method, type ApiConfig, type RequestOptions } from "../../../../types";
import { type SubscriptionsEndpoints } from "../../../Endpoint";

export class SubscriptionsApi extends Api {
  private readonly __endpoints: SubscriptionsEndpoints;
  constructor(config: ApiConfig, endpoints: SubscriptionsEndpoints) {
    super(config);

    this.__endpoints = endpoints;
  }

  async get(
    params?: SubscriptionLookupDTO,
  ): Promise<SubscriptionResponseDTO[]> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.base,
        ...(params && { search: { schema: subscriptionLookupSchema, params } }),
      };

      return this._request<SubscriptionResponseDTO[]>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async getById(subscriptionId: string): Promise<SubscriptionResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(subscriptionId),
        response: subscriptionResponseSchema,
      };

      return this._request<SubscriptionResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async cancel(subscriptionId: string): Promise<void> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.cancel(subscriptionId),
        method: Method.Post,
      };

      return this._request<void>(options);
    } catch (error: any) {
      throw error;
    }
  }
}
