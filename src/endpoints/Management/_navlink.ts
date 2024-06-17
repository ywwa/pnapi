import { BaseEndpoints } from "../../base";

export default class NavlinkEndpoints extends BaseEndpoints {
  public base(store_id: string): string {
    this._validate({ store_id });
    return this._buildUrl(this._baseUrl, "stores", store_id, "navlinks");
  }

  public byId(store_id: string, node_id: string): string {
    this._validate({ node_id });
    return this._buildUrl(this.base(store_id), node_id);
  }

  public sortOrders(store_id: string): string {
    return this._buildUrl(this.base(store_id), "sort-orders");
  }
}
