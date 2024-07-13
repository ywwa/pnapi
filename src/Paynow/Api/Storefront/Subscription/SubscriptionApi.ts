import { Api } from "../../../../lib";
import { Method, type ApiConfig, type RequestOptions } from "../../../../types";
import { type SubscriptionEndpoints } from "../../../Endpoint/Storefront";

export class SubscriptionApi extends Api {
  private __endpoints: SubscriptionEndpoints;

  constructor(config: ApiConfig, endpoints: SubscriptionEndpoints) {
    super(config);
    this.__endpoints = endpoints;
  }

  // TODO: subscription type & DTO & response schema
  async get() {
    try {
      this._check_auth(["customer"]);

      const options: RequestOptions = {
        url: this.__endpoints.base,
        headers: { auth: this.__config.auth },
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }

  async cancel(subscriptionId: string): Promise<void> {
    try {
      this._check_auth(["customer"]);
      const options: RequestOptions = {
        url: this.__endpoints.byId(subscriptionId),
        method: Method.Delete,
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }
}
