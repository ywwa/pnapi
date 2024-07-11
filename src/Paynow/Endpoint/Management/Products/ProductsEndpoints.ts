import { Endpoint } from "../../../../lib";

export class ProductsEndpoints extends Endpoint {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  get base(): string {
    return this.__build_url(this.__baseUrl, "products");
  }

  byId(productId: string): string {
    this.__validate({ productId });
    return this.__build_url(this.base, productId);
  }
}
