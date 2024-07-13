import { Endpoint } from "../../../../lib";

export class ProductEndpoints extends Endpoint {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  public get base(): string {
    return this.__build_url(this.__baseUrl, "store/products");
  }

  public byIdOrSlug(param: string): string {
    this.__validate({ param });
    return this.__build_url(this.base, param);
  }
}
