import { Endpoint } from "../../../../lib";

export class OrdersEndpoints extends Endpoint {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  get base(): string {
    return this.__build_url(this.__baseUrl, "orders");
  }

  byId(orderId: string): string {
    this.__validate({ orderId });
    return this.__build_url(this.base, orderId);
  }
}
