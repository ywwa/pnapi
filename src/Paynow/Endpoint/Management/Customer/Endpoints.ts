import { InventoryEndpoints, TokenEndpoints } from ".";
import { BaseEndpoint } from "../../../../lib";

export class CustomerEndpoints extends BaseEndpoint {
  private readonly __tokens: TokenEndpoints;
  private readonly __inventory: InventoryEndpoints;

  constructor(storeId: string) {
    super(storeId);

    this.__tokens = new TokenEndpoints(this._storeId);
    this.__inventory = new InventoryEndpoints(this._storeId);
  }

  public base(): string {
    return this._buildUrl(this._baseUrl, "stores", this._storeId, "customers");
  }

  public lookup(): string {
    return this._buildUrl(this.base(), "lookup");
  }

  public by_id(customer_id: string): string {
    this._validate({ customer_id });
    return this._buildUrl(this.base(), customer_id);
  }

  public get tokens(): TokenEndpoints {
    return this.__tokens;
  }

  public get inventory(): InventoryEndpoints {
    return this.__inventory;
  }
}
