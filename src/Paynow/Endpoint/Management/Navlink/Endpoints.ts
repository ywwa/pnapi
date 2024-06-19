import { BaseEndpoint } from "../../../../lib";

export class NavlinkEndpoints extends BaseEndpoint {
  constructor(store_id: string) {
    super(store_id);
  }

  public base(): string {
    return this._buildUrl(this._baseUrl, "stores", this._storeId, "navlinks");
  }

  public by_id(node_id: string): string {
    this._validate({ node_id });
    return this._buildUrl(this.base(), node_id);
  }

  public sort_orders(): string {
    return this._buildUrl(this.base(), "sort-orders");
  }
}
