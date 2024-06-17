import { BaseEndpoints } from "../../base";

export default class SubscriptionEndpoints extends BaseEndpoints {
  public base(store_id: string): string {
    this._validate({ store_id });
    return this._buildUrl(this._baseUrl, "stores", store_id, "subscriptions");
  }

  public byId(store_id: string, subscription_id: string): string {
    this._validate({ subscription_id });
    return this._buildUrl(this.base(store_id), subscription_id);
  }

  public cancel(store_id: string, subscription_id: string): string {
    return this._buildUrl(this.byId(store_id, subscription_id), "cancel");
  }
}
