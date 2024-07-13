import { Endpoint } from "../../../../lib";

export class CartEndpoints extends Endpoint {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  public get base(): string {
    return this.__build_url(this.__baseUrl, "store/cart");
  }

  public get lines(): string {
    return this.__build_url(this.base, "lines");
  }
}
