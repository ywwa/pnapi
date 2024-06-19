import { BaseEndpoint } from "../../../../lib";

export class OrderEndpoints extends BaseEndpoint {
  constructor(store_id: string) {
    super(store_id);
  }

  public base(): string {
    return this._buildUrl(this._baseUrl, "stores", this._storeId, "orders");
  }

  public by_id(order_id: string): string {
    this._validate({ order_id });
    return this._buildUrl(this.base(), order_id);
  }
}
