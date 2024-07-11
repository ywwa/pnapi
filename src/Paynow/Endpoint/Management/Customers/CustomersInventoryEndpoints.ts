import { Endpoint } from "../../../../lib";

export class CustomersInventoryEndpoints extends Endpoint {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  base(customerId: string): string {
    this.__validate({ customerId });
    return this.__build_url(this.__baseUrl, customerId, "command_delivery");
  }

  byId(customerId: string, itemId: string): string {
    this.__validate({ itemId });
    return this.__build_url(this.base(customerId), itemId);
  }
}
