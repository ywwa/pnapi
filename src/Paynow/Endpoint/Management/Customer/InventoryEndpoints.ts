import { BaseEndpoint } from "../../../../lib";

export class InventoryEndpoints extends BaseEndpoint {
  constructor(store_id: string) {
    super(store_id);
  }

  public base(customer_id: string): string {
    this._validate({ customer_id });
    return this._buildUrl(
      this._baseUrl,
      "stores",
      this._storeId,
      "customers",
      customer_id,
      "command_delivery",
    );
  }

  public by_id(customer_id: string, item_id: string): string {
    this._validate({ item_id });
    return this._buildUrl(this.base(customer_id), item_id);
  }
}
