import { Endpoint } from "../../../../lib";

export class CustomersTokensEndpoints extends Endpoint {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  get base(): string {
    return this.__build_url(this.__baseUrl, "tokens");
  }

  byId(customerId: string): string {
    this.__validate({ customerId });
    return this.__build_url(this.__baseUrl, customerId, "tokens");
  }
}
