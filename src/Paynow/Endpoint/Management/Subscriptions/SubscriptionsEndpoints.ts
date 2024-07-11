import { Endpoint } from "../../../../lib";

export class SubscriptionsEndpoints extends Endpoint {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  get base(): string {
    return this.__build_url(this.__baseUrl, "subscriptions");
  }

  byId(subscriptionId: string): string {
    this.__validate({ subscriptionId });
    return this.__build_url(this.base, subscriptionId);
  }

  cancel(subscriptionId: string): string {
    return this.__build_url(this.byId(subscriptionId), "cancel");
  }
}
