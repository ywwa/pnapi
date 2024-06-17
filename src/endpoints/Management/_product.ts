import { BaseEndpoints } from "../../base";

export default class ProductEndpoints extends BaseEndpoints {
  public base(store_id: string): string {
    this._validate({ store_id });
    return this._buildUrl(this._baseUrl, "stores", store_id, "products");
  }

  public byId(store_id: string, product_id: string): string {
    this._validate({ product_id });
    return this._buildUrl(this.base(store_id), product_id);
  }
}
