import { BaseEndpoint } from "../../../../lib";

export class ProductEndpoints extends BaseEndpoint {
  constructor(store_id: string) {
    super(store_id);
  }

  public base(): string {
    return this._buildUrl(this._baseUrl, "stores", this._storeId, "products");
  }

  public by_id(product_id: string): string {
    this._validate({ product_id });
    return this._buildUrl(this.base(), product_id);
  }
}
