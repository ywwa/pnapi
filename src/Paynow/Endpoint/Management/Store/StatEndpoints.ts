import { BaseEndpoint } from "../../../../lib";

export class StatEndpoints extends BaseEndpoint {
  constructor(store_id: string) {
    super(store_id);
  }

  public base(): string {
    return this._buildUrl(this._baseUrl, "stores", this._storeId, "stats");
  }

  public dashboard(): string {
    return this._buildUrl(this.base(), "dashboard");
  }

  public range_orders(): string {
    return this._buildUrl(this.base(), "range-orders");
  }

  public range_products(): string {
    return this._buildUrl(this.base(), "range-products");
  }
}
