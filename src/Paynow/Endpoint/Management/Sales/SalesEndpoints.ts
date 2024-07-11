import { Endpoint } from "../../../../lib";

export class SalesEndpoints extends Endpoint {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  get base(): string {
    return this.__build_url(this.__baseUrl, "sales");
  }

  byId(saleId: string): string {
    this.__validate({ saleId });
    return this.__build_url(this.base, saleId);
  }
}
