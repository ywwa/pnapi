import { BaseEndpoints } from "../../base";

export default class CustomerTokensEndpoints extends BaseEndpoints {
  public global(store_id: string): string {
    this._validate({ store_id });
    return this._buildUrl(
      this._baseUrl,
      "stores",
      store_id,
      "cutomers",
      "tokens",
    );
  }

  public byId(store_id: string, customer_id: string): string {
    this._validate({ store_id, customer_id });
    return this._buildUrl(
      this._baseUrl,
      "stores",
      store_id,
      "customers",
      customer_id,
      "tokens",
    );
  }
}
