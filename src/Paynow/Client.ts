import { ManagementApi, StorefrontApi } from ".";
import { type ClientConfig } from "..";

class Client {
  private __config: ClientConfig;
  private __management_api: ManagementApi;
  private __storefront_api: StorefrontApi;

  public set config(config: ClientConfig) {
    this.__config = config;
  }

  public get Management(): ManagementApi {
    if (!this.__management_api) {
      this.__management_api = new ManagementApi(this.__config);
    }
    return this.__management_api;
  }

  public get Storefront(): StorefrontApi {
    if (!this.__storefront_api)
      this.__storefront_api = new StorefrontApi(this.__config);

    return this.__storefront_api;
  }
}

export default Client;
