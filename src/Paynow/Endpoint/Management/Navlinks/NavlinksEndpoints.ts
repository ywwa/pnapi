import { Endpoint } from "../../../../lib";

export class NavlinksEndpoints extends Endpoint {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  get base(): string {
    return this.__build_url(this.__baseUrl, "navlinks");
  }

  byId(nodeId: string): string {
    this.__validate({ nodeId });
    return this.__build_url(this.base, nodeId);
  }

  get sortOrders(): string {
    return this.__build_url(this.base, "sort-orders");
  }
}
