import { BaseEndpoint } from "../../../../lib";

export class SaleEndpoints extends BaseEndpoint {
  constructor(store_id: string) {
    super(store_id);
  }

  public base(): string {
    return this._buildUrl(this._baseUrl, "stores", this._storeId, "sales");
  }

  public by_id(sale_id: string): string {
    this._validate({ sale_id });
    return this._buildUrl(this.base(), sale_id);
  }
}
