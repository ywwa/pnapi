import { BaseEndpoint } from "../../../../lib";

export class TokenEndpoints extends BaseEndpoint {
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
      "tokens",
    );
  }

  public global(): string {
    return this._buildUrl(
      this._baseUrl,
      "stores",
      this._storeId,
      "customers/tokens",
    );
  }
}
