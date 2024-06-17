import { BaseEndpoints } from "../../base";
import CustomerInventoryEndpoints from "./_customerInventory";
import CustomerTokensEndpoints from "./_customerTokens";

export default class CustomerEndpoints extends BaseEndpoints {
  private readonly _tokensEndpoints: CustomerTokensEndpoints;
  private readonly _inventoryEndpoints: CustomerInventoryEndpoints;
  constructor() {
    super();

    this._tokensEndpoints = new CustomerTokensEndpoints();
    this._inventoryEndpoints = new CustomerInventoryEndpoints();
  }

  public base(store_id: string): string {
    this._validate({ store_id });
    return this._buildUrl(this._baseUrl, "stores", store_id, "customers");
  }

  public lookup(store_id: string): string {
    return this._buildUrl(this.base(store_id), "lookup");
  }

  public byId(store_id: string, customer_id: string): string {
    this._validate({ customer_id });
    return this._buildUrl(this.base(store_id), customer_id);
  }

  public get Tokens(): CustomerTokensEndpoints {
    return this._tokensEndpoints;
  }

  public get Inventory(): CustomerInventoryEndpoints {
    return this._inventoryEndpoints;
  }
}
