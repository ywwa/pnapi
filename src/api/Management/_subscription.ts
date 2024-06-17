import { BaseAPI } from "../../base";
import SubscriptionEndpoints from "../../endpoints/Management/_subscription";
import { ServiceConfig } from "../../types";

export default class SubscriptionAPI extends BaseAPI {
  private readonly _endpoints: SubscriptionEndpoints;

  constructor(config: ServiceConfig, endpoints: SubscriptionEndpoints) {
    super(config);

    this._endpoints = endpoints;
  }

  public async getAll() {
    return this._endpoints.base(this.config.store_id);
  }

  public async getById(subscription_id: string) {
    return this._endpoints.byId(this.config.store_id, subscription_id);
  }

  public async cancel(subscription_id: string) {
    return this._endpoints.cancel(this.config.store_id, subscription_id);
  }
}
