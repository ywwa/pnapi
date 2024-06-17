import { BaseEndpoints } from "../../base";

export default class CustomerInventoryEndpoints extends BaseEndpoints {
  public base(store_id: string, customer_id: string): string {
    this._validate({ store_id, customer_id });
    return this._buildUrl(
      this._baseUrl,
      "stores",
      store_id,
      "customers",
      customer_id,
      "command_delivery",
    );
  }

  public byId(store_id: string, customer_id: string, item_id: string): string {
    this._validate({ item_id });
    return this._buildUrl(this.base(store_id, customer_id), item_id);
  }
}
