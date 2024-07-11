import { ManagementApi } from ".";
import { type ClientConfig } from "..";

class Client {
  private __config: ClientConfig;
  private __management_api: ManagementApi;

  public set config(config: ClientConfig) {
    this.__config = config;
  }

  public get Management(): ManagementApi {
    if (!this.__management_api) {
      this.__management_api = new ManagementApi(this.__config);
    }
    return this.__management_api;
  }
}

export default Client;
