import { Endpoint } from "../../../../lib";

export class SubscriptionEndpoints extends Endpoint {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  public get base(): string {
    return this.__build_url(this.__baseUrl, "store/customer/subscriptions");
  }

  public byId(subscriptionId: string): string {
    return this.__build_url(this.base, subscriptionId);
  }
}
