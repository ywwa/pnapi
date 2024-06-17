import { BaseEndpoints } from "../../base";

export default class SaleEndpoints extends BaseEndpoints {
  public base(store_id: string): string {
    this._validate({ store_id });
    return this._buildUrl(this._baseUrl, "stores", store_id, "sales");
  }

  public byId(store_id: string, sale_id: string): string {
    this._validate({ sale_id });
    return this._buildUrl(this.base(store_id), sale_id);
  }
}
