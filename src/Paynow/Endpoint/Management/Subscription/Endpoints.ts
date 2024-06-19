import { BaseEndpoint } from "../../../../lib";

export class SubscriptionEndpoints extends BaseEndpoint {
  constructor(store_id: string) {
    super(store_id);
  }

  public base(): string {
    return this._buildUrl(
      this._baseUrl,
      "stores",
      this._storeId,
      "subscriptions",
    );
  }

  public by_id(subscription_id: string): string {
    this._validate({ subscription_id });
    return this._buildUrl(this.base(), subscription_id);
  }

  public cancel(subscription_id: string): string {
    return this._buildUrl(this.by_id(subscription_id), "cancel");
  }
}
