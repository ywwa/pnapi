import { BASE_URL } from "../../lib";
import { type ClientConfig, type CustomerMeta } from "../../types";
import { StorefrontEndpoints } from "../Endpoint";
import { StoreApi } from "./Storefront";

export class StorefrontApi {
  private readonly __config: ClientConfig;
  private readonly __endpoints: StorefrontEndpoints;

  private __store: { [storeId: string]: StoreApi } = {};

  constructor(config: ClientConfig) {
    this.__config = config;
    this.__endpoints = new StorefrontEndpoints(BASE_URL);
  }

  public set meta(meta: CustomerMeta) {
    this.__config.customer_ip = meta.customer_ip;
    this.__config.customer_country_code = meta.customer_country_code;
  }

  public get Store(): StoreApi {
    if (!this.__config.store_id) throw new Error("Missing store_id in config");

    if (!this.__store[this.__config.store_id]) {
      this.__store[this.__config.store_id] = new StoreApi(
        this.__config,
        this.__endpoints.store,
      );
    }

    return this.__store[this.__config.store_id];
  }
}
