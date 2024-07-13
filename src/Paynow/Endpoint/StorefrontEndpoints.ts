import { Endpoint } from "../../lib";
import { StoreEndpoints } from "./Storefront";

export class StorefrontEndpoints extends Endpoint {
  private __storeEndpoints: StoreEndpoints;

  constructor(baseUrl: string) {
    super(baseUrl);
    this.__storeEndpoints = new StoreEndpoints(this.__baseUrl);
  }

  public get store(): StoreEndpoints {
    return this.__storeEndpoints;
  }
}
