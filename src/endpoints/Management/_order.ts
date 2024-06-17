import { BaseEndpoints } from "../../base";

export default class OrderEndpoints extends BaseEndpoints {
  public base(store_id: string): string {
    this._validate({ store_id });
    return this._buildUrl(this._baseUrl, "stores", store_id, "orders");
  }

  public byId(store_id: string, order_id: string): string {
    this._validate({ order_id });
    return this._buildUrl(this.base(store_id), order_id);
  }
}
