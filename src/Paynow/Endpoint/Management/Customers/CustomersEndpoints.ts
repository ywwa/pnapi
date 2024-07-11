import { CustomersInventoryEndpoints, CustomersTokensEndpoints } from ".";
import { Endpoint } from "../../../../lib";

export class CustomersEndpoints extends Endpoint {
  private __tokensEndpoints: CustomersTokensEndpoints;
  private __inventoryEndpoints: CustomersInventoryEndpoints;

  constructor(baseUrl: string) {
    super(baseUrl);
  }

  get base(): string {
    return this.__build_url(this.__baseUrl, "customers");
  }

  get lookup(): string {
    return this.__build_url(this.base, "lookup");
  }

  byId(customerId: string): string {
    this.__validate({ customerId });
    return this.__build_url(this.base, customerId);
  }

  get tokens(): CustomersTokensEndpoints {
    if (!this.__tokensEndpoints)
      this.__tokensEndpoints = new CustomersTokensEndpoints(this.base);

    return this.__tokensEndpoints;
  }

  get inventory(): CustomersInventoryEndpoints {
    if (!this.__inventoryEndpoints)
      this.__inventoryEndpoints = new CustomersInventoryEndpoints(this.base);

    return this.__inventoryEndpoints;
  }
}
